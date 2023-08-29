# Kevin Nemeržitski Portfolio

Project of my portfolio website. Showcases my bigger projects and has a contact form.

## Prerequisites
- Registered domain in Route53
- ACM Certificate in region `us-east-1` for CloudFront
- Accessible email address for using with SES
- reCATPCHA v3 site and secret key
- Store paremeter in ASM for reCAPTCHA secret key
- Google Analytics GTM-ID

## How To
- Set environment variables in `.env.local` or `.env.production.local` (examples 
[.env.local.example](.env.local.example), [.env.production.local.example](.env.production.local.example))
- Update `expectedHost` in CloudFront Function [cloudfront-viewer-request.js](infra/resources/cloudfront-viewer-request.js?plain=1#L24)
### Build
`npm run build` to export app in [out](out) directory
### Run
`npm run dev` or `npm run start` after build to start the website locally
### Deploy
`npm run deploy` to deploy the website to AWS using CDK

## Keywords
- Next.js
- HTML
- CSS
- TypeScript 
- Tailwindcss
- AWS (CDK, CloudFront, API Gateway, Lambda, S3, SES)
- Google reCaptcha v3
- Google Analytics
- Docker


