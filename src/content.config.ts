import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// One folder per post: src/content/blog/<slug>/index.md (+ its images).
// The folder name is the URL: /blog/<slug>
const blog = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/blog', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      cover: image(),
      coverAlt: z.string(),
      excerpt: z.string(),
      author: z.string().optional(),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().default(false),
      // SoaringSpot result pages for that day, shown as buttons under the post.
      results: z.array(z.object({ label: z.string(), url: z.url() })).optional(),
      // Photo/video gallery. `src` is a file next to index.md, e.g. ./gallery/photo.jpg or ./gallery/clip.mp4
      gallery: z
        .array(z.object({ src: z.string(), caption: z.string().default(''), alt: z.string().optional() }))
        .optional(),
    }),
});

const team = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/team' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      photo: image(),
      type: z.enum(['pilot', 'crew']),
      glider: z.string().optional(),
      registration: z.string().optional(),
      compCode: z.string().optional(),
      role: z.string().optional(),
      emoji: z.string().optional(),
      order: z.number(),
    }),
});

const sponsors = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/sponsors' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      logo: image(),
      url: z.url(),
      order: z.number(),
    }),
});

const events = defineCollection({
  loader: file('./src/content/events/events.yaml'),
  schema: z.object({
    date: z.coerce.date(),
    time: z.string().optional(),
    title: z.string(),
    type: z.enum(['Training', 'Official', 'Ceremony', 'Flying', 'Social']),
  }),
});

export const collections = { blog, team, sponsors, events };
