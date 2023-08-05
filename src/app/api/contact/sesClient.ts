import { SESv2Client } from '@aws-sdk/client-sesv2';

const REGION = process.env.SES_REGION ?? 'eu-west-1';

const sesClient = new SESv2Client({ 
  region: REGION, 
});

export { sesClient };