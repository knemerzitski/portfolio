import { APP_ORIGIN } from '@/libs/env'
import { MetadataRoute } from 'next'
 

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: APP_ORIGIN,
      lastModified: new Date(),
    },
  ]
};