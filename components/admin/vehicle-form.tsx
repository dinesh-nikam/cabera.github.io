"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Car, FuelIcon, Calendar, Tag } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";

interface VehicleFormProps {
  initialData?: VehicleFormData;
  drivers: Array<{ id: string; name: string }>;
  onSubmit: (data: VehicleFormData) => Promise<void>;
  onCancel: () => void;
}

interface VehicleFormData {
  registrationNumber: string;
  make: string;
  model: string;
  vehicleType: string;
  seatingCapacity: number;
  luggageCapacity: number;
  fuelType: string;
  color?: string;
  year: number;
  insuranceExpiry: string;
  permitExpiry: string;
  features: string[];
}

const VEHICLE_TYPES = [
  { value: "SEDAN", label: "Sedan", capacity: 4, luggage: 2 },
  { value: "SUV", label: "SUV", capacity: 7, luggage: 4 },
  { value: "PREMIUM_SUV", label: "Premium SUV", capacity: 8, luggage: 6 },
  { value: "LUXURY", label: "Luxury", capacity: 4, luggage: 3 },
  {
    value: "TEMPO_TRAVELLER",
    label: "Tempo Traveller",
    capacity: 12,
    luggage: 8,
  },
  { value: "MINI_BUS", label: "Mini Bus", capacity: 20, luggage: 15 },
];

const FUEL_TYPES = [
  { value: "PETROL", label: "Petrol" },
  { value: "DIESEL", label: "Diesel" },
  { value: "CNG", label: "CNG" },
  { value: "ELECTRIC", label: "Electric" },
];

