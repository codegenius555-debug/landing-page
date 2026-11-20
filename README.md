# KRAFENIO — company website

The public landing page for **KRAFENIO**, a global software engineering company founded in 2020 with 50+ senior engineers (around a decade of experience each) working across almost every modern stack.

The site presents the company's six engineering capabilities (Software Engineering, AI & Automation, Cloud & DevOps, Data Engineering, Quality Engineering, Enterprise Integration), its delivery approach, technology coverage, engagement models, and a project inquiry form that delivers submissions to Netlify Forms.

## Tech

- [TanStack Start](https://tanstack.com/start) + React 19, deployed on Netlify
- Tailwind CSS v4 (theme tokens in `src/styles.css`)
- Netlify Forms for project inquiries (no backend code or database)
- Netlify Image CDN for responsive WebP delivery of the photography in `public/img/`
- Vitest + Testing Library

## Run locally

```bash
pnpm install
pnpm dev            # Vite on http://localhost:3000
# or, with Netlify emulation:
netlify dev
```

Other scripts: `pnpm test`, `pnpm typecheck`, `pnpm format`.

Form submissions only work on a Netlify deploy. Local previews show the form's error state on submit, which is expected.

## Editing content

All copy lives in two files:

- `src/data/site.ts`: company name, founding year, tagline, meta description, form name
- `src/data/content.ts`: capabilities, stats, tech stack marquee, approach steps, engagement models, principles

If you add or rename a form field, update `public/__forms.html` to match so Netlify keeps detecting it.
