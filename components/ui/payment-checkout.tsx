"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, CreditCard, Smartphone, Banknote, X } from "lucide-react";
import { AnimatedButton } from "./animated-button";
import paymentService, {
  type PaymentMethod,
} from "@/lib/services/payment-service";

interface PaymentCheckoutProps {
  bookingId: string;
  amount: number; // in rupees
  customerPhone: string;
  customerEmail?: string;
  onClose: () => void;
  onSuccess: (paymentId: string) => void;
}

export function PaymentCheckout({
  bookingId,
  amount,
  customerPhone,
  customerEmail,
  onClose,
  onSuccess,
}: PaymentCheckoutProps) {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>("RAZORPAY");
  const [isProcessing, setIsProcessing] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [showUPIQR, setShowUPIQR] = useState(false);

  const paymentMethods = [
    {
      id: "RAZORPAY" as const,
      label: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, Rupay, Amex",
    },
    {
      id: "UPI" as const,
      label: "UPI Payment",
      icon: Smartphone,
      description: "Google Pay, PhonePe, Paytm, BHIM",
    },
    {
      id: "NETBANKING" as const,
      label: "Net Banking",
      icon: Banknote,
      description: "All major banks",
    },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const amountInPaise = amount * 100; // Convert to paise

      if (selectedMethod === "RAZORPAY") {
        const order = await paymentService.createRazorpayOrder({
          bookingId,
          amount: amountInPaise,
          method: selectedMethod,
          customerPhone,
          customerEmail,
        });

        // In production, load Razorpay checkout script
        // For now, simulate successful payment
        setTimeout(() => {
          onSuccess(order.orderId || order.id);
        }, 2000);
      } else if (selectedMethod === "UPI") {
        setShowUPIQR(true);
        const payment = await paymentService.processUPIPayment({
          bookingId,
          amount: amountInPaise,
          method: selectedMethod,
          customerPhone,
        });

        setTimeout(() => {
          onSuccess(payment.orderId || payment.id);
        }, 2000);
      } else {
        // Net Banking - redirect to bank
        setTimeout(() => {
          onSuccess(`mock_${Date.now()}`);
        }, 2000);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
    >
      <div className="card-luxury p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Close payment modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold font-heading mb-2">
          Complete Payment
        </h2>
        <p className="text-text-secondary mb-6">
          Amount:{" "}
          <span className="text-luxury-400 font-bold">
            ₹{amount.toLocaleString("en-IN")}
          </span>
        </p>

        {/* Payment Method Selection */}
        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full p-4 rounded-lg border transition-all text-left ${
                selectedMethod === method.id
                  ? "border-luxury-400 bg-luxury-400/10"
                  : "border-white/10 hover:border-luxury-400/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <method.icon className="w-5 h-5 text-luxury-400" />
                <div>
                  <p className="font-medium text-white">{method.label}</p>
                  <p className="text-xs text-text-secondary">
                    {method.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* UPI ID input for UPI method */}
        {selectedMethod === "UPI" && !showUPIQR && (
          <div className="mb-6">
            <label
              htmlFor="upi-id"
              className="text-sm text-text-secondary mb-2 block font-body"
            >
              UPI ID (optional)
            </label>
            <input
              id="upi-id"
              type="text"
              placeholder="yourname@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="input-luxury w-full"
            />
          </div>
        )}

        {/* UPI QR Code */}
        <AnimatePresence>
          {showUPIQR && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-6 text-center"
            >
              <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center">
                <QrCode className="w-24 h-24 text-background" />
              </div>
              <p className="text-sm text-text-secondary mt-3">
                Scan QR with any UPI app
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pay Button */}
        <AnimatedButton
          onClick={handlePayment}
          className="w-full"
          disabled={isProcessing}
        >
          {isProcessing
            ? "Processing..."
            : `Pay ₹${amount.toLocaleString("en-IN")}`}
        </AnimatedButton>

        {/* Security note */}
        <p className="text-xs text-text-secondary/60 text-center mt-4">
          Your payment is secured with 256-bit encryption
        </p>
      </div>
    </motion.div>
  );
}
