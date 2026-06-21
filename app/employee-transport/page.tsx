"use client";

import { motion } from "framer-motion";
import { NavigationBar } from "@/components/ui/navigation-bar";
import { Footer } from "@/components/ui/footer";
import { StickyCta } from "@/components/ui/sticky-cta";
import { FloatingCta } from "@/components/ui/floating-cta";
import { Shield, Clock, Users, Calendar, MapPin, Phone } from "lucide-react";
import { use3DTilt, useMagnetic } from "@/lib/motion/motion-system";

export default function EmployeeTransportPage() {
  const tiltRef = use3DTilt(6, 1.02);
  const bookBtnRef = useMagnetic(30, 0.25);

  const shuttleRates = [
    { type: "Sedan Shuttle", capacity: "4 Employees", rate: "40,000" },
    { type: "Tempo Traveller", capacity: "12 Employees", rate: "1,00,000" },
    {
      type: "Mini Bus Operations",
      capacity: "25+ Employees",
      rate: "Custom Quote",
    },
  ];

  const coveredHubs = [
    "Hinjewadi IT Clusters",
    "Kharadi EON Zone",
    "Baner Highway Hub",
    "Magarpatta City",
    "Rajiv Gandhi Tech Park",
  ];

  return (
    <main className="min-h-screen bg-background relative">
      <NavigationBar />

      {/* Header Banner */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full bg-luxury-400 blur-[150px] pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-luxury-400/10 border border-luxury-400/20 rounded-full">
                <Users className="w-4 h-4 text-luxury-400 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-widest text-luxury-400 font-body">
                  Corporate Shuttles
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-heading text-white leading-tight">
                Employee Commutes & Shuttles
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed font-body">
                Structured daily employee shuttle networks servicing major IT
                clusters in Pune and Mumbai. Centralized routing, automated
                passenger attendance, active GPS safety flags, and backup car
                guarantees.
              </p>

              <div className="flex gap-4">
                <motion.button
                  ref={bookBtnRef as any}
                  onClick={() => (window.location.href = "/#booking-widget")}
                  className="btn-primary rounded-full px-8 py-3 text-sm tracking-wider uppercase font-semibold font-body"
                >
                  Request Proposals
                </motion.button>
                <a
                  href="tel:+919876543210"
                  className="btn-secondary flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide"
                >
                  <Phone className="w-4 h-4 text-luxury-400" />
                  Hotline Desk
                </a>
              </div>
            </div>

            {/* Right Interactive Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                ref={tiltRef as any}
                className="relative group w-full max-w-sm h-[320px] rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl preserve-3d"
              >
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e08562744ad?q=80&w=800"
                  alt="IT workers in office"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-75" />
                <div className="absolute bottom-6 left-6 text-left">
                  <span className="text-[10px] text-luxury-400 uppercase tracking-widest block font-body">
                    Daily Commutes
                  </span>
                  <span className="text-lg font-bold font-heading text-white">
                    Daily Office Pickups
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shuttle Rates Columns */}
      <section className="py-20 border-t border-white/5 bg-surface/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-semibold text-luxury-400 uppercase tracking-widest block font-body">
              Pricing Matrix
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">
              Shuttle Rates & Capacity
            </h2>
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              Estimated monthly pricing schemas based on standard routes and
              operating slots.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {shuttleRates.map((shuttle) => (
              <div
                key={shuttle.type}
                className="glass p-8 rounded-3xl border border-white/5 flex flex-col justify-between items-start space-y-6 hover:border-luxury-400/20 transition-all duration-300"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white font-heading">
                    {shuttle.type}
                  </h3>
                  <span className="text-xs text-luxury-400 uppercase tracking-widest block font-body">
                    {shuttle.capacity}
                  </span>
                </div>

                <div className="text-left w-full border-t border-b border-white/5 py-4">
                  <span className="text-[10px] text-text-secondary uppercase block mb-1">
                    Estimated Monthly Rate
                  </span>
                  <span className="text-base font-bold text-white font-heading">
                    {shuttle.rate.includes("Quote")
                      ? shuttle.rate
                      : `₹${shuttle.rate}`}
                  </span>
                </div>

                <button
                  onClick={() => (window.location.href = "/#booking-widget")}
                  className="w-full btn-primary py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold font-body"
                >
                  Inquire Rates
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Covered Tech Zones */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-semibold text-luxury-400 uppercase tracking-widest block font-body">
              Coverage Hubs
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">
              Pune IT Hub Coverage
            </h2>
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              Fully scheduled daily lines covering Pune&apos;s primary software
              development nodes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coveredHubs.map((hub) => (
              <div
                key={hub}
                className="glass p-5 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-luxury-400/20 transition-all duration-300"
              >
                <div className="p-3 bg-luxury-400/10 rounded-xl text-luxury-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base font-heading">
                  {hub}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer & CTA */}
      <Footer />
      <StickyCta />
      <FloatingCta />
    </main>
  );
}
