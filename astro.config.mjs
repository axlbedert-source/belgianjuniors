// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://belgianjuniors.be',
  trailingSlash: 'ignore',
  // The CSS is small, so inline it: no render-blocking stylesheet requests.
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap()],
  // English only for now. To add Dutch or French later: add 'nl' / 'fr' here,
  // add their strings in src/i18n/ui.ts and put translated pages under src/pages/nl/ etc.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: { prefixDefaultLocale: false },
  },
  // Old Grav URLs that changed. Blog post URLs (/blog/day1 … /blog/day15) are unchanged.
  redirects: {
    '/home': '/',
    '/blog/page/1': '/blog',
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Archivo',
      cssVariable: '--font-display',
      weights: ['600', '800'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Arial', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Source Sans 3',
      cssVariable: '--font-body',
      weights: ['400', '600'],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});
