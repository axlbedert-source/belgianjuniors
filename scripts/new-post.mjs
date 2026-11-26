#!/usr/bin/env node
// Usage: npm run new-post "Competition Day 12: Title"
// Creates src/content/blog/<date>-<slug>/index.md with the frontmatter filled in (draft: true)
// and a placeholder cover.jpg you should replace with your own photo.
import { mkdirSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Please give the post a title, for example:\n  npm run new-post "Competition Day 12: Blue Skies"');
  process.exit(1);
}

const today = new Date();
const date = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
const slug = title
  .normalize('NFKD')
  .replace(/[̀-ͯ]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 60);

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const folderName = `${date}-${slug || 'post'}`;
const folder = join(root, 'src', 'content', 'blog', folderName);

if (existsSync(folder)) {
  console.error(`A post folder with this name already exists:\n  ${folder}`);
  process.exit(1);
}

mkdirSync(join(folder, 'gallery'), { recursive: true });
copyFileSync(join(root, 'scripts', 'placeholder-cover.jpg'), join(folder, 'cover.jpg'));
writeFileSync(join(folder, 'gallery', '.gitkeep'), '');

const yamlString = (s) => JSON.stringify(s);
writeFileSync(
  join(folder, 'index.md'),
  `---
title: ${yamlString(title)}
date: ${date}
cover: ./cover.jpg
coverAlt: "Describe the cover photo in a few words"
excerpt: "One or two sentences that appear on the blog overview and in link previews."
# author: "Your name"
# tags: ["Competition", "Club class"]
draft: true
# results:
#   - label: "Club class"
#     url: "https://www.soaringspot.com/..."
#   - label: "Standard class"
#     url: "https://www.soaringspot.com/..."
# gallery:
#   - src: ./gallery/photo-1.jpg
#     caption: "What is happening in this photo"
#   - src: ./gallery/clip.mp4
#     caption: "A short video"
---

Write your post here. Leave an empty line between paragraphs.

## A heading for each pilot

More text. Make a link like this: [Michiel's flight](https://www.weglide.org/).
`,
);

console.log(`\nNew draft post created:\n  src/content/blog/${folderName}/index.md\n`);
console.log(`It will be at http://localhost:4321/blog/${folderName} while "npm run dev" runs.`);
console.log('Replace cover.jpg with your own photo, and set draft: false when it is ready to publish.\n');
