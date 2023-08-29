import { MetadataRoute } from 'next'
import { projects } from '@/app/portfolio';

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  if(!process.env.APP_ORIGIN){
    throw new Error(`Env 'APP_ORIGIN' must be defined to generate a sitemap`);
  }

  return [
    {
      url: process.env.APP_ORIGIN,
      lastModified,
    },
    ...projects.map((project) => ({
      url: `${process.env.APP_ORIGIN}/project/${project.slug}`,
      lastModified
    })),
  ]
};