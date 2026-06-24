# B4RTA — final publish-ready Astro site

A premium but direct public build log for an old house, tools, costs, money decisions and the system behind building a real family base.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Routes

- `/` — homepage
- `/notes` — build log
- `/principles` — build principles
- `/manifesto` — manifesto
- `/about` — about
- `404.html` — not found page

## Brand assets

- Header and page visuals use the transparent B4RTA mark / lockup files in `public/brand`.
- Browser tabs use the black tile favicon set in `public/` because transparent favicons disappear on dark browser UI.
- Social previews use `public/og-image.png`.

## Before deploy

Update `site` inside `astro.config.mjs` to the final production domain if needed.
