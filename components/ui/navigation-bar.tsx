"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  Car,
  ChevronDown,
  Check,
} from "lucide-react";
import { useMagnetic } from "@/lib/motion/motion-system";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pune", label: "Pune Outstation" },
  { href: "/mumbai", label: "Mumbai Outstation" },
  { href: "#services", label: "Services", hasMegaMenu: true },
  { href: "#fleet", label: "Fleet" },
  { href: "/blog", label: "Blog" },
];

const servicesPreview = [
  { title: "Airport Transfers", desc: "Flight-tracked terminal arrivals" },
  { title: "Corporate Mobility", desc: "Monthly billing & executive fleet" },
  { title: "Outstation Trips", desc: "Scenic mountain & coastline travel" },
  { title: "Local Car Rentals", desc: "By-the-hour chauffeur hires" },
];

export function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState(false);

  // Apply luxury magnetic force to logo and primary buttons
  const logoRef = useMagnetic(30, 0.2);
  const callBtnRef = useMagnetic(30, 0.25);
  const bookBtnRef = useMagnetic(40, 0.3);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-500"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <motion.nav
        layout
        className={`mx-auto flex items-center justify-between transition-all duration-500 ${
          isScrolled
            ? "max-w-4xl mt-4 px-6 py-2 rounded-full border border-white/10 bg-surface/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            : "w-full py-5 px-6 border-b border-white/5 bg-transparent"
        }`}
        role="navigation"
        aria-label="Main luxury navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group outline-none">
          <motion.div ref={logoRef as any} className="flex items-center gap-2">
            <Car className="w-8 h-8 text-luxury-400 group-hover:rotate-6 transition-transform duration-300" />
            <span className="text-xl font-bold font-heading tracking-tight gold-gradient bg-clip-text text-transparent">
              PM Cab Service
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, idx) => (
            <div
              key={link.label}
              className="relative py-2 px-4"
              onMouseEnter={() => {
                setHoveredIndex(idx);
                if (link.hasMegaMenu) setActiveMegaMenu(true);
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                if (link.hasMegaMenu) setActiveMegaMenu(false);
              }}
            >
              <Link
                href={link.href}
                className="text-text-secondary hover:text-white transition-colors duration-300 font-medium text-sm tracking-wide flex items-center gap-1"
              >
                {link.label}
                {link.hasMegaMenu && (
                  <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />
                )}
              </Link>

              {/* Slide-hover background element */}
              {hoveredIndex === idx && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-4 right-4 h-[2px] bg-luxury-400 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Mega Menu Dropdown */}
              {link.hasMegaMenu && activeMegaMenu && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 glass p-6 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] border border-white/10 grid grid-cols-1 gap-4 pointer-events-auto"
                  >
                    <div className="text-xs text-luxury-400 uppercase tracking-widest font-body border-b border-white/5 pb-2">
                      Premium Offerings
                    </div>
                    {servicesPreview.map((serv) => (
                      <div
                        key={serv.title}
                        className="group/item flex items-start gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                      >
                        <Check className="w-4 h-4 text-luxury-400 mt-1 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        <div>
                          <div className="text-sm font-semibold text-white group-hover/item:text-luxury-400 transition-colors">
                            {serv.title}
                          </div>
                          <div className="text-xs text-text-secondary">
                            {serv.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Desktop CTA Action Panel */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            ref={callBtnRef as any}
            href="tel:+919876543210"
            className="p-3 rounded-full bg-surface-light border border-white/5 hover:border-luxury-400/30 transition-all duration-300"
            aria-label="Call Chauffeur Desk"
          >
            <Phone className="w-4 h-4 text-luxury-400" />
          </motion.a>

          <motion.button
            ref={bookBtnRef as any}
            className="btn-primary rounded-full text-xs uppercase tracking-widest font-semibold font-body border border-luxury-400/20"
            onClick={() =>
              document
                .getElementById("booking-widget")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Book Now
          </motion.button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden p-2 text-text-primary hover:text-luxury-400 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isMobileMenuOpen ? "close" : "menu"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </motion.nav>

      {/* Mobile Glass Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden mt-2 bg-surface/95 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block py-2 text-lg text-text-secondary hover:text-luxury-400 font-heading border-b border-white/5 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 btn-secondary py-3 rounded-xl text-center"
                >
                  <Phone className="w-4 h-4 text-luxury-400" />
                  Chauffeur Hotline
                </a>
                <button
                  className="btn-primary py-3 rounded-xl w-full uppercase tracking-wider font-semibold"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document
                      .getElementById("booking-widget")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Request Chauffeur
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
