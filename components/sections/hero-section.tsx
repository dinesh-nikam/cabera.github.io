"use client";

import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  ChevronDown,
  Route,
  Shield,
  Star,
} from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { BookingWidget } from "@/components/ui/booking-widget";
import { Hero3D } from "@/components/ui/hero-3d";
import { useMagnetic } from "@/lib/motion/motion-system";

export function HeroSection() {
  // Apply luxury magnetic force to CTAs
  const waBtnRef = useMagnetic(30, 0.25);
  const callBtnRef = useMagnetic(30, 0.25);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-background"
      aria-label="Premium cab booking hero"
    >
      {/* Background glowing gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-luxury-400/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typography, Badge & Booking Widget */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Animated Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-luxury-400/10 border border-luxury-400/20 rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Route className="w-4 h-4 text-luxury-400 animate-spin-slow" />
              <span className="text-xs font-semibold uppercase tracking-widest text-luxury-400 font-body">
                Pune ↔ Mumbai Executive Corridor
              </span>
            </motion.div>

            {/* Title Stagger */}
            <h1 className="text-4xl md:text-6xl font-bold font-heading text-white leading-tight">
              <motion.span
                className="block text-luxury-400 mb-2 text-2xl md:text-3xl font-body font-semibold uppercase tracking-widest"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Chauffeur Drive
              </motion.span>
              <motion.span
                className="block text-white bg-gradient-to-r from-white via-luxury-400 to-white bg-clip-text text-transparent"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                World-Class Luxury
              </motion.span>
              <motion.span
                className="block text-text-secondary text-3xl md:text-5xl font-light mt-1"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Mobility Experience.
              </motion.span>
            </h1>

            <motion.p
              className="text-base md:text-lg text-text-secondary max-w-xl leading-relaxed font-body"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Airport Transfers, local corporate leases, and outstation trips
              between Pune and Mumbai. Premium cabin environments with 24x7
              automated dispatch.
            </motion.p>

            {/* Quick Contact CTAs with Magnetic triggers */}
            <motion.div
              className="flex flex-wrap gap-4 items-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.a
                ref={callBtnRef as any}
                href="tel:+919876543210"
                className="btn-secondary flex items-center gap-2 rounded-full py-3 px-6 text-sm font-semibold tracking-wide"
              >
                <Phone className="w-4 h-4" />
                Call Hotline
              </motion.a>

              <motion.a
                ref={waBtnRef as any}
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary bg-green-600/10 border-green-500/20 hover:bg-green-600 hover:text-white text-green-400 flex items-center gap-2 rounded-full py-3 px-6 text-sm font-semibold tracking-wide"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </motion.a>
            </motion.div>

            {/* Main Interactive Booking Widget */}
            <motion.div
              id="booking-widget"
              className="w-full pt-4"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <BookingWidget />
            </motion.div>
          </div>

          {/* Right Column: 3D WebGL Vehicle Canvas Showcase */}
          <motion.div
            className="lg:col-span-5 h-[400px] lg:h-[650px] w-full relative z-20 rounded-3xl overflow-hidden glass border border-white/5 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Hero3D />

            {/* Overlay features indicators */}
            <div className="absolute top-6 right-6 flex flex-col gap-2 pointer-events-none">
              <div className="glass px-3 py-1.5 rounded-lg flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-luxury-400" />
                <span className="text-[10px] text-white uppercase tracking-widest font-semibold">
                  Verified Safe
                </span>
              </div>
              <div className="glass px-3 py-1.5 rounded-lg flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-luxury-400" />
                <span className="text-[10px] text-white uppercase tracking-widest font-semibold">
                  5.0 Star Rated
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() =>
          document
            .getElementById("booking-widget")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <ChevronDown className="w-6 h-6 text-luxury-400" />
      </motion.div>
    </section>
  );
}
