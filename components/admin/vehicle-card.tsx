"use client";

import { motion } from "framer-motion";
import {
  Car,
  Users,
  Luggage,
  Calendar,
  Fuel,
  MoreVertical,
} from "lucide-react";
import { RatingDisplay } from "./rating-display";
import { getRatingTier } from "@/lib/services/rating-algorithm";

interface VehicleCardProps {
  vehicle: {
    id: string;
    registrationNumber: string;
    make: string;
    model: string;
    vehicleType: string;
    seatingCapacity: number;
    luggageCapacity: number;
    fuelType: string;
    year: number;
    color?: string;
    status: "ACTIVE" | "INACTIVE" | "MAINTENANCE" | "DOCUMENT_EXPIRED";
    driver?: {
      id: string;
      name: string;
      rating: number;
    } | null;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function VehicleCard({ vehicle, onEdit, onDelete }: VehicleCardProps) {
  const tier = vehicle.driver?.rating
    ? getRatingTier(vehicle.driver.rating)
    : "New";

  return (
    <motion.div
      className="card-luxury p-6"
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-luxury-400/20 rounded-lg flex items-center justify-center">
            <Car className="w-6 h-6 text-luxury-400" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{vehicle.registrationNumber}</h3>
            <p className="text-text-secondary">
              {vehicle.make} {vehicle.model} ({vehicle.year})
            </p>
            {vehicle.color && (
              <p className="text-sm text-text-secondary mt-1">
                Color: {vehicle.color}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={vehicle.status} />
          <div className="relative">
            <button
              className="p-2 rounded-lg hover:bg-luxury-400/10 transition-colors"
              aria-label="Vehicle actions"
            >
              <MoreVertical className="w-4 h-4 text-text-secondary" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <Users className="w-5 h-5 mx-auto mb-1 text-luxury-400" />
          <p className="text-sm text-text-secondary">Seats</p>
          <p className="font-semibold">{vehicle.seatingCapacity}</p>
        </div>
        <div className="text-center">
          <Luggage className="w-5 h-5 mx-auto mb-1 text-luxury-400" />
          <p className="text-sm text-text-secondary">Luggage</p>
          <p className="font-semibold">{vehicle.luggageCapacity}</p>
        </div>
        <div className="text-center">
          <Fuel className="w-5 h-5 mx-auto mb-1 text-luxury-400" />
          <p className="text-sm text-text-secondary">Fuel</p>
          <p className="font-semibold">{vehicle.fuelType}</p>
        </div>
      </div>

      {vehicle.driver && (
        <div className="border-t border-white/10 pt-4 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Assigned Driver</p>
              <p className="font-medium">{vehicle.driver.name}</p>
            </div>
            <RatingDisplay
              score={vehicle.driver.rating}
              totalReviews={128}
              tier={tier}
              size="sm"
              showTier
            />
          </div>
          <button
            onClick={() => onEdit(vehicle.id)}
            className="mt-3 text-sm text-luxury-400 hover:underline"
          >
            Change Driver
          </button>
        </div>
      )}

      {!vehicle.driver && (
        <div className="border-t border-white/10 pt-4 mt-4">
          <button
            onClick={() => onEdit(vehicle.id)}
            className="text-sm text-luxury-400 hover:underline"
          >
            Assign Driver
          </button>
        </div>
      )}
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    ACTIVE: { label: "Active", className: "bg-green-500/20 text-green-400" },
    INACTIVE: { label: "Inactive", className: "bg-text-secondary/20" },
    MAINTENANCE: {
      label: "Maintenance",
      className: "bg-amber-500/20 text-amber-400",
    },
    DOCUMENT_EXPIRED: {
      label: "Docs Expired",
      className: "bg-red-500/20 text-red-400",
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.INACTIVE;

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
