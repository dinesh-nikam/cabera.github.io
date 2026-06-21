"use client";

import { motion } from "framer-motion";
import { Search, Filter, Download, Calendar, MapPin } from "lucide-react";

const bookings = [
  {
    id: "PMCB-2026-001",
    customer: "Rajesh Kumar",
    pickup: "Hinjewadi",
    drop: "Mumbai Airport",
    date: "2026-01-15",
    time: "02:30 PM",
    status: "COMPLETED",
    amount: 2800,
    driver: "Amit Patel",
  },
  {
    id: "PMCB-2026-002",
    customer: "Priya Sharma",
    pickup: "Baner",
    drop: "Kharadi",
    date: "2026-01-15",
    time: "01:15 PM",
    status: "TRIP_STARTED",
    amount: 450,
    driver: "Suresh Patil",
  },
];

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Bookings</h1>
          <p className="text-text-secondary">Manage all cab bookings</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Search bookings..."
            className="input-luxury pl-12 w-full"
          />
        </div>
        <select className="input-luxury">
          <option>All Status</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="card-luxury overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-white/10">
            <tr className="text-left">
              <th className="p-4 font-medium">Booking ID</th>
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Route</th>
              <th className="p-4 font-medium">Date & Time</th>
              <th className="p-4 font-medium">Driver</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <motion.tr
                key={booking.id}
                className="border-b border-white/5 hover:bg-luxury-400/5 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td className="p-4 font-mono text-sm">{booking.id}</td>
                <td className="p-4">{booking.customer}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-3 h-3 text-luxury-400" />
                    {booking.pickup} → {booking.drop}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    {booking.date}
                    <br />
                    <span className="text-text-secondary">{booking.time}</span>
                  </div>
                </td>
                <td className="p-4">{booking.driver || "—"}</td>
                <td className="p-4 font-semibold">₹{booking.amount}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === "COMPLETED"
                        ? "bg-green-500/20 text-green-400"
                        : booking.status === "TRIP_STARTED"
                          ? "bg-luxury-400/20 text-luxury-400"
                          : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {booking.status.replace("_", " ")}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
