# EvoniaAI · 灵栈平云

This repository contains the marketing website for **EvoniaAI (灵栈平云)**, an AI First company built with [Astro](https://astro.build/).

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
├── public/                # Static assets (favicons, social image, project logos)
├── src/
│   ├── components/        # Header, footer, SEO helpers, layout shell
│   ├── constants.ts       # Site copy and project data
│   ├── global.css         # Tailwind entry point and shared tokens
│   ├── layouts/           # Base HTML document shell
│   └── pages/             # Astro pages
└── tsconfig.json          # TypeScript configuration
```

## Content

The homepage is Chinese-first and highlights:

- Trust-first AI product development
- World-class AI Agents and AI Platforms
- Public projects: ShellTime, AsyncTalk, and Rawback

It also introduces the founder and provides direct email contact for prospective partners.

## Deployment

The site can be deployed to any static hosting provider after running `pnpm build`. Upload the generated `dist/` directory to your hosting of choice (GitHub Pages, Vercel, Netlify, etc.).
