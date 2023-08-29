import { NextRequest, NextResponse } from "next/server";

import { handleRequest } from './handler';

import { GRECAPTCHA3_SECRET_KEY } from '@/libs/env';

export async function POST(req: NextRequest) {
  const res = await handleRequest({
    json() {
      return req.json();
    },
    headers: Object.fromEntries(req.headers.entries()),
  }, {
    grecaptchaSecretKey: GRECAPTCHA3_SECRET_KEY,
  });

  if (res.json) {
    return NextResponse.json(res.json, { status: res.status ?? 200 });
  } else {
    return new NextResponse(null, { status: res.status ?? 200 });
  }
}