export function VehicleForm({
  initialData,
  drivers,
  onSubmit,
  onCancel,
}: VehicleFormProps) {
  const [formData, setFormData] = useState<VehicleFormData>(
    initialData || {
      registrationNumber: "",
      make: "",
      model: "",
      vehicleType: "",
      seatingCapacity: 4,
      luggageCapacity: 2,
      fuelType: "PETROL",
      year: new Date().getFullYear(),
      insuranceExpiry: "",
      permitExpiry: "",
      features: [],
    },
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.registrationNumber) {
      newErrors.registrationNumber = "Registration number is required";
    }
    if (!formData.make) {
      newErrors.make = "Make is required";
    }
    if (!formData.model) {
      newErrors.model = "Model is required";
    }
    if (!formData.vehicleType) {
      newErrors.vehicleType = "Vehicle type is required";
    }
    if (!formData.insuranceExpiry) {
      newErrors.insuranceExpiry = "Insurance expiry is required";
    }
    if (!formData.permitExpiry) {
      newErrors.permitExpiry = "Permit expiry is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVehicleTypeChange = (type: string) => {
    const selectedType = VEHICLE_TYPES.find((vt) => vt.value === type);
    setFormData((prev) => ({
      ...prev,
      vehicleType: type,
      seatingCapacity: selectedType?.capacity || prev.seatingCapacity,
      luggageCapacity: selectedType?.luggage || prev.luggageCapacity,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      aria-label="Vehicle form"
    >
      {/* Registration Number */}
      <div>
        <label
          className="text-sm text-text-secondary mb-2 block"
          htmlFor="registration-number"
        >
          Registration Number *
        </label>
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
          <input
            id="registration-number"
            type="text"
            placeholder="MH-12-AB-1234"
            value={formData.registrationNumber}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                registrationNumber: e.target.value.toUpperCase(),
              }))
            }
            className={`input-luxury pl-12 w-full ${
              errors.registrationNumber ? "border-error" : ""
            }`}
            aria-invalid={!!errors.registrationNumber}
            aria-describedby={
              errors.registrationNumber ? "registration-error" : undefined
            }
            autoComplete="off"
            inputMode="text"
          />
        </div>
        {errors.registrationNumber && (
          <p
            id="registration-error"
            className="text-error text-sm mt-1"
            role="alert"
          >
            {errors.registrationNumber}
          </p>
        )}
      </div>

      {/* Make & Model */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="text-sm text-text-secondary mb-2 block"
            htmlFor="make"
          >
            Make *
          </label>
          <div className="relative">
            <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
            <input
              id="make"
              type="text"
              placeholder="Toyota"
              value={formData.make}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, make: e.target.value }))
              }
              className={`input-luxury pl-12 w-full ${
                errors.make ? "border-error" : ""
              }`}
              aria-invalid={!!errors.make}
            />
          </div>
        </div>

        <div>
          <label
            className="text-sm text-text-secondary mb-2 block"
            htmlFor="model"
          >
            Model *
          </label>
          <input
            id="model"
            type="text"
            placeholder="Innova Crysta"
            value={formData.model}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, model: e.target.value }))
            }
            className={`input-luxury w-full ${
              errors.model ? "border-error" : ""
            }`}
            aria-invalid={!!errors.model}
          />
        </div>
      </div>

      {/* Vehicle Type */}
      <div>
        <label className="text-sm text-text-secondary mb-2 block">
          Vehicle Type *
        </label>
        <div className="grid grid-cols-3 gap-2">
          {VEHICLE_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => handleVehicleTypeChange(type.value)}
              className={`min-h-[44px] py-3 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-luxury-400 ${
                formData.vehicleType === type.value
                  ? "bg-luxury-400 text-background"
                  : "bg-surface-light hover:bg-luxury-400/10"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Capacity */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="text-sm text-text-secondary mb-2 block"
            htmlFor="seating"
          >
            Seating Capacity
          </label>
          <input
            id="seating"
            type="number"
            min="1"
            max="25"
            value={formData.seatingCapacity}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                seatingCapacity: parseInt(e.target.value) || 1,
              }))
            }
            className="input-luxury w-full"
          />
        </div>

        <div>
          <label
            className="text-sm text-text-secondary mb-2 block"
            htmlFor="luggage"
          >
            Luggage Capacity
          </label>
          <input
            id="luggage"
            type="number"
            min="0"
            max="20"
            value={formData.luggageCapacity}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                luggageCapacity: parseInt(e.target.value) || 0,
              }))
            }
            className="input-luxury w-full"
          />
        </div>
      </div>

      {/* Fuel Type & Year */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="text-sm text-text-secondary mb-2 block"
            htmlFor="fuel"
          >
            Fuel Type
          </label>
          <select
            id="fuel"
            value={formData.fuelType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, fuelType: e.target.value }))
            }
            className="input-luxury w-full appearance-none cursor-pointer"
          >
            {FUEL_TYPES.map((fuel) => (
              <option key={fuel.value} value={fuel.value}>
                {fuel.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="text-sm text-text-secondary mb-2 block"
            htmlFor="year"
          >
            Year
          </label>
          <input
            id="year"
            type="number"
            min="2010"
            max={new Date().getFullYear() + 1}
            value={formData.year}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                year: parseInt(e.target.value) || new Date().getFullYear(),
              }))
            }
            className="input-luxury w-full"
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="text-sm text-text-secondary mb-2 block"
            htmlFor="insurance"
          >
            Insurance Expiry *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
            <input
              id="insurance"
              type="date"
              value={formData.insuranceExpiry}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  insuranceExpiry: e.target.value,
                }))
              }
              className={`input-luxury pl-12 w-full ${
                errors.insuranceExpiry ? "border-error" : ""
              }`}
              aria-invalid={!!errors.insuranceExpiry}
            />
          </div>
        </div>

        <div>
          <label
            className="text-sm text-text-secondary mb-2 block"
            htmlFor="permit"
          >
            Permit Expiry *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
            <input
              id="permit"
              type="date"
              value={formData.permitExpiry}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  permitExpiry: e.target.value,
                }))
              }
              className={`input-luxury pl-12 w-full ${
                errors.permitExpiry ? "border-error" : ""
              }`}
              aria-invalid={!!errors.permitExpiry}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <AnimatedButton
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
          disabled={isSubmitting}
        >
          Cancel
        </AnimatedButton>
        <AnimatedButton
          type="submit"
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Vehicle"
              : "Add Vehicle"}
        </AnimatedButton>
      </div>
    </form>
  );
}
