# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command                                | Description                                       |
| -------------------------------------- | ------------------------------------------------- |
| `bun install`                          | Install dependencies                              |
| `bun run dev`                          | Start Next.js development server (localhost:3000) |
| `bun run build`                        | Build for production                              |
| `bun run start`                        | Start production server                           |
| `bun run lint`                         | Run ESLint + Prettier check                       |
| `bun run lint:fix`                     | Auto-fix linting errors                           |
| `bun run typecheck`                    | Run TypeScript type checking                      |
| `bun run test`                         | Run Jest unit tests                               |
| `bun test lib/__tests__/utils.test.ts` | Run single test file                              |
| `bun run test:e2e`                     | Run Playwright end-to-end tests                   |
| `bun run prisma migrate dev`           | Run database migrations                           |
| `bun run prisma generate`              | Generate Prisma client                            |
| `bun run seo:validate`                 | Validate SEO pages                                |

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

## UI Components Architecture

### Component Patterns

| Component         | Pattern                                         |
| ----------------- | ----------------------------------------------- |
| `TrackingMap`     | Three.js route visualization with driver marker |
| `PaymentCheckout` | Payment modal with Razorpay/Stripe/UPI support  |

### Payment Integration

- **PaymentService** in `lib/services/payment-service.ts` handles:
  - Razorpay order creation
  - Stripe payment intents
  - UPI payment processing
- **PaymentCheckout** component provides UI for card/UPI/netbanking
- API endpoint: `/api/payments/create` for order creation

### Booking Tracking

- **TrackingProvider** in `lib/tracking/tracking-context.tsx` provides SSE connection
- **TrackingMap** component renders 3D map with driver location
- API endpoint: `/api/tracking/ws` streams location updates
- **Booking Flow**: Uses `BookingWidget` with 7 sequential steps (pickup → drop → datetime → vehicle → summary → details → confirmation)
- **Animation System**: Custom hooks in `lib/motion/motion-system.ts` for magnetic effects, reduced motion support
- **Form Validation**: Inline validation with aria-live regions, errors displayed near fields

### Accessibility Requirements

- All interactive elements must be minimum 44×44px touch targets
- Use `text-error` for error states (higher contrast #FF6B6B on dark background)
- Reduced motion: Use `motion-reduce:animate-none` on spinning animations
- Skip links in admin layout for keyboard navigation
