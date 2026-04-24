# EvoniaAI · 上海灵栈平云科技有限公司

> AI First Company · Trust · Global · Dignity

This repository contains the official website for **上海灵栈平云科技有限公司**,
also known as **EvoniaAI**. EvoniaAI is an AI-first software engineering
company focused on AI software development, intelligent systems, AI Agents, and
AI Platforms.

EvoniaAI helps customers apply advanced AI capabilities to real business
systems, improving organizational efficiency, reducing repetitive work, and
turning AI from short-term demos into runnable, trustworthy, and sustainable
software.

## Company Profile

EvoniaAI serves businesses and teams that want to use AI for process automation,
business upgrades, data analysis, intelligent workflows, and production-grade AI
systems. The company focuses on long-term software capability rather than
single-purpose tools, starting from business workflows, data resources, system
stability, and user experience.

Core service areas include:

- AI capability integration with existing systems
- AI Agent system development
- Enterprise data query and intelligent analysis
- Business process automation and intelligent workflow design
- Intelligent content generation, review, and quality control
- Internal productivity tool development
- Medium and large AI software system design and development
- AI Platform, AI application prototype, and production system delivery

## Positioning

EvoniaAI is an AI-first software engineering team. The company helps customers
design practical AI solutions, connect AI to existing systems, and support work
such as document organization, data analysis, content generation, result review,
human collaboration, and continuous iteration.

The goal is not to provide a generic AI tool, but to build stable, usable, and
extensible AI software systems that can become durable organizational
capabilities.

## Principles

- **信任优先 / Trust first**: AI products must be transparent, explainable, and
  accountable before entering real business workflows.
- **全球视野 / Global vision**: EvoniaAI works for global customers and users,
  with practical understanding of cross-language, cross-cultural, and
  cross-market software delivery.
- **技术与尊严 / Technology with dignity**: AI should amplify human capability
  while preserving human judgment, responsibility, and dignity.

## Public Projects

- **[ShellTime](https://shelltime.xyz)**: Developer platform for the AI era,
  helping developers understand shell commands, AI coding tools, editor
  activity, and workflow data with privacy-first analytics.
- **[AsyncTalk](https://asynctalk.com)**: A technical podcast for Chinese
  developers covering Web engineering, frontend infrastructure, AI programming,
  and next-generation development practices.
- **[Rawback](https://rawback.app)**: An AI-powered photo platform for
  photographers, with photo organization, smart tags, face detection, scene
  recognition, EXIF extraction, and secure upload workflows.

## Contact

- Website: <https://evonia.ai>
- GitHub: <https://github.com/EvoniaAI>
- Founder: <https://annatarhe.com>
- Email: <annatarhe@gmail.com>

## Website Development

This site is built with [Astro](https://astro.build/) and Tailwind CSS.

The project uses **pnpm** as defined in `package.json`.

```bash
pnpm install
pnpm dev
```

The development server defaults to `http://localhost:4321`.

## Available Scripts

| Script         | Description                               |
| -------------- | ----------------------------------------- |
| `pnpm dev`     | Start the local development server.       |
| `pnpm build`   | Type-check and build the production site. |
| `pnpm preview` | Preview the production build locally.     |

## Project Structure

```text
.
├── astro.config.mjs       # Astro configuration with Tailwind + sitemap
├── package.json           # Scripts and dependencies
├── public/                # Static assets and machine-readable site content
├── src/
│   ├── components/        # Header, footer, SEO helpers, and page sections
│   ├── constants.ts       # Company copy, service data, projects, and contact links
│   ├── global.css         # Tailwind entry point and shared tokens
│   ├── layouts/           # Base HTML document shell
│   └── pages/             # Astro pages
└── tsconfig.json          # TypeScript configuration
```

## Deployment

Run `pnpm build`, then deploy the generated `dist/` directory to a static
hosting provider such as GitHub Pages, Vercel, or Netlify.
