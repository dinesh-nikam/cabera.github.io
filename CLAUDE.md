# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command                      | Description                                       |
| ---------------------------- | ------------------------------------------------- |
| `bun install`                | Install dependencies                              |
| `bun run dev`                | Start Next.js development server (localhost:3000) |
| `bun run build`              | Build for production                              |
| `bun run start`              | Start production server                           |
| `bun run lint`               | Run ESLint + Prettier check                       |
| `bun run lint:fix`           | Auto-fix linting errors                           |
| `bun run typecheck`          | Run TypeScript type checking                      |
| `bun run test`               | Run Jest unit tests                               |
| `bun run test:e2e`           | Run Playwright end-to-end tests                   |
| `bun run prisma migrate dev` | Run database migrations                           |
| `bun run prisma generate`    | Generate Prisma client                            |

## Architecture Overview

This is a **Pune Mumbai Cab Booking Platform** - a premium Next.js application with TypeScript, targeting luxury transportation in Pune/Mumbai markets.

### Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion + GSAP
- **Database**: PostgreSQL with Prisma ORM (SQLite in dev)
- **Auth**: NextAuth + JWT + RBAC (6 roles)
- **Deployment**: Docker + Nginx

### Directory Structure

```
app/          # Next.js App Router pages and API routes
├── admin/    # Admin dashboard (21 pages)
├── api/      # REST API endpoints
├── c/[slug]/ # Programmatic SEO city pages
├── blog/     # Travel blog
├── pune/     # Pune SEO pages (5 pages)
├── mumbai/   # Mumbai SEO pages (4 pages)
└── [route]-* # Route pages (21 total)

components/
├── admin/    # Admin UI components (5)
├── sections/ # Page sections - hero, services, fleet, routes, testimonials, faq
└── ui/       # Reusable UI - navigation, buttons, booking widget, cards, cta

lib/
├── prisma.ts # Prisma client singleton
├── utils.ts  # Utility functions
├── services/ # pricing-engine.ts, whatsapp-service.ts
└── state-machines/ # booking.ts

prisma/       # Database schema
styles/       # globals.css + design tokens
scripts/      # SEO page generator
```

### Design System

- **Primary Theme**: Luxury Black & Gold (#0A0A0A / #D4AF37)
- **Secondary Themes**: Royal Navy, Modern Emerald, Premium Purple
- **Fonts**: Playfair Display (headings) + Inter (body)
- **Animations**: Framer Motion + GSAP with reduced motion support

### Key Features

1. **7-step booking flow** with real-time fare calculation
2. **Booking state machine** (DRAFT → PENDING → CONFIRMED → ASSIGNED → DRIVER_REACHED → TRIP_STARTED → COMPLETED)
3. **Dynamic pricing** engine (night/weekend/holidays multipliers)
4. **Admin dashboard** with KPIs, booking/driver/vehicle management
5. **Programmatic SEO** - 21+ pages for cities, routes, services
6. **WhatsApp automation** for notifications
7. **RBAC** with 6 roles (ADMIN, DRIVER, CUSTOMER, etc.)

### Database Models (14 core models)

`User`, `Driver`, `Vehicle`, `Booking`, `Review`, `PricingRule`, `Coupon`, `CorporateAccount`, `Lead`, `BlogPost`, `SeoPage`, `Payment`, `AuditLog`, `ContactLead`

### SEO Page Types

- City pages: `/pune`, `/mumbai`, area pages
- Service pages: `/pune/local-cab`, `/airport-cab-pune`
- Route pages: `/pune-to-mumbai-cab`
- Blog: `/blog/[slug]`

See `PHASE2-ARCHITECTURE.md` for full system diagrams, state machine, and API endpoints.
