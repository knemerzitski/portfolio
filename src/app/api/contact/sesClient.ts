import { SES_REGION } from '@/libs/env';
import { SESv2Client } from '@aws-sdk/client-sesv2';

const sesClient = new SESv2Client({ 
  region: SES_REGION, 
});

export { sesClient };