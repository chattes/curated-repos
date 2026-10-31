'use client';

import { useState, useMemo } from 'react';
import { repos, allTags, getTagStats, slugify, type Repo } from '@/lib/data';
import Link from 'next/link';

function TagPill({ tag, active, onClick }: { tag: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`tag-pill ${active ? 'active' : ''}`}>
      {tag}
    </button>
  );
}

function RepoCard({ repo }: { repo: Repo }) {
  const tags = repo.tags.split(',').filter(Boolean);
  return (
    <Link href={`/repo/${slugify(repo.name)}`} className={`card ${repo.category}`}>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        {repo.category === 'featured' ? (
          <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold bg-amber-400/10 px-2 py-0.5 rounded">
            Featured
          </span>
        ) : (
          <span className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold bg-blue-400/10 px-2 py-0.5 rounded">
            Audience Pick
          </span>
        )}
        {repo.stars && <span className="text-xs text-zinc-500">⭐ {repo.stars}</span>}
        {repo.language && <span className="text-xs text-zinc-500">· {repo.language}</span>}
        {repo.license && <span className="text-xs text-zinc-500">· {repo.license}</span>}
      </div>
      <h3 className="font-semibold text-white mb-1.5 group-hover:text-blue-400 transition-colors">
        {repo.name}
      </h3>
      <p className="text-sm text-zinc-400 leading-relaxed mb-3">{repo.description}</p>
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
    </Link>
  );
}

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const tagStats = useMemo(() => getTagStats(), []);

  const filtered = useMemo(() => {
    return repos.filter((repo) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        repo.name.toLowerCase().includes(q) ||
        repo.description.toLowerCase().includes(q) ||
        repo.tags.toLowerCase().includes(q) ||
        repo.purpose.toLowerCase().includes(q);
      const matchesTags =
        activeTags.size === 0 ||
        repo.tags.split(',').some((t) => activeTags.has(t.trim()));
      return matchesSearch && matchesTags;
    });
  }, [search, activeTags]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Curated GitHub Repo Directory
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-base">
          Hand-picked open-source repos featuring AI agents, dev tools, scientific models, and more.
          Browse by tag, search, or dive into details.
        </p>
        <div className="flex justify-center gap-8 mt-6 text-sm text-zinc-500">
          <div>
            <span className="text-amber-400 font-bold">{repos.filter((r) => r.category === 'featured').length}</span> Featured
          </div>
          <div>
            <span className="text-blue-400 font-bold">{repos.filter((r) => r.category === 'audience').length}</span> Audience Picks
          </div>
          <div>
            <span className="text-zinc-300 font-bold">{allTags.length}</span> Tags
          </div>
        </div>
      </section>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search repos by name, description, or tag..."
          className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200
                     placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                     text-sm transition-colors"
        />
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h2 className="text-xs uppercase tracking-wider text-zinc-500 mb-3 font-semibold">
          Filter by Tag
        </h2>
        <div className="flex flex-wrap gap-2">
          {tagStats.map(({ tag, count }) => (
            <TagPill
              key={tag}
              tag={`${tag} · ${count}`}
              active={activeTags.has(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-zinc-500">
          No repos match your filters. Try different tags or search terms.
        </div>
      )}
    </>
  );
}