"use client";

import Script from "next/script";
import { NEXT_PUBLIC_GTM_ID } from "./env";
import { useEffect, useRef, useState } from "react";
import { useCookieConsentContext } from "@/contexts/CookieConsentContext";

type WindowWithDataLayer = Window & {
  dataLayer?: any[]
}

declare const window: WindowWithDataLayer;


const GTM_ID = NEXT_PUBLIC_GTM_ID;

export function isEnabled() {
  return GTM_ID != null;
}

export function GoogleTagManagerScript() {
  const cookieConsentContext = useCookieConsentContext();
  const [hasAnalyticsConsent, setHasAnalyticsConsent] = useState(false);
  const pushGtmStartOnceRef = useRef(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !isEnabled()) return;

    window.dataLayer = window.dataLayer || [];

    if(!pushGtmStartOnceRef.current) return;
    pushGtmStartOnceRef.current = false;

    console.log('dataLayer pushed gtm.start');
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  }, []);

  useEffect(() => {
    setHasAnalyticsConsent(cookieConsentContext?.getConsent()?.analytics ?? false);
  }, [cookieConsentContext]);

  return (hasAnalyticsConsent && <ScriptInjector />);
}

function ScriptInjector() {
  if (isEnabled()) {
    console.log('gtm enabled');
    return (
      <>
        <Script id="google-tag-manager" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `
        }} />
        {/* This code never runs due to consent requiring javascript. Must use cookies for consent for this to work */}
        <noscript dangerouslySetInnerHTML={{
          __html: `
          <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
          height="0" width="0" style="display:none;visibility:hidden"></iframe><>
        `
        }} />
      </>
    );
  }else{
    console.log('gtm disabled');
  }
  return <></>;
}