export type UserRole =
  | "SUPER_ADMIN"
  | "OPERATIONS_MANAGER"
  | "DISPATCHER"
  | "SEO_MANAGER"
  | "CUSTOMER_SUPPORT"
  | "CORPORATE_ADMIN"
  | "CUSTOMER";

export type BookingStatus =
  | "DRAFT"
  | "PENDING"
  | "CONFIRMED"
  | "ASSIGNED"
  | "DRIVER_REACHED"
  | "TRIP_STARTED"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export type VehicleType =
  | "SEDAN"
  | "SUV"
  | "PREMIUM_SUV"
  | "LUXURY"
  | "TEMPO_TRAVELLER"
  | "MINI_BUS";

export type DriverStatus =
  | "PENDING_APPROVAL"
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  | "DOCUMENT_PENDING"
  | "DOCUMENT_EXPIRED";

export type VehicleStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "MAINTENANCE"
  | "DOCUMENT_EXPIRED";

export type FuelType = "PETROL" | "DIESEL" | "CNG" | "ELECTRIC";

export type PaymentMethod =
  | "CASH"
  | "CARD"
  | "UPI"
  | "RAZORPAY"
  | "STRIPE"
  | "WALLET"
  | "CORPORATE_CREDIT";

export type PaymentStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "REFUNDED"
  | "PARTIAL_REFUND";

export type TemplateCategory =
  | "BOOKING_CREATED"
  | "BOOKING_CONFIRMED"
  | "DRIVER_ASSIGNED"
  | "TRIP_STARTED"
  | "TRIP_COMPLETED"
  | "REVIEW_REQUEST"
  | "PROMO"
  | "REMINDER";
