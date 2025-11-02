## Quick context for AI coding agents

This is a personal portfolio SPA built with React + Vite + TypeScript and styled with TailwindCSS. Content (projects, skills, certifications) is stored in Supabase; the frontend fetches data via the Supabase client and some small services. Key runtime wiring and conventions are listed below so agents can be productive immediately.

### Architecture & big picture
- Frontend: React (TSX) + Vite. Entry points: `src/main.tsx`, `index.html`.
- Styling: Tailwind via `tailwind.config.ts` and `src/index.css` / `App.css`.
- UI primitives: `src/components/ui/*` contains small, reusable wrappers around Radix/shadcn patterns (e.g. `button.tsx`, `input.tsx`). Modify primitives here to affect global styling.
- Feature components: `src/components/*` (e.g. `HeroSection.tsx`, carousels, modals). Keep feature logic in these feature files and small primitives in `ui/`.
- Data & hooks: `src/hooks/` (e.g. `usePortfolioData.ts`) orchestrates client-side fetching and state. Prefer adding/using hooks for shared data logic.
- Services & integrations: `src/services/` and `src/integrations/supabase/` contain API/service wrappers. Use these to make network calls rather than direct fetches.
- Backend/storage: Supabase project is referenced in `/supabase/` (migrations, config). DB schema changes should include migration SQL in `supabase/migrations/`.
- Misc: `lib/redis.ts` exists for caching patterns—treat it as a server-side helper if creating serverless endpoints.

### Data flow patterns to follow
- UI -> hook -> service -> `integrations/supabase` client. Example: `components` call a hook (from `src/hooks`), which uses `@tanstack/react-query` and service functions to query Supabase.
- Prefer the existing React Query usage for caching/invalidations (`@tanstack/react-query` is installed).

### Important files & locations (examples)
- `package.json` — scripts: `dev`, `build`, `build:dev`, `preview`, `lint` (use these exact npm scripts).
- `vite.config.ts` — dev server and plugin config; default port 5173.
- `tailwind.config.ts`, `postcss.config.js` — styling config.
- `src/hooks/usePortfolioData.ts` — central portfolio data loader; read before changing data fetching logic.
- `src/integrations/supabase/*` — supabase client initialization and helpers.
- `src/components/ui/*` — primitives; keep props/interfaces stable to avoid cascading changes.
- `supabase/migrations/*` — DB migrations; add SQL files here for schema changes.

### Build / dev / test workflows (explicit commands)
- Local dev server: `npm run dev` (Vite, hot reload, default port 5173)
- Production build: `npm run build`
- Non-minified/dev-mode build: `npm run build:dev`
- Preview production build: `npm run preview`
- Lint: `npm run lint`

When making changes, run `npm run dev` to verify local behavior and `npm run lint` before committing.

### Environment & deployment notes
- Required local env vars: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (documented in `README.md`). Do not commit secrets. Use Vercel dashboard env settings for production (this repo has `vercel.json`).
- DB schema changes: include a migration file under `supabase/migrations/` and document the change in the PR.

### Conventions & patterns
- Keep components small and composable. If a component is reused across pages, move it into `src/components/` or `src/components/ui/`.
- UI primitives in `src/components/ui/*` aim to be unopinionated wrappers — avoid adding heavy logic there.
- Prefer TypeScript types/interfaces in `src/` files — the project is TS-first.
- Follow existing naming: `PascalCase` for components, `camelCase` for hooks and helpers.
- Use `class-variance-authority` (`cva`) patterns already present when extending component styles.

### When you touch data or APIs
- Read `src/hooks/usePortfolioData.ts` and `src/services/*` to find the canonical fetch paths.
- If adding a new table or field in Supabase, create a migration SQL file and update any services/hooks that read that field.

### Quick troubleshooting hints
- If dev server port conflicts: check `vite.config.ts` server.port.
- If builds fail with unexpected types, run `tsc` or `npm run build:dev` to get clearer errors.
- No unit tests are present — rely on manual local testing and linting.

### PR guidance for agents
- Keep changes focused and small. Add or update migration SQL when DB is affected. Run `npm run lint` and verify `npm run dev` locally before opening a PR. Mention changed files that touch data fetching, migrations, or UI primitives.

If any detail is missing or you want the agent to include extra checks (examples: automated smoke test for pages, specific linter rules), ask the repo owner for clarification and I will update these instructions.
