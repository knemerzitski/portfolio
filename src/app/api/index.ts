/**
 * Common API logic between serverless and next.js server
 * 
 *   api gateway     next.js server
 *        |                 |
 *    lambda.ts          route.ts
 *          \           /  
 *            handler.ts (ApiRequest) => ApiResponse
 */

export interface ApiRequest {
  json: () => Promise<any>,
  headers: ApiHeaders
}

export interface ApiHeaders {
  [name: string]: string | undefined;
}

export interface ApiResponse {
  json?: object,
  status?: number,
}