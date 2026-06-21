# Pune Mumbai Cab Booking API

## Overview

NestJS-based REST API for the cab booking platform with JWT authentication and RBAC.

## Endpoints

### Public Endpoints

- `GET /api/v1/fleet` - Get available vehicles
- `GET /api/v1/routes` - Get popular routes with pricing
- `POST /api/v1/bookings` - Create new booking
- `GET /api/v1/bookings/:id` - Get booking details
- `PUT /api/v1/bookings/:id/status` - Update booking status (limited)
- `POST /api/v1/pricing/calculate` - Calculate fare
- `POST /api/v1/leads` - Capture lead

### Protected Endpoints (Customer)

- `GET /api/v1/bookings/my` - Get customer's bookings
- `POST /api/v1/bookings/:id/rate` - Rate driver after trip
- `POST /api/v1/bookings/:id/cancel` - Cancel booking

### Protected Endpoints (Driver)

- `GET /api/v1/bookings/assigned` - Get assigned bookings
- `PUT /api/v1/bookings/:id/start` - Start trip
- `PUT /api/v1/bookings/:id/complete` - Complete trip
- `PUT /api/v1/driver/location` - Update driver location

### Protected Endpoints (Admin)

- `GET /api/v1/admin/bookings` - All bookings listing
- `GET /api/v1/admin/drivers` - All drivers listing
- `GET /api/v1/admin/vehicles` - All vehicles listing
- `POST /api/v1/admin/pricing` - Create pricing rule
- `PUT /api/v1/admin/booking/:id/assign` - Assign driver to booking
- `GET /api/v1/admin/leads` - All leads
- `GET /api/v1/admin/analytics` - Dashboard analytics

## Authentication

- JWT-based authentication
- Access tokens expire in 1 hour
- Refresh tokens expire in 30 days
- RBAC for role-based access control
