'use client';

import { useState } from 'react';
import { products, allProductTags, slugify, type Product, repos } from '@/lib/data';
import Link from 'next/link';

function ProductCard({ product }: { product: Product }) {
  const tags = product.tags.split(',').filter(Boolean);
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card audience block"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] uppercase tracking-wider text-green-400 font-semibold bg-green-400/10 px-2 py-0.5 rounded">
          Product
        </span>
      </div>
      <h3 className="font-semibold text-white mb-1.5">{product.name}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed mb-3">{product.description || product.tagline}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span
            key={t}
            className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/50"
          >
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function ProductsSection() {
  const [search, setSearch] = useState('');
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.tagline || '').toLowerCase().includes(q) ||
      p.tags.toLowerCase().includes(q);
    const matchesTags =
      activeTags.size === 0 ||
      p.tags.split(',').some((t) => activeTags.has(t.trim()));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  };

  return (
    <section className="mt-12 pt-8 border-t border-zinc-800">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-extrabold text-white mb-2">🚀 AI Products & Tools</h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm">
          Curated AI products, SaaS tools, and startups featured in tech reviews.
        </p>
        <div className="text-sm text-zinc-500 mt-2">
          <span className="text-green-400 font-bold">{products.length}</span> products
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200
                     placeholder-zinc-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
                     text-sm transition-colors"
        />
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {allProductTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`tag-pill ${activeTags.has(tag) ? 'active' : ''}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-zinc-500 text-sm">
          No products match your filters.
        </div>
      )}
    </section>
  );
}