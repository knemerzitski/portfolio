export const APP_ORIGIN =  process.env.APP_ORIGIN ?? 'https://www.knemerzitski.com';

// Contact form & Email sending
export const NEXT_PUBLIC_CONTACT_FORM_DISABLED =  isEnvVarTruthy(process.env.NEXT_PUBLIC_CONTACT_FORM_DISABLED, false);
export const SES_REGION =  process.env.SES_REGION ?? 'eu-west-1';
export const CONTACT_FROM_ADDRESS =  process.env.CONTACT_FROM_ADDRESS ?? 'contact@knemerzitski.com';
export const CONTACT_TO_ADDRESS =  process.env.CONTACT_TO_ADDRESS ?? 'kevin@knemerzitski.com';

// Grecaptcha, either both or none must be defined or client/server will be rendered out of sync

export const NEXT_PUBLIC_GRECAPTCHA3_SITE_KEY =  process.env.NEXT_PUBLIC_GRECAPTCHA3_SITE_KEY;
export const GRECAPTCHA3_SECRET_KEY =  process.env.GRECAPTCHA3_SECRET_KEY;

export const NEXT_PUBLIC_GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;


function isEnvVarTruthy(envVar: string | undefined, _default: boolean): boolean {
  if (envVar === undefined) return _default;
  envVar = envVar.trim();
  return envVar === 'true' || envVar === '1';
}