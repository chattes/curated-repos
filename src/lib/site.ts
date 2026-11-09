export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://repo-directory-gamma.vercel.app'
).replace(/\/+$/, '');

export const UMAMI_WEBSITE_ID =
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || '';
