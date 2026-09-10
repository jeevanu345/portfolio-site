# Jeevan U — Personal Portfolio

Personal portfolio built with Next.js and Tailwind CSS to present projects, writing, résumé information, and interactive experiments.

## Highlights

- Project and résumé routes backed by structured local content.
- MDX-based blog pages.
- Theme controls and reusable UI components.
- Optional AI-chat experience exposed through API routes.
- Vercel analytics and performance instrumentation.

## Technology

- Next.js 12 and React 17
- TypeScript
- Tailwind CSS
- MDX/Markdown rendering
- Radix-based UI components
- Vercel deployment tooling

## Local development

```bash
yarn install
yarn dev
```

Then open `http://localhost:3000`.

## Validation commands

```bash
yarn format:check
yarn lint
yarn build
```

These commands should be run before publishing changes. A command should not be represented as passing until it has completed successfully in a clean environment.

## Configuration

Some integrations require local environment variables. Keep them in an untracked `.env.local` file and never commit API keys or service credentials. Review the code path for each optional integration before enabling it in a public deployment.

## Content and privacy

- Keep one current public résumé and remove obsolete copies.
- Verify every external profile, project link, and contact method.
- Confirm attribution and redistribution rights for fonts, images, icons, and template-derived material.
- Avoid publishing personal details that are not required for professional contact.

## Repository structure

```text
pages/       Next.js routes and API handlers
components/  reusable interface components
data/        structured portfolio content
blogs/       MDX posts
public/      public static assets
styles/      global and component styling
```

## Current limitations

- Automated accessibility and link checks are not yet configured.
- Performance results are not yet versioned or reproducible.
- The dependency set includes older framework versions and requires a deliberate upgrade plan.
