"use client";

import Link from "next/link";
import {
  Car,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Github,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMagnetic } from "@/lib/motion/motion-system";

export function Footer() {
  const logoRef = useMagnetic(30, 0.2);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-white/5 pt-20 pb-10 relative overflow-hidden z-10">
      {/* Background radial accent glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-luxury-400/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand details */}
          <div className="space-y-6">
            <Link
              href="/"
              className="flex items-center gap-2 group outline-none"
            >
              <motion.div
                ref={logoRef as any}
                className="flex items-center gap-2"
              >
                <Car className="w-8 h-8 text-luxury-400" />
                <span className="text-xl font-bold font-heading gold-gradient bg-clip-text text-transparent">
                  PM Cab Service
                </span>
              </motion.div>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed font-body">
              Premium chauffeur-driven mobility service across the Pune-Mumbai
              expressway corridor. Tailored for corporate executives and premium
              travelers.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 items-center pt-2">
              <a
                href="#"
                className="p-2 bg-white/5 rounded-full hover:bg-luxury-400 hover:text-background transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4 text-green-400 group-hover:text-background" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/5 rounded-full hover:bg-luxury-400 hover:text-background transition-colors duration-300"
              >
                <Phone className="w-4 h-4 text-luxury-400 group-hover:text-background" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest font-body border-b border-white/5 pb-2">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm text-text-secondary font-body">
              <li>
                <Link
                  href="/airport-transfer"
                  className="hover:text-luxury-400 transition-colors"
                >
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link
                  href="/corporate-travel"
                  className="hover:text-luxury-400 transition-colors"
                >
                  Corporate Mobility
                </Link>
              </li>
              <li>
                <Link
                  href="/employee-transport"
                  className="hover:text-luxury-400 transition-colors"
                >
                  Employee Commutes
                </Link>
              </li>
              <li>
                <Link
                  href="/luxury-cars"
                  className="hover:text-luxury-400 transition-colors"
                >
                  Luxury Sedan Fleet
                </Link>
              </li>
              <li>
                <Link
                  href="/pune-to-lonavala-cab"
                  className="hover:text-luxury-400 transition-colors"
                >
                  Monsoon Special Trips
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Coverage Hubs */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest font-body border-b border-white/5 pb-2">
              Coverage Hubs
            </h4>
            <ul className="space-y-2.5 text-sm text-text-secondary font-body">
              <li>
                <Link
                  href="/pune"
                  className="hover:text-luxury-400 transition-colors"
                >
                  Pune Outstation
                </Link>
              </li>
              <li>
                <Link
                  href="/mumbai"
                  className="hover:text-luxury-400 transition-colors"
                >
                  Mumbai Outstation
                </Link>
              </li>
              <li>
                <Link
                  href="/hinjewadi-cab-service"
                  className="hover:text-luxury-400 transition-colors"
                >
                  Hinjewadi IT Zone
                </Link>
              </li>
              <li>
                <Link
                  href="/bandra-cab-service"
                  className="hover:text-luxury-400 transition-colors"
                >
                  Bandra BKC Area
                </Link>
              </li>
              <li>
                <Link
                  href="/wakad-cab-service"
                  className="hover:text-luxury-400 transition-colors"
                >
                  Wakad Expressway Gate
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Helpdesk */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest font-body border-b border-white/5 pb-2">
              Helpdesk Desk
            </h4>
            <ul className="space-y-3.5 text-sm text-text-secondary font-body">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-luxury-400 flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="hover:text-white transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-luxury-400 flex-shrink-0" />
                <a
                  href="mailto:bookings@punemumbaicab.com"
                  className="hover:text-white transition-colors"
                >
                  bookings@punemumbaicab.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-luxury-400 flex-shrink-0 mt-0.5" />
                <span>Hinjewadi Phase 1, Pune, Maharashtra 411057</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-secondary/50 font-body">
          <p>
            © {currentYear} Pune-Mumbai Premium Cab Service. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1">
            <span>Designed for Awwwards digital standards</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  );
}
