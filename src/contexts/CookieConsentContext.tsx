"use client";

import TextLink from '@/components/nav/TextLink';
import { clearConsentCookies } from '@/libs/debug';

import isPlainObject from 'lodash/isPlainObject';
import { ReactNode, createContext, useContext, useState } from "react";

const LOCALSTORAGE_KEY: Readonly<string> = 'cookieconsent';

if (process.env.NODE_ENV === 'production' ? false : clearConsentCookies) {
  console.log('Cookie consent cleared from local storage');
  clearLocalStorage();
}

const cookieDescriptions = {
  version: 1,
  cookieGroups: {
    spam: {
      name: 'Spam Protection',
      cookies: [
        {
          service: 'Google reRECAPTCHA',
          provider: 'Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland',
          purpose: 'Prevent bot spam from contact form submissions.',
          policy: <TextLink href="https://policies.google.com/privacy">https://policies.google.com/privacy</TextLink>,
          cookies: ['_grecaptcha'],
          duration: ['6 months'],
        }
      ]
    },
    analytics: {
      name: 'Analytics',
      cookies: [
        {
          service: 'Google Tag Manager',
          provider: 'Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland',
          purpose: 'Used in scripts and events.',
          policy: <TextLink href="https://policies.google.com/privacy">https://policies.google.com/privacy</TextLink>,
          cookies: ['_ga', '_gat', '_gid'],
          duration: ['2 years'],
        },
        {
          service: 'Google Analytics',
          provider: 'Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland',
          purpose: 'Used for statistical data how the visitor uses the website.',
          policy: <TextLink href="https://policies.google.com/privacy">https://policies.google.com/privacy</TextLink>,
          cookies: ['_ga', '_gat', '_gid'],
          duration: ['2 months'],
        }
      ]
    },
    media: {
      name: 'External Media',
      cookies: [
        {
          service: 'Youtube',
          provider: 'Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland',
          purpose: 'Used to display Youtube videos.',
          policy: <TextLink href="https://policies.google.com/privacy">https://policies.google.com/privacy</TextLink>,
          cookies: ['NID'],
          duration: ['6 months'],
        }
      ]
    }
  }
};

export const COOKIES: Readonly<typeof cookieDescriptions.cookieGroups> = cookieDescriptions.cookieGroups;

export type CookieKeys = keyof typeof COOKIES;

type CookieConsent = {
  [key in CookieKeys]: boolean;
};


function getDefaultCookieConsent(): CookieConsent {
  return Object.keys(COOKIES).reduce((a, b) => ({ ...a, [b]: false }), {} as CookieConsent);
}

interface CookieConsentContextInterface {
  hasConsent: () => boolean | undefined,
  getConsent: () => Readonly<CookieConsent>,
  setConsent: (cookieConsent: CookieConsent) => void,
  clearConsent: () => void,
}

const CookieConsentContext = createContext<CookieConsentContextInterface | null>(null);

export function useCookieConsentContext() {
  return useContext(CookieConsentContext);
}

export function CookieConsentContextProvider({ children }: { children: ReactNode }) {
  const [cookieConsent, setCookieConsent] = useState<CookieConsent | null>(loadFromLocalStorage() ?? null);

  const cookieConsentInterface: CookieConsentContextInterface = {
    hasConsent(): boolean | undefined {
      if (typeof localStorage === 'undefined') return;
      return cookieConsent != null;
    },
    getConsent(): CookieConsent {
      return cookieConsent ?? getDefaultCookieConsent();
    },
    setConsent(cookieConsent: CookieConsent) {
      saveToLocalStorage(cookieConsent);
      setCookieConsent(cookieConsent);
    },
    clearConsent() {
      clearLocalStorage();
      setCookieConsent(null);
    }
  };

  return (
    <CookieConsentContext.Provider value={cookieConsentInterface}>
      {children}
    </CookieConsentContext.Provider>
  );
}

// ######################## LOCAL STORAGE ############################

function loadFromLocalStorage(): CookieConsent | undefined {
  if (typeof localStorage === 'undefined') return;
  const loadedStr = localStorage.getItem(LOCALSTORAGE_KEY);
  if (loadedStr == null) return;
  try {
    const loadedObj = JSON.parse(loadedStr);
    if (!isPlainObject(loadedObj) ||
      !loadedObj.version || loadedObj.version !== cookieDescriptions.version ||
      !isPlainObject(loadedObj.consent)) {
      clearLocalStorage();
      return;
    }

    const loadedConsent = loadedObj.consent;

    const cookieConsent = getDefaultCookieConsent();
    for (const key of Object.keys(cookieConsent)) {
      const cookieKey = key as CookieKeys;
      if (loadedConsent[cookieKey]) {
        cookieConsent[cookieKey] = loadedConsent[cookieKey];
      }
    }
    return cookieConsent;
  } catch (e) {
    if (e instanceof SyntaxError) {
      clearLocalStorage();
      return;
    } else {
      throw e;
    }
  }
}

function saveToLocalStorage(cookieConsent: CookieConsent) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({
    version: cookieDescriptions.version,
    consent: cookieConsent
  }));
}

function clearLocalStorage() {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(LOCALSTORAGE_KEY);
}