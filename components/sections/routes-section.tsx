"use client";

import { motion } from "framer-motion";
import { RouteCard } from "@/components/ui/route-card";

const popularRoutes = [
  {
    from: "Pune",
    to: "Mumbai",
    distance: "150 km",
    duration: "3.5 hrs",
    price: 2500,
  },
  {
    from: "Mumbai",
    to: "Pune",
    distance: "150 km",
    duration: "3.5 hrs",
    price: 2500,
  },
  {
    from: "Pune",
    to: "Airport",
    distance: "20 km",
    duration: "45 mins",
    price: 800,
  },
  {
    from: "Pune",
    to: "Shirdi",
    distance: "120 km",
    duration: "2.5 hrs",
    price: 2000,
  },
  {
    from: "Pune",
    to: "Nashik",
    distance: "200 km",
    duration: "4 hrs",
    price: 3000,
  },
  {
    from: "Pune",
    to: "Goa",
    distance: "450 km",
    duration: "8 hrs",
    price: 6000,
  },
  {
    from: "Pune",
    to: "Mahabaleshwar",
    distance: "120 km",
    duration: "3 hrs",
    price: 2200,
  },
  {
    from: "Pune",
    to: "Lonavala",
    distance: "65 km",
    duration: "1.5 hrs",
    price: 1200,
  },
];

export function RoutesSection() {
  return (
    <section className="py-20 bg-background" aria-label="Popular Routes">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            Popular Routes
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Quick booking for our most traveled destinations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRoutes.map((route, index) => (
            <motion.div
              key={`${route.from}-${route.to}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <RouteCard {...route} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
