'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { repos, products, repoSlug } from '@/lib/data';

export default function SearchClient() {
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();

  const repoResults = useMemo(() => {
    if (!q) return repos;
    return repos.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.toLowerCase().includes(q) ||
        r.purpose.toLowerCase().includes(q)
    );
  }, [q]);

  const productResults = useMemo(() => {
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.tagline || '').toLowerCase().includes(q) ||
        p.tags.toLowerCase().includes(q)
    );
  }, [q]);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Search</h1>
      <p className="text-zinc-400 text-sm mb-6">
        Search {repos.length} repos and {products.length} products by name, description, or tag.
      </p>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search..."
        autoFocus
        className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200
                   placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                   text-sm transition-colors mb-8"
      />

      {q && (
        <p className="text-xs text-zinc-500 mb-4">
          {repoResults.length + productResults.length} result
          {repoResults.length + productResults.length === 1 ? '' : 's'} for &ldquo;{query}&rdquo;
        </p>
      )}

      {repoResults.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-wider text-zinc-500 mb-3 font-semibold">
            Repos
          </h2>
          <ul className="space-y-2">
            {repoResults.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/repo/${repoSlug(r)}`}
                  className="block px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors"
                >
                  <span className="font-semibold text-white text-sm">{r.name}</span>
                  {r.stars && <span className="text-xs text-zinc-500 ml-2">⭐ {r.stars}</span>}
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{r.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {productResults.length > 0 && (
        <section>
          <h2 className="text-xs uppercase tracking-wider text-zinc-500 mb-3 font-semibold">
            Products
          </h2>
          <ul className="space-y-2">
            {productResults.map((p) => (
              <li key={p.id}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors"
                >
                  <span className="font-semibold text-white text-sm">{p.name}</span>
                  <span className="text-xs text-zinc-500 ml-2">↗</span>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                    {p.description || p.tagline}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {q && repoResults.length === 0 && productResults.length === 0 && (
        <div className="text-center py-16 text-zinc-500 text-sm">
          Nothing matches &ldquo;{query}&rdquo;. Try a different term.
        </div>
      )}
    </div>
  );
}
