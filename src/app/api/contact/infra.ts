import { NestedStack, NestedStackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { LambdaIntegration, IResource } from 'aws-cdk-lib/aws-apigateway';
import path from "path";

interface ApiStackProps extends NestedStackProps {
  apiResource: IResource,
}

export class ApiStack extends NestedStack {
  constructor(scope: Construct, id: string, { apiResource, ...props }: ApiStackProps) {
    super(scope, id, props);

    if(!process.env.GRECAPTCHA_SECRET_KEY_STORE_PARAMETER_NAME){
      throw new Error(`Env 'GRECAPTCHA_SECRET_KEY_STORE_PARAMETER_NAME' must be defined`);
    }
    if(!process.env.SES_REGION){
      throw new Error(`Env 'SES_REGION' must be defined`);
    }
    if(!process.env.SSM_REGION){
      throw new Error(`Env 'SSM_REGION' must be defined`);
    }
    if(!process.env.NODE_ENV){
      throw new Error(`Env 'NODE_ENV' must be defined`);
    }
    if(!process.env.CONTACT_FROM_ADDRESS){
      throw new Error(`Env 'CONTACT_FROM_ADDRESS' must be defined`);
    }
    if(!process.env.CONTACT_TO_ADDRESS){
      throw new Error(`Env 'CONTACT_TO_ADDRESS' must be defined`);
    }
    if (!process.env.NEXT_PUBLIC_GRECAPTCHA3_SITE_KEY) {
      throw new Error(`Env 'NEXT_PUBLIC_GRECAPTCHA3_SITE_KEY' must be defined`);
    }

    const lambda = new NodejsFunction(this, 'Lambda', {
      entry: path.join(__dirname, './lambda.ts'),
      runtime: Runtime.NODEJS_18_X,
      handler: 'main',
      logRetention: RetentionDays.ONE_DAY,
      bundling: {
        externalModules: ['@aws-sdk/*'],
        tsconfig: './infra/tsconfig.json',
        minify: true,
      },
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        SES_REGION: process.env.SES_REGION,
        SSM_REGION: process.env.SSM_REGION,
        CONTACT_FROM_ADDRESS: process.env.CONTACT_FROM_ADDRESS,
        CONTACT_TO_ADDRESS: process.env.CONTACT_TO_ADDRESS,
        NEXT_PUBLIC_GRECAPTCHA3_SITE_KEY: process.env.NEXT_PUBLIC_GRECAPTCHA3_SITE_KEY,
        GRECAPTCHA_SECRET_KEY_STORE_PARAMETER_NAME: process.env.GRECAPTCHA_SECRET_KEY_STORE_PARAMETER_NAME,
      },
    });

    apiResource.addMethod('POST', new LambdaIntegration(lambda, {
      requestTemplates: {
        'application/json': '{ "statusCode": "200" }'
      },
    }));

    const grecaptchaSecretKey = StringParameter.fromSecureStringParameterAttributes(this, 'GrecaptchaSecretKey', {
      parameterName: process.env.GRECAPTCHA_SECRET_KEY_STORE_PARAMETER_NAME,
    });
    grecaptchaSecretKey.grantRead(lambda);

    lambda.addToRolePolicy(new PolicyStatement({
      actions: ['ses:SendEmail', 'ses:SendRawEmail'],
      resources: ['*'],
      effect: Effect.ALLOW,
    }));
  }
}