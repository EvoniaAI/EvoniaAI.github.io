# EvoniaAI · 灵栈平云

This repository contains the marketing website for **EvoniaAI (灵栈平云)**, built with [Astro](https://astro.build/) and inspired by the [AsyncTalk/website](https://github.com/AsyncTalk/website) project structure.

## Getting started

> The project uses **pnpm** as defined in `package.json`. You can substitute `npm` or `yarn` if preferred.

```bash
pnpm install
pnpm dev
```

The development server defaults to `http://localhost:4321`.

## Available scripts

| Script        | Description                                |
| ------------- | ------------------------------------------ |
| `pnpm dev`    | Start the local development server.        |
| `pnpm build`  | Type-check and build the production site.  |
| `pnpm preview`| Preview the production build locally.      |

## Project structure

```
.
├── astro.config.mjs       # Astro configuration with Tailwind + sitemap
├── package.json           # Scripts and dependencies
├── public/                # Static assets (favicons, social image)
├── src/
│   ├── components/        # Header, footer, SEO helpers, layout shell
│   ├── constants.ts       # Bilingual copy used across sections
│   ├── global.css         # Tailwind entry point and shared tokens
│   ├── layouts/           # Base HTML document shell
│   └── pages/             # Astro pages (index)
└── tsconfig.json          # TypeScript configuration
```

## Content

The homepage is bilingual (English/Chinese) and highlights:

- Web development consulting (Web 开发咨询)
- Career path consulting (职业发展咨询)
- Enterprise-grade software development (企业级软件定制开发)

It also introduces the founder and provides clear contact information for prospective partners.

## Deployment

The site can be deployed to any static hosting provider after running `pnpm build`. Upload the generated `dist/` directory to your hosting of choice (GitHub Pages, Vercel, Netlify, etc.).
