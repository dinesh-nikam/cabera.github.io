"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const drivers = [
  {
    id: "DRV001",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    rating: 4.8,
    vehicle: "Toyota Innova (MH-12-AB-1234)",
    status: "ACTIVE",
    todayEarnings: 3200,
    trips: 8,
  },
  {
    id: "DRV002",
    name: "Amit Sharma",
    phone: "+91 98765 43211",
    rating: 4.9,
    vehicle: "Maruti Dzire (MH-12-CD-5678)",
    status: "ONLINE",
    todayEarnings: 4500,
    trips: 12,
  },
  {
    id: "DRV003",
    name: "Suresh Patil",
    phone: "+91 98765 43212",
    rating: 4.7,
    vehicle: "Toyota Crysta (MH-12-EF-9012)",
    status: "OFFLINE",
    todayEarnings: 2800,
    trips: 6,
  },
];

export default function DriversPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-heading">Drivers</h1>
        <p className="text-text-secondary">Manage your driver fleet</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
        <input
          type="text"
          placeholder="Search drivers..."
          className="input-luxury pl-12 w-full max-w-md"
        />
      </div>

      <div className="card-luxury overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-white/10">
            <tr>
              <th className="text-left p-4 font-medium">Driver</th>
              <th className="text-left p-4 font-medium">Vehicle</th>
              <th className="text-left p-4 font-medium">Rating</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="text-left p-4 font-medium">Today&apos;s Trips</th>
              <th className="text-left p-4 font-medium">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <motion.tr
                key={driver.id}
                className="border-b border-white/5 hover:bg-luxury-400/5 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td className="p-4">
                  <div>
                    <p className="font-medium">{driver.name}</p>
                    <p className="text-sm text-text-secondary">
                      {driver.phone}
                    </p>
                  </div>
                </td>
                <td className="p-4 text-sm">{driver.vehicle}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{driver.rating}</span>
                    <span className="text-luxury-400">★</span>
                  </div>
                </td>
                <td className="p-4">
                  <Badge
                    variant={
                      driver.status === "ONLINE"
                        ? "default"
                        : driver.status === "ACTIVE"
                          ? "secondary"
                          : "outline"
                    }
                    className={
                      driver.status === "ONLINE"
                        ? "bg-green-500/20 text-green-400"
                        : driver.status === "ACTIVE"
                          ? "bg-luxury-400/20 text-luxury-400"
                          : "bg-text-secondary/20"
                    }
                  >
                    {driver.status}
                  </Badge>
                </td>
                <td className="p-4">{driver.trips}</td>
                <td className="p-4 font-medium">₹{driver.todayEarnings}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
