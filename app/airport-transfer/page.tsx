"use client";

import { motion } from "framer-motion";
import { NavigationBar } from "@/components/ui/navigation-bar";
import { Footer } from "@/components/ui/footer";
import { StickyCta } from "@/components/ui/sticky-cta";
import { FloatingCta } from "@/components/ui/floating-cta";
import {
  Plane,
  Shield,
  Clock,
  Luggage,
  Star,
  Award,
  Phone,
} from "lucide-react";
import { use3DTilt, useMagnetic } from "@/lib/motion/motion-system";

export default function AirportTransferPage() {
  const tiltRef = use3DTilt(6, 1.02);
  const bookBtnRef = useMagnetic(30, 0.25);

  const puneAirportFares = [
    { area: "Pune Center (Camp/Koregaon Park)", price: "400" },
    { area: "Hinjewadi IT Cluster / Wakad Gateway", price: "500" },
    { area: "Kharadi Bypass / Baner Road Hub", price: "450" },
    { area: "Hadapsar Industrial Zone / Kothrud", price: "480" },
  ];

  const mumbaiAirportFares = [
    { area: "Bandra BKC / Santa Cruz Terminal", price: "600" },
    { area: "Andheri Hub / Powai Lake Business Zone", price: "700" },
    { area: "Thane Corridor / Navi Mumbai Junction", price: "800" },
    { area: "Pune City Expressway Connection", price: "2,400" },
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
                <Plane className="w-4 h-4 text-luxury-400 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-widest text-luxury-400 font-body">
                  Flight Tracking Enabled
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-heading text-white leading-tight">
                Airport Transfer Services
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed font-body">
                First-class terminal connections servicing Pune Airport (PNQ)
                and Mumbai International Terminal 2 (BOM). Active flight
                tracking, meet-and-greet service, and luggage assistance.
              </p>

              <div className="flex gap-4">
                <motion.button
                  ref={bookBtnRef as any}
                  onClick={() => (window.location.href = "/#booking-widget")}
                  className="btn-primary rounded-full px-8 py-3 text-sm tracking-wider uppercase font-semibold font-body"
                >
                  Book Transfer
                </motion.button>
                <a
                  href="tel:+919876543210"
                  className="btn-secondary flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide"
                >
                  <Phone className="w-4 h-4 text-luxury-400" />
                  Terminal Desk
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
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800"
                  alt="Airport Chauffeur Terminal"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-75" />
                <div className="absolute bottom-6 left-6 text-left">
                  <span className="text-[10px] text-luxury-400 uppercase tracking-widest block font-body">
                    Terminal Transfers
                  </span>
                  <span className="text-lg font-bold font-heading text-white">
                    Chauffeur Meet & Greet
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing list columns */}
      <section className="py-20 border-t border-white/5 bg-surface/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-semibold text-luxury-400 uppercase tracking-widest block font-body">
              Pricing Matrix
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">
              Consolidated Airport Fares
            </h2>
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              Flat, all-inclusive rates for standard sedan services. No hidden
              terminal surges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pune Airport Fares */}
            <div className="glass p-6 rounded-3xl border border-white/10 shadow-lg">
              <h3 className="text-xl font-bold font-heading text-white mb-6 border-b border-white/5 pb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-luxury-400" />
                Pune Airport (PNQ) Transfers
              </h3>
              <div className="space-y-4">
                {puneAirportFares.map((fare) => (
                  <div
                    key={fare.area}
                    className="flex justify-between items-center pb-2 border-b border-white/5"
                  >
                    <span className="text-sm text-text-secondary font-body">
                      {fare.area}
                    </span>
                    <span className="text-base font-bold text-luxury-400 font-heading">
                      ₹{fare.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mumbai Airport Fares */}
            <div className="glass p-6 rounded-3xl border border-white/10 shadow-lg">
              <h3 className="text-xl font-bold font-heading text-white mb-6 border-b border-white/5 pb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-luxury-400" />
                Mumbai Terminal 2 (BOM) Transfers
              </h3>
              <div className="space-y-4">
                {mumbaiAirportFares.map((fare) => (
                  <div
                    key={fare.area}
                    className="flex justify-between items-center pb-2 border-b border-white/5"
                  >
                    <span className="text-sm text-text-secondary font-body">
                      {fare.area}
                    </span>
                    <span className="text-base font-bold text-luxury-400 font-heading">
                      ₹{fare.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal Features Grid */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-semibold text-luxury-400 uppercase tracking-widest block font-body">
              Premium Standards
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">
              Airport Logistics Suite
            </h2>
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              Our service protocols are engineered to insulate you from typical
              airport transit stress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-luxury p-6 space-y-4 text-center">
              <Clock className="w-10 h-10 text-luxury-400 mx-auto" />
              <h3 className="text-lg font-bold font-heading text-white">
                Delay Tracking
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body">
                We monitor flight arrival schedules in real-time, automatically
                recalibrating chauffeur schedules for delayed touchdowns.
              </p>
            </div>

            <div className="card-luxury p-6 space-y-4 text-center">
              <Award className="w-10 h-10 text-luxury-400 mx-auto" />
              <h3 className="text-lg font-bold font-heading text-white">
                Chauffeur Meet & Greet
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body">
                Uniformed drivers await at arrival vestibules holding custom
                nameplates, immediately handling bags and escorting you to the
                deck.
              </p>
            </div>

            <div className="card-luxury p-6 space-y-4 text-center">
              <Luggage className="w-10 h-10 text-luxury-400 mx-auto" />
              <h3 className="text-lg font-bold font-heading text-white">
                Luggage Operations
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body">
                Zero lifting required. Our chauffeurs take complete charge of
                baggage transport from terminal gates directly into vehicle
                trunks.
              </p>
            </div>
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
