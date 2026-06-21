"use client";

import { motion } from "framer-motion";

const bookings = [
  {
    id: "PMCB-2026-001",
    customer: "Rajesh Kumar",
    route: "Hinjewadi → Mumbai Airport",
    amount: 2800,
    status: "COMPLETED",
    date: "Today, 2:30 PM",
  },
  {
    id: "PMCB-2026-002",
    customer: "Priya Sharma",
    route: "Baner → Kharadi",
    amount: 450,
    status: "IN_PROGRESS",
    date: "Today, 1:15 PM",
  },
  {
    id: "PMCB-2026-003",
    customer: "Amit Patel",
    route: "Pune → Nashik",
    amount: 3200,
    status: "CONFIRMED",
    date: "Tomorrow, 8:00 AM",
  },
];

export function RecentBookings() {
  return (
    <div className="card-luxury overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-lg font-semibold">Recent Bookings</h3>
      </div>

      <div className="divide-y divide-white/5">
        {bookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            className="p-4 grid grid-cols-5 items-center hover:bg-luxury-400/5 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div>
              <p className="font-medium text-sm">{booking.id}</p>
              <p className="text-xs text-text-secondary">{booking.date}</p>
            </div>
            <p className="text-sm">{booking.customer}</p>
            <p className="text-sm text-text-secondary">{booking.route}</p>
            <p className="font-semibold">₹{booking.amount}</p>
            <span
              className={`text-xs px-2 py-1 rounded-full w-fit ${
                booking.status === "COMPLETED"
                  ? "bg-green-500/20 text-green-400"
                  : booking.status === "IN_PROGRESS"
                    ? "bg-luxury-400/20 text-luxury-400"
                    : "bg-blue-500/20 text-blue-400"
              }`}
            >
              {booking.status.replace("_", " ")}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
