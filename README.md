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

## Sequoia AI

The portfolio belongs to **Jeevan U Gowda**. Both the floating chat and `/sequoia` use the same chat component. Set `NVIDIA_API_KEY` only in server environment configuration; never prefix it with `NEXT_PUBLIC_`. Deploy with a Next.js server (for example Vercel), not a static GitHub Pages export.

History uses `jeevan-u-gowda:chat:v1` in this browser’s localStorage, with a random UUID, a versioned schema, at most 40 messages of 8,000 characters each, and 30 days of inactivity expiry. Different browsers/devices do not share history. People sharing the same browser profile share its storage; use **New chat** on a shared device. Storage failure falls back to memory. Prompts are sent to NVIDIA for answers, but are not sent to portfolio analytics or persisted by this API. New chat cancels the pending response and resets only local history. Chat text is rendered as escaped text, never executable HTML.

The old external deletion endpoint is retired. Dummy credential authentication is disabled; real authentication must be implemented before enabling sign-in. Configure `NEXTAUTH_SECRET` server-side if using NextAuth.

The like button retains browser-local reactions and displays the configured aggregate count. It no longer repeatedly signs in with dummy credentials or uses that bypass to write aggregate data. Enable authenticated writes only with a real account system.

Run `node --test tests/chat.test.cjs`, `yarn lint`, `yarn tsc --noEmit`, and `yarn build` to verify changes.
