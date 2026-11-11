import { repos, getRepoBySlug, repoSlug, type Repo } from '@/lib/data';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return repos.map((r) => ({ slug: repoSlug(r) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const repo = getRepoBySlug(slug);
  if (!repo) return { title: 'Not found' };
  return {
    title: repo.name,
    description: repo.description,
    openGraph: {
      title: `${repo.name} — Repo Directory`,
      description: repo.description,
    },
  };
}

export default async function RepoPage({ params }: Props) {
  const { slug } = await params;
  const repo = getRepoBySlug(slug);
  if (!repo) notFound();

  const tags = repo.tags.split(',').filter(Boolean);

  return (
    <article className="max-w-3xl mx-auto">
      <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-6 inline-block">
        ← Back to directory
      </Link>

      <div className="card !p-0 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {repo.category === 'featured' ? (
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold bg-amber-400/10 px-2.5 py-1 rounded">
                Featured
              </span>
            ) : (
              <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold bg-blue-400/10 px-2.5 py-1 rounded">
                Audience Pick
              </span>
            )}
            {repo.stars && <span className="text-sm text-zinc-500">⭐ {repo.stars} stars</span>}
            {repo.language && <span className="text-sm text-zinc-500">· {repo.language}</span>}
            {repo.license && <span className="text-sm text-zinc-500">· {repo.license}</span>}
          </div>

          <h1 className="text-2xl font-extrabold text-white mb-2">{repo.name}</h1>
          <p className="text-zinc-400">{repo.description}</p>

          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm bg-zinc-800 hover:bg-zinc-700 text-white
                       px-4 py-2 rounded-lg transition-colors"
          >
            View on GitHub ↗
          </a>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              🎯 What it does
            </h2>
            <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
              {repo.purpose}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              🛠️ How to use
            </h2>
            <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
              {repo.how_to_use}
            </div>
          </section>

          {repo.topics && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                📋 GitHub Topics
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {repo.topics.split(',').filter(Boolean).map((topic) => (
                  <span key={topic} className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                    {topic}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              🏷️ Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link key={tag} href={`/tag/${tag}`} className="tag-pill">
                  {tag}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}