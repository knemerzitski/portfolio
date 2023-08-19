"use client";


import Button, { SecondaryButton } from "@/components/input/Button";
import { CheckBox } from "@/components/input/CheckBox";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import Modal, { ModalProps } from "@/components/container/Modal";
import { COOKIES, useCookieConsentContext } from "@/contexts/CookieConsentContext";
import Accordion from "@/components/nav/Accordion";
import { ModalTemplate, useModalsContext } from "@/contexts/ModalsContext";
import TextLink from "@/components/nav/TextLink";
import { useHashContext } from "@/contexts/HashContext";



export const COOKIE_CONSENT_MODAL_HASH = '#cookieconsent';

export function NewVisitorOpenCookieConsentModal() {
  const hasModalOpenedRef = useRef(false);
  const cookieConsentContext = useCookieConsentContext();
  const modalsContext = useModalsContext();
  const hashContext = useHashContext();

  // Open SmallCookieConsentModal once 
  useEffect(() => {
    if (!modalsContext) return;

    const hasConsent = cookieConsentContext?.hasConsent() ?? false;

    if (!hasConsent && !hasModalOpenedRef.current) {
      hasModalOpenedRef.current = true;
      modalsContext.openModal({
        props: {
          overlayCloseable: false,
        },
        sticky: true,
        modal: SmallCookieConsentModal
      });
    }
  }, [cookieConsentContext, modalsContext]);

  // Disable opening cookie consent modal from hash while inital consent hasn't been given
  useEffect(() => {
    if (!hashContext) return;

    const hasConsent = cookieConsentContext?.hasConsent() ?? false;

    if (!hashContext.isPaused() && !hasConsent) {
      hashContext.disable(COOKIE_CONSENT_MODAL_HASH);
      hashContext.pause();
    } else if (hashContext.isPaused() && hasConsent) {
      hashContext.enable(COOKIE_CONSENT_MODAL_HASH);
      hashContext.resume();
    }

  }, [hashContext, cookieConsentContext]);

  return null;
}

export function HashTaskOpenCookieConsentModal() {
  const hashContext = useHashContext();
  const addedRef = useRef(false);
  const modalsContext = useModalsContext();

  useEffect(() => {
    if (addedRef.current || !modalsContext || !hashContext) return;
    addedRef.current = true;

    const template: ModalTemplate = {
      props: {
        overlayCloseable: true,
        onClose() {
          hashContext.end(COOKIE_CONSENT_MODAL_HASH);
        }
      },
      modal: CookieConsentModal,
    };

    hashContext.set(COOKIE_CONSENT_MODAL_HASH, {
      start() {
        modalsContext.openModal(template);
      },
      end() {
        modalsContext.closeModal(template);
      }
    });
  }, [hashContext, modalsContext]);

  return null;
}

export function SmallCookieConsentModal({
  onClose = () => { },
  ...restProps
}: ModalProps) {
  const modalsContext = useModalsContext();
  const cookieConsentContext = useCookieConsentContext();
  const cookieConsent = cookieConsentContext?.getConsent();

  function handleDetails() {
    onClose();
    if (modalsContext) {
      modalsContext.openModal({
        props: {
          overlayCloseable: false,
        },
        sticky: true,
        modal: CookieConsentModal
      });
    }
  }

  function setCookieConsent(accept: boolean) {
    if (cookieConsentContext && cookieConsent) {
      const consent = { ...cookieConsent };
      for (const k of Object.keys(consent)) {
        consent[k as keyof typeof cookieConsent] = accept;
      }
      cookieConsentContext.setConsent(consent);
    }
  }

  function handleReject() {
    onClose();
    setCookieConsent(false);
  }

  function handleAcceptAll() {
    onClose();
    setCookieConsent(true);
  }

  return (
    <Modal
      className="max-w-lg flex flex-col"
      overlay={false}
      position="bottom-left"
      onClose={onClose}
      {...restProps}>
      <div className="text-xl font-medium mb-2">
        Cookies Consent
      </div>
      <p className="mb-6">
        I use cookies on my website.
      </p>
      <div className="flex flex-col xs:flex-row justify-end gap-4 xs:gap-6">
        <SecondaryButton onClick={handleDetails}>Details</SecondaryButton>
        <SecondaryButton onClick={handleReject}>Reject</SecondaryButton>
        <Button className="whitespace-nowrap" onClick={handleAcceptAll}>Accept all</Button>
      </div>
    </Modal>
  );
}

