# cplt.online

Demonstration site for the CPLT platform. Static HTML — no build step, no backend.

`cplt.tech` is the association (which also takes on paid builds); this exists to show
the stack working and to carry the technical brief. Commercial content (pricing,
engagement structure, contact) lives on cplt.tech only — keep it that way to avoid
the two properties drifting into each other.

## Pages
- `index.html`         overview, orientation
- `demo.html`          the failure demonstration (interactive, client-side only)
- `how-it-works.html`  worked example, review chain, benchmarks
- `deployment.html`    where it runs and what that decides
- `security.html`      agent ownership charter, recovery objectives

## Deploy
Static. Deployed to Vercel from this repo. `vercel.json` turns on clean URLs (`/how-it-works`,
not `/how-it-works.html`), redirects `www.` to the apex, and sets security and cache headers.
Interface content is fictional demonstration material — no client, framework or corpus is
represented; the measurements are real.

The site is indexable (since 2026-09-02): every page carries a canonical, Open Graph tags,
JSON-LD linking it to the CPLT organisation on cplt.tech, and there are `robots.txt`,
`sitemap.xml` and `llms.txt` at the root. If a page is added, add it to `sitemap.xml` and
`llms.txt`, and link to it with a clean URL. Keep commercial content on cplt.tech.

Git pushes deploy automatically to the Vercel project `site`. Two things broke that once
(2026-09-02) and were fixed: a duplicate project named `deploy` was attached to this repo
and has been removed, and the project setting "Require verified commits" cancelled every
unsigned commit and has been switched off. If deployments show as "Canceled" again, check
that setting first.
