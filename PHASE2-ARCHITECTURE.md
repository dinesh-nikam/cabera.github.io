# Phase 2 Enterprise Architecture

## Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    LOAD BALANCER (NGINX)                         │
└─────────────────────────────────────────────────────────────────┘
                                │
        ┌─────────────────────────┼─────────────────────────┐
        ▼                         ▼                         ▼
┌───────────────┐      ┌───────────────┐      ┌───────────────┐
│   Next.js     │      │   Next.js     │      │   Next.js     │
│   App (SSR)   │      │   App (API)   │      │   App (SSR)   │
└───────────────┘      └───────────────┘      └───────────────┘
        │                       │                       │
        └─────────────────────────┼─────────────────────────┘
                                ▼
                    ┌───────────────────────────┐
                    │      PostgreSQL DB         │
                    │    • Users & Auth        │
                    │    • Bookings            │
                    │    • Drivers & Vehicles    │
                    │    • Payments & Coupons    │
                    │    • SEO Pages           │
                    └───────────────────────────┘
                                │
                    ┌───────────────────────────┐
                    │        Redis Cache         │
                    │    • Session Storage       │
                    │    • Rate Limiting         │
                    │    • Queue (BullMQ)        │
                    └───────────────────────────┘
```

## Database ER Diagram

```mermaid
erDiagram
    USER ||--o{ BOOKING : creates
    USER ||--o{ REVIEW : writes
    USER ||--o{ SEOPAGE : manages
    USER ||--o{ AUDITLOG : generates
    CUSTOMER ||--o{ BOOKING : has
    CUSTOMER ||--o{ REVIEW : writes
    DRIVER ||--o{ BOOKING : assigned_to
    DRIVER ||--o{ VEHICLE : drives
    DRIVER ||--o{ REVIEW : receives
    VEHICLE ||--o{ BOOKING : used_for
    BOOKING ||--o| PAYMENT : has
    BOOKING ||--o| REVIEW : has
    BOOKING }|--|| CORPORATEACCOUNT : for
    BOOKING }|--o{ COUPON : uses
    CORPORATEACCOUNT ||--o{ EMPLOYEE : employs
    CONTACTLEAD }|--o{ USER : assigned_to
```

## Booking State Machine

```mermaid
stateDiagram-v2
    [*] --> DRAFT
    DRAFT --> PENDING: Customer confirms
    PENDING --> CONFIRMED: Admin approves
    CONFIRMED --> ASSIGNED: Driver assigned
    ASSIGNED --> DRIVER_REACHED: Driver arrived
    DRIVER_REACHED --> TRIP_STARTED: Trip begins
    TRIP_STARTED --> COMPLETED: Trip ends
    DRAFT --> CANCELLED: User cancels
    PENDING --> CANCELLED: Admin cancels
    CONFIRMED --> CANCELLED: Admin cancels
    ASSIGNED --> CANCELLED: Admin cancels
    TRIP_STARTED --> COMPLETED: Must complete
```

## API Architecture

```
/api/v1/
├── auth/
│   ├── login
│   ├── logout
│   ├── refresh
│   └── me
├── bookings/
│   ├── GET / - list bookings
│   ├── POST / - create booking
│   ├── GET /[id] - get booking
│   ├── PUT /[id]/status - update status
│   └── POST /[id]/assign-driver
├── customers/
│   ├── GET / - list customers
│   ├── POST / - create customer
│   └── GET /[id] - get customer
├── drivers/
│   ├── GET / - list drivers
│   ├── PUT /[id]/status - update status
│   └── PUT /[id]/location - update location
├── vehicles/
│   ├── GET / - list vehicles
│   └── PUT /[id]/status - update status
├── pricing/
│   └── POST /calculate - calculate fare
├── payments/
│   ├── POST /create - create payment
│   └── POST /verify - verify payment
├── analytics/
│   └── GET /dashboard - get metrics
└── seo/
    └── GET /[slug] - get SEO page
```

## Programmatic SEO Flow

```mermaid
flowchart TD
    A[Database Template] --> B
    B[SEO Page Generator] --> C
    C[Variable Substitution] --> D
    D[Static Generation] --> E
    E[Next.js ISR] --> F
    F[CDN Cache] --> G[Public Page]
    G --> H[Search Engine Index]
```

## Security Architecture

```mermaid
flowchart LR
    A[Client Request] --> B{JWT Valid?}
    B -->|No| C[401 Unauthorized]
    B -->|Yes| D{RBAC Check}
    D -->|No Access| E[403 Forbidden]
    D -->|Has Access| F[Rate Limit Check]
    F -->|Exceed| G[429 Too Many Requests]
    F -->|OK| H[CSRF Validation]
    H -->|Fail| I[403 Forbidden]
    H -->|Pass| J[Request Processing]
    J -->|Log| K[Audit Logger]
```

## Analytics Event Flow

```mermaid
flowchart LR
    A[Booking Created] --> B(WA Service)
    A --> C(Email Service)
    A --> D(Analytics Logger)
    E[Trip Started] --> F(WA Service)
    E --> D
    G[Trip Completed] --> H(WA Service)
    G --> D
    D --> I[Database]
```

## Deployment Architecture

```
Production Environment:
┌─────────────────────────────────────────────────────────┐
│                  Load Balancer                          │
└─────────────────────────────────────────────────────────┘
                    │
    ┌───────────────┼───────────────┐
    ▼               ▼               ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│ Web      │  │ Web      │  │ Web      │
│ Server 1 │  │ Server 2 │  │ Server 3 │
└──────────┘  └──────────┘  └──────────┘
    │               │               │
    └───────────────┼───────────────┘
                    ▼
        ┌───────────────────────┐
        │   PostgreSQL DB       │
        │   + Read Replica      │
        └───────────────────────┘
                    │
        ┌───────────────────────┐
        │       Redis Cluster     │
        └───────────────────────┘
```
