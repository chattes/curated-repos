import reposData from '@/data/repos.json';
import tagsIndex from '@/data/tags.json';

export interface Repo {
  id: number;
  name: string;
  url: string;
  category: 'featured' | 'audience';
  yt_summary: string;
  description: string;
  purpose: string;
  how_to_use: string;
  tags: string;
  stars: string;
  language: string;
  topics: string;
  license: string;
}

export const repos: Repo[] = reposData as Repo[];

export const allTags: string[] = Object.keys(tagsIndex).sort();

export function getRepoBySlug(slug: string): Repo | undefined {
  return repos.find((r) => slugify(r.name) === slug);
}

export function getReposByTag(tag: string): Repo[] {
  const names = new Set((tagsIndex as Record<string, string[]>)[tag] || []);
  return repos.filter((r) => names.has(r.name));
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getTagStats(): { tag: string; count: number }[] {
  return allTags
    .map((tag) => ({ tag, count: (tagsIndex as Record<string, string[]>)[tag].length }))
    .sort((a, b) => b.count - a.count);
}