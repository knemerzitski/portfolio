import { SendEmailCommand } from '@aws-sdk/client-sesv2';

import { isEnabled as isRecaptchaEnabled, verify as recaptchaVerify } from "@/libs/grecaptcha";
import { parseSchema, validate } from "@/libs/validation";
import { action as formAction, formSchema } from "./form";
import { mockSesEmails } from '@/libs/debug';
import { CONTACT_FROM_ADDRESS, CONTACT_TO_ADDRESS, NEXT_PUBLIC_CONTACT_FORM_DISABLED } from '@/libs/env';
import { ApiRequest, ApiResponse } from '@/app/api';
import { SES_REGION } from '@/libs/env';
import { SESv2Client } from '@aws-sdk/client-sesv2';

const sesClient = new SESv2Client({
  region: SES_REGION,
});

const MOCK_SES = process.env.NODE_ENV === 'production' ? false : mockSesEmails;
if (MOCK_SES) {
  console.log('contact', 'Mocking ses requests');
}

export const API_PATH = 'api/contact';

export async function handleRequest(req: ApiRequest, {
  grecaptchaSecretKey
}: {
  grecaptchaSecretKey: string | undefined,
}): Promise<ApiResponse> {
  console.log('contact', req);
  // Disabled
  if (NEXT_PUBLIC_CONTACT_FORM_DISABLED) {
    return { status: 503 };
  }

  // Validate json syntax
  let data: any = null;
  try {
    data = await req.json();
  } catch (e: unknown) {
    if (e instanceof SyntaxError) {
      console.log('contact', 'JSON', e);
      return {
        json: {
          success: false,
          code: 'not-json',
        },
        status: 400,
      };
    } else {
      throw e;
    }
  }
  console.log('contact', data);

  // Spam protection
  if (isRecaptchaEnabled() && grecaptchaSecretKey) {
    const isHuman = await recaptchaVerify(req, grecaptchaSecretKey, data.token, formAction);
    console.log('contact', 'spam', !isHuman);
    if (!isHuman) {
      return {
        json: {
          success: false,
          code: 'spam',
        }
      };
    }
  }

  const formData = data.form;

  // Validate form
  const validationErrors = validate(formData, parseSchema(formSchema));
  if (validationErrors) {
    return {
      json: {
        success: false,
        code: 'validation-error',
        error: validationErrors,
      }
    };
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
      console.log('contact', result);
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
      console.log('contact', result);
    }

    return {
      json: {
        success: true,
      }
    };
  } catch (err) {
    // const err = {
    //   "tryNextLink": false,
    //   "name": "CredentialsProviderError",
    //   "$metadata": {
    //       "attempts": 1,
    //       "totalRetryDelay": 0
    //   }
    // }
    console.log('contact', err);
    return {
      json: {
        success: false,
        code: 'email-error',
      }
    };
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
    FromEmailAddress: CONTACT_FROM_ADDRESS,
    Destination: {
      ToAddresses: [
        CONTACT_TO_ADDRESS
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

