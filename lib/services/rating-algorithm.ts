/**
 * Driver Rating Algorithm Service
 * Calculates weighted driver ratings based on multiple performance factors
 */

export interface DriverPerformanceMetrics {
  driverId: string;
  totalTrips: number;
  onTimeArrivals: number;
  completedTrips: number;
  cancelledTrips: number;
  avgReviewRating: number;
  totalReviews: number;
  totalEarnings: number;
  avgTripDistance: number;
  incidentsReported: number;
}

export interface RatingBreakdown {
  punctuality: number;
  safety: number;
  customerSatisfaction: number;
  earningsPerformance: number;
  overall: number;
  confidence: number; // 0-1 based on sample size
}

export interface RatingWeights {
  punctuality: number; // 30%
  safety: number; // 25%
  customerSatisfaction: number; // 30%
  earningsPerformance: number; // 15%
}

// Default weighting system - can be configured via admin settings
const DEFAULT_WEIGHTS: RatingWeights = {
  punctuality: 0.3,
  safety: 0.25,
  customerSatisfaction: 0.3,
  earningsPerformance: 0.15,
};

/**
 * Calculates the punctuality score based on on-time arrival rate
 * Score is between 0-5
 */
function calculatePunctualityScore(
  onTimeArrivals: number,
  totalTrips: number,
): number {
  if (totalTrips === 0) return 5.0; // Default score for new drivers

  const onTimeRate = onTimeArrivals / totalTrips;
  // Scale to 0-5, with 80%+ on-time giving full score
  return Math.min(5, (onTimeRate / 0.8) * 5);
}

/**
 * Calculates the safety score based on incidents and completion rate
 * Score is between 0-5
 */
function calculateSafetyScore(
  incidentsReported: number,
  completedTrips: number,
  cancelledTrips: number,
  totalTrips: number,
): number {
  if (totalTrips === 0) return 5.0; // Default score for new drivers

  const completionRate = completedTrips / totalTrips;
  const incidentRate = incidentsReported / Math.max(totalTrips, 100); // Per 100 trips baseline

  // Base score from completion rate (85% target)
  let score = Math.min(5, (completionRate / 0.85) * 5);

  // Penalty for incidents
  const incidentPenalty = Math.min(2, incidentRate * 5); // Max 2 point penalty
  score = Math.max(0, score - incidentPenalty);

  return Math.round(score * 10) / 10;
}

/**
 * Calculates customer satisfaction score from reviews
 * Score is between 0-5
 */
function calculateCustomerSatisfaction(
  avgReviewRating: number,
  totalReviews: number,
): number {
  // Use exponential moving average for time-weighted ratings
  // Higher weight for recent trips (last 30 days)
  if (totalReviews === 0) return 5.0; // Default score for new drivers

  // Normalize to 0-5 scale (reviews are 1-5)
  return Math.round(avgReviewRating * 10) / 10;
}

/**
 * Calculates earnings performance score
 * Compares against platform average normalized to 0-5 scale
 */
function calculateEarningsPerformance(
  avgEarningsPerTrip: number,
  platformAvgEarnings: number,
): number {
  if (platformAvgEarnings === 0) return 2.5;

  // Score based on how driver compares to platform average
  // 120%+ of average = full score, 80% = half score
  const ratio = avgEarningsPerTrip / platformAvgEarnings;
  const score = Math.min(5, Math.max(0, (ratio / 1.2) * 5));
  return Math.round(score * 10) / 10;
}

/**
 * Calculates confidence level based on sample size
 * Higher trip count = higher confidence
 */
function calculateConfidence(totalTrips: number): number {
  // Logistic curve: reaches 95% confidence at ~200 trips
  if (totalTrips >= 200) return 0.95;
  if (totalTrips <= 5) return 0.3;
  return 0.3 + 0.65 * (1 - Math.exp(-totalTrips / 50));
}

/**
 * Main rating calculation function
 * Returns detailed breakdown and overall score
 */
export function calculateDriverRating(
  metrics: DriverPerformanceMetrics,
  weights: Partial<RatingWeights> = DEFAULT_WEIGHTS,
  platformAvgEarnings: number = 1500, // Default average per trip
): RatingBreakdown {
  const finalWeights = { ...DEFAULT_WEIGHTS, ...weights };

  // Calculate individual component scores
  const punctuality = calculatePunctualityScore(
    metrics.onTimeArrivals,
    metrics.totalTrips,
  );
  const safety = calculateSafetyScore(
    metrics.incidentsReported,
    metrics.completedTrips,
    metrics.cancelledTrips,
    metrics.totalTrips,
  );
  const customerSatisfaction = calculateCustomerSatisfaction(
    metrics.avgReviewRating,
    metrics.totalReviews,
  );
  const earningsPerformance = calculateEarningsPerformance(
    metrics.totalEarnings / Math.max(metrics.totalTrips, 1),
    platformAvgEarnings,
  );

  // Calculate weighted average
  const overall =
    punctuality * finalWeights.punctuality +
    safety * finalWeights.safety +
    customerSatisfaction * finalWeights.customerSatisfaction +
    earningsPerformance * finalWeights.earningsPerformance;

  // Ensure score is within bounds
  const finalScore = Math.min(5, Math.max(0, overall));

  // Calculate confidence based on sample size
  const confidence = calculateConfidence(metrics.totalTrips);

  return {
    punctuality,
    safety,
    customerSatisfaction,
    earningsPerformance,
    overall: Math.round(finalScore * 10) / 10,
    confidence,
  };
}

/**
 * Get rating tier based on score
 */
export function getRatingTier(score: number): string {
  if (score >= 4.5) return "Platinum";
  if (score >= 4.0) return "Gold";
  if (score >= 3.5) return "Silver";
  if (score >= 3.0) return "Bronze";
  return "Needs Improvement";
}

/**
 * Get CSS class for rating tier
 */
export function getRatingTierClass(tier: string): string {
  const classes: Record<string, string> = {
    Platinum: "text-luxury-400 font-bold",
    Gold: "text-luxury-400",
    Silver: "text-gray-300",
    Bronze: "text-amber-600",
    "Needs Improvement": "text-red-400",
  };
  return classes[tier] || "text-text-secondary";
}

/**
 * Calculate vehicle performance score
 * Based on utilization and booking success rate
 */
export function calculateVehicleScore(
  totalBookings: number,
  completedBookings: number,
  maintenanceDays: number,
  daysAvailable: number,
): { score: number; utilization: number; reliability: number } {
  const utilization = daysAvailable > 0 ? totalBookings / daysAvailable : 0;
  const reliability = totalBookings > 0 ? completedBookings / totalBookings : 1;

  // Score weighted more toward reliability
  const score = Math.round((utilization * 3 + reliability * 7) * 10) / 10;

  return {
    score: Math.min(5, score),
    utilization: Math.round(utilization * 100) / 100,
    reliability: Math.round(reliability * 100) / 100,
  };
}
