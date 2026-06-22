"use client";

import { motion } from "framer-motion";
import {
  Plane,
  Car,
  Building2,
  Calendar,
  Crown,
  Users,
  Route,
  Briefcase,
} from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Airport Transfer",
    description:
      "Seamless airport transfers with flight tracking and timely pickups",
    href: "/airport-transfer",
  },
  {
    icon: Car,
    title: "Local Taxi",
    description: "Hourly and point-to-point travel within city limits",
    href: "/local-taxi",
  },
  {
    icon: Route,
    title: "Outstation Cab",
    description:
      "Long-distance travel with comfortable stops and flexible routes",
    href: "/outstation-cab",
  },
  {
    icon: Briefcase,
    title: "Corporate Travel",
    description: "Dedicated corporate accounts with monthly billing options",
    href: "/corporate-travel",
  },
  {
    icon: Calendar,
    title: "Wedding Travel",
    description:
      "Luxury vehicles for your special day with premium decor options",
    href: "/wedding-travel",
  },
  {
    icon: Building2,
    title: "Event Transportation",
    description: "Large fleet for events, conferences, and group travel",
    href: "/event-transportation",
  },
  {
    icon: Crown,
    title: "Luxury Cars",
    description: "Mercedes, BMW, and premium vehicles for executive travel",
    href: "/luxury-cars",
  },
  {
    icon: Users,
    title: "Employee Transport",
    description: "Streamlined daily commute solutions for corporate employees",
    href: "/employee-transport",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-background" aria-label="Our Services">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            Our Premium Services
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Comprehensive transportation solutions tailored to your needs
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {services.map((service, index) => (
            <motion.a
              key={service.title}
              href={service.href}
              className="card-luxury p-6 text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-luxury-400 focus:ring-offset-2 focus:ring-offset-background min-h-[88px]"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <service.icon className="w-12 h-12 mx-auto mb-4 text-luxury-400 group-hover:text-luxury-300 transition-colors" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-text-secondary">
                {service.description}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
