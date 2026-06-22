"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  MapPin,
  Calendar,
  Clock,
  Car,
  Users,
  Check,
  Luggage,
} from "lucide-react";
import { AnimatedButton } from "./animated-button";
import { PaymentCheckout } from "./payment-checkout";
import { CancelBookingModal } from "./cancel-booking-modal";

type BookingStep =
  | "pickup"
  | "drop"
  | "datetime"
  | "vehicle"
  | "summary"
  | "details"
  | "confirmation";

interface BookingFormData {
  pickup: string;
  drop: string;
  date: string;
  time: string;
  tripType: "one-way" | "round-trip" | "hourly";
  vehicleType: string;
  name: string;
  phone: string;
  email: string;
}

export function BookingWidget() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("pickup");
  const [formData, setFormData] = useState<BookingFormData>({
    pickup: "",
    drop: "",
    date: "",
    time: "",
    tripType: "one-way",
    vehicleType: "",
    name: "",
    phone: "",
    email: "",
  });

  const steps: BookingStep[] = [
    "pickup",
    "drop",
    "datetime",
    "vehicle",
    "summary",
    "details",
    "confirmation",
  ];
  const stepIndex = steps.indexOf(currentStep);

  const updateFormData = (key: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    const nextIndex = stepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const prevStep = () => {
    const prevIndex = stepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                index <= stepIndex
                  ? "bg-luxury-400 text-background"
                  : "bg-surface-light text-text-secondary"
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-1 mx-2 transition-all duration-300 ${
                  index < stepIndex ? "bg-luxury-400" : "bg-surface-light"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="card-luxury p-6"
        >
          {currentStep === "pickup" && (
            <PickupStep
              value={formData.pickup}
              onChange={updateFormData}
              onNext={nextStep}
            />
          )}
          {currentStep === "drop" && (
            <DropStep
              value={formData.drop}
              onChange={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === "datetime" && (
            <DateTimeStep
              date={formData.date}
              time={formData.time}
              tripType={formData.tripType}
              onChange={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === "vehicle" && (
            <VehicleStep
              selected={formData.vehicleType}
              onSelect={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === "summary" && (
            <SummaryStep onNext={nextStep} onBack={prevStep} />
          )}
          {currentStep === "details" && (
            <DetailsStep
              formData={formData}
              onChange={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === "confirmation" && (
            <ConfirmationStep
              bookingId="PMCB-2026-001"
              totalAmount={242000} // 2420 rupees in paise
              customerPhone={formData.phone}
              customerEmail={formData.email}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function PickupStep({
  value,
  onChange,
  onNext,
}: {
  value: string;
  onChange: (key: keyof BookingFormData, value: string) => void;
  onNext: () => void;
}) {
  const popularLocations = [
    "Pune City",
    "Hinjewadi",
    "Wakad",
    "Baner",
    "Pune Airport",
    "Mumbai City",
    "Mumbai Airport",
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold mb-4">Pickup Location</h3>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
        <input
          type="text"
          placeholder="Enter pickup location"
          value={value}
          onChange={(e) => onChange("pickup", e.target.value)}
          className="input-luxury pl-12"
          aria-label="Pickup location"
        />
      </div>
      <div>
        <p className="text-sm text-text-secondary mb-2">Popular locations:</p>
        <div className="flex flex-wrap gap-3">
          {popularLocations.map((location) => (
            <button
              key={location}
              onClick={() => onChange("pickup", location)}
              className="px-4 py-3 text-sm bg-luxury-400/10 hover:bg-luxury-400/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-luxury-400 min-h-[44px] flex items-center"
            >
              {location}
            </button>
          ))}
        </div>
      </div>
      <AnimatedButton onClick={onNext} className="w-full" disabled={!value}>
        Continue
      </AnimatedButton>
    </div>
  );
}

function DropStep({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: string;
  onChange: (key: keyof BookingFormData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const popularLocations = [
    "Mumbai City",
    "Navi Mumbai",
    "Thane",
    "Mumbai Airport",
    "Pune City",
    "Pune Airport",
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold mb-4">Drop Location</h3>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
        <input
          type="text"
          placeholder="Enter drop location"
          value={value}
          onChange={(e) => onChange("drop", e.target.value)}
          className="input-luxury pl-12"
          aria-label="Drop location"
        />
      </div>
      <div>
        <p className="text-sm text-text-secondary mb-2">Popular locations:</p>
        <div className="flex flex-wrap gap-3">
          {popularLocations.map((location) => (
            <button
              key={location}
              onClick={() => onChange("drop", location)}
              className="px-4 py-3 text-sm bg-luxury-400/10 hover:bg-luxury-400/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-luxury-400 min-h-[44px] flex items-center"
            >
              {location}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <AnimatedButton variant="secondary" onClick={onBack} className="flex-1">
          Back
        </AnimatedButton>
        <AnimatedButton onClick={onNext} className="flex-1" disabled={!value}>
          Continue
        </AnimatedButton>
      </div>
    </div>
  );
}

function DateTimeStep({
  date,
  time,
  tripType,
  onChange,
  onNext,
  onBack,
}: {
  date: string;
  time: string;
  tripType: "one-way" | "round-trip" | "hourly";
  onChange: (key: keyof BookingFormData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold mb-4">Date & Time</h3>

      <div>
        <label className="text-sm text-text-secondary mb-2 block">
          Trip Type
        </label>
        <div className="flex gap-3">
          {[
            { value: "one-way", label: "One Way" },
            { value: "round-trip", label: "Round Trip" },
            { value: "hourly", label: "Hourly" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => onChange("tripType", option.value)}
              className={`flex-1 min-h-[44px] py-3 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-luxury-400 ${
                tripType === option.value
                  ? "bg-luxury-400 text-background"
                  : "bg-surface-light hover:bg-luxury-400/10"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-text-secondary mb-2 block">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => onChange("date", e.target.value)}
              className="input-luxury pl-12"
              aria-label="Select date"
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-text-secondary mb-2 block">Time</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
            <input
              type="time"
              value={time}
              onChange={(e) => onChange("time", e.target.value)}
              className="input-luxury pl-12"
              aria-label="Select time"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <AnimatedButton variant="secondary" onClick={onBack} className="flex-1">
          Back
        </AnimatedButton>
        <AnimatedButton
          onClick={onNext}
          className="flex-1"
          disabled={!date || !time}
        >
          Continue
        </AnimatedButton>
      </div>
    </div>
  );
}

function VehicleStep({
  selected,
  onSelect,
  onNext,
  onBack,
}: {
  selected: string;
  onSelect: (key: keyof BookingFormData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const vehicles = [
    {
      id: "sedan",
      name: "Sedan",
      price: 1500,
      capacity: 4,
      luggage: 2,
      desc: "Dzire, Etios or similar",
    },
    {
      id: "suv",
      name: "SUV",
      price: 2000,
      capacity: 7,
      luggage: 4,
      desc: "Ertiga or similar",
    },
    {
      id: "premium-suv",
      name: "Premium SUV",
      price: 2500,
      capacity: 8,
      luggage: 6,
      desc: "Innova Crysta Premium",
    },
    {
      id: "luxury",
      name: "Luxury",
      price: 4000,
      capacity: 4,
      luggage: 3,
      desc: "Mercedes Benz E-Class / BMW",
    },
  ];

  const activeVehicle = vehicles.find((v) => v.id === selected) || vehicles[0];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold font-heading">
          Select Vehicle Class
        </h3>
        <span className="text-xs text-luxury-400 uppercase tracking-widest font-body">
          Step 4 of 7
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          {vehicles.map((vehicle) => (
            <button
              key={vehicle.id}
              onClick={() => onSelect("vehicleType", vehicle.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex justify-between items-center ${
                selected === vehicle.id
                  ? "border-luxury-400 bg-luxury-400/10 shadow-[0_4px_20px_rgba(212,175,55,0.1)]"
                  : "border-white/10 hover:border-luxury-400/30 bg-surface-light/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${selected === vehicle.id ? "bg-luxury-400/20 text-luxury-400" : "bg-white/5 text-white/60"}`}
                >
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-white text-base">
                    {vehicle.name}
                  </p>
                  <p className="text-xs text-text-secondary">{vehicle.desc}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-luxury-400 block font-heading">
                  ₹{vehicle.price}
                </span>
                <span className="text-[10px] text-text-secondary uppercase">
                  All Inclusive
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Dynamic Capacity Interactive Visualizer Panel */}
        <div className="glass p-5 rounded-xl border border-white/5 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs text-luxury-400 uppercase tracking-widest block font-body">
              Cabin Configurator
            </span>

            {/* Seat Visualizer Map */}
            <div>
              <span className="text-xs text-text-secondary block mb-2 uppercase tracking-wide">
                Interior Seat Layout ({activeVehicle.capacity} Seats)
              </span>
              <div className="grid grid-cols-3 gap-3 max-w-[150px] mx-auto bg-background/50 p-4 rounded-xl border border-white/5 relative">
                {/* Steering wheel */}
                <div className="absolute top-2 left-3 w-4 h-4 rounded-full border border-white/20 border-t-white/80 animate-spin-slow motion-reduce:animate-none" />

                {/* Dynamic highlight seats */}
                {[...Array(9)].map((_, seatIdx) => {
                  const isAvailable = seatIdx < activeVehicle.capacity;
                  return (
                    <motion.div
                      key={seatIdx}
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${
                        isAvailable
                          ? "bg-luxury-400 text-background shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                          : "bg-white/5 text-white/20"
                      }`}
                      animate={{ scale: isAvailable ? [0.9, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {seatIdx + 1}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Suitcase Luggage Visualizer */}
            <div>
              <span className="text-xs text-text-secondary block mb-2 uppercase tracking-wide">
                Trunk Luggage Slots ({activeVehicle.luggage} Bags)
              </span>
              <div className="flex gap-3 justify-center bg-background/50 p-4 rounded-xl border border-white/5">
                {[...Array(6)].map((_, bagIdx) => {
                  const hasBag = bagIdx < activeVehicle.luggage;
                  return (
                    <motion.div
                      key={bagIdx}
                      animate={{
                        opacity: hasBag ? 1 : 0.2,
                        scale: hasBag ? 1.1 : 0.9,
                      }}
                      className={hasBag ? "text-luxury-400" : "text-white/20"}
                    >
                      <Luggage className="w-5 h-5" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-xs text-text-secondary/60 leading-normal pt-4 border-t border-white/5">
            Verified luxury spacing with onboard mineral water, magazines, and
            USB fast chargers.
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <AnimatedButton variant="secondary" onClick={onBack} className="flex-1">
          Back
        </AnimatedButton>
        <AnimatedButton
          onClick={onNext}
          className="flex-1"
          disabled={!selected}
        >
          Confirm Configuration
        </AnimatedButton>
      </div>
    </div>
  );
}

function SummaryStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const fareDetails = [
    { label: "Base Fare", amount: 2000 },
    { label: "Taxes", amount: 320 },
    { label: "Platform Fee", amount: 100 },
    { label: "Total", amount: 2420, bold: true },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold mb-4">Fare Summary</h3>

      <div className="space-y-3">
        {fareDetails.map((detail) => (
          <div key={detail.label} className="flex justify-between">
            <span className={detail.bold ? "font-bold" : "text-text-secondary"}>
              {detail.label}
            </span>
            <span className={detail.bold ? "font-bold text-luxury-400" : ""}>
              ₹{detail.amount}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-4">
        <p className="text-sm text-text-secondary mb-2">Your trip:</p>
        <p className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-luxury-400" />
          Pune Hinjewadi → Mumbai Airport
        </p>
        <p className="text-sm text-text-secondary mt-2">
          Estimated duration: 3.5 hours
        </p>
      </div>

      <div className="flex gap-3">
        <AnimatedButton variant="secondary" onClick={onBack} className="flex-1">
          Back
        </AnimatedButton>
        <AnimatedButton onClick={onNext} className="flex-1">
          Confirm Booking
        </AnimatedButton>
      </div>
    </div>
  );
}

function DetailsStep({
  formData,
  onChange,
  onNext,
  onBack,
}: {
  formData: BookingFormData;
  onChange: (key: keyof BookingFormData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold mb-4">Your Details</h3>

      <div>
        <label
          className="text-sm text-text-secondary mb-2 block"
          htmlFor="name"
        >
          Full Name *
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="input-luxury w-full"
          autoComplete="name"
        />
      </div>

      <div>
        <label
          className="text-sm text-text-secondary mb-2 block"
          htmlFor="phone"
        >
          Phone Number *
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className="input-luxury w-full"
          autoComplete="tel"
          inputMode="numeric"
          pattern="[0-9]{10}"
        />
      </div>

      <div>
        <label
          className="text-sm text-text-secondary mb-2 block"
          htmlFor="email"
        >
          Email (Optional)
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter email for booking confirmation"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          className="input-luxury w-full"
          autoComplete="email"
        />
      </div>

      <div className="flex gap-3">
        <AnimatedButton variant="secondary" onClick={onBack} className="flex-1">
          Back
        </AnimatedButton>
        <AnimatedButton
          onClick={onNext}
          className="flex-1"
          disabled={!formData.name || !formData.phone}
        >
          Confirm Booking
        </AnimatedButton>
      </div>
    </div>
  );
}

function ConfirmationStep({
  bookingId,
  totalAmount,
  customerPhone,
  customerEmail,
}: {
  bookingId: string;
  totalAmount?: number;
  customerPhone?: string;
  customerEmail?: string;
}) {
  const [showPayment, setShowPayment] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  return (
    <>
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-luxury-400/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-10 h-10 text-luxury-400" />
        </motion.div>

        <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
        <p className="text-text-secondary mb-4">Your booking ID is:</p>
        <p className="text-3xl font-bold text-luxury-400 mb-6">{bookingId}</p>

        <p className="text-sm text-text-secondary mb-6">
          Our driver will contact you within 5 minutes. Track your ride in
          real-time via the app.
        </p>

        <div className="flex gap-3 flex-col sm:flex-row">
          {totalAmount && customerPhone && (
            <AnimatedButton
              variant="secondary"
              className="flex-1"
              onClick={() => setShowPayment(true)}
            >
              Pay Now ₹{(totalAmount / 100).toLocaleString("en-IN")}
            </AnimatedButton>
          )}
          <AnimatedButton
            className="flex-1"
            onClick={() => {
              window.location.href = `/tracking/${bookingId}`;
            }}
          >
            Track Ride
          </AnimatedButton>
          <AnimatedButton
            variant="secondary"
            className="flex-1 border-red-400/30 text-red-400 hover:bg-red-500 hover:text-white"
            onClick={() => setShowCancel(true)}
          >
            Cancel Booking
          </AnimatedButton>
        </div>

        <AnimatePresence>
          {showCancel && (
            <CancelBookingModal
              bookingId={bookingId}
              isOpen={showCancel}
              onClose={() => setShowCancel(false)}
              onCancel={(_reason: string) => {
                setShowCancel(false);
                // In production: update booking status to CANCELLED
                console.log("Booking cancelled:", _reason);
              }}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showPayment && totalAmount && customerPhone && (
          <PaymentCheckout
            bookingId={bookingId}
            amount={totalAmount / 100}
            customerPhone={customerPhone}
            customerEmail={customerEmail}
            onClose={() => setShowPayment(false)}
            onSuccess={(_paymentId: string) => {
              setShowPayment(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
