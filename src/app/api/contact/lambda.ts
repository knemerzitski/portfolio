/*global fetch*/
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { GetParameterCommand, GetParameterResult } from '@aws-sdk/client-ssm';

import { handleRequest } from './handler';

import { SSMClient } from '@aws-sdk/client-ssm';


const ssmClient = new SSMClient({
  region: process.env.SSM_REGION,
});

function createGetGrecaptcha3SecretKeyParameterCommand() {
  return new GetParameterCommand({
    Name: process.env.GRECAPTCHA_SECRET_KEY_STORE_PARAMETER_NAME,
    WithDecryption: true,
  });
}

export async function main(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  try {
    const headers = event.headers;
    const body = event.body;

    if (body) {
      const ssmCommand = createGetGrecaptcha3SecretKeyParameterCommand();
      const ssmRes = await ssmClient.send(ssmCommand) as GetParameterResult;

      const grecaptchaSecretKey = ssmRes.Parameter?.Value ?? '';
      if (!grecaptchaSecretKey) {
        throw Error(`Cloudn't fetch grecaptcaha secret key from parameter '${ssmCommand.input.Name}'`);
      }

      const res = await handleRequest({
        json() {
          return JSON.parse(body);
        },
        headers,
      }, {
        grecaptchaSecretKey: grecaptchaSecretKey,
      });
      if (res.json) {
        return {
          body: JSON.stringify(res.json),
          statusCode: res.status ?? 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      } else {
        return {
          statusCode: res.status ?? 200,
          body: '',
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      }
    }

    return {
      statusCode: 400,
      body: 'Bad Request',
    };
  } catch (error: any) {
    console.log(error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    }
  }
}