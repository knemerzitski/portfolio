import { APP_ORIGIN } from '@/libs/env'
import { MetadataRoute } from 'next'
import { projects } from '@/app/portfolio';

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: APP_ORIGIN,
      lastModified,
    },
    ...projects.map((project) => ({
      url: `${APP_ORIGIN}/project/${project.slug}`,
      lastModified
    })),
  ]
};