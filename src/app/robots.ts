import { MetadataRoute } from 'next'

const APP_URL = process.env.APP_URL ?? 'https://knemerzitski.com';
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: ' ',
    },
    sitemap: `${APP_URL}/sitemap.xml`,
  }
}