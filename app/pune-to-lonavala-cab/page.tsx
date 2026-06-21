"use client";

import { motion } from "framer-motion";
import { NavigationBar } from "@/components/ui/navigation-bar";
import { Footer } from "@/components/ui/footer";
import { StickyCta } from "@/components/ui/sticky-cta";
import { FloatingCta } from "@/components/ui/floating-cta";
import {
  CloudRain,
  MapPin,
  Navigation,
  Car,
  Shield,
  Phone,
} from "lucide-react";
import { use3DTilt, useMagnetic } from "@/lib/motion/motion-system";

export default function PuneToLonavalaPage() {
  const tiltRef = use3DTilt(6, 1.02);
  const bookBtnRef = useMagnetic(30, 0.25);

  const spots = [
    { name: "Tiger's Leap Peak", desc: "Clifftop valley viewpoints" },
    { name: "Lonavala Lake & Reservoir", desc: "Monsoon fed scenic waters" },
    { name: "Karla Caves Complex", desc: "Ancient rock-cut Buddhist cells" },
    { name: "Bhushi Dam Cascades", desc: "Popular stepped waterfalls" },
    { name: "Rajmachi Fort Vistas", desc: "Majestic historic fortifications" },
  ];

  const packages = [
    {
      name: "Sedan Monsoon Package",
      desc: "Dzire, Etios or similar",
      price: "1,200",
      outline: "border-white/5",
    },
    {
      name: "SUV Group Package",
      desc: "Ertiga, Innova or similar",
      price: "1,800",
      outline: "border-luxury-400/30 bg-luxury-400/5",
    },
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
                <CloudRain className="w-4 h-4 text-luxury-400 animate-bounce" />
                <span className="text-xs font-semibold uppercase tracking-widest text-luxury-400 font-body">
                  Monsoon Special Outings
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-heading text-white leading-tight">
                Pune to Lonavala Monsoon Cab Service
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed font-body">
                Embark on a scenic weekend trip traversing the Western Ghats.
                Prompt pickup across Pune, verified drivers specializing in hill
                driving, and sightseeing layovers included.
              </p>

              <div className="flex gap-4">
                <motion.button
                  ref={bookBtnRef as any}
                  onClick={() => (window.location.href = "/#booking-widget")}
                  className="btn-primary rounded-full px-8 py-3 text-sm tracking-wider uppercase font-semibold font-body"
                >
                  Book Outing
                </motion.button>
                <a
                  href="tel:+919876543210"
                  className="btn-secondary flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide"
                >
                  <Phone className="w-4 h-4 text-luxury-400" />
                  Monsoon Hotline
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
                  src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=800"
                  alt="Monsoon Mountain expressway curves"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-75" />
                <div className="absolute bottom-6 left-6 text-left">
                  <span className="text-[10px] text-luxury-400 uppercase tracking-widest block font-body">
                    Monsoon Gateway
                  </span>
                  <span className="text-lg font-bold font-heading text-white">
                    Pune - Lonavala Corridor
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sightseeing spots Grid */}
      <section className="py-20 border-t border-white/5 bg-surface/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-semibold text-luxury-400 uppercase tracking-widest block font-body">
              Sightseeing Attractions
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">
              Popular Spots in Lonavala
            </h2>
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              Our chauffeurs are familiar with the region and will handle
              coordinates for scenic layovers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spots.map((spot) => (
              <div
                key={spot.name}
                className="card-luxury p-6 flex flex-col justify-between items-start hover:border-luxury-400/20 transition-all duration-300"
              >
                <MapPin className="w-8 h-8 text-luxury-400 mb-4" />
                <div>
                  <h3 className="font-bold text-white text-lg font-heading mb-1">
                    {spot.name}
                  </h3>
                  <p className="text-xs text-text-secondary">{spot.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fares Packages List */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-semibold text-luxury-400 uppercase tracking-widest block font-body">
              Monsoon Fares
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">
              Monsoon Package Pricing
            </h2>
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              Inclusive of standard tolls and driver charges. Sightseeing
              inclusions covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`glass p-8 rounded-3xl border flex flex-col justify-between items-start space-y-6 hover:border-luxury-400/20 transition-all duration-300 ${pkg.outline}`}
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white font-heading">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-text-secondary">{pkg.desc}</p>
                </div>

                <div className="text-left w-full border-t border-b border-white/5 py-4">
                  <span className="text-[10px] text-text-secondary uppercase block mb-1">
                    Package Flat Rate
                  </span>
                  <span className="text-2xl font-bold text-luxury-400 font-heading">
                    ₹{pkg.price}
                  </span>
                </div>

                <button
                  onClick={() => (window.location.href = "/#booking-widget")}
                  className="w-full btn-primary py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold font-body"
                >
                  Book Package
                </button>
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
