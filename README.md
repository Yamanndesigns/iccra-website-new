# ICCR Academy — Deployment &amp; CMS Guide

## Why GitHub looked broken

The code itself checks out clean — every link, script, and `fetch()` call uses a
**relative path** (`css/styles.css`, `data/site.json`, etc.), so there's nothing
in the markup that would break on a different host. The "skewed" result you saw
is almost always one of these two things:

1. **GitHub Pages wasn't actually turned on**, so the URL you were looking at was
   GitHub's normal file browser (`github.com/you/repo`) — not a published site.
   That view shows raw files/folders, not the rendered page.
2. **You opened a "raw" file URL** (`raw.githubusercontent.com/...`), which serves
   the HTML as plain text instead of rendering it, so images, CSS, and JS never
   load and everything looks unstyled and broken.

### To actually publish on GitHub Pages
1. Push all these files to the **root** of a repo (not inside a subfolder).
2. In the repo: **Settings → Pages → Build and deployment → Source: "Deploy from
   a branch"** → Branch: `main`, Folder: `/ (root)` → **Save**.
3. Wait ~1 minute, then visit the URL GitHub shows you — it will look like
   `https://your-username.github.io/your-repo-name/`. That's the real site.

You don't need to do this if you're heading straight to Vercel — it's just
useful to know for next time.

## Deploying on Vercel (recommended — this is a static site, zero config)

1. Push the project to a GitHub repo (root of the repo, same as above).
2. Go to [vercel.com/new](https://vercel.com/new) and import that repo.
3. Vercel will detect it as a static site automatically:
   - **Framework Preset:** Other
   - **Build Command:** *(leave blank)*
   - **Output Directory:** *(leave blank / repo root)*
4. Click **Deploy**. You'll get a live URL in under a minute, and every push to
   `main` redeploys automatically.

No `vercel.json` or build step is required — the `fetch('data/*.json')` calls
just load static files the same way they do locally, and Vercel serves them
identically whether the site sits at the domain root or a preview URL.

## Changing photos, faculty, and board members (Sanity CMS)

The site is already wired to Sanity. Until it's connected it simply uses the
photos and `data/faculty.json` built into the site, so nothing breaks.

**What's editable in the Studio**
- **Site Photos**: every photo on the site, one labeled slot each (homepage banner,
  every page banner, Why ICCRA photos, Student Life gallery). Upload a photo, click the
  crop icon to set the *hotspot* (the part that must always stay in view, usually
  faces), and hit **Publish**. Leave a slot empty to keep the built-in photo.
- **Faculty & Staff** and **Governing Committee**: names, roles, bios, photos, order.

Changes show on the live site within about a minute, with no redeploy.

### One-time setup (about 15 minutes)

1. **Install Node.js** (LTS) from https://nodejs.org (needed only to set up and publish the Studio).
2. **Create a free Sanity project** at https://www.sanity.io/manage → *Create project*.
   Copy the **Project ID** (a short code like `ab12cd34`).
3. ~~Paste the Project ID~~ Done: the project ID is `tiwlxbgu`, already set in
   `js/sanity-client.js`, `studio/sanity.config.js`, and `studio/sanity.cli.js`.
4. **Allow the website to read from Sanity**: in sanity.io/manage → your project → **API → CORS origins**,
   add each address the site is served from (leave *Allow credentials* unchecked):
   - `https://*.vercel.app` (Vercel's default and preview URLs)
   - `https://yourdomain.com` and `https://www.yourdomain.com` once the domain is bought
   - `http://localhost:3333` (the Studio when run locally)
5. **Publish the Studio** (in Terminal, from this folder):
   ```bash
   cd studio
   npm install
   npx sanity login
   npm run import-starter   # loads current faculty and board into Sanity (photo slots start empty = built-in photos)
   npm run deploy           # Studio goes live at https://iccra.sanity.studio
   ```
6. **Invite staff** in sanity.io/manage → **Members**. They edit at the Studio link; no code needed.

Then push the site files to GitHub; Vercel redeploys automatically. The `studio/` folder is
kept out of the website deploy by `.vercelignore`; the Studio is hosted separately by Sanity.

### How it fits together
- Every editable `<img>` has a `data-cms="slotName"` attribute; `studio/schemas/pageImages.js`
  has a field with the same name. To make a new photo editable, add both.
- `js/sanity-client.js` swaps in the Sanity photos (and the editor's hotspot) on page
  load, and `loadFaculty()` feeds the Faculty page. Any failure falls back to the built-in content.
- Testimonials, FAQ, and other text still come from `data/*.json`; their schemas are in
  `studio/schemas/` for when those move to Sanity too.
