import type { NextConfig } from "next";

// Permanent (308) redirects preserving every previously published /repo/<slug>
// URL after the SEO slug migration. Generated list: skills/yt-repo-scraper/scripts/slug_redirects.json
const repoSlugRedirects = [
    { source: "/repo/1-t3code", destination: "/repo/t3code", permanent: true },
    { source: "/repo/10-spec-kit", destination: "/repo/spec-kit", permanent: true },
    { source: "/repo/3-auto-ontology", destination: "/repo/auto-ontology", permanent: true },
    { source: "/repo/4-scrapling", destination: "/repo/scrapling", permanent: true },
    { source: "/repo/5-openmausbot", destination: "/repo/openmausbot", permanent: true },
    { source: "/repo/6-claude-mem", destination: "/repo/claude-mem", permanent: true },
    { source: "/repo/8-claude-code-game-studios", destination: "/repo/claude-code-game-studios", permanent: true },
    { source: "/repo/9-ziwei-doushu", destination: "/repo/ziwei-doushu", permanent: true },
    { source: "/repo/agent-desktop-desktop-control-for-coding-agents", destination: "/repo/agent-desktop", permanent: true },
    { source: "/repo/anthropic-skills-anthropic-s-own-skill-library", destination: "/repo/anthropic-skills", permanent: true },
    { source: "/repo/coreyhaines31-marketingskills", destination: "/repo/marketingskills", permanent: true },
    { source: "/repo/diwenne-openreply", destination: "/repo/openreply", permanent: true },
    { source: "/repo/ghostty-fast-native-terminal-app", destination: "/repo/ghostty", permanent: true },
    { source: "/repo/god-s-eye-view", destination: "/repo/gods-eye-view", permanent: true },
    { source: "/repo/impeccable-design-skill-for-coding-agents", destination: "/repo/impeccable-design-skill", permanent: true },
    { source: "/repo/interface-design-skills-design-review-skills-for-agents", destination: "/repo/interface-design-skills", permanent: true },
    { source: "/repo/jetbrains-thinkrail-jetbrains-desktop-app-for-agents", destination: "/repo/jetbrains-thinkrail", permanent: true },
    { source: "/repo/jknigel-valgist-ai-marketing-engine", destination: "/repo/valgist-ai-marketing-engine", permanent: true },
    { source: "/repo/leonxlnx-taste-skill", destination: "/repo/taste-skill", permanent: true },
    { source: "/repo/matt-pocock-s-skills", destination: "/repo/matt-pocock-skills", permanent: true },
    { source: "/repo/mvanhorn-last30days-skill", destination: "/repo/last30days-skill", permanent: true },
    { source: "/repo/opus-5-5-videos", destination: "/repo/opus-videos", permanent: true },
    { source: "/repo/production-skeleton-scaffolding-skills-for-agents", destination: "/repo/production-skeleton", permanent: true },
    { source: "/repo/samuraigpt-generative-media-skills", destination: "/repo/generative-media-skills", permanent: true },
    { source: "/repo/subvox-silent-speech-with-airpods", destination: "/repo/subvox", permanent: true },
    { source: "/repo/superpowers-working-method-for-coding-agents", destination: "/repo/superpowers-agent-skills", permanent: true },
    { source: "/repo/tinyhand-mac-cursor-toy-and-screen-annotation", destination: "/repo/tinyhand", permanent: true },
    { source: "/repo/tokensaver-token-saving-claude-codex-plugin", destination: "/repo/tokensaver", permanent: true },
    { source: "/repo/worktrunk-git-worktrees-for-parallel-agents", destination: "/repo/worktrunk", permanent: true },
];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return repoSlugRedirects;
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
