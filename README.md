# Belgian Junior Gliding Team website

The website of the Belgian Junior Gliding Team (belgianjuniors.be), built with [Astro](https://astro.build) as a static site. Blog posts are Markdown files.

**Want to write a post or add a team member or sponsor? Read [POSTING.md](POSTING.md).**

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (once) |
| `npm run dev` | Local dev server at http://localhost:4321 |
| `npm run build` | Type-check and build the static site into `dist/` |
| `npm run preview` | Serve the built `dist/` folder locally |
| `npm run new-post "Title"` | Create a new draft post folder |

Requires Node.js 22 or newer. No hosting or deployment is set up yet: `dist/` can be uploaded to any static host.

## Structure

```
src/
  content.config.ts     Content collections + Zod schemas (blog, team, sponsors, events)
  content/
    blog/<slug>/        One folder per post: index.md + cover + gallery/
    team/               One .md per member (bio = body) + photos/
    sponsors/           One .yaml per sponsor + logos/
    events/events.yaml  Event schedule on the home page
  data/home.md          Home page recap text
  i18n/ui.ts            All interface strings (English only for now)
  layouts/Base.astro    <head>, meta/Open Graph, header, footer
  components/           Header, Footer, SponsorStrip, PostCard, Gallery, Email, EventSchedule
  pages/                Routes: /, /blog, /blog/page/N, /blog/<slug>, /team, /sponsors, /rss.xml, 404
  styles/global.css     Design tokens and shared styles
public/brochures/       Sponsor brochure PDFs (NL/FR/EN)
scripts/new-post.mjs    The new-post generator
```

## Notes

- **URLs:** old Grav URLs `/blog/day1` … `/blog/day15`, `/team` and `/sponsors` are unchanged. `/home` redirects to `/`.
- **Images** go through `astro:assets` (`<Image>`/`getImage`) and are output as responsive WebP. Gallery files are resolved in `src/lib/content.ts`.
- **Drafts** (`draft: true`) appear in `npm run dev` only, never in the build or the RSS feed.
- **Fonts** (Archivo, Source Sans 3) are downloaded at build time by Astro's Fonts API and self-hosted; the first build needs internet.
- **Email** addresses are never written as plain `mailto:` links; `components/Email.astro` assembles them in the browser.
- **i18n:** the Astro i18n config and `src/i18n/ui.ts` are ready for `nl`/`fr`. To add a language, add it to `locales` in `astro.config.mjs`, add its strings to `ui.ts`, and add pages under `src/pages/nl/` (or a `lang` field on posts).
