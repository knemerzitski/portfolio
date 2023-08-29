const debugging = process.env.NODE_ENV !== 'production';

/**
 * Quick way to disable all debugging options
 * @param val Value to be passed for debugging
 * @returns val or false if debugging is disabled
 */
function d(val: boolean): boolean {
  if(debugging) return val;
  return false;
}

// Always returns a successful response on verify, not spam
export const mockRecaptcha3 = d(true);

// Skips sending emails, return successful response that email was sent
export const mockSesEmails = d(true);

// On first request, consent cookies are cleared from localstorage
export const clearConsentCookies = d(false);