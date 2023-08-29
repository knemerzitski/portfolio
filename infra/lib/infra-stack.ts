import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RemovalPolicy, CfnOutput } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, BucketDeploymentProps, CacheControl, Source } from 'aws-cdk-lib/aws-s3-deployment';
import {
  AllowedMethods, CacheCookieBehavior, CacheHeaderBehavior,
  CachePolicy, CacheQueryStringBehavior, Distribution, FunctionEventType,
  OriginRequestPolicy,
  PriceClass, ViewerProtocolPolicy,
  Function,
  FunctionCode,
  BehaviorOptions
} from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin, RestApiOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { CloudFrontTarget, Route53RecordTarget } from 'aws-cdk-lib/aws-route53-targets';
import { EndpointType, IResource, RestApi } from 'aws-cdk-lib/aws-apigateway';

import { ApiStack as ContactFormPostApiStack } from '@/app/api/contact/infra';
import { API_PATH as contactFormApiPath } from '@/app/api/contact/handler';
import path from 'path';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';

const API_RESOURCES = [
  {
    path: contactFormApiPath,
    stack: ContactFormPostApiStack,
  }
];

function getOrCreateResource(resource: IResource, path: string[]) {
  if (path.length === 0) return resource;
  const part = path[0];
  let nextResource = resource.getResource(part);
  if (!nextResource) {
    nextResource = resource.addResource(part);
  }
  return getOrCreateResource(nextResource, path.slice(1));
}

function parseDomains() {
  if (!process.env.DOMAIN) {
    throw new Error(`Env 'DOMAIN' must be defined`);
  }
  const domains = process.env.DOMAIN
    .split(';')
    .map(group => group.split(',').map(entry => entry.trim()))
    .filter(group => group.length >= 3)
    .map(group => ({
      zoneName: group[0],
      zoneId: group[1],
      primaryName: group[2],
      aliases: group.slice(3)
    }));
  if (domains.length === 0) {
    throw new Error(`Env 'DOMAIN' must be in format: [zoneName],[zoneId],[primaryName],[...aliases];...`);
  }
  return domains;
}

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const domains = parseDomains();

    const staticFilesBucket = new Bucket(this, 'StaticFiles', {
      versioned: false,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const cdnAdditionalBehaviors: Record<string, BehaviorOptions> = {};

    // API
    if (API_RESOURCES.length > 0) {
      const api = new RestApi(this, "Api", {
        restApiName: 'Portfolio Api',
        description: 'This service serves portfolio Api requests',
        endpointTypes: [EndpointType.REGIONAL],
      });

      API_RESOURCES.forEach(({ path, stack }) => {
        new stack(this, `ApiResource-${path}`, {
          apiResource: getOrCreateResource(api.root, path.split('/')),
        });
      });

      cdnAdditionalBehaviors['/api/*'] = {
        origin: new RestApiOrigin(api),

        allowedMethods: AllowedMethods.ALLOW_ALL,
        viewerProtocolPolicy: ViewerProtocolPolicy.HTTPS_ONLY,
        compress: true,
        cachePolicy: CachePolicy.CACHING_DISABLED,
        originRequestPolicy: OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
      };
    }

    if (!process.env.CLOUDFRONT_CERTIFICATE_ARN) {
      throw new Error(`Env 'CLOUDFRONT_CERTIFICATE_ARN' must be defined`);
    }

    const cdnDistribution = new Distribution(this, 'Distribution', {
      comment: "CDN for Portfolio website",
      priceClass: PriceClass.PRICE_CLASS_100,
      certificate: Certificate.fromCertificateArn(this, 'PortfolioCertificate', process.env.CLOUDFRONT_CERTIFICATE_ARN),
      domainNames: domains.map(d => [d.primaryName, ...d.aliases]).flat(),
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new S3Origin(staticFilesBucket),
        compress: true,
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        originRequestPolicy: OriginRequestPolicy.CORS_S3_ORIGIN,
        cachePolicy: new CachePolicy(this, 'CacheByAcceptHeaderPolicy', {
          minTtl: Duration.seconds(1),
          maxTtl: Duration.seconds(31536000),
          defaultTtl: Duration.seconds(86400),
          headerBehavior: CacheHeaderBehavior.allowList('Accept'),
          queryStringBehavior: CacheQueryStringBehavior.all(),
          cookieBehavior: CacheCookieBehavior.none(),
          enableAcceptEncodingBrotli: true,
          enableAcceptEncodingGzip: true,
        }),
        functionAssociations: [{
          eventType: FunctionEventType.VIEWER_REQUEST,
          function: new Function(this, 'CDNFunction', {
            code: FunctionCode.fromFile({
              filePath: path.join(__dirname, '../resources/cloudfront-viewer-request.js'),
            }),
          })
        }]
      },
      additionalBehaviors: cdnAdditionalBehaviors,
      errorResponses: [
        {
          // Return 404.html when path not found in S3 bucket
          httpStatus: 403,
          ttl: Duration.seconds(10),
          responsePagePath: '/404.html',
          responseHttpStatus: 404,
        }
      ],
    });

    domains.forEach((domain) => {
      const hostedZone = HostedZone.fromHostedZoneAttributes(this, `Zone-${domain.zoneName}`, {
        hostedZoneId: domain.zoneId,
        zoneName: domain.zoneName,
      });
      const primaryRecord = new ARecord(this, `ARecord-${domain.zoneName}`, {
        zone: hostedZone,
        recordName: domain.primaryName,
        target: RecordTarget.fromAlias(new CloudFrontTarget(cdnDistribution)),
      });

      domain.aliases.forEach((alias) => {
        new ARecord(this, `AliasARecord-${domain.zoneName}-${alias}`, {
          zone: hostedZone,
          recordName: alias,
          target: RecordTarget.fromAlias(new Route53RecordTarget(primaryRecord))
        });
      });
    });

    const commonDeploymentSettings: BucketDeploymentProps = {
      logRetention: RetentionDays.ONE_DAY,
      sources: [Source.asset('./out')],
      destinationBucket: staticFilesBucket,
      cacheControl: [
        CacheControl.setPublic(),
        CacheControl.maxAge(Duration.seconds(31536000)),
        CacheControl.immutable(),
      ],
    }

    new BucketDeployment(this, 'AllExceptWebpDeployment', {
      ...commonDeploymentSettings,
      exclude: ['*.webp'],
    });
    // S3 Deployment doesn't correctly identify webp mime type so have to set it manually
    // It might be due to operating system's ability to detect mime types
    new BucketDeployment(this, 'OnlyWebpDeployment', {
      ...commonDeploymentSettings,
      exclude: ['*'],
      include: ['*.webp'],
      contentType: 'image/webp',
      distribution: cdnDistribution,
      distributionPaths: ['/*'],
    });


    new CfnOutput(this, 'DistributionDomainName', {
      value: cdnDistribution.domainName,
    });
  }
}
