"use client";

import { CookieKeys, useCookieConsentContext } from "@/contexts/CookieConsentContext";
import { ReactNode, useEffect, useState } from "react";
import Button from "@/components/input/Button";
import classNames from 'classnames';

export default function ContentBlocker({
  children,
  className = '',
  cookieKey,
  enableText = 'Enable Content',
  header,
  fallback
}
  : {
    className?: string,
    children: ReactNode
    cookieKey: CookieKeys,
    enableText?: string,
    header: ReactNode,
    fallback?: ReactNode,
  }) {
  const cookieConsentContext = useCookieConsentContext();
  const [isManualEnabled, setIsManualEnabled] = useState(false);
  const [isCookieEnabled, setIsCookieEnabled] = useState(false);
  const [isJsDisabled, setIsJsDisabled] = useState(true);

  useEffect(() => {
    setIsJsDisabled(false);
  }, []);

  useEffect(() => {
    if (isManualEnabled) return;
    setIsCookieEnabled(cookieConsentContext?.getConsent()?.[cookieKey] ?? false);
  }, [cookieConsentContext, cookieKey, isManualEnabled]);

  return (
    (isManualEnabled || isCookieEnabled) ? children : (
      <div className={classNames(className, 'relative')}>
        <div className="absolute w-full h-full brightness-[.8]">{fallback}</div>
        <div className="absolute w-full h-full flex flex-col justify-between p-2">
          <span className={classNames(
            'self-start',
            '[text-shadow:1px_1px_rgba(0,0,0,0.8)]',
            'bg-primary-900/70 rounded-xs py-1 px-2'
          )}>{header}</span>

          {!isJsDisabled && (
            <Button className="self-center" onClick={() => setIsManualEnabled(true)}>{enableText}</Button>
          )}
        </div>
      </div>
    )
  );
}