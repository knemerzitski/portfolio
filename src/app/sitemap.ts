import { MetadataRoute } from 'next'
 

const APP_URL = process.env.APP_URL ?? 'https://knemerzitski.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: APP_URL,
      lastModified: new Date(),
    },
  ]
};