"use client";

import { motion } from "framer-motion";
import { NavigationBar } from "@/components/ui/navigation-bar";
import { Footer } from "@/components/ui/footer";
import { StickyCta } from "@/components/ui/sticky-cta";
import { FloatingCta } from "@/components/ui/floating-cta";
import {
  MapPin,
  Navigation,
  Car,
  Shield,
  Phone,
  MessageCircle,
} from "lucide-react";
import { use3DTilt, useMagnetic } from "@/lib/motion/motion-system";

export default function PunePage() {
  const tiltRef = use3DTilt(6, 1.02);
  const bookBtnRef = useMagnetic(30, 0.25);

  const coverageAreas = [
    { name: "Hinjewadi IT Zone", route: "/hinjewadi-cab-service" },
    { name: "Wakad Chowk Gate", route: "/wakad-cab-service" },
    { name: "Baner Highway Hub", route: "/baner-cab-service" },
    { name: "Kharadi Bypass Corridor", route: "/kharadi-cab-service" },
    { name: "Viman Nagar Airfield", route: "/viman-nagar-cab-service" },
    { name: "Hadapsar Industrial Zone", route: "/hadapsar-cab-service" },
    { name: "Aundh Commercial Center", route: "/aundh-cab-service" },
    { name: "Wagholi Highway Hub", route: "/wagholi-cab-service" },
  ];

  const popularRoutes = [
    {
      to: "Mumbai Expressway",
      price: "2,500",
      url: "/pune-to-mumbai-cab",
      duration: "3.5 Hrs",
    },
    {
      to: "Shirdi Pilgrimage",
      price: "2,000",
      url: "/pune-to-shirdi-cab",
      duration: "2.5 Hrs",
    },
    {
      to: "Nashik Wine Region",
      price: "3,000",
      url: "/pune-to-nashik-cab",
      duration: "4.0 Hrs",
    },
    {
      to: "Mahabaleshwar Peak",
      price: "2,200",
      url: "/pune-to-mahabaleshwar-cab",
      duration: "3.0 Hrs",
    },
    {
      to: "Lonavala Monsoon Ghats",
      price: "1,200",
      url: "/pune-to-lonavala-cab",
      duration: "1.5 Hrs",
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
              <span className="text-xs font-semibold text-luxury-400 uppercase tracking-widest block font-body">
                Premium Mobility Hub
              </span>
              <h1 className="text-4xl md:text-6xl font-bold font-heading text-white leading-tight">
                Pune Chauffeur & Outstation Services
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed font-body">
                Luxury transportation mapped across Pune&apos;s primary tech
                corridors and expressway gates. Punctual, verified drivers
                catering to Hinjewadi, Wakad, Baner, and major outstation
                routes.
              </p>

              <div className="flex gap-4">
                <motion.button
                  ref={bookBtnRef as any}
                  onClick={() => (window.location.href = "/#booking-widget")}
                  className="btn-primary rounded-full px-8 py-3 text-sm tracking-wider uppercase font-semibold font-body"
                >
                  Book Chauffeur
                </motion.button>
                <a
                  href="tel:+919876543210"
                  className="btn-secondary flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide"
                >
                  <Phone className="w-4 h-4 text-luxury-400" />
                  Hotline Helpdesk
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
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800"
                  alt="Pune Chauffeur"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-75" />
                <div className="absolute bottom-6 left-6 text-left">
                  <span className="text-[10px] text-luxury-400 uppercase tracking-widest block font-body">
                    Pune Chauffeur Desk
                  </span>
                  <span className="text-lg font-bold font-heading text-white">
                    24/7 Verified Dispatch
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Zones Grid */}
      <section className="py-20 border-t border-white/5 bg-surface/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-semibold text-luxury-400 uppercase tracking-widest block font-body">
              Local Outlets
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">
              Coverage Zones in Pune
            </h2>
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              We service all commercial, industrial, and IT hubs with premium
              door-to-door connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coverageAreas.map((area) => (
              <motion.div
                key={area.name}
                whileHover={{ y: -5 }}
                className="card-luxury p-6 flex flex-col justify-between items-start cursor-pointer group"
                onClick={() => (window.location.href = area.route)}
              >
                <MapPin className="w-8 h-8 text-luxury-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="font-bold text-white text-lg font-heading mb-1">
                    {area.name}
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Fully Serviced Area
                  </p>
                </div>
                <span className="text-luxury-400 text-xs font-bold uppercase tracking-widest mt-4 group-hover:translate-x-1 transition-transform inline-block">
                  Explore Zone →
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outstation Fares list */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-semibold text-luxury-400 uppercase tracking-widest block font-body">
              Outstation Routes
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">
              Popular Outstation Fares
            </h2>
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              Flat rates inclusive of toll charges and driver allowances.
            </p>
          </div>

          <div className="space-y-4">
            {popularRoutes.map((route) => (
              <div
                key={route.to}
                className="glass p-5 rounded-2xl border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-luxury-400/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-luxury-400/10 rounded-xl text-luxury-400">
                    <Navigation className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-heading">
                      Pune to {route.to}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      Est. Travel Time: {route.duration}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-text-secondary uppercase block">
                      Starting From
                    </span>
                    <span className="text-lg font-bold text-luxury-400 font-heading">
                      ₹{route.price}
                    </span>
                  </div>
                  <button
                    onClick={() => (window.location.href = "/#booking-widget")}
                    className="btn-primary rounded-lg py-2 px-5 text-xs uppercase tracking-wider font-semibold font-body"
                  >
                    Select Route
                  </button>
                </div>
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
