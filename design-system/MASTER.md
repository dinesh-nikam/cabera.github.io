# Design System Master - Pune Mumbai Cab Booking Platform

## Overview

Premium luxury transportation brand design system with 4 themes inspired by Uber Black, Blacklane, Mercedes-Benz, and Emirates First Class.

## Color Themes

### Primary Theme: Luxury Black & Gold

```
--background: #0A0A0A
--surface: #111111
--surface-light: #1A1A1A
--primary: #D4AF37
--primary-light: #F5E6B3
--text-primary: #FFFFFF
--text-secondary: #D9D9D9
```

### Theme Variants

1. **Royal Navy**: Deep blues (#0B1F3A) with light grays
2. **Modern Emerald**: Dark slate (#0F172A) with emerald accents (#10B981)
3. **Premium Purple**: Deep purple (#1E1B4B) with violet (#7C3AED)

## Typography

### Font Families

- **Headings**: Playfair Display (serif) - luxury, premium feel
- **Body**: Inter (sans-serif) - clean, highly readable

### Type Scale

- Display: 64px / 72px line-height
- H1: 48px / 56px
- H2: 36px / 44px
- H3: 32px / 40px
- H4: 24px / 32px
- Body: 16px / 24px (scale: 14-18px)
- Small: 14px / 20px

### Font Weights

- Light: 300
- Regular: 400
- Medium: 500
- Bold: 700

## Spacing System

- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64
- Container: max-w-7xl (1280px)

## Animation Guidelines

### Duration

- Micro-interactions: 150-300ms
- Page transitions: 300-400ms
- Parallax: 600-800ms

### Easing

- Standard: ease-out (enter), ease-in (exit)
- Natural: spring physics (stiffness: 200, damping: 20)

### Motion Tokens

- `fade-up`: opacity + translateY
- `scale-in`: scale from 0 to 1
- `slide-in`: translateX for directional transitions

## Component Patterns

### Buttons

- Primary: Gold gradient with dark text
- Secondary: Surface background with gold border
- Magnetic effect: Hover attraction with spring physics

### Cards

- Glassmorphism: opacity + backdrop-blur + border
- Tilt effect: 3D transform on hover (rotateX/rotateY)
- Shadow: Luxury soft shadows with gold tint

### Inputs

- Luxury: Dark background with gold focus state
- Floating labels: Smooth transition on focus
- Validation: Real-time with clear error messages

## Accessibility

### Contrast Ratios

- Text on backgrounds: minimum 4.5:1
- Gold on black: compliant
- White on gray: compliant

### Focus States

- Visible focus ring: 2px gold outline
- Focus offset: 2px from interactive element

### Reduced Motion

- All animations respect `prefers-reduced-motion`
- Fallback to instant state changes

## Responsive Breakpoints

- Mobile: 375px (small), 414px (large)
- Tablet: 768px, 1024px
- Desktop: 1280px, 1440px

## Z-Index Scale

- 0: Base elements
- 10: Dropdown menus
- 20: Sticky headers
- 30: Floating CTAs
- 40: Modals
- 50: Notifications
