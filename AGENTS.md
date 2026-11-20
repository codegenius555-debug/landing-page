# KRAFENIO landing page: agent notes

Single-page marketing site for KRAFENIO (software engineering company, est. 2020). TanStack Start + React 19 + Tailwind v4 on Netlify. No database, auth, or server code. The only backend feature is Netlify Forms.

## Layout

- `src/routes/index.tsx` renders `MarketingPage`. `src/routes/contact.tsx` renders `ContactPage` and validates the optional `?capability=` / `?engagement=` search params against `content.ts`. `src/routes/__root.tsx` holds meta tags, Google Fonts links, and the favicon.
- `src/components/SiteChrome.tsx`: shared `Header`, `Footer`, `Mark`, plus the `cdn()` and `delay()` helpers. Section links use `/#…` so they work from `/contact`.
- `src/components/MarketingPage.tsx`: home sections (Hero, Capabilities accordion, Approach, Stack marquee, Engage, Contact teaser). Anchors: `#capabilities #approach #stack #engage #contact`. "Discuss …" links and engagement cards link to `/contact?…#inquiry` to prefill the form.
- `src/components/ContactPage.tsx`: `/contact` page with intro and direct email card, `#inquiry` (next-steps timeline and form), email brief checklist, and `#faq`.
- `src/components/ContactForm.tsx`: AJAX Netlify Forms submission with pending, error, and success states, grouped into About you / The project / The details. Budget, stage, and timeline are radio chips. The `subject` is built at submit time.
- `src/data/site.ts` (brand, public contact email, and form config) and `src/data/content.ts` (all section copy). Edit copy here, not in JSX.
- `public/__forms.html`: static registration for the `project-inquiry` form. **Keep its fields in sync with ContactForm.** The test in `ContactForm.test.tsx` checks this.
- `public/img/hero.png`, `public/img/studio.png`: AI-generated photography. Always reference them through `/.netlify/images?url=/img/<file>&w=<w>&fm=webp` (see the `cdn()` helper), never directly.

## Design system

- Dark, warm palette: `ink` (#121110) backgrounds, `bone` text, `mute`/`dim` secondary text, a single `copper` accent. Tokens live in `@theme` in `src/styles.css`.
- Fonts: Instrument Serif (`font-display`, headlines with italic copper emphasis), Hanken Grotesk (body), JetBrains Mono (`eyebrow` labels, numbers).
- Reusable classes are Tailwind v4 `@utility` blocks: `eyebrow`, `btn-primary`, `btn-ghost`, `field`, `field-label`. Custom classes must be `@utility` to be `@apply`-able.
- Motion is CSS-only. `.rise` and `.unveil` run on page load with a `--d` delay (the `delay()` helper). `.reveal` uses scroll-driven `animation-timeline: view()` behind `@supports`, so unsupported browsers just show content. `prefers-reduced-motion` disables all of it.

## Conventions

- Avoid unverifiable claims (client logos, testimonials, invented metrics). Stats come from facts the owner gave: founded 2020, 50+ engineers, ~10 years average experience.
- The form POSTs to `/__forms.html`, not `/`, because SSR handles `/`. A 200 response that still contains `data-netlify` is treated as a failure, since that means a local preview returned the static file.
- Netlify Forms is enabled via the marker written by the forms skill's `enable.cjs`.
