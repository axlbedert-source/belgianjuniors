import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

export type Post = CollectionEntry<'blog'>;

/** Published posts, newest first. Drafts are visible in `npm run dev` only. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getSponsors() {
  return (await getCollection('sponsors')).sort((a, b) => a.data.order - b.data.order);
}

export async function getTeam() {
  const rank = { pilot: 0, crew: 1 } as const;
  return (await getCollection('team')).sort(
    (a, b) => rank[a.data.type] - rank[b.data.type] || a.data.order - b.data.order,
  );
}

// Gallery files live next to each post. Vite needs these globs to bundle them.
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/blog/**/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);
const videos = import.meta.glob<string>('/src/content/blog/**/*.{mp4,webm,MP4,WEBM}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export type GalleryItem =
  | { kind: 'image'; image: ImageMetadata; caption: string; alt: string }
  | { kind: 'video'; url: string; caption: string; label: string };

export function resolveGallery(post: Post): GalleryItem[] {
  const dir = '/' + (post.filePath ?? `src/content/blog/${post.id}/index.md`).replace(/\/[^/]+$/, '');
  return (post.data.gallery ?? []).map(({ src, caption, alt }, i) => {
    const fallbackAlt = caption || `Photo ${i + 1} from ${post.data.title}`;
    const path = `${dir}/${src.replace(/^\.\//, '')}`;
    if (images[path]) return { kind: 'image', image: images[path].default, caption, alt: alt || fallbackAlt };
    if (videos[path]) return { kind: 'video', url: videos[path], caption: caption || '', label: caption || `Video ${i + 1} from ${post.data.title}` };
    throw new Error(`Gallery file not found in post "${post.id}": ${src} (looked for ${path})`);
  });
}
