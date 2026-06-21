# Architect Spec: Pune Mumbai Cab Booking Platform

## Overview

A premium cab booking platform targeting Pune and Mumbai markets, designed to compete with local taxi operators, airport transfer companies, corporate travel providers, and outstation cab services. The platform must feel like a luxury transportation brand (Uber Black, Blacklane, Mercedes-Benz) rather than a typical taxi website.

## Design System Architecture

### Color Themes (Multiple Variations)

#### Theme 1: Luxury Black & Gold (Primary)

- Background: `#0A0A0A` (jet black)
- Surface: `#111111` (slightly lighter black)
- Primary Accent: `#D4AF37` (rich gold)
- Secondary Accent: `#F5E6B3` (light gold)
- Text: `#FFFFFF` (white)
- Text Secondary: `#D9D9D9` (light gray)

#### Theme 2: Royal Navy

- Background: `#0B1F3A` (deep navy)
- Surface: `#123C69` (royal blue)
- Text: `#F5F5F5` (off-white)
- Accent: `#FFFFFF` (white)
- Secondary: `#D9D9D9` (gray)

#### Theme 3: Modern Emerald

- Background: `#0F172A` (dark slate)
- Primary: `#10B981` (emerald)
- Surface: `#ECFDF5` (light mint)
- Text: `#FFFFFF` (white)

#### Theme 4: Premium Purple

- Background: `#1E1B4B` (deep purple)
- Primary: `#7C3AED` (violet)
- Surface: `#F5F3FF` (lavender)
- Text: `#FFFFFF` (white)

### Typography System

- **Headings**: Playfair Display (serif) - luxury, premium feel
- **Body**: Inter (sans-serif) - clean, readable
- **Scale**: 12, 14, 16, 18, 24, 32, 48, 64px
- **Weights**: Light (300), Regular (400), Medium (500), Bold (700)

### Spacing System

- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64px
- Container: max-w-7xl (1280px)

### Animation Principles

- Duration: 150-300ms for micro-interactions
- Easing: ease-out for entering, ease-in for exiting
- Spring physics for natural feel
- Reduced motion support

## Component Architecture

### Core Components

1. **BookingWidget** - Multi-step form with real-time fare preview
2. **VehicleCard** - Fleet display with interactive features
3. **RouteCard** - Popular route selection
4. **ServiceCard** - Service offering display
5. **TestimonialCarousel** - Animated testimonials
6. **FAQAccordion** - SEO-rich FAQ section
7. **StickyCTA** - Mobile sticky action buttons

### Animation Components

1. **HeroAnimation** - Split text reveal, parallax background
2. **RoutePathAnimation** - Animated SVG route line
3. **LocationPin** - Animated map pin markers
4. **MagneticButton** - Hover attraction effect
5. **TiltCard** - 3D card tilt on hover

## Homepage Structure

### Hero Section (Critical Path)

- **Headline**: "Premium Cab Service in Pune & Mumbai"
- **Subheadline**: "Airport Transfers, Local Rentals, Corporate Travel & Outstation Cabs Available 24×7"
- **Primary CTAs**:
  - Book Now (gold premium button)
  - Call Now (phone icon)
  - WhatsApp (green branded button)
- **Booking Widget Overlay**:
  - Pickup location input
  - Drop location input
  - Date picker
  - Time picker
  - Trip type selector (One-way, Round-trip, Hourly)
  - Vehicle type selector

### Trust Indicators

- 10,000+ Trips Completed
- 24×7 Service
- GPS Enabled
- Verified Drivers
- Transparent Pricing

### Services Section

1. Airport Transfer
2. Local Taxi
3. Outstation Cab
4. Corporate Travel
5. Wedding Travel
6. Event Transportation
7. Luxury Cars
8. Employee Transport

### Fleet Section

- **Sedan**: Dzire, Etios - 4 passengers, 2 luggage
- **SUV**: Ertiga, Innova - 7 passengers, 4 luggage
- **Premium SUV**: Crysta - 8 passengers, 6 luggage
- **Luxury**: Mercedes, BMW - 4 passengers, premium experience

### Popular Routes (Interactive)

- Pune → Mumbai
- Mumbai → Pune
- Pune → Airport
- Pune → Shirdi
- Pune → Nashik
- Pune → Goa
- Pune → Mahabaleshwar
- Pune → Lonavala

### Why Choose Us

