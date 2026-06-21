// ============================================
// DYNAMIC PRICING ENGINE
// ============================================

import { VehicleType } from "@/lib/types";

interface PricingInput {
  routeFrom: string;
  routeTo: string;
  vehicleType: VehicleType;
  distance: number;
  pickupDateTime: Date;
  isCorporate?: boolean;
  corporateId?: string;
  couponCode?: string;
}

interface PricingBreakdown {
  baseFare: number;
  distanceFare: number;
  tollCharges: number;
  driverAllowance: number;
  airportFee: number;
  stateTax: number;
  nightCharges: number;
  promoDiscount: number;
  total: number;
}

export class PricingEngine {
  private static baseRates: Record<VehicleType, number> = {
    SEDAN: 1500,
    SUV: 2000,
    PREMIUM_SUV: 2500,
    LUXURY: 4000,
    TEMPO_TRAVELLER: 2200,
    MINI_BUS: 3500,
  };

  private static perKmRates: Record<VehicleType, number> = {
    SEDAN: 15,
    SUV: 20,
    PREMIUM_SUV: 22,
    LUXURY: 35,
    TEMPO_TRAVELLER: 18,
    MINI_BUS: 25,
  };

  private static driverAllowance: Record<VehicleType, number> = {
    SEDAN: 200,
    SUV: 300,
    PREMIUM_SUV: 400,
    LUXURY: 500,
    TEMPO_TRAVELLER: 350,
    MINI_BUS: 500,
  };

  calculate(input: PricingInput): PricingBreakdown {
    const now = input.pickupDateTime;
    const hour = now.getHours();
    const day = now.getDay();

    // Check if weekend/holiday
    const isWeekend = day === 0 || day === 6;

    // Check if night (10 PM to 5 AM)
    const isNight = hour >= 22 || hour < 5;

    // Base calculation
    let baseFare = PricingEngine.baseRates[input.vehicleType];
    let distanceFare =
      input.distance * PricingEngine.perKmRates[input.vehicleType];
    let driverAllow = PricingEngine.driverAllowance[input.vehicleType];

    // Multipliers
    let nightMultiplier = isNight ? 1.25 : 1;
    let weekendMultiplier = isWeekend ? 1.15 : 1;

    // Special fees for airport transfers
    let airportFee = 0;
    if (
      input.routeTo.toLowerCase().includes("airport") ||
      input.routeFrom.toLowerCase().includes("airport")
    ) {
      airportFee = 200;
    }

    // State tax (5%)
    const stateTax = Math.round(
      (baseFare + distanceFare + driverAllow + airportFee) * 0.05,
    );

    // Calculate total
    const subtotal = baseFare + distanceFare + driverAllow + airportFee;
    const nightCharges = Math.round(subtotal * (isNight ? 0.25 : 0));
    const weekendCharges = Math.round(subtotal * (isWeekend ? 0.15 : 0));

    let total = subtotal + stateTax + nightCharges + weekendCharges;

    // Apply corporate pricing if applicable
    if (input.isCorporate) {
      total = Math.round(total * 0.9); // 10% corporate discount
    }

    // Calculate promo discount
    let promoDiscount = 0;
    if (input.couponCode) {
      promoDiscount = this.applyCoupon(input.couponCode, total);
      total = Math.max(0, total - promoDiscount);
    }

    return {
      baseFare,
      distanceFare,
      tollCharges: 0, // Would be calculated based on route
      driverAllowance: driverAllow,
      airportFee,
      stateTax,
      nightCharges,
      promoDiscount,
      total,
    };
  }

  private applyCoupon(code: string, amount: number): number {
    // Would integrate with Coupon model
    // For now, simple discount logic
    const discounts: Record<string, number> = {
      WELCOME10: amount * 0.1,
      WELCOME20: amount * 0.2,
      CORPORATE5: amount * 0.05,
    };
    return discounts[code] || 0;
  }

  async getRouteDistance(routeFrom: string, routeTo: string): Promise<number> {
    // Would integrate with Google Maps API
    // Return cached/predefined distances for popular routes
    const distances: Record<string, number> = {
      "Pune-Mumbai": 150,
      "Pune-Shirdi": 120,
      "Pune-Nashik": 200,
      "Pune-Mahabaleshwar": 120,
      "Pune-Goa": 450,
      "Mumbai-Shirdi": 250,
    };
    return distances[`${routeFrom}-${routeTo}`] || 150;
  }

  calculateHourlyRate(
    vehicleType: VehicleType,
    hours: number,
    isCorporate: boolean = false,
  ): number {
    const hourlyRates: Record<VehicleType, number> = {
      SEDAN: 400,
      SUV: 500,
      PREMIUM_SUV: 600,
      LUXURY: 1000,
      TEMPO_TRAVELLER: 800,
      MINI_BUS: 1200,
    };

    let total = hourlyRates[vehicleType] * hours;

    if (isCorporate) {
      total = Math.round(total * 0.9);
    }

    return total;
  }
}
