import { allTags, getReposByTag, repoSlug } from '@/lib/data';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return allTags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  if (!allTags.includes(tag)) return { title: 'Tag not found' };
  const count = getReposByTag(tag).length;
  return {
    title: `${tag} repos`,
    description: `${count} GitHub repos tagged with "${tag}" — AI agents, developer tools, open source projects.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  if (!allTags.includes(tag)) notFound();
  const repos = getReposByTag(tag);

  return (
    <div className="max-w-6xl mx-auto">
      <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-6 inline-block">
        ← Back to directory
      </Link>

      <h1 className="text-2xl font-extrabold text-white mb-2">
        <span className="text-blue-400">#{tag}</span> repos
      </h1>
      <p className="text-zinc-400 mb-8">{repos.length} repos tagged with &ldquo;{tag}&rdquo;</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => {
          const tags = repo.tags.split(',').filter(Boolean);
          return (
            <Link key={repo.id} href={`/repo/${repoSlug(repo)}`} className={`card ${repo.category}`}>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {repo.category === 'featured' ? (
                  <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold bg-amber-400/10 px-2 py-0.5 rounded">Featured</span>
                ) : (
                  <span className="text-[10px] uppercase tracking-wider text-blue-400 font-semibold bg-blue-400/10 px-2 py-0.5 rounded">Audience Pick</span>
                )}
                {repo.stars && <span className="text-xs text-zinc-500">⭐ {repo.stars}</span>}
              </div>
              <h3 className="font-semibold text-white mb-1.5">{repo.name}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-3">{repo.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span key={t} className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    t === tag ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' : 'bg-zinc-800 text-zinc-400 border-zinc-700/50'
                  }`}>
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}