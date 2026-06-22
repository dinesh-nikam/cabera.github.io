"use client";

import { motion } from "framer-motion";
import { Users, Luggage, Star, Info } from "lucide-react";
import { AnimatedButton } from "./animated-button";
import { cn } from "@/lib/utils";

interface VehicleCardProps {
  type: "sedan" | "suv" | "premium-suv" | "luxury";
  name: string;
  image: string;
  capacity: number;
  luggage: number;
  features: string[];
  price: number;
  isSelected?: boolean;
  onSelect?: () => void;
}

const vehicleImages = {
  sedan: "/images/vehicles/sedan.png",
  suv: "/images/vehicles/suv.png",
  "premium-suv": "/images/vehicles/premium-suv.png",
  luxury: "/images/vehicles/luxury.png",
};

const vehicleFeatures = {
  sedan: ["AC", "Music System", "GPS", "First Aid Kit"],
  suv: ["AC", "Music System", "GPS", "First Aid Kit", "Charging Point"],
  "premium-suv": [
    "AC",
    "Music System",
    "GPS",
    "First Aid Kit",
    "Charging Point",
    "Reclining Seats",
  ],
  luxury: [
    "AC",
    "Premium Music",
    "GPS",
    "First Aid Kit",
    "Champagne",
    "Tissue Box",
    "Wi-Fi",
  ],
};

export function VehicleCard({
  type,
  name,
  image,
  capacity,
  luggage,
  features = vehicleFeatures[type] || [],
  price,
  isSelected = false,
  onSelect,
}: VehicleCardProps) {
  return (
    <motion.div
      className={cn(
        "card-luxury p-6 cursor-pointer transition-all duration-300",
        isSelected && "border-luxury-400/50 shadow-lg shadow-luxury-400/10",
      )}
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect?.()}
    >
      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
        <motion.img
          src={image || vehicleImages[type]}
          alt={`${name} vehicle`}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute top-2 right-2 bg-luxury-400/90 text-background px-3 py-1 rounded-full text-sm font-semibold">
          ₹{price}
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2">{name}</h3>

      <div className="flex items-center gap-4 mb-4 text-text-secondary">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span className="text-sm">{capacity} Passengers</span>
        </div>
        <div className="flex items-center gap-1">
          <Luggage className="w-4 h-4" />
          <span className="text-sm">{luggage} Luggage</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-text-secondary mb-2">Features:</p>
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <span
              key={feature}
              className="text-xs px-2 py-1 bg-luxury-400/10 text-luxury-400 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      <AnimatedButton
        variant={isSelected ? "primary" : "secondary"}
        size="sm"
        className="w-full"
        onClick={onSelect}
      >
        {isSelected ? "Selected" : "Select Vehicle"}
      </AnimatedButton>
    </motion.div>
  );
}
