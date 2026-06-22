"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedButton } from "./animated-button";

interface OTPVerificationProps {
  phoneNumber: string;
  bookingId: string;
  onVerified: () => void;
  onSkip?: () => void;
}

export function OTPVerification({
  phoneNumber,
  bookingId,
  onVerified,
  onSkip,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (resendDisabled && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
  }, [resendDisabled, countdown]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Verify when all filled
    if (newOtp.every((d) => d.length === 1)) {
      verifyOTP(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOTP = async (input: string) => {
    setIsLoading(true);
    setError("");

    // Mock verification
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (input === "123456") {
      // In production, call actual verification API
      onVerified();
    } else {
      setError("Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }

    setIsLoading(false);
  };

  const handleResend = async () => {
    setResendDisabled(true);
    setCountdown(30);

    // In production, call resend API
    console.log("[OTP] Resend to", phoneNumber);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold font-heading">Verify Your Number</h3>
      <p className="text-text-secondary font-body">
        Enter the 6-digit code sent to {phoneNumber}
      </p>

      {/* OTP Input */}
      <div className="flex gap-3 justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center text-xl font-bold bg-surface-light border border-white/10 rounded-lg focus:border-luxury-400 focus:outline-none"
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>

      {error && (
        <p className="text-error text-sm text-center font-body" role="alert">
          {error}
        </p>
      )}

      <div className="text-center space-y-3">
        <p className="text-sm text-text-secondary font-body">
          Didn&apos;t receive the code?
        </p>

        <button
          onClick={handleResend}
          disabled={resendDisabled}
          className="text-luxury-400 hover:underline disabled:opacity-50 font-body"
        >
          {resendDisabled ? `Resend in ${countdown}s` : "Resend OTP"}
        </button>

        {onSkip && (
          <button
            onClick={onSkip}
            className="block text-xs text-text-secondary/60 hover:text-white font-body"
          >
            Skip for now
          </button>
        )}
      </div>

      <AnimatedButton
        onClick={() => verifyOTP(otp.join(""))}
        className="w-full"
        disabled={otp.some((d) => !d) || isLoading}
      >
        {isLoading ? "Verifying..." : "Verify OTP"}
      </AnimatedButton>
    </div>
  );
}
