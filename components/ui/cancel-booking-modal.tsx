"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X, CheckCircle } from "lucide-react";
import { AnimatedButton } from "./animated-button";

interface CancelBookingModalProps {
  bookingId: string;
  isOpen: boolean;
  onClose: () => void;
  onCancel: (reason: string) => void;
}

const CANCELLATION_REASONS = [
  { value: "changed_plans", label: "Changed my plans" },
  { value: "found_better_price", label: "Found better price elsewhere" },
  { value: "driver_delayed", label: "Driver delay" },
  { value: "multiple_booking", label: "Booked multiple times" },
  { value: "other", label: "Other reason" },
];

export function CancelBookingModal({
  bookingId,
  isOpen,
  onClose,
  onCancel,
}: CancelBookingModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {
    if (!selectedReason) return;

    setIsCancelling(true);
    const reason = selectedReason === "other" ? otherReason : selectedReason;

    try {
      // In production, call cancellation API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onCancel(reason);
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="card-luxury p-6 max-w-md w-full relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>

            <h3 className="text-xl font-bold mb-2 font-heading">
              Cancel Booking?
            </h3>
            <p className="text-text-secondary text-sm mb-4 font-body">
              Booking #{bookingId}. This action cannot be undone.
            </p>

            {/* Refund Policy */}
            <div className="glass p-3 rounded-lg mb-4">
              <p className="text-xs text-text-secondary font-body">
                <span className="text-luxury-400 font-semibold">Note:</span>{" "}
                Cancellations made before driver assignment receive full refund.
                After assignment, a cancellation fee may apply.
              </p>
            </div>

            {/* Reason Selection */}
            <div className="space-y-2 mb-4">
              {CANCELLATION_REASONS.map((reason) => (
                <button
                  key={reason.value}
                  onClick={() => setSelectedReason(reason.value)}
                  className={`w-full p-3 rounded-lg border transition-all text-left ${
                    selectedReason === reason.value
                      ? "border-luxury-400 bg-luxury-400/10"
                      : "border-white/10 hover:border-luxury-400/30"
                  }`}
                >
                  <span className="text-sm text-white font-body">
                    {reason.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Other Reason Input */}
            {selectedReason === "other" && (
              <input
                type="text"
                placeholder="Please specify reason"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                className="input-luxury w-full mb-4"
              />
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <AnimatedButton
                variant="secondary"
                onClick={onClose}
                className="flex-1"
                disabled={isCancelling}
              >
                Keep Booking
              </AnimatedButton>
              <AnimatedButton
                onClick={handleCancel}
                className="flex-1 bg-red-500 hover:bg-red-600"
                disabled={!selectedReason || isCancelling}
              >
                {isCancelling ? "Cancelling..." : "Cancel Booking"}
              </AnimatedButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
