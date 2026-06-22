"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Home,
  Building2,
  Heart,
  Plane,
  Plus,
  X,
  Loader2,
} from "lucide-react";
import type { SavedLocation } from "@/lib/services/saved-location-service";
import savedLocationService from "@/lib/services/saved-location-service";

interface SavedLocationsSelectorProps {
  userId?: string;
  onSelect: (location: SavedLocation) => void;
  selectedType?: "pickup" | "drop";
  className?: string;
}

const locationIcons = {
  HOME: Home,
  WORK: Building2,
  FAVORITE: Heart,
  AIRPORT: Plane,
  OTHER: MapPin,
};

export function SavedLocationsSelector({
  userId,
  onSelect,
  selectedType = "pickup",
  className = "",
}: SavedLocationsSelectorProps) {
  const [locations, setLocations] = useState<SavedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [selectedLocation, setSelectedLocation] =
    useState<SavedLocation | null>(null);

  const label = selectedType === "pickup" ? "Pickup" : "Drop";

  useEffect(() => {
    if (!userId) return;

    const loadLocations = async () => {
      const saved = await savedLocationService.getLocations(userId);
      setLocations(saved);
    };

    loadLocations();
  }, [userId]);

  const handleSaveLocation = async () => {
    if (!selectedLocation || !userId) return;

    const locationToSave = {
      ...selectedLocation,
      label: newLabel || "Saved Location",
    };

    await savedLocationService.saveLocation(userId, locationToSave);
    const updated = await savedLocationService.getLocations(userId);
    setLocations(updated);
    setShowSaveModal(false);
    setNewLabel("");
    setSelectedLocation(null);
  };

  const handleSelectLocation = (loc: SavedLocation) => {
    onSelect(loc);
  };

  const detectCurrentLocation = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const loc: SavedLocation = {
          address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          lat: latitude,
          lng: longitude,
          type: "OTHER",
          label: "Current Location",
          id: `current_${Date.now()}`,
        };
        setSelectedLocation(loc);
        setShowSaveModal(true);
        setIsLoading(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsLoading(false);
      },
    );
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary font-body">
          {label} Location
        </span>
        <button
          onClick={detectCurrentLocation}
          disabled={isLoading}
          className="text-xs text-luxury-400 hover:underline flex items-center gap-1 font-body"
        >
          {isLoading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <MapPin className="w-3 h-3" />
          )}
          Use Current Location
        </button>
      </div>

      {/* Saved Locations */}
      {locations.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {locations.map((loc) => {
            const Icon = locationIcons[loc.type] || MapPin;
            return (
              <button
                key={loc.id}
                onClick={() => handleSelectLocation(loc)}
                className="flex items-center gap-2 px-3 py-2 min-h-[44px] bg-luxury-400/10 hover:bg-luxury-400/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-luxury-400"
              >
                <Icon className="w-4 h-4 text-luxury-400" />
                <span className="text-sm text-white max-w-[150px] truncate">
                  {loc.label}
                </span>
              </button>
            );
          })}

          <button
            onClick={() => {
              setSelectedLocation(null);
              setShowSaveModal(true);
            }}
            className="flex items-center justify-center w-11 h-11 min-h-[44px] bg-surface-light hover:bg-luxury-400/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-luxury-400"
            aria-label="Add new saved location"
          >
            <Plus className="w-4 h-4 text-text-secondary" />
          </button>
        </div>
      )}

      {/* Save Location Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          >
            <div className="card-luxury p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold mb-4 font-heading">
                Save {label} Location
              </h3>

              <input
                type="text"
                placeholder="Location name (e.g., Home, Office)"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="input-luxury w-full mb-4"
                autoFocus
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1 btn-secondary py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveLocation}
                  className="flex-1 btn-primary py-2 rounded-lg"
                  disabled={!selectedLocation && !newLabel}
                >
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
