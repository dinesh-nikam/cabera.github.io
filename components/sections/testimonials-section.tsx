"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Hinjewadi, Pune",
    rating: 5,
    route: "Pune → Mumbai Airport",
    image: "/images/testimonials/customer1.jpg",
    text: "Excellent service! The driver was punctual and the car was spotless. Made it to my flight on time with GPS tracking throughout.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Andheri, Mumbai",
    rating: 5,
    route: "Mumbai City Tour",
    image: "/images/testimonials/customer2.jpg",
    text: "Booked a luxury car for our anniversary. The experience was top-notch with champagne and premium music system. Highly recommended!",
  },
  {
    id: 3,
    name: "Amit Patel",
    location: "Wakad, Pune",
    rating: 4,
    route: "Pune → Nashik",
    image: "/images/testimonials/customer3.jpg",
    text: "Outstation trip was comfortable. Driver was professional and knew the best routes. Will use again for my business travel.",
  },
  {
    id: 4,
    name: "Sneha Desai",
    location: "Bandra, Mumbai",
    rating: 5,
    route: "Mumbai → Pune",
    image: "/images/testimonials/customer4.jpg",
    text: "Best corporate cab service I've used. Monthly billing works perfectly with our travel requirements. Drivers are verified and reliable.",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-surface" aria-label="Customer Testimonials">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            What Our Customers Say
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Trusted by thousands for their transportation needs
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="card-luxury p-8 md:p-12 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Quote className="w-12 h-12 mx-auto mb-6 text-luxury-400/30" />

              <p className="text-xl md:text-2xl text-text-primary mb-8 leading-relaxed">
                &ldquo;{testimonials[currentIndex].text}&rdquo;
              </p>

              <div className="flex items-center justify-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonials[currentIndex].rating
                        ? "fill-luxury-400 text-luxury-400"
                        : "text-text-secondary/30"
                    }`}
                  />
                ))}
              </div>

              <div>
                <p className="font-semibold text-lg">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-text-secondary">
                  {testimonials[currentIndex].location}
                </p>
                <p className="text-luxury-400 text-sm mt-1">
                  {testimonials[currentIndex].route}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-luxury-400 w-6"
                    : "bg-text-secondary/30 hover:bg-luxury-400/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
