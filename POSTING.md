# How to post on the website

This guide is for teammates who are not developers. You only edit text files and drop in photos.

## Before you start (once)

1. Install **Node.js** (version 22 or newer) from <https://nodejs.org>.
2. Open a terminal in the website folder and run:

   ```bash
   npm install
   ```

3. Start the website on your own computer:

   ```bash
   npm run dev
   ```

   Open <http://localhost:4321> in your browser. Leave the terminal open: the page updates by itself every time you save a file.

## Write a new blog post

1. In a second terminal, run (with your own title between the quotes):

   ```bash
   npm run new-post "Competition Day 12: Blue Skies"
   ```

2. This makes a new folder such as `src/content/blog/2026-08-16-competition-day-12-blue-skies/` with:
   - `index.md`: your post
   - `cover.jpg`: a **placeholder** cover photo. Replace it with your own (keep the name `cover.jpg`, or change `cover:` in `index.md`).
   - `gallery/`: an empty folder for extra photos and videos

3. Open `index.md` in any text editor (VS Code, TextEdit in plain-text mode, Notepad). The top part, between the two `---` lines, is the post's settings:

   | Setting | What to put there |
   |---|---|
   | `title` | The title of the post |
   | `date` | The day it is about, as `YYYY-MM-DD` |
   | `cover` | The cover photo file, e.g. `./cover.jpg` |
   | `coverAlt` | A few words describing the cover photo (for blind visitors) |
   | `excerpt` | One or two sentences shown on the blog overview and in link previews |
   | `author` | Optional: your name (remove the `#` in front to use it) |
   | `tags` | Optional: e.g. `["Competition", "Club class"]` |
   | `draft` | `true` = hidden from the live site. `false` = published |
   | `results` | Optional: links to the SoaringSpot results of that day |
   | `gallery` | Optional: photos and videos shown under the post |

   Lines starting with `#` are switched off. Remove the `#` (and keep the spaces in front) to switch them on.

4. Below the second `---` you write the post itself:

   ```markdown
   A normal paragraph. Leave an empty line between paragraphs.

   ## Michiel

   Use `## ` for a heading, **double stars** for bold, _underscores_ for italic,
   and [square brackets](https://www.weglide.org/flight/123) for a link.
   ```

5. Look at your post at `http://localhost:4321/blog/<folder-name>`. Drafts show a yellow **Draft** label on your own computer only.

## Add photos

- **Cover photo:** put the file in the post folder and point `cover:` to it, e.g. `cover: ./cover.jpg`.
- **Photo inside the text:** put the file in the post folder and write
  `![What is in the photo](./my-photo.jpg)` on its own line.
- **Gallery under the post:** put photos (`.jpg`, `.png`, `.webp`) or videos (`.mp4`) in the `gallery` folder and list them:

  ```yaml
  gallery:
    - src: ./gallery/towing.jpg
      caption: "Towing"
    - src: ./gallery/interview.mp4
      caption: "Interview with Michiel"
  ```

  The indentation (spaces) matters: copy the example exactly.

Tips:
- Photos straight from a camera are fine. The website makes small, fast versions by itself. Very large files (over about 5 MB) make the project heavy, so shrink them first if you can (on a Mac: open in Preview → Tools → Adjust Size → 2000 px).
- Use lowercase file names without spaces, like `wannes-landing.jpg`.
- iPhone `.mov` and `.heic` files don't work in every browser. Export videos as `.mp4` and photos as `.jpg`.

## Publish

1. Set `draft: false` in the post's settings.
2. Check that the site still builds:

   ```bash
   npm run build
   ```

   If something is wrong (a missing photo, a typo in the settings) this tells you which file and which line.
3. Save your work to GitHub (or ask a developer teammate to). The site is not hosted anywhere yet, so "publishing" for now means: it is in the project and builds without errors.

## Add a team member

1. Put their photo in `src/content/team/photos/`, e.g. `sara.jpg`.
2. Copy an existing file in `src/content/team/` (e.g. `wannes.md`) to `sara.md` and change it:

   ```markdown
   ---
   name: "Sara Peeters"
   photo: ./photos/sara.jpg
   type: pilot          # pilot or crew
   glider: "LS-8"       # pilots only
   registration: "OO-ZXY"
   compCode: "XY"
   order: 5             # lower numbers come first
   ---

   Sara's bio goes here.
   ```

   For crew, leave out `glider`, `registration` and `compCode` and use:

   ```yaml
   type: crew
   emoji: "📸"
   role: "PR-team"
   ```

Pilots are always shown first, then crew. The mascot has `order: 99` so it stays last.

## Add a sponsor

1. Put the logo in `src/content/sponsors/logos/` (a `.png` with a transparent background looks best).
2. Make a new file in `src/content/sponsors/`, e.g. `acme.yaml`:

   ```yaml
   name: Acme
   logo: ./logos/acme.png
   url: https://www.acme.be
   order: 8
   ```

The logo appears in the scrolling sponsor strip on the home page, under every blog post and on the sponsorship page. To remove a sponsor, delete their `.yaml` file.

## Change the event schedule

Edit `src/content/events/events.yaml`. Every event has an `id` (any unique word), a `date`, an optional `time`, a `title` and a `type` (one of: Training, Official, Ceremony, Flying, Social).

## Change the home page text

The welcome text is in `src/data/home.md`. The sponsorship page text is in `src/pages/sponsors.astro`, between the HTML tags.

## Something broke?

- Read the red message in the terminal: it names the file and line.
- Most errors are a missing photo (check the file name and the `./`) or wrong indentation in the settings.
- Stop the dev server with `Ctrl + C` and run `npm run dev` again.
