import "@prisma/client";

declare module "@prisma/client" {
  export type VehicleType =
    | "SEDAN"
    | "SUV"
    | "PREMIUM_SUV"
    | "LUXURY"
    | "TEMPO_TRAVELLER"
    | "MINI_BUS";
  export type TemplateCategory = "BOOKING" | "PROMO" | "ALERTS" | "SUPPORT";
  export type BookingStatus =
    | "DRAFT"
    | "PENDING"
    | "CONFIRMED"
    | "ASSIGNED"
    | "DRIVER_REACHED"
    | "TRIP_STARTED"
    | "COMPLETED"
    | "CANCELLED";
}
