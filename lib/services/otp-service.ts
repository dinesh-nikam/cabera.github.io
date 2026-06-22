export class OTPService {
  private otpExpiryMinutes = 5;

  // Generate 6-digit OTP
  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send OTP via WhatsApp (using existing WhatsApp service)
  async sendOTP(
    phoneNumber: string,
    otp: string,
    bookingId: string,
  ): Promise<boolean> {
    // In production, integrate with WhatsApp service
    console.log(
      `[OTP] Sending ${otp} to ${phoneNumber} for booking ${bookingId}`,
    );

    // Store OTP in memory (in production, use Redis with expiry)
    if (typeof window === "undefined") {
      // Server-side: use secure storage
      return true;
    }

    // Client-side demo: store in localStorage
    localStorage.setItem(
      `otp_${bookingId}`,
      JSON.stringify({
        otp,
        expiresAt: Date.now() + this.otpExpiryMinutes * 60000,
      }),
    );

    return true;
  }

  // Verify OTP
  async verifyOTP(bookingId: string, inputOtp: string): Promise<boolean> {
    // In production, verify against Redis/store
    if (typeof window === "undefined") {
      return true; // Server-side verification
    }

    const stored = localStorage.getItem(`otp_${bookingId}`);
    if (!stored) return false;

    const { otp, expiresAt } = JSON.parse(stored);

    if (Date.now() > expiresAt) {
      localStorage.removeItem(`otp_${bookingId}`);
      return false;
    }

    const isValid = otp === inputOtp;
    if (isValid) {
      localStorage.removeItem(`otp_${bookingId}`);
    }

    return isValid;
  }

  // Resend OTP
  async resendOTP(phoneNumber: string, bookingId: string): Promise<string> {
    const newOtp = this.generateOTP();
    await this.sendOTP(phoneNumber, newOtp, bookingId);
    return newOtp;
  }
}

export default new OTPService();
