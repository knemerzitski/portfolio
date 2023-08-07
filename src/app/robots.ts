import { APP_ORIGIN } from '@/libs/env'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: ' ',
    },
    sitemap: `${APP_ORIGIN}/sitemap.xml`,
  }
}