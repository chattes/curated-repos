import { repos, allTags, slugify } from '@/lib/data';
import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://repo-directory.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  // Tag pages
  for (const tag of allTags) {
    entries.push({
      url: `${BASE_URL}/tag/${tag}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  // Individual repo pages
  for (const repo of repos) {
    entries.push({
      url: `${BASE_URL}/repo/${slugify(repo.name)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  return entries;
}