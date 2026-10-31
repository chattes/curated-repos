import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Repo Directory — Curated GitHub Repos',
    template: '%s — Repo Directory',
  },
  description:
    'Curated GitHub repository directory featuring AI agents, developer tools, open-source projects, and more. Searchable by tags. From The Next New Thing.',
  keywords: [
    'github', 'repos', 'ai', 'open source', 'developer tools', 'directory',
    'agent', 'machine learning', 'programming', 'curated',
  ],
  openGraph: {
    title: 'Repo Directory — Curated GitHub Repos',
    description:
      'Browse AI agents, dev tools, and open-source projects. Tag-filtered and searchable.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-200 antialiased min-h-screen">
        <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="font-bold text-lg text-white tracking-tight">
              📦 Repo Directory
            </a>
            <a
              href="https://youtu.be/AWzzmrCPe-A"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              From The Next New Thing →
            </a>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-zinc-800 text-center py-8 text-sm text-zinc-500">
          <p>
            Curated from{' '}
            <a
              href="https://youtu.be/AWzzmrCPe-A"
              className="text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Next New Thing
            </a>{' '}
            · Built with Next.js ·{' '}
            <a href="/sitemap.xml" className="text-blue-400 hover:underline">
              Sitemap
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}