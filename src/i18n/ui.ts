// All interface text lives here, so a Dutch or French version only needs new entries.
// Blog posts and page copy stay in their own Markdown/Astro files.
export const languages = { en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'site.name': 'Belgian Junior Gliding Team',
    'site.line1': 'Belgian Junior',
    'site.line2': 'Gliding Team',
    'site.description': 'Follow the Belgian Junior Gliding Team at the JWGC 2026 in Aalen, Germany.',
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.team': 'Our Team',
    'nav.sponsors': 'Sponsorship',
    'nav.tracking': 'Live Tracking',
    'nav.results': 'Results',
    'nav.menu': 'Menu',
    'nav.skip': 'Skip to content',
    'footer.credit': 'Belgian Gliding Federation – © Ferre De Cordt & Axl Bedert',
    'footer.rss': 'RSS feed',
    'blog.title': 'Blog',
    'blog.intro': 'Daily reports from the Junior World Gliding Championships 2026 in Aalen-Elchingen.',
    'blog.latest': 'Latest news',
    'blog.all': 'All posts',
    'blog.read': 'Read the post',
    'blog.prev': 'Previous post',
    'blog.next': 'Next post',
    'blog.newer': 'Newer posts',
    'blog.older': 'Older posts',
    'blog.page': 'Page',
    'blog.results': 'Results of the day',
    'blog.gallery': 'Photos and videos',
    'blog.draft': 'Draft',
    'blog.back': 'Back to the blog',
    'sponsors.strip': 'Our sponsors',
    'sponsors.pause': 'Pause logos',
    'sponsors.play': 'Play logos',
    'gallery.close': 'Close',
    'gallery.prev': 'Previous photo',
    'gallery.next': 'Next photo',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];

export function useTranslations(lang: Lang = defaultLang) {
  return (key: UIKey) => ui[lang][key] ?? ui[defaultLang][key];
}

export function formatDate(date: Date, lang: Lang = defaultLang, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : lang, { timeZone: 'UTC', ...opts }).format(date);
}
