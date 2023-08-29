import { isEnabled, API_URL } from "./grecaptcha";

import TextLink from "@/components/nav/TextLink";
import Script, { ScriptProps } from "next/script";

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