- Luxury feature grid with icons
- Benefits: Verified Drivers, GPS Tracking, Transparent Pricing, 24/7 Support

### Testimonials

- Animated carousel with customer photos
- Star ratings
- Route taken

### FAQ Section (SEO)

- Pricing questions
- Booking process
- Cancellation policy
- Driver verification

## SEO Architecture

### Page Types

#### City Pages (16 total)

- `/pune` - Main Pune page
- `/mumbai` - Main Mumbai page
- Area pages for Pune: Hinjewadi, Wakad, Baner, Aundh, Kharadi, Viman Nagar, Hadapsar, Wagholi
- Area pages for Mumbai: Andheri, Bandra, Powai, Thane, Navi Mumbai, Panvel

#### Service Pages (16 total)

- `/cab-service-pune`
- `/taxi-service-pune`
- `/airport-cab-pune`
- `/pune-airport-taxi`
- `/pune-local-cab`
- `/pune-outstation-cab`
- `/pune-corporate-cab`
- Mumbai equivalents

#### Route Pages (16+ total)

- `/pune-to-mumbai-cab`
- `/mumbai-to-pune-cab`
- `/pune-to-shirdi-cab`
- `/pune-to-nashik-cab`
- `/pune-to-goa-cab`
- `/pune-to-mahabaleshwar-cab`
- `/pune-to-lonavala-cab`
- `/mumbai-to-shirdi-cab`

#### Blog Pages (100+ planned)

- `/blog/pune-airport-guide`
- `/blog/mumbai-airport-guide`
- `/blog/best-places-near-pune`
- `/blog/weekend-trips-mumbai`

### Structured Data Requirements

#### LocalBusiness Schema

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Pune Mumbai Cab Service",
  "serviceArea": ["Pune", "Mumbai"],
  "availableLanguage": ["English", "Marathi", "Hindi"]
}
```

#### Service Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Airport Transfer",
  "provider": "Pune Mumbai Cab Service"
}
```

#### FAQ Schema

Each FAQ section must include FAQPage schema for rich snippets.

## Booking Flow (7 Steps)

1. **Pickup Location** - Autocomplete with GPS detection
2. **Destination** - Location autocomplete
3. **Date & Time** - Calendar + time picker
4. **Vehicle Selection** - Fleet cards with pricing
5. **Fare Summary** - Real-time calculation with taxes
6. **Customer Details** - Name, phone, email
7. **Confirmation** - OTP verification + booking ID

## Lead Generation Elements

### Mobile Sticky CTA

- Fixed bottom bar with Call, WhatsApp, Book Now buttons
- Appears on scroll down

### Desktop Floating CTA

- Floating button on right side
- Expands on hover with contact options

## Technical Constraints

### Performance

- Lighthouse score 95+
- Core Web Vitals optimized
- Lazy loading for images
- Image optimization (WebP/AVIF)
- Bundle splitting for routes

### SEO Requirements

- Canonical URLs on all pages
- Open Graph meta tags
- Twitter Cards
- Sitemap.xml
- Robots.txt
- Internal linking between related pages

### Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- Focus management
- Reduced motion support

## Database Schema (PostgreSQL)

### Core Tables

- `users` - Customer and admin accounts
- `drivers` - Driver profiles and documents
- `vehicles` - Fleet management
- `bookings` - Booking records
- `pricing` - Dynamic pricing rules
- `coupons` - Discount codes
- `reviews` - Customer feedback
- `blog_posts` - SEO content
- `seo_pages` - Custom landing pages

### Key Relationships

- One driver has many vehicles
- One booking has one vehicle, one driver
- One user can have many bookings

## API Architecture (NestJS)

### Endpoints

- `GET /api/v1/bookings` - List bookings
- `POST /api/v1/bookings` - Create booking
- `GET /api/v1/fleet` - Available vehicles
- `GET /api/v1/routes` - Popular routes with pricing
- `GET /api/v1/pricing/calculate` - Fare calculation
- `POST /api/v1/leads` - Lead capture

### Auth

- JWT-based authentication
- RBAC for admin access levels

## Admin Panel Features

- Dashboard with KPIs
- Booking management
- Driver management
- Vehicle management
- Pricing configuration
- Coupon management
- Lead management
- Customer management
- Review moderation
- SEO page editor
- Blog management

## Deliverables

1. Complete design system documentation
2. Homepage implementation
3. All landing page templates
4. Booking flow components
5. Admin dashboard
6. API specification
7. Database schema
8. SEO content framework
