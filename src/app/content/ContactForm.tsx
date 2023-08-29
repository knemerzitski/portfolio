'use client';

import { ReactNode, useEffect, useState } from 'react';
import Card from '@/components/container/Card';
import TextLink from '@/components/nav/TextLink';
import { emailAddress } from '@/app/portfolio';
import { action as formAction, formSchema } from '@/app/api/contact/form';
import Form from '@/components/input/Form';
import { API_PATH } from '@/app/api/contact/handler';


const _CONTACT_FORM_DISABLED = process.env.NEXT_PUBLIC_CONTACT_FORM_DISABLED?.trim();
const CONTACT_FORM_DISABLED = _CONTACT_FORM_DISABLED === 'true' || _CONTACT_FORM_DISABLED === '1';

export default function ContactForm() {
  const [isJsDisabled, setIsJsDisabled] = useState(true);

  useEffect(() => {
    setIsJsDisabled(false);
  }, []);

  function handleSuccess(): string {
    return 'Thank you! I will respond as soon as possible.';
  }

  function handleError(code: string): ReactNode {
    console.log(`Contact form error code: ${code}`);

    const emailLink = (
      <TextLink className='font-bold' href={`mailto:${emailAddress}`}>
        {emailAddress}
      </TextLink>
    );

    switch (code) {
      case 'spam':
        return (
          <>
            Are you a real robot (spam)? Please email me directly at {emailLink}
          </>
        );
        break;
      default:
        return (
          <>
            Oops! Something went wrong. You can email me directly at {emailLink}
          </>
        );
    }
  }

  function renderStatusMessage() {
    if (CONTACT_FORM_DISABLED) {
      return (
        <>
          You can reach me via email&nbsp;
          <TextLink className='inline-block font-bold' href={`mailto:${emailAddress}`}>
            {emailAddress}
          </TextLink>
        </>
      );
    } else if (isJsDisabled) {
      return (
        <>
          This form only works with JavaScript to avoid spam.
          <br />
          You can reach me via email&nbsp;
          <TextLink className='inline-block font-bold' href={`mailto:${emailAddress}`}>
            {emailAddress}
          </TextLink>
        </>
      );
    }

    return (
      <>
        You can message me using the form below and I will respond as soon as possible.<br /><br />
      </>
    );
  }

  return (
    <>
      <div className="text-center mb-4 mx-1 xxs:mx-4 xs:mx-8 text-lg">
        <p className="pb-5">
          {renderStatusMessage()}
        </p>
      </div>

      {!CONTACT_FORM_DISABLED &&
        <Card>
          <Form
            action={formAction}
            schema={formSchema}
            apiPath={API_PATH}
            onSuccess={handleSuccess}
            onError={handleError}
            disabled={isJsDisabled}
          />
        </Card>
      }
    </>


  );
}