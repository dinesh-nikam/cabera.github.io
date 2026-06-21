"use client";

import { motion } from "framer-motion";

export function BookingsChart() {
  const data = [65, 78, 85, 72, 90, 88, 95];

  return (
    <div className="card-luxury p-6">
      <h3 className="text-lg font-semibold mb-4">Weekly Bookings</h3>
      <div className="h-64 flex items-end justify-between gap-2">
        {data.map((value, index) => (
          <motion.div
            key={index}
            className="flex-1 bg-luxury-400/20 rounded-t-lg relative overflow-hidden"
            style={{ height: `${(value / 100) * 100}%` }}
            initial={{ height: 0 }}
            animate={{ height: `${(value / 100) * 100}%` }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-luxury-400/50 rounded-t-lg"
              initial={{ height: 0 }}
              animate={{ height: "30%" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            />
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between mt-4 text-sm text-text-secondary">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  );
}
