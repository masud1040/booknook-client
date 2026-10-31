<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Commands

- `npm run dev` — dev server at http://localhost:3000
- `npm run build` — production build (`next build`)
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config: `eslint.config.mjs`, `eslint-config-next` core-web-vitals + typescript)

There is no `typecheck`, `test`, or format script configured. Typecheck manually with `npx tsc --noEmit` (tsconfig sets `noEmit`).

## Toolchain quirks

- Next.js is version 16.4.3 from a modified distribution — treat it as unfamiliar. Read docs under `node_modules/next/dist/docs/` (01-app, 02-pages, 03-architecture, 04-community, index.md) before writing code, and heed deprecation notices.
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`). Do not add manual `useMemo`/`useCallback` unless there is a measured need; the compiler handles memoization.
- Tailwind v4 runs through Turbopack: `next.config.ts` maps `*.css` to `@tailwindcss/turbopack`. Global styles live in `src/app/globals.css` (imports `tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`; `@custom-variant dark (&:is(.dark *))`; `@theme inline`).
- Path alias: `@/*` → `./src/*` (tsconfig `paths` + `components.json` aliases).
- shadcn/ui: style `base-nova`, RSC, CSS-variable theming. Generated/ui components live in `src/components/ui/`; new shadcn components should be added there using the existing aliases.
- Fonts via `next/font/google`: DM_Sans (`--font-dm-sans`) for body, Playfair_Display (`--font-playfair`) for headings; wired in `src/app/layout.tsx`.

## Structure

- `src/app/` — App Router root: `layout.tsx` (fonts, `ToastProvider`, metadata), `page.tsx` (still the default scaffold content), `globals.css`, `favicon.ico`.
- `src/components/ui/` — shadcn-generated components plus app-specific ones (e.g. `questionnaire.tsx`).
- `src/lib/` — `utils.ts` (re-exports `cn` from the `cn` package) and `highlighter.tsx` (shiki-based code highlighting).
- `src/hooks/` — `use-mobile.ts` (`useIsMobile`), `use-highlighted-code.ts` (streaming code highlighting via shiki grammar state).
- `public/` — static assets (SVGs only).

## Notes

- No environment variables or API base URL are configured yet; axios is installed but not yet used in app code.
- No tests, CI workflows, or pre-commit hooks are configured.
- The working tree contains uncommitted in-progress work (updated deps, fonts, globals, new `src/` dirs). Check `git status` before assuming file state.
