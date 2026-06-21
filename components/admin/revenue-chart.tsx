"use client";

import { motion } from "framer-motion";

export function RevenueChart() {
  const data = [45000, 52000, 48000, 61000, 55000, 67000, 72000];

  return (
    <div className="card-luxury p-6">
      <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
      <div className="h-64 flex items-end justify-between gap-2">
        {data.map((value, index) => (
          <motion.div
            key={index}
            className="flex-1 bg-emerald-500/20 rounded-t-lg relative overflow-hidden"
            style={{ height: `${(value / 75000) * 100}%` }}
            initial={{ height: 0 }}
            animate={{ height: `${(value / 75000) * 100}%` }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-emerald-500/50 rounded-t-lg"
              initial={{ height: 0 }}
              animate={{ height: "40%" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            />
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between mt-4 text-sm text-text-secondary">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
      </div>
    </div>
  );
}
