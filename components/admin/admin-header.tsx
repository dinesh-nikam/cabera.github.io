"use client";

import { Bell, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export function AdminHeader() {
  return (
    <header className="h-16 bg-surface/50 backdrop-blur-lg border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-50">
      <h2 className="text-xl font-bold font-heading">Pune Mumbai Cab Admin</h2>

      <div className="flex items-center gap-4">
        <motion.button
          className="relative p-2 rounded-lg hover:bg-luxury-400/10 transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-5 h-5 text-text-secondary" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-luxury-400 rounded-full" />
        </motion.button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-luxury-400/20 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-luxury-400" />
          </div>
          <span className="text-sm font-medium">Admin User</span>
        </div>

        <button className="p-2 rounded-lg hover:bg-red-500/10 transition-colors">
          <LogOut className="w-5 h-5 text-red-400" />
        </button>
      </div>
    </header>
  );
}
