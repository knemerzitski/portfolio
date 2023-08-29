import { NextRequest, NextResponse } from "next/server";

import { handleRequest } from './handler';

const _CONTACT_FORM_DISABLED = process.env.NEXT_PUBLIC_CONTACT_FORM_DISABLED?.trim();
const CONTACT_FORM_DISABLED = _CONTACT_FORM_DISABLED === 'true' || _CONTACT_FORM_DISABLED === '1';

export async function POST(req: NextRequest) {
  if (CONTACT_FORM_DISABLED) {
    return new NextResponse(null, { status: 503 });
  }

  const res = await handleRequest({
    json() {
      return req.json();
    },
    headers: Object.fromEntries(req.headers.entries()),
  }, {
    grecaptchaSecretKey: process.env.GRECAPTCHA3_SECRET_KEY,
  });

  if (res.json) {
    return NextResponse.json(res.json, { status: res.status ?? 200 });
  } else {
    return new NextResponse(null, { status: res.status ?? 200 });
  }
}