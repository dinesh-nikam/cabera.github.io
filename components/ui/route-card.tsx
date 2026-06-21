"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { AnimatedButton } from "./animated-button";

interface RouteCardProps {
  from: string;
  to: string;
  distance: string;
  duration: string;
  price: number;
  onBook?: () => void;
}

export function RouteCard({
  from,
  to,
  distance,
  duration,
  price,
  onBook,
}: RouteCardProps) {
  return (
    <motion.div
      className="card-luxury p-6"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-luxury-400" />
          <span className="font-medium text-lg">{from}</span>
        </div>
        <ArrowRight className="w-5 h-5 text-luxury-400" />
        <div className="flex items-center gap-3">
          <span className="font-medium text-lg">{to}</span>
          <MapPin className="w-5 h-5 text-luxury-400" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-sm text-text-secondary">Distance</p>
          <p className="font-semibold">{distance}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-text-secondary">Duration</p>
          <p className="font-semibold flex items-center justify-center gap-1">
            <Clock className="w-4 h-4" />
            {duration}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-text-secondary">Starting From</p>
          <p className="font-semibold text-luxury-400">₹{price}</p>
        </div>
      </div>

      <AnimatedButton variant="gold" className="w-full" onClick={onBook}>
        Book Now
      </AnimatedButton>
    </motion.div>
  );
}
