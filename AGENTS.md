# AGENTS.md — Pune Mumbai Cab Booking Platform

## Runtime

- **Bun only.** No `npm`/`yarn`/`pnpm`. All scripts via `bun run <cmd>`.
- Dev: `bun run dev` (Next.js 15 on port 3000).
- Build: `bun run build` → then `bun run start`.

## Verification order (required before shipping)

```bash
bun run lint       # next lint + prettier --check .
bun run typecheck  # tsc --noEmit  (strict mode, ~45s)
bun run test       # jest
bun run test:e2e   # playwright test
```

`bun run lint` runs **both** ESLint and Prettier. No separate `.prettierrc` or `.eslintrc` — defaults only. Fix with `bun run lint:fix`.

## Dual Prisma schemas

Two schemas coexist, for different providers:

| File                              | Provider                     | Purpose                     | Models           |
| --------------------------------- | ---------------------------- | --------------------------- | ---------------- |
| `prisma/schema.prisma`            | **SQLite** (`file:./dev.db`) | Active dev schema           | 8 core models    |
| `prisma/enterprise-schema.prisma` | **PostgreSQL**               | Phase 2 target (not active) | 22 models, enums |

`.env.local` sets `DATABASE_URL="file:./dev.db"` — the **SQLite** schema is the one Prisma uses at runtime. The enterprise schema is aspirational; do not treat it as the source of truth.

Prisma commands: `bun run prisma migrate dev`, `bun run prisma generate`. Generated client at `node_modules/.prisma/client`.

## Path aliases (`tsconfig.json`)

All resolve from project root:

```
@/*              → ./*
@/lib            → ./lib
@/components/*   → ./components/*
@/app/*          → ./app/*
@/prisma/*       → ./prisma/*
```

Global `prisma` singleton at `lib/prisma.ts` — prevents hot-reload duplication.

## App entrypoints

- **Homepage**: `app/page.tsx`
- **Root layout**: `app/layout.tsx` (metadata, fonts, structured data)
- **Admin shell**: `app/admin/layout.tsx` (sidebar + header)
- **Admin pages**: `/admin/drivers`, `/admin/bookings`, `/admin/vehicles`, etc. (12 routes)
- **API**: `app/api/` — Next.js Route Handlers (10 endpoint groups), **not** a separate NestJS server yet
- **SEO pages**: `app/c/[slug]/page.tsx`, `app/pune/`, `app/mumbai/`, route pages (29+ routes generated)

## SEO page generation

Script at `scripts/generate-seo-pages.ts` generates static page files under `app/`. Run: `bun run seo:validate`. The generator **writes files to `app/`** — treat generated pages as owned by the generator, not as hand-authored code.

Structured data helpers in `components/seo/structured-data.tsx` (LocalBusiness, Service, FAQPage, Review schemas).

## State machines

- **Booking**: DRAFT → PENDING → CONFIRMED → ASSIGNED → DRIVER_REACHED → TRIP_STARTED → COMPLETED (with cancellation edges). RBAC-enforced transitions in `lib/state-machines/booking.ts`.
- **Driver**: PENDING_APPROVAL / ACTIVE / INACTIVE / SUSPENDED / DOCUMENT_EXPIRED.
- **Vehicle**: ACTIVE / INACTIVE / MAINTENANCE / DOCUMENT_EXPIRED.

## Design system

- **Theme**: Luxury Black & Gold (`#0A0A0A` / `#D4AF37`), 3 variants (Royal Navy, Modern Emerald, Premium Purple)
- **Typography**: Playfair Display (headings) + Inter (body) — imported via Google Fonts in `styles/globals.css`
- **Framer Motion + GSAP** for animations
- **Tailwind custom colors**: `bg-background`, `text-text-primary`, `bg-surface`, `gold-gradient`, etc.
- Full spec in `design-system/MASTER.md` — reference when styling new components, do not invent new tokens.

## Testing

- **Unit tests** (Jest): `bun run test`. Config in `jest.config.ts` (uses `next/jest` transformer). Tests in `lib/__tests__/` — run against pure utility functions.
- **E2E tests** (Playwright): `bun run test:e2e`. Config in `playwright.config.ts`. Tests in `e2e/`. Requires `npx playwright install chromium` (already done). The dev server auto-starts via the config's `webServer` block; runs on port 3000.
- **Test isolation**: Jest ignores `e2e/` directory via `testPathIgnorePatterns`.
- **Test stack**: Jest 29 + `@testing-library/react` 14 + `@testing-library/jest-dom` 6 + Playwright 1.61.
- **No `.github/workflows`** — set up `ci.yml` runs lint → typecheck → build on push/PR to `main`. Tests intentionally excluded from CI (startup cost without dedicated runners).

## Tech stack

Next.js 15 / React 19 / TypeScript 5 (strict) / Tailwind 3.4 / Prisma 5 / NextAuth 4 / Zod / SWR / React Hook Form / Framer Motion / GSAP / Lucide React.
