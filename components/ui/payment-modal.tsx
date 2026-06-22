"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaymentCheckout } from "./payment-checkout";

interface PaymentModalProps {
  bookingId: string;
  totalAmount: number;
  customerPhone: string;
  customerEmail?: string;
  onClose: () => void;
  onPaymentSuccess: (paymentId: string) => void;
}

export function PaymentModal({
  bookingId,
  totalAmount,
  customerPhone,
  customerEmail,
  onClose,
  onPaymentSuccess,
}: PaymentModalProps) {
  return (
    <AnimatePresence>
      <PaymentCheckout
        bookingId={bookingId}
        amount={totalAmount}
        customerPhone={customerPhone}
        customerEmail={customerEmail}
        onClose={onClose}
        onSuccess={onPaymentSuccess}
      />
    </AnimatePresence>
  );
}
