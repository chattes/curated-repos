import type { Metadata } from 'next';
import SearchClient from './SearchClient';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search all curated GitHub repos and AI products by name, description, or tag.',
  alternates: { canonical: '/search' },
};

export default function SearchPage() {
  return <SearchClient />;
}
