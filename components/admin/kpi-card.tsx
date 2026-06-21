"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export function KpiCard({ title, value, change, trend }: KpiCardProps) {
  return (
    <motion.div
      className="card-luxury p-6"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-sm text-text-secondary mb-2">{title}</p>
      <p className="text-3xl font-bold mb-3">{value}</p>
      <div
        className={`flex items-center gap-1 text-sm ${
          trend === "up" ? "text-green-400" : "text-red-400"
        }`}
      >
        {trend === "up" ? (
          <TrendingUp className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        )}
        <span>{change} from last month</span>
      </div>
    </motion.div>
  );
}