export default function CookieConsentModal({
  onClose = () => { },
  ...restProps
}: ModalProps) {
  const acceptedAllCookiesRef = useRef<boolean>(false);

  const cookieConsentContext = useCookieConsentContext();

  const cookieConsent = cookieConsentContext?.getConsent();

  function handleConsentSubmit(e: FormEvent) {
    e.preventDefault();

    if (cookieConsentContext != null) {
      const form = e.target as HTMLFormElement;
      const hasAcceptedAll = acceptedAllCookiesRef.current;

      // Update cookie consent
      const cookieConsent = { ...cookieConsentContext.getConsent() };
      for (const key of Object.keys(cookieConsent)) {
        const cookieKey = key as keyof typeof cookieConsent;

        if (hasAcceptedAll) {
          cookieConsent[cookieKey] = true;
        } else {
          const input = form[cookieKey];
          if (input instanceof HTMLInputElement) {
            cookieConsent[cookieKey] = input.checked;
          } else {
            cookieConsent[cookieKey] = false;
          }
        }
      }
      cookieConsentContext.setConsent(cookieConsent);
    }

    onClose();
  }

  function getCookieConsentValue(key: string): boolean {
    if (!cookieConsent) return false;
    if (key in cookieConsent) {
      const cookieKey = key as keyof typeof cookieConsent;
      return cookieConsent[cookieKey];
    }
    return false;
  }

  return (
    <Modal className="max-w-lg flex flex-col" overlay={true} position="top" onClose={onClose} {...restProps}>
      <div className="text-2xl font-medium mb-2">
        Cookies Consent
      </div>
      <p className="mb-4">
        I use cookies to prevent spam and analyze site usage.
      </p>
      <form onSubmit={handleConsentSubmit} className="grow flex flex-col justify-between">
        <div>
          <div className="flex gap-8 flex-wrap mb-6">
            {Object.entries(COOKIES).map(([key, cookie]) => (
              <div key={key} className="flex items-center">
                <CheckBox name={key} label={cookie.name} defaultChecked={getCookieConsentValue(key)} />
              </div>
            ))}
          </div>

          <ul className="space-y-4">
            {Object.entries(COOKIES).map(([key, cookieGroup]) => (
              <li key={key}>
                <Accordion label={cookieGroup.name}>
                  <div className="space-y-4">
                    {cookieGroup.cookies.map((cookie, index) => (
                      <table key={index} className="table-auto w-full bg-primary-600 rounded-sm shadow-dp4 shadow-shadow/50">
                        <tbody className="divide-y divide-primary-50">
                          {Object.entries(cookie).map(([name, value]) => (
                            <tr key={name}>
                              <th className="py-2 pl-2 capitalize font font-normal">{name}</th>
                              <td className="w-full break-words max-w-0 py-2 pl-4 pr-2">{Array.isArray(value) ? value.join(', ') : value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ))}
                  </div>
                </Accordion>
              </li>
            ))}
          </ul>

        </div>


        <div className="flex flex-col xs:flex-row justify-end gap-6 mt-12">
          <SecondaryButton type="submit" onClick={() => acceptedAllCookiesRef.current = false}>Save</SecondaryButton>
          <Button type="submit" onClick={() => acceptedAllCookiesRef.current = true}>Accept all</Button>
        </div>
      </form>
    </Modal>
  );
}

export function CookieConsentLink({ children, className = '' }: { children: ReactNode, className?: string }) {
  const [isJsDisabled, setIsJsDisabled] = useState(true);

  useEffect(() => {
    setIsJsDisabled(false);
  }, []);


  return (
    !isJsDisabled && <>
      <TextLink className={className} href={COOKIE_CONSENT_MODAL_HASH}>{children}</TextLink>
    </>
  );
}

