"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

export function FloatingCta() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed right-6 bottom-24 z-40 hidden md:block"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <div className="relative">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="absolute bottom-16 right-0 mb-2 w-64 card-luxury p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <h4 className="font-semibold mb-3">Need Help Booking?</h4>
                  <div className="space-y-2">
                    <a
                      href="tel:+919876543210"
                      className="flex items-center gap-3 p-3 rounded-lg bg-luxury-400/10 hover:bg-luxury-400/20 transition-colors"
                    >
                      <Phone className="w-5 h-5 text-luxury-400" />
                      <div>
                        <p className="font-medium">Call Us</p>
                        <p className="text-sm text-text-secondary">
                          +91 98765 43210
                        </p>
                      </div>
                    </a>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-green-600/10 hover:bg-green-600/20 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium">WhatsApp</p>
                        <p className="text-sm text-text-secondary">
                          Chat with us
                        </p>
                      </div>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                isOpen
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-luxury-400 hover:bg-luxury-500 gold-glow"
              }`}
              aria-label={
                isOpen ? "Close contact options" : "Open contact options"
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "phone"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                >
                  {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                  ) : (
                    <Phone className="w-6 h-6 text-background" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
