"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface RatingDisplayProps {
  score: number;
  totalReviews?: number;
  tier?: string;
  size?: "sm" | "md" | "lg";
  showTier?: boolean;
}

export function RatingDisplay({
  score,
  totalReviews,
  tier,
  size = "md",
  showTier = false,
}: RatingDisplayProps) {
  const fullStars = Math.floor(score);
  const hasHalfStar = score - fullStars >= 0.5;

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => {
          const isFilled = i < fullStars;
          const isHalf = i === fullStars && hasHalfStar;

          return (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Star
                className={`${sizeClasses[size]} ${
                  isFilled || isHalf
                    ? "text-luxury-400 fill-luxury-400"
                    : "text-text-secondary"
                }`}
              />
            </motion.div>
          );
        })}
      </div>

      <span className={`font-bold text-luxury-400 ${textSizeClasses[size]}`}>
        {score.toFixed(1)}
      </span>

      {totalReviews && (
        <span className="text-text-secondary text-sm">({totalReviews})</span>
      )}

      {showTier && tier && (
        <span
          className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getTierStyles(
            tier,
          )}`}
        >
          {tier}
        </span>
      )}
    </div>
  );
}

function getTierStyles(tier: string): string {
  const styles: Record<string, string> = {
    Platinum: "bg-luxury-400/20 text-luxury-400",
    Gold: "bg-luxury-400/15 text-luxury-400",
    Silver: "bg-gray-400/20 text-gray-300",
    Bronze: "bg-amber-600/20 text-amber-500",
    "Needs Improvement": "bg-red-400/20 text-red-400",
  };
  return styles[tier] || "bg-text-secondary/20 text-text-secondary";
}

interface ProgressRingProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
}

export function ProgressRing({
  value,
  max = 100,
  label,
  color = "luxury",
}: ProgressRingProps) {
  const percentage = (value / max) * 100;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    luxury: "stroke-luxury-400",
    green: "stroke-green-400",
    amber: "stroke-amber-400",
    red: "stroke-red-400",
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <svg width="44" height="44" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-surface-light"
          />
          <motion.circle
            cx="22"
            cy="22"
            r={radius}
            strokeWidth="4"
            fill="none"
            className={
              colorClasses[color as keyof typeof colorClasses] ||
              colorClasses.luxury
            }
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              strokeDasharray,
              strokeLinecap: "round",
            }}
          />
          <text
            x="22"
            y="26"
            textAnchor="middle"
            className="text-xs font-bold fill-text-primary"
          >
            {Math.round(percentage)}%
          </text>
        </svg>
      </div>
      {label && <span className="text-sm text-text-secondary">{label}</span>}
    </div>
  );
}
