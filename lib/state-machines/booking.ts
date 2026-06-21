// ============================================
// BOOKING STATE MACHINE
// ============================================

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

type StateTransition = {
  from: BookingStatus;
  to: BookingStatus;
  allowedRoles: string[];
};

export const bookingTransitions: StateTransition[] = [
  {
    from: "DRAFT",
    to: "PENDING",
    allowedRoles: ["CUSTOMER", "DISPATCHER", "OPERATIONS_MANAGER"],
  },
  {
    from: "PENDING",
    to: "CONFIRMED",
    allowedRoles: ["DISPATCHER", "OPERATIONS_MANAGER", "SUPER_ADMIN"],
  },
  {
    from: "CONFIRMED",
    to: "ASSIGNED",
    allowedRoles: ["DISPATCHER", "OPERATIONS_MANAGER"],
  },
  { from: "ASSIGNED", to: "DRIVER_REACHED", allowedRoles: ["DRIVER"] },
  {
    from: "DRIVER_REACHED",
    to: "TRIP_STARTED",
    allowedRoles: ["DRIVER", "CUSTOMER"],
  },
  {
    from: "TRIP_STARTED",
    to: "COMPLETED",
    allowedRoles: ["DRIVER", "DISPATCHER"],
  },
  { from: "DRAFT", to: "CANCELLED", allowedRoles: ["CUSTOMER", "SUPER_ADMIN"] },
  {
    from: "PENDING",
    to: "CANCELLED",
    allowedRoles: ["DISPATCHER", "CUSTOMER", "SUPER_ADMIN"],
  },
  {
    from: "CONFIRMED",
    to: "CANCELLED",
    allowedRoles: ["DISPATCHER", "SUPER_ADMIN"],
  },
  {
    from: "ASSIGNED",
    to: "CANCELLED",
    allowedRoles: ["DISPATCHER", "SUPER_ADMIN"],
  },
  { from: "TRIP_STARTED", to: "COMPLETED", allowedRoles: ["DRIVER"] },
];

export const bookingStatusStateMachine = {
  isValidStatus: (status: string): status is BookingStatus => {
    return [
      "DRAFT",
      "PENDING",
      "CONFIRMED",
      "ASSIGNED",
      "DRIVER_REACHED",
      "TRIP_STARTED",
      "COMPLETED",
      "CANCELLED",
      "NO_SHOW",
    ].includes(status);
  },

  canTransition: (
    from: BookingStatus,
    to: BookingStatus,
    userRole: string,
  ): boolean => {
    const transition = bookingTransitions.find(
      (t) => t.from === from && t.to === to,
    );
    return transition?.allowedRoles.includes(userRole) ?? false;
  },

  getNextStates: (current: BookingStatus): BookingStatus[] => {
    return bookingTransitions
      .filter((t) => t.from === current)
      .map((t) => t.to);
  },
};

// ============================================
// DRIVER STATE MACHINE
// ============================================

export type DriverStatus =
  | "PENDING_APPROVAL"
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  | "DOCUMENT_EXPIRED";

export const driverStatusStateMachine = {
  isValidStatus: (status: string): status is DriverStatus => {
    return [
      "PENDING_APPROVAL",
      "ACTIVE",
      "INACTIVE",
      "SUSPENDED",
      "DOCUMENT_EXPIRED",
    ].includes(status);
  },

  documentExpiryCheck: (driver: {
    licenseExpiry?: Date;
    insuranceExpiry?: Date;
  }): boolean => {
    const now = new Date();
    return !!(
      (driver.licenseExpiry && driver.licenseExpiry < now) ||
      (driver.insuranceExpiry && driver.insuranceExpiry < now)
    );
  },
};

// ============================================
// VEHICLE STATE MACHINE
// ============================================

export type VehicleStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "MAINTENANCE"
  | "DOCUMENT_EXPIRED";

export const vehicleStatusStateMachine = {
  isValidStatus: (status: string): status is VehicleStatus => {
    return ["ACTIVE", "INACTIVE", "MAINTENANCE", "DOCUMENT_EXPIRED"].includes(
      status,
    );
  },

  calculateAvailability: (vehicle: {
    status: VehicleStatus;
    driver?: any;
  }): boolean => {
    return vehicle.status === "ACTIVE" && !!vehicle.driver;
  },
};
