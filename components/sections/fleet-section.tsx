"use client";

import { motion } from "framer-motion";
import { Users, Luggage, Star, Shield, Wifi, Zap } from "lucide-react";

const fleet = [
  {
    id: "sedan",
    name: "Sedan",
    models: ["Dzire", "Etios"],
    capacity: 4,
    luggage: 2,
    features: ["AC", "Music System", "GPS", "First Aid Kit"],
    price: 1500,
    image: "/images/vehicles/sedan.png",
  },
  {
    id: "suv",
    name: "SUV",
    models: ["Ertiga", "Innova"],
    capacity: 7,
    luggage: 4,
    features: ["AC", "Music System", "GPS", "First Aid Kit", "Charging Point"],
    price: 2000,
    image: "/images/vehicles/suv.png",
  },
  {
    id: "premium-suv",
    name: "Premium SUV",
    models: ["Crysta"],
    capacity: 8,
    luggage: 6,
    features: [
      "AC",
      "Music System",
      "GPS",
      "First Aid Kit",
      "Charging Point",
      "Reclining Seats",
    ],
    price: 2500,
    image: "/images/vehicles/premium-suv.png",
  },
  {
    id: "luxury",
    name: "Luxury",
    models: ["Mercedes E-Class", "BMW 5 Series"],
    capacity: 4,
    luggage: 3,
    features: [
      "AC",
      "Premium Music",
      "GPS",
      "Champagne",
      "Tissue Box",
      "Wi-Fi",
    ],
    price: 4000,
    image: "/images/vehicles/luxury.png",
  },
];

export function FleetSection() {
  return (
    <section className="py-20 bg-surface" aria-label="Our Fleet">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            Our Premium Fleet
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Choose from our wide range of well-maintained vehicles for your
            comfort
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {fleet.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="card-luxury overflow-hidden h-full flex flex-col"
                whileHover={{ y: -10, rotateX: 5, rotateY: -5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <motion.img
                    src={vehicle.image}
                    alt={`${vehicle.name} - ${vehicle.models.join(", ")}`}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute top-2 right-2 bg-luxury-400 text-background px-3 py-1 rounded-full text-sm font-semibold">
                    ₹{vehicle.price}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2">{vehicle.name}</h3>
                <p className="text-sm text-text-secondary mb-4">
                  {vehicle.models.join(" • ")}
                </p>

                <div className="flex items-center gap-4 mb-4 text-text-secondary">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">
                      {vehicle.capacity} Passengers
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Luggage className="w-4 h-4" />
                    <span className="text-sm">{vehicle.luggage} Luggage</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-text-secondary mb-2">Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-2 py-1 bg-luxury-400/10 text-luxury-400 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.button
                  className="w-full bg-luxury-400/10 hover:bg-luxury-400 hover:text-background text-luxury-400 font-semibold py-3 rounded-lg transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  Book {vehicle.name}
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
