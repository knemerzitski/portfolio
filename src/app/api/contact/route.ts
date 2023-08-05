import getDebugNamespace from 'debug';

import { NextRequest, NextResponse } from "next/server";
import { SendEmailCommand } from '@aws-sdk/client-sesv2';
import { sesClient } from "./sesClient";

import { isServerEnabled as isRecaptchaEnabled, verify as recaptchaVerify } from "@/libs/grecaptcha";
import { parseSchema, validate } from "@/libs/validation";
import { isEnvVarTruthy } from "@/libs/env";
import { action as formAction, formSchema } from "./form";
import { mockSesEmails } from '@/libs/debug';

const debug = getDebugNamespace('contact');

const FROM_ADDRESS = process.env.CONTACT_FROM_ADDRESS ?? 'contact@knemerzitski.com';
const TO_ADDRESS = process.env.CONTACT_TO_ADDRESS ?? 'kevin@knemerzitski.com';

const DISABLED: boolean = isEnvVarTruthy(process.env.NEXT_PUBLIC_CONTACT_FORM_DISABLED, false);
const MOCK_SES = process.env.NODE_ENV === 'production' ? false : mockSesEmails;
if (MOCK_SES) {
  debug('Mocking ses requests');
}

export async function POST(req: NextRequest) {
  // Disabled
  if (DISABLED) {
    return new NextResponse(null, { status: 503 })
  }

  // Validate json syntax
  let data: any = null;
  try {
    data = await req.json();
  } catch (e: unknown) {
    if (e instanceof SyntaxError) {
      debug('JSON', e);
      return NextResponse.json({
        success: false,
        code: 'not-json',
      }, { status: 400 });
    } else {
      throw e;
    }
  }
  debug(data);

  // Spam protection
  if (isRecaptchaEnabled()) {
    const isHuman = await recaptchaVerify(req, data.token, formAction);
    debug('spam', !isHuman);
    if (!isHuman) {
      return NextResponse.json({
        success: false,
        code: 'spam',
      }, { status: 400 });
    }
  }

  const formData = data.form;

  // Validate form
  const validationErrors = validate(formData, parseSchema(formSchema));
  if (validationErrors) {
    return NextResponse.json({
      success: false,
      code: 'validation-error',
      error: validationErrors,
    }, { status: 422 });
  }

  const contactForm = {
    name: formData.fullName.trim(),
    email: formData.email.trim(),
    message: formData.message.trim(),
  };

  // Prepare email
  const sendEmailCommand = createSendEmailCommand(contactForm);

  try {
    // Send email
    if (MOCK_SES) {
      const result = {
        "MOCK_SES_RESULT": true,
        "$metadata": {
          "httpStatusCode": 200,
          "requestId": "98d...",
          "attempts": 1,
          "totalRetryDelay": 0
        },
        "MessageId": "010..."
      }
      debug(result);
    } else {
      const result = await sesClient.send(sendEmailCommand);
      // const result = {
      //     "$metadata": {
      //         "httpStatusCode": 200,
      //         "requestId": "98dcbc04-...",
      //         "attempts": 1,
      //         "totalRetryDelay": 0
      //     },
      //     "MessageId": "01020189791759bc-..."
      //  }
      debug(result);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    // const err = {
    //   "tryNextLink": false,
    //   "name": "CredentialsProviderError",
    //   "$metadata": {
    //       "attempts": 1,
    //       "totalRetryDelay": 0
    //   }
    // }
    debug(err);
    return NextResponse.json({
      success: false,
      code: 'email-error',
    }, { status: 503 });
  }
}

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sesv2/classes/sendemailcommand.html
function createSendEmailCommand(
  {
    name,
    email,
    message
  }: {
    name: string,
    email: string,
    message: string,
  }) {

  return new SendEmailCommand({
    FromEmailAddress: FROM_ADDRESS,
    Destination: {
      ToAddresses: [
        TO_ADDRESS
      ],
    },
    ReplyToAddresses: [
      email
    ],
    Content: {
      Simple: {
        Subject: {
          Data: name,
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: `From: ${name} <${email}>\n\nMessage:\n\n${message}`,
            Charset: "UTF-8",
          },
        }
      },
    },
  });
};

