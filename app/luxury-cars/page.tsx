"use client";

import { motion } from "framer-motion";
import { NavigationBar } from "@/components/ui/navigation-bar";
import { Footer } from "@/components/ui/footer";
import { StickyCta } from "@/components/ui/sticky-cta";
import { FloatingCta } from "@/components/ui/floating-cta";
import { Crown, Shield, Star, Award, Gift, Phone } from "lucide-react";
import { use3DTilt, useMagnetic } from "@/lib/motion/motion-system";

export default function LuxuryCarsPage() {
  const tiltRef = use3DTilt(6, 1.02);
  const bookBtnRef = useMagnetic(30, 0.25);

  const luxuryVehicles = [
    {
      name: "Mercedes E-Class",
      capacity: "4 Passengers",
      hourly: "3,500",
      outstation: "6,000",
      bg: "bg-luxury-400/5 border-luxury-400/30",
    },
    {
      name: "BMW 5 Series",
      capacity: "4 Passengers",
      hourly: "3,000",
      outstation: "5,000",
      bg: "bg-surface-light/40 border-white/5",
    },
    {
      name: "Audi A4 Premium",
      capacity: "4 Passengers",
      hourly: "2,800",
      outstation: "4,500",
      bg: "bg-surface-light/40 border-white/5",
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
                <Crown className="w-4 h-4 text-luxury-400 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-widest text-luxury-400 font-body">
                  VIP Chauffeur Pool
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-heading text-white leading-tight">
                VIP Luxury Fleet Service
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed font-body">
                Premium, high-performance executive sedans serving special
                occasions, VIP airport meet-and-greets, corporate roadshows, and
                outstation trips. Hand-selected, fully certified professional
                chauffeurs.
              </p>

              <div className="flex gap-4">
                <motion.button
                  ref={bookBtnRef as any}
                  onClick={() => (window.location.href = "/#booking-widget")}
                  className="btn-primary rounded-full px-8 py-3 text-sm tracking-wider uppercase font-semibold font-body"
                >
                  Book Luxury Fleet
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
                  src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800"
                  alt="Luxury vehicle steering wheel"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-75" />
                <div className="absolute bottom-6 left-6 text-left">
                  <span className="text-[10px] text-luxury-400 uppercase tracking-widest block font-body">
                    VIP Chauffeur Desk
                  </span>
                  <span className="text-lg font-bold font-heading text-white">
                    Mercedes & BMW Showcases
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-20 border-t border-white/5 bg-surface/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-semibold text-luxury-400 uppercase tracking-widest block font-body">
              Elite Class
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">
              Elite Vehicles & Fares
            </h2>
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              Flat hourly configurations and outstation limits (inclusive of
              standard 150 km ranges).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {luxuryVehicles.map((car) => (
              <div
                key={car.name}
                className={`glass p-8 rounded-3xl border flex flex-col justify-between items-start space-y-6 hover:border-luxury-400/20 transition-all duration-300 ${car.bg}`}
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white font-heading">
                    {car.name}
                  </h3>
                  <span className="text-xs text-luxury-400 uppercase tracking-widest block font-body">
                    {car.capacity}
                  </span>
                </div>

                <div className="space-y-4 w-full border-t border-b border-white/5 py-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">
                      Hourly Configuration
                    </span>
                    <span className="font-bold text-white">
                      ₹{car.hourly}/hr
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">
                      Outstation (150 KM)
                    </span>
                    <span className="font-bold text-luxury-400">
                      ₹{car.outstation}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => (window.location.href = "/#booking-widget")}
                  className="w-full btn-primary py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold font-body"
                >
                  Book Chauffeur
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Features */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-semibold text-luxury-400 uppercase tracking-widest block font-body">
              VIP Amenities
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">
              VIP Onboard Amenities
            </h2>
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              Our luxury fleet is meticulously detailed to satisfy standard
              executive requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-luxury p-6 space-y-4 text-center">
              <Star className="w-10 h-10 text-luxury-400 mx-auto" />
              <h3 className="text-lg font-bold font-heading text-white">
                Premium Leather Cabin
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body">
                Plush, hand-stitched leather interiors, climate controls, and
                ambient lighting settings designed to provide complete comfort.
              </p>
            </div>

            <div className="card-luxury p-6 space-y-4 text-center">
              <Gift className="w-10 h-10 text-luxury-400 mx-auto" />
              <h3 className="text-lg font-bold font-heading text-white">
                VIP Treatment
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body">
                Onboard complimentary newspapers, luxury mineral water bottles,
                mint boxes, tissues, and high-speed Wi-Fi hotspots.
              </p>
            </div>

            <div className="card-luxury p-6 space-y-4 text-center">
              <Award className="w-10 h-10 text-luxury-400 mx-auto" />
              <h3 className="text-lg font-bold font-heading text-white">
                Chauffeurs of Class
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body">
                Experienced, bilingual chauffeurs in formal attire, trained in
                defensive driving and executive etiquette.
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
