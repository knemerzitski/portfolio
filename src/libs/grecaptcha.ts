import { mockRecaptcha3 } from '@/libs/debug';
// import { NextRequest } from 'next/server';
import { ApiRequest } from '@/app/api';

interface Grecaptcha {
  ready: (callback: () => void) => void,
  execute: (siteKey: string, data: { action: string }) => Promise<string>,
}

declare const grecaptcha: Grecaptcha | undefined;

const SITE_KEY = process.env.NEXT_PUBLIC_GRECAPTCHA3_SITE_KEY;

const GOOD_SCORE = 0.3;
const VERIFY_URL = 'https://www.recaptcha.net/recaptcha/api/siteverify';
export const API_URL = `https://www.recaptcha.net/recaptcha/api.js?render=${SITE_KEY}`;

const MOCK_REQUESTS = process.env.NODE_ENV === 'production' ? false : mockRecaptcha3;
if (MOCK_REQUESTS) {
  console.log('grecaptcha', 'Mocking recaptcha requests');
}

export function isEnabled() {
  return SITE_KEY != null;
}

async function fetchVerify(payload: FormData) {
  if (MOCK_REQUESTS) {
    return {
      "success": true,
      "score": 0.9,
      "action": 'contactForm',
      "hostname": 'localhost',
    }
  } else {
    console.log('VERIFY_URL', VERIFY_URL);
    const res = await fetch(VERIFY_URL, {
      body: payload,
      method: 'POST',
    });

    // {
    //   "success": true|false,      // whether this request was a valid reCAPTCHA token for your site
    //   "score": number             // the score for this request (0.0 - 1.0)
    //   "action": string            // the action name for this request (important to verify)
    //   "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
    //   "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
    //   "error-codes": [...]        // optional
    // }
    return await res.json();
  }
}

export async function verify(req: ApiRequest, secretKey: string, token: any, action: string): Promise<boolean> {
  if (typeof token !== 'string') return false;

  const origin = req.headers['origin'];
  const hostname = origin ? new URL(origin).hostname : null;

  const payload = new FormData();
  payload.append('secret', secretKey);
  payload.append('response', token);

  // Get client's IP address from X-Forwarded-For header
  // X-Forwarded-For: client, proxy1, proxy2
  let forwardedFor = req.headers['x-forwarded-for'];
  if (forwardedFor) {
    const commaIndex = forwardedFor.indexOf(',');
    if (commaIndex !== -1) {
      forwardedFor = forwardedFor.substring(0, commaIndex);
    }
    if (forwardedFor) {
      payload.append('remoteip', forwardedFor);
    }
  }

  try {

    const resData = await fetchVerify(payload);
    console.log('grecaptcha', 'verify', resData);
    if (!resData.success) return false;

    if (resData.action && action && resData.action !== action) {
      console.log('grecaptcha', 'diff action', resData.action, action);
      return false;
    }
    if (resData.hostname && hostname && resData.hostname !== hostname) {
      console.log('grecaptcha', 'diff host', resData.hostname, hostname);
      return false;
    }
    if (resData.score != null && resData.score < GOOD_SCORE) {
      console.log('grecaptcha', 'bad score', resData.score, '<', GOOD_SCORE);
      return false;
    }
    return true;
  } catch (e) {
    // Skip spam check if recaptcha is not reachable from server
    if (e instanceof TypeError && e.message === 'fetch failed') {
      return true;
    } else {
      throw e;
    }
  }
}

export async function getToken(action: string): Promise<string | void> {
  if (typeof grecaptcha == 'undefined' || !SITE_KEY) {
    return Promise.resolve();
  }

  return new Promise((res, rej) => {
    grecaptcha.ready(async () => {
      try {
        if (MOCK_REQUESTS) {
          res('fake-token');
        } else {
          const token = await grecaptcha.execute(SITE_KEY, { action });
          res(token);
        }
      } catch (e) {
        rej(e);
      }
    });
  });
}