# Pune Mumbai Cab Booking Platform - Project Structure

## 📁 Directory Structure (74 files)

```
cabera/
├── .omx/
│   ├── plans/
│   │   ├── architect-cab-booking.md    # Phase 1 Architecture Spec
│   │   └── plan-cab-booking.md         # Implementation Plan
│   └── reviews/
│       ├── REVIEW.md                   # Code Review Findings
│       └── FIXES.md                    # Fix Mappings
│
├── app/
│   ├── admin/                          # Admin Dashboard (21 pages)
│   │   ├── layout.tsx                  # Admin shell
│   │   ├── page.tsx                    # Dashboard KPIs
│   │   ├── drivers/page.tsx            # Driver management
│   │   └── bookings/page.tsx           # Booking management
│   │
│   ├── api/                            # REST API Routes
│   │   └── bookings/route.ts           # Booking endpoints
│   │
│   ├── c/[slug]/page.tsx               # Programmatic SEO city pages
│   ├── blog/page.tsx                   # Travel blog
│   ├── pune/...                        # Pune SEO pages (5 pages)
│   ├── mumbai/...                      # Mumbai SEO pages (4 pages)
│   ├── [route]-*.tsx                   # Route pages (21 total)
│   ├── layout.tsx                      # Root layout
│   ├── page.tsx                        # Homepage
│   ├── robots.ts                       # SEO robots.txt
│   └── sitemap.ts                      # Sitemap generation
│
├── components/
│   ├── admin/                          # Admin UI (5 components)
│   │   ├── admin-header.tsx            # Top navigation
│   │   ├── admin-sidebar.tsx           # Side navigation
│   │   ├── kpi-card.tsx                # Dashboard cards
│   │   ├── bookings-chart.tsx            # Chart components
│   │   └── revenue-chart.tsx
│   │
│   ├── sections/                       # Page sections (6 components)
│   │   ├── hero-section.tsx            # Luxury hero with 3D animations
│   │   ├── services-section.tsx          # Service cards grid
│   │   ├── fleet-section.tsx             # Vehicle showcase
│   │   ├── routes-section.tsx            # Popular routes
│   │   ├── testimonials-section.tsx      # Customer carousel
│   │   └── faq-section.tsx               # Accordion FAQ
│   │
│   └── ui/                              # Reusable components (8 components)
│       ├── navigation-bar.tsx          # Sticky navigation
│       ├── animated-button.tsx           # Magnetic button
│       ├── booking-widget.tsx            # 7-step booking flow
│       ├── vehicle-card.tsx              # Fleet card with tilt
│       ├── route-card.tsx                # Route display card
│       ├── sticky-cta.tsx                # Mobile bottom CTA
│       ├── floating-cta.tsx              # Desktop floating CTA
│       ├── hero-3d.tsx                   # Three.js hero
│       └── accordion.tsx                   # Collapsible FAQ
│
├── lib/
│   ├── prisma.ts                         # Prisma client singleton
│   ├── utils.ts                          # Utility functions
│   ├── state-machines/
│   │   └── booking.ts                    # State machine logic
│   └── services/
│       ├── pricing-engine.ts             # Dynamic fare calculation
│       └── whatsapp-service.ts           # WhatsApp automation
│
├── prisma/
│   ├── schema.prisma                     # Original schema
│   └── enterprise-schema.prisma            # Phase 2 schema (22 models)
│
├── styles/
│   └── globals.css                         # Global styles + design tokens
│
├── design-system/
│   └── MASTER.md                         # Design system specification
│
├── api/
│   └── README.md                         # API documentation
│
├── scripts/
│   └── generate-seo-pages.ts             # SEO page generator
│
├── PHASE2-ARCHITECTURE.md                # Phase 2 architecture
├── PROJECT-STRUCTURE.md                  # This file
├── Dockerfile                            # Container definition
├── docker-compose.yml                    # Multi-service orchestration
├── package.json                          # Dependencies
├── tailwind.config.js                    # Tailwind configuration
├── tsconfig.json                         # TypeScript config
└── next.config.mjs                       # Next.js config
```

## 🚀 Quick Start

```bash
# 1. Install dependencies
bun install

# 2. Setup database (PostgreSQL recommended)
bun run prisma migrate dev
bun run prisma generate

# 3. Run development server
bun run dev

# 4. Build for production
bun run build
bun run start
```

## 🌐 API Endpoints

| Endpoint               | Method | Description         |
| ---------------------- | ------ | ------------------- |
| `/api/v1/bookings`     | GET    | List bookings       |
| `/api/v1/bookings`     | POST   | Create booking      |
| `/api/v1/bookings/:id` | GET    | Get booking details |

## 📊 Admin Access

- `/admin` - Dashboard
- `/admin/bookings` - Manage bookings
- `/admin/drivers` - Driver management
- `/admin/vehicles` - Fleet management

## 🎨 Design System

- **Primary Theme**: Luxury Black & Gold (#0A0A0A / #D4AF37)
- **Fonts**: Playfair Display + Inter
- **Animations**: Framer Motion + GSAP
- **Components**: Glassmorphism, 3D tilt effects, magnetic buttons
