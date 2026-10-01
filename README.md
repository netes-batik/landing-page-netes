# Netes Batik

A static Indonesian landing page for blangkon, jarik, and surjan. HTML, CSS, JavaScript; no runtime dependencies, backend, or checkout. Hosting target: GitHub Pages only.

## Preview and check

Requires Node.js 22 or newer. No package installation is needed.

You can also open `index.html` directly in a browser. It has no module imports or external fonts, and all product assets are local.

```sh
npm run dev
```

Open http://127.0.0.1:4173. To verify the deployment output:

```sh
npm test
npm run build
npm run preview
```

The build copies public files into `dist/` for a standalone preview and exports the requested domain route in `dist/netes/`. Relative asset paths support both locations. Content and prefilled WhatsApp links also work with JavaScript disabled.

The requested production URL is **https://adittamavincent.my.id/netes/**. See [DOMAIN-SETUP.md](DOMAIN-SETUP.md) for the domain setup, IDwebhost DNS records, and how to preserve an existing homepage. It has not been activated or verified live.

## Editing

- `index.html`: copy, prices, FAQs, fallback WhatsApp links, metadata, and schema.
- `styles.css`: responsive design; sage and forest palette; Georgia display with system sans-serif body.
- `app.js`: confirmed WhatsApp number and encoded product-specific inquiry templates; mobile navigation. Customers review and send messages in WhatsApp themselves.
- `assets/blangkon-hero.webp`: studio retouch of the owner's supplied product photo.
- `assets/blangkon-collection.webp`: a second studio edit preserving the original row of four blangkon.
- `assets/blangkon-original.webp`: unmodified original product photo.
- `assets/ASSETS.md`: image provenance and editing prompt.

When changing the number or messages, update both `app.js` and fallback `href` values in `index.html`. When changing the public URL, update the canonical and Open Graph metadata, `robots.txt`, and `sitemap.xml`.

## GitHub Pages

Repository: https://github.com/netes-batik/landing-page-netes

Expected URL after successful deployment: https://netes-batik.github.io/landing-page-netes/

Select **Settings → Pages → Build and deployment → Source → GitHub Actions**. `.github/workflows/pages.yml` tests and builds the site, uploads `dist/`, then deploys it whenever `main` is pushed.

With an authenticated GitHub CLI account that has repository administration rights, the equivalent initial configuration is:

```sh
gh api --method POST repos/netes-batik/landing-page-netes/pages -f build_type=workflow
```

If Pages already exists, use `--method PUT`. Publish changes with:

```sh
git add .
git commit -m "feat: add Netes Batik static landing page"
git push -u origin main
gh run list --workflow pages.yml --limit 1
```

Check the completed deployment run before treating the URL as live. A configured workflow or successful push alone is not deployment proof. A free GitHub account requires a public repository for Pages.

### Status of this build session

The static build and three automated checks pass. JavaScript syntax, XML, local asset references, and the WhatsApp number/messages were checked. A browser render was not verified: opening a local HTTP server was blocked by the sandbox, and file URLs are not permitted by the connected browser.

Commit, push, and live Pages configuration were not completed. `.git` is read-only in this session, terminal DNS cannot reach GitHub or npm, and GitHub browser access was denied. The public URL above is an expected deployment URL, not a verified live site.

## Content verification

History, product characteristics, and indicative prices come from the provided brief. WhatsApp +62 877-3821-2840 was directly confirmed by the user. No invented testimonials, exact sizes, stock counts, payment accounts, social handles, address, or current international-shipping promises are published.

Confirm current prices, free-shipping terms, motif availability, and sizing with the owner before treating this as a current catalog. Add social links only when supplied. The text wordmark is a design choice; replace it with the official logo when available.

## Requested skill

`npx skills add Leonxlnx/taste-skill --yes` was attempted but npm DNS resolution failed. Retrying through the cached Skills CLI failed while cloning GitHub. Neither completed installation. The existing local `design-taste-frontend` skill was used as the design fallback.
