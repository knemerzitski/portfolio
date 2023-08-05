import getDebugNamespace from 'debug';

import TextLink from "@/components/nav/TextLink";
import Script, { ScriptProps } from "next/script";
import { mockRecaptcha3 } from '@/libs/debug';
import { NextRequest } from 'next/server';

interface Grecaptcha {
  ready: (callback: () => void) => void,
  execute: (siteKey: string, data: { action: string }) => Promise<string>,
}

const debug = getDebugNamespace('grecaptcha');

declare const grecaptcha: Grecaptcha | undefined;


const SITE_KEY = process.env.NEXT_PUBLIC_GRECAPTCHA3_SITE_KEY;
const SECRET_KEY = process.env.GRECAPTCHA3_SECRET_KEY;

const GOOD_SCORE = 0.5;
const VERIFY_URL = 'https://www.recaptcha.net/recaptcha/api/siteverify';
const API_URL = `https://www.recaptcha.net/recaptcha/api.js?render=${SITE_KEY}`;

// Both site and secret keys must be defined together or there will be hydration errors
if (SITE_KEY && !SECRET_KEY || !SITE_KEY && SECRET_KEY) {
  debug(`[Grecaptcha] Keys not defined together. This will lead to hydration errors. (SITE_KEY: ${SITE_KEY ? 'defined' : 'empty'}, SECRET_KEY: ${SECRET_KEY ? 'defined' : 'empty'})`);
}

const MOCK_REQUESTS = process.env.NODE_ENV === 'production' ? false : mockRecaptcha3;
if (MOCK_REQUESTS) {
  debug('Mocking recaptcha requests');
}

export function isEnabled() {
  return SITE_KEY != null;
}

export function isServerEnabled() {
  return SITE_KEY != null && SECRET_KEY != null;
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

export async function verify(req: NextRequest, token: any, action: string): Promise<boolean> {
  if (!SECRET_KEY || typeof token !== 'string') return false;

  const origin = req.headers.get('origin');
  const hostname = origin ? new URL(origin).hostname : null;

  const payload = new FormData();
  payload.append('secret', SECRET_KEY);
  payload.append('response', token);

  // Get client's IP address from X-Forwarded-For header
  // X-Forwarded-For: client, proxy1, proxy2
  let forwardedFor = req.headers.get('x-forwarded-for');
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
    debug('verify', resData);
    if (!resData.success) return false;

    if (resData.action && action && resData.action !== action) {
      debug('diff action', resData.action, action);
      return false;
    }
    if (resData.hostname && hostname && resData.hostname !== hostname) {
      debug('diff host', resData.hostname, hostname);
      return false;
    }
    if (resData.score != null && resData.score < GOOD_SCORE) {
      debug('bad score', resData.score, '<', GOOD_SCORE);
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

// Code to enable waiting for api script to be loaded via await/async
let apiScriptPromiseCallbacks: {
  resolve: (value?: unknown) => void,
  reject: (reason?: any) => void
} | null = null;

const apiScriptPromise = new Promise((resolve, reject) => {
  apiScriptPromiseCallbacks = { resolve, reject };
});

function handleApiScriptLoaded() {
  if (!apiScriptPromiseCallbacks) {
    throw new Error('Api script promise has not started');
  }
  apiScriptPromiseCallbacks.resolve();
}

function handleApiScriptError(e: Error) {
  if (!apiScriptPromiseCallbacks) {
    throw new Error('Api script promise has not started');
  }
  apiScriptPromiseCallbacks.reject(e);
}

export function apiScriptLoadedPromise() {
  return apiScriptPromise;
}

export function ApiScript({ onLoad, ...restProps }: ScriptProps) {
  if (isEnabled()) {
    return <Script strategy="lazyOnload" src={API_URL} {...restProps} onLoad={handleApiScriptLoaded} onError={handleApiScriptError}></Script>;
  }
  return <></>;
}


export function BrandingVisiblity({ className = '' }: { className: string }) {
  if (isEnabled()) {
    return (
      <div className={className}>
        This site is protected by reCAPTCHA and the Google&nbsp;
        <TextLink href="https://policies.google.com/privacy">Privacy Policy</TextLink> and&nbsp;
        <TextLink href="https://policies.google.com/terms">Terms of Service</TextLink> apply.
      </div>
    );
  }
  return <></>;
}