import type { Metadata } from 'next';
import Link from 'next/link';
import { repos, allTags, products } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Repo Directory — a hand-picked directory of open-source GitHub repos and AI products, curated from The Next New Thing tech reviews.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  const featured = repos.filter((r) => r.category === 'featured').length;
  const audience = repos.filter((r) => r.category === 'audience').length;

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold text-white tracking-tight mb-6">
        About Repo Directory
      </h1>

      <div className="space-y-5 text-zinc-300 text-sm leading-relaxed">
        <p>
          Repo Directory is a hand-picked collection of open-source GitHub repositories —
          AI agents, developer tools, scientific models, and more — plus a small section of
          AI products and SaaS tools. Today it lists {featured} featured repos, {audience}{' '}
          audience picks, {products.length} products, and {allTags.length} tags.
        </p>

        <h2 className="text-lg font-bold text-white pt-2">How repos are chosen</h2>
        <p>
          Every entry is curated from{' '}
          <a
            href="https://youtu.be/AWzzmrCPe-A"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Next New Thing
          </a>
          , a tech-review video series. Repos featured in a review are listed as{' '}
          <span className="text-amber-400 font-semibold">Featured</span>; repos suggested by
          viewers are listed as <span className="text-blue-400 font-semibold">Audience Picks</span>.
          Each repo page shows its description, star count, language, license, GitHub topics, and
          tags so you can judge it quickly before diving in.
        </p>

        <h2 className="text-lg font-bold text-white pt-2">Browsing the directory</h2>
        <p>
          Filter by tag on the home page, use the{' '}
          <Link href="/search" className="text-blue-400 hover:underline">
            search page
          </Link>{' '}
          to search across repos and products, or open any repo for details and a direct link to
          GitHub.
        </p>

        <h2 className="text-lg font-bold text-white pt-2">Built with</h2>
        <p>
          The site is a static Next.js app deployed on Vercel. Analytics, when enabled, use
          privacy-friendly Umami — no cookies, no personal data.
        </p>
      </div>

      <Link
        href="/"
        className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors mt-8 inline-block"
      >
        ← Back to directory
      </Link>
    </article>
  );
}
