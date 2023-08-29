import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  if(!process.env.APP_ORIGIN){
    throw new Error(`Env 'APP_ORIGIN' must be defined to generate robots.txt`);
  }

  return {
    rules: {
      userAgent: '*',
      disallow: ' ',
    },
    sitemap: `${process.env.APP_ORIGIN}/sitemap.xml`,
  }
}