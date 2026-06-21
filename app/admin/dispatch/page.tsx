"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Plus,
  Compass,
  RefreshCw,
  Phone,
  User,
  Car,
  MapPin,
  Clock,
  ArrowRight,
  Shield,
  CheckCircle,
  Play,
  CheckSquare,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Send
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnimatedButton } from "@/components/ui/animated-button";

interface Driver {
  id: string;
  driverCode: string;
  name: string;
  phone: string;
  rating: number;
  status: string;
  isOnline: boolean;
  lastLocationLat?: number;
  lastLocationLng?: number;
  vehicle?: {
    id: string;
    registrationNumber: string;
    make: string;
    model: string;
    vehicleType: string;
  } | null;
}

interface Booking {
  id: string;
  bookingNumber: string;
  pickupAddress: string;
  dropAddress: string;
  pickupDateTime: string;
  tripType: string;
  vehicleType: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  driver?: Driver | null;
  vehicle?: any | null;
}

export default function DispatchConsole() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Modals
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  // Manual Booking Form State
  const [manualForm, setManualForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    pickupAddress: "",
    dropAddress: "",
    pickupDateTime: "",
    tripType: "ONE_WAY",
    vehicleType: "SEDAN"
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [assigningBookingId, setAssigningBookingId] = useState<string | null>(null);

  // Mocks driver locations moving on the map
  const [simulatedDrivers, setSimulatedDrivers] = useState<Array<{ id: string; name: string; progress: number; status: string }>>([
    { id: "1", name: "Amit Patil", progress: 0.15, status: "TRIP_STARTED" },
    { id: "2", name: "Suresh Patil", progress: 0.65, status: "TRIP_STARTED" },
    { id: "3", name: "Rajesh Kumar", progress: 0.9, status: "DRIVER_REACHED" }
  ]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      // Simulate slow vehicle movement on the map every few seconds
      setSimulatedDrivers((prev) =>
        prev.map((d) => {
          if (d.progress >= 1.0) return { ...d, progress: 0 };
          return { ...d, progress: Number((d.progress + 0.02).toFixed(3)) };
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bRes, dRes, vRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/drivers"),
        fetch("/api/vehicles")
      ]);

      const bData = await bRes.json();
      const dData = await dRes.json();
      const vData = await vRes.json();

      setBookings(bData || []);
      setDrivers(dData.drivers || []);
      setVehicles(vData.vehicles || []);
    } catch (e) {
      console.error("Failed to load dispatch data:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleStateTransition = async (bookingId: string, targetStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: targetStatus, role: "DISPATCHER" })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update status");
      }

      const updated = await res.json();
      setBookings(bookings.map((b) => (b.id === bookingId ? updated : b)));
      if (selectedBooking?.id === bookingId) {
        setSelectedBooking(updated);
      }
    } catch (e: any) {
      alert(e.message || "Failed to update booking status");
    }
  };

  const handleAssignDriver = async (driverId: string, vehicleId: string) => {
    if (!assigningBookingId) return;
    try {
      const res = await fetch(`/api/bookings/${assigningBookingId}/assign-driver`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driverId, vehicleId })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to assign driver");
      }

      const updated = await res.json();
      setBookings(bookings.map((b) => (b.id === assigningBookingId ? updated : b)));
      if (selectedBooking?.id === assigningBookingId) {
        setSelectedBooking(updated);
      }
      setShowAssignModal(false);
      setAssigningBookingId(null);
    } catch (e: any) {
      alert(e.message || "Failed to allocate driver");
    }
  };

  const handleManualBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(manualForm)
      });

      if (!res.ok) {
        throw new Error("Failed to create manual booking");
      }

      const created = await res.json();
      setBookings([created, ...bookings]);
      setShowManualModal(false);
      setManualForm({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        pickupAddress: "",
        dropAddress: "",
        pickupDateTime: "",
        tripType: "ONE_WAY",
        vehicleType: "SEDAN"
      });
    } catch (e: any) {
      alert(e.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const toggleDriverOnline = async (driverId: string, currentOnline: boolean) => {
    try {
      const res = await fetch(`/api/drivers/${driverId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOnline: !currentOnline })
      });

      if (res.ok) {
        const updated = await res.json();
        setDrivers(drivers.map((d) => (d.id === driverId ? { ...d, isOnline: updated.isOnline } : d)));
      }
    } catch (e) {
      console.error("Failed to toggle online status:", e);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.pickupAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.dropAddress.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pending") return matchesSearch && b.status === "PENDING";
    if (activeTab === "confirmed") return matchesSearch && b.status === "CONFIRMED";
    if (activeTab === "assigned") return matchesSearch && b.status === "ASSIGNED";
    if (activeTab === "active")
      return matchesSearch && ["DRIVER_REACHED", "TRIP_STARTED"].includes(b.status);
    return matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DRAFT":
        return <Badge variant="outline">DRAFT</Badge>;
      case "PENDING":
        return <Badge variant="warning">PENDING</Badge>;
      case "CONFIRMED":
        return <Badge variant="default">CONFIRMED</Badge>;
      case "ASSIGNED":
        return <Badge variant="success">ASSIGNED</Badge>;
      case "DRIVER_REACHED":
        return <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/30">ARRIVED</Badge>;
      case "TRIP_STARTED":
        return <Badge className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">IN TRIP</Badge>;
      case "COMPLETED":
        return <Badge variant="success">COMPLETED</Badge>;
      case "CANCELLED":
        return <Badge variant="destructive">CANCELLED</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 text-white min-h-screen">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Compass className="w-8 h-8 text-luxury-400 animate-spin-slow" />
            <h1 className="text-3xl font-bold font-heading">Dispatch Control Center</h1>
          </div>
          <p className="text-text-secondary mt-1">Real-time driver allocations, manual booking overrides & state controls</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchData}
            className="p-3 bg-surface-light border border-white/10 hover:border-luxury-400/30 rounded-lg transition-colors flex items-center gap-2"
            title="Refresh logs"
          >
            <RefreshCw className="w-5 h-5 text-luxury-400" />
            Sync Dashboard
          </button>
          <button
            onClick={() => setShowManualModal(true)}
            className="btn-primary flex items-center gap-2 px-5"
          >
            <Plus className="w-5 h-5" />
            New Booking (Call Center)
          </button>
        </div>
      </div>

      {/* Primary Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: LIVE QUEUE & SEARCH */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card-luxury p-4 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search live queue (ID, customer name, route)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-luxury pl-12 w-full text-sm"
                />
              </div>
              <div className="flex gap-1 bg-background/50 p-1 border border-white/5 rounded-lg w-full sm:w-auto">
                {["all", "pending", "confirmed", "assigned", "active"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase transition-all flex-1 sm:flex-none ${
                      activeTab === tab
                        ? "bg-luxury-400 text-background"
                        : "text-text-secondary hover:text-luxury-400"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings List */}
            {loading ? (
              <div className="py-20 text-center text-text-secondary">
                <RefreshCw className="w-8 h-8 mx-auto animate-spin text-luxury-400 mb-2" />
                Retrieving active bookings queue...
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-white/10 rounded-xl bg-background/10">
                <HelpCircle className="w-12 h-12 text-text-secondary/50 mx-auto mb-3" />
                <p className="font-semibold text-lg">No active dispatches found</p>
                <p className="text-sm text-text-secondary">Try adjusting filters or submit a manual booking</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {filteredBookings.map((booking) => {
                  const isSelected = selectedBooking?.id === booking.id;
                  return (
                    <div
                      key={booking.id}
                      onClick={() => setSelectedBooking(booking)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "border-luxury-400 bg-luxury-400/5 shadow-[0_0_15px_rgba(212,175,55,0.05)]"
                          : "border-white/5 bg-surface hover:border-white/15"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-luxury-400">
                            {booking.bookingNumber}
                          </span>
                          <span className="text-xs text-text-secondary">•</span>
                          <span className="text-xs text-text-secondary flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-luxury-400" />
                            {new Date(booking.pickupDateTime).toLocaleString("en-IN", {
                              dateStyle: "short",
                              timeStyle: "short"
                            })}
                          </span>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mt-3">
                        <div className="space-y-1">
                          <p className="text-text-secondary text-xs flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-green-400" /> Pickup
                          </p>
                          <p className="font-medium truncate">{booking.pickupAddress}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-text-secondary text-xs flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-red-400" /> Destination
                          </p>
                          <p className="font-medium truncate">{booking.dropAddress}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-luxury-400/10 flex items-center justify-center text-[10px] font-bold text-luxury-400">
                            {booking.customer.name.charAt(0)}
                          </div>
                          <span>
                            {booking.customer.name} ({booking.customer.phone})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {booking.driver ? (
                            <span className="flex items-center gap-1 text-luxury-400 font-medium">
                              <User className="w-3.5 h-3.5" />
                              {booking.driver.name}
                            </span>
                          ) : (
                            <span className="text-yellow-500/90 font-medium animate-pulse flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              UNALLOCATED
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* VISUAL TRACKING MAP SIMULATION */}
          <div className="card-luxury p-5 space-y-4">
            <h3 className="text-lg font-bold font-heading flex items-center gap-2">
              <Compass className="w-5 h-5 text-luxury-400" /> Live Simulated Fleet Map (Pune ↔ Mumbai)
            </h3>
            <div className="relative h-64 bg-[#070707] border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
              {/* Grid Background Mock */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px]" />

              {/* Expressway Vector Line */}
              <svg className="absolute w-full h-full p-8" viewBox="0 0 500 200" preserveAspectRatio="none">
                <path
                  d="M50,150 Q250,50 450,150"
                  fill="none"
                  stroke="rgba(212,175,55,0.15)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  id="glowing-expressway"
                  d="M50,150 Q250,50 450,150"
                  fill="none"
                  stroke="url(#mapGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="stroke-[2.5]"
                />
                <defs>
                  <linearGradient id="mapGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="50%" stopColor="#f5e6b3" />
                    <stop offset="100%" stopColor="#d4af37" />
                  </linearGradient>
                </defs>

                {/* Cities Coordinates */}
                <circle cx="50" cy="150" r="7" fill="#0A0A0A" stroke="#d4af37" strokeWidth="2.5" />
                <circle cx="250" cy="98" r="5" fill="#0A0A0A" stroke="#d4af37" strokeWidth="2" />
                <circle cx="450" cy="150" r="7" fill="#0A0A0A" stroke="#d4af37" strokeWidth="2.5" />
              </svg>

              {/* Simulated Vehicle Icons on Route */}
              {simulatedDrivers.map((car, idx) => {
                // Calculate position along curve Q(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
                // coordinates: P0=(50, 150), P1=(250, 50), P2=(450, 150)
                const t = car.progress;
                const x = (1 - t) * (1 - t) * 50 + 2 * (1 - t) * t * 250 + t * t * 450;
                const y = (1 - t) * (1 - t) * 150 + 2 * (1 - t) * t * 50 + t * t * 150;

                // Adjust to percentage position for styling offsets (accounting for absolute parent coords)
                return (
                  <motion.div
                    key={car.id}
                    className="absolute z-20 pointer-events-none flex flex-col items-center"
                    style={{
                      left: `calc(${x / 5}% - 12px)`,
                      top: `calc(${y / 2}% - 25px)`
                    }}
                    animate={{ scale: [0.95, 1.05, 0.95] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-luxury-400 shadow-[0_0_10px_#d4af37] flex items-center justify-center text-background text-[10px] font-black border border-white">
                      🚕
                    </div>
                    <span className="bg-background/90 text-[8px] border border-white/10 px-1 py-0.5 rounded text-luxury-400 font-bold whitespace-nowrap mt-1 drop-shadow-md">
                      {car.name}
                    </span>
                  </motion.div>
                );
              })}

              {/* Labels */}
              <div className="absolute bottom-5 left-8 text-center">
                <span className="text-[10px] font-bold tracking-widest text-text-secondary uppercase">Pune</span>
                <p className="text-[9px] text-green-400 font-medium">Hub South</p>
              </div>
              <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center">
                <span className="text-[10px] font-bold tracking-widest text-text-secondary uppercase">Lonavala</span>
                <p className="text-[9px] text-luxury-400 font-medium">Midpoint</p>
              </div>
              <div className="absolute bottom-5 right-8 text-center">
                <span className="text-[10px] font-bold tracking-widest text-text-secondary uppercase">Mumbai</span>
                <p className="text-[9px] text-indigo-400 font-medium">Hub North</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTION OVERRIDE PANEL & DRIVER STATUSES */}
        <div className="space-y-6">
          {/* SELECT ACTION CONTROL OVERRIDE */}
          <div className="card-luxury p-5 space-y-4 bg-gradient-to-b from-surface to-background border-luxury-400/20">
            <h3 className="text-lg font-bold font-heading flex items-center gap-2 border-b border-white/5 pb-2">
              <Shield className="w-5 h-5 text-luxury-400" /> Dispatch Control Panel
            </h3>

            {selectedBooking ? (
              <div className="space-y-4">
                <div className="p-3 bg-background/50 border border-white/5 rounded-lg text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-mono text-luxury-400 font-bold">{selectedBooking.bookingNumber}</p>
                    {getStatusBadge(selectedBooking.status)}
                  </div>
                  <p className="text-xs text-text-secondary flex items-center gap-1 mb-2">
                    <User className="w-3.5 h-3.5" />
                    Customer: {selectedBooking.customer.name}
                  </p>
                  <div className="border-t border-white/5 pt-2 text-xs space-y-1">
                    <p className="truncate"><span className="text-text-secondary">Pickup:</span> {selectedBooking.pickupAddress}</p>
                    <p className="truncate"><span className="text-text-secondary">Drop:</span> {selectedBooking.dropAddress}</p>
                  </div>
                </div>

                {/* State Machine Transition Steps */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Available State Transitions:</p>

                  {selectedBooking.status === "PENDING" && (
                    <button
                      onClick={() => handleStateTransition(selectedBooking.id, "CONFIRMED")}
                      className="w-full flex items-center justify-between p-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg text-sm font-semibold transition-all"
                    >
                      <span>Approve & Confirm Booking</span>
                      <CheckCircle className="w-4.5 h-4.5" />
                    </button>
                  )}

                  {(selectedBooking.status === "PENDING" || selectedBooking.status === "CONFIRMED") && (
                    <button
                      onClick={() => {
                        setAssigningBookingId(selectedBooking.id);
                        setShowAssignModal(true);
                      }}
                      className="w-full flex items-center justify-between p-3 bg-luxury-400/10 hover:bg-luxury-400/20 border border-luxury-400/30 text-luxury-400 rounded-lg text-sm font-semibold transition-all animate-pulse"
                    >
                      <span>Allocate Driver & Vehicle</span>
                      <Car className="w-4.5 h-4.5" />
                    </button>
                  )}

                  {selectedBooking.status === "ASSIGNED" && (
                    <button
                      onClick={() => handleStateTransition(selectedBooking.id, "DRIVER_REACHED")}
                      className="w-full flex items-center justify-between p-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg text-sm font-semibold transition-all"
                    >
                      <span>Mark Driver Arrived at Pickup</span>
                      <MapPin className="w-4.5 h-4.5" />
                    </button>
                  )}

                  {selectedBooking.status === "DRIVER_REACHED" && (
                    <button
                      onClick={() => handleStateTransition(selectedBooking.id, "TRIP_STARTED")}
                      className="w-full flex items-center justify-between p-3 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 rounded-lg text-sm font-semibold transition-all"
                    >
                      <span>Start Trip (OTP Verified)</span>
                      <Play className="w-4.5 h-4.5" />
                    </button>
                  )}

                  {selectedBooking.status === "TRIP_STARTED" && (
                    <button
                      onClick={() => handleStateTransition(selectedBooking.id, "COMPLETED")}
                      className="w-full flex items-center justify-between p-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg text-sm font-semibold transition-all"
                    >
                      <span>End & Complete Ride</span>
                      <CheckSquare className="w-4.5 h-4.5" />
                    </button>
                  )}

                  {/* Cancel Button */}
                  {!["COMPLETED", "CANCELLED", "NO_SHOW"].includes(selectedBooking.status) && (
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to cancel this booking?")) {
                          handleStateTransition(selectedBooking.id, "CANCELLED");
                        }
                      }}
                      className="w-full flex items-center justify-between p-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-lg text-xs font-semibold transition-all mt-4"
                    >
                      <span>Force Cancel booking</span>
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-text-secondary text-sm">
                <HelpCircle className="w-8 h-8 text-luxury-400/50 mx-auto mb-2" />
                Select a booking from the live queue to launch manual controls.
              </div>
            )}
          </div>

          {/* ONLINE DRIVERS STATUS MONITOR */}
          <div className="card-luxury p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h3 className="text-lg font-bold font-heading flex items-center gap-2">
                <User className="w-5 h-5 text-luxury-400" /> Drivers Status List
              </h3>
              <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full font-bold">
                {drivers.filter((d) => d.isOnline).length} Active
              </span>
            </div>

            {drivers.length === 0 ? (
              <div className="text-center text-text-secondary py-6 text-sm">No drivers registered.</div>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {drivers.map((driver) => (
                  <div
                    key={driver.id}
                    className="p-3 bg-background/40 border border-white/5 rounded-lg flex items-center justify-between text-sm hover:border-white/10 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{driver.name}</span>
                        <span className="text-[10px] bg-luxury-400/10 text-luxury-400 border border-luxury-400/20 px-1.5 py-0.2 rounded font-mono">
                          {driver.driverCode}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">
                        {driver.vehicle
                          ? `${driver.vehicle.make} ${driver.vehicle.model} (${driver.vehicle.registrationNumber})`
                          : "No vehicle assigned"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Online Status Toggle */}
                      <button
                        onClick={() => toggleDriverOnline(driver.id, driver.isOnline)}
                        className={`w-10 h-6 rounded-full p-0.5 transition-all focus:outline-none ${
                          driver.isOnline ? "bg-green-500 flex justify-end" : "bg-neutral-800 flex justify-start"
                        }`}
                      >
                        <motion.div
                          className="w-5 h-5 bg-white rounded-full"
                          layout
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ALLOCATE DRIVER OVERLAY MODAL */}
      <AnimatePresence>
        {showAssignModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              className="card-luxury w-full max-w-lg p-6 bg-surface text-white border-luxury-400/30"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                <h2 className="text-xl font-bold font-heading text-luxury-400">Allocate Driver & Vehicle</h2>
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setAssigningBookingId(null);
                  }}
                  className="text-text-secondary hover:text-white"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <p className="text-sm text-text-secondary mb-4">
                Select an online driver. Note: The driver must have a vehicle registered and be active to allocate.
              </p>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {drivers.filter((d) => d.isOnline && d.status === "ACTIVE" && d.vehicle).length === 0 ? (
                  <div className="text-center py-8 text-yellow-500/90 text-sm font-semibold flex flex-col items-center gap-2">
                    <AlertTriangle className="w-8 h-8 text-yellow-500" />
                    No active online drivers with assigned vehicles available.
                  </div>
                ) : (
                  drivers
                    .filter((d) => d.isOnline && d.status === "ACTIVE" && d.vehicle)
                    .map((d) => (
                      <div
                        key={d.id}
                        onClick={() => handleAssignDriver(d.id, d.vehicle!.id)}
                        className="p-3 bg-background/50 border border-white/5 hover:border-luxury-400/50 hover:bg-luxury-400/5 rounded-lg flex justify-between items-center cursor-pointer transition-all"
                      >
                        <div>
                          <p className="font-semibold text-sm">{d.name}</p>
                          <p className="text-xs text-text-secondary mt-0.5">Rating: {d.rating} ★</p>
                          <p className="text-[10px] text-luxury-400 font-mono mt-1">
                            Vehicle: {d.vehicle!.make} {d.vehicle!.model} ({d.vehicle!.registrationNumber})
                          </p>
                        </div>
                        <Send className="w-5 h-5 text-luxury-400" />
                      </div>
                    ))
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <AnimatedButton
                  variant="secondary"
                  onClick={() => {
                    setShowAssignModal(false);
                    setAssigningBookingId(null);
                  }}
                >
                  Cancel Allocation
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* NEW MANUAL BOOKING OVERLAY MODAL */}
      <AnimatePresence>
        {showManualModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              className="card-luxury w-full max-w-xl p-6 bg-surface text-white border-luxury-400/30"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                <h2 className="text-xl font-bold font-heading text-luxury-400">Manual Booking Override (Call Center)</h2>
                <button onClick={() => setShowManualModal(false)} className="text-text-secondary hover:text-white">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleManualBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-text-secondary mb-1.5 block">Customer Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Patil"
                      value={manualForm.customerName}
                      onChange={(e) => setManualForm({ ...manualForm, customerName: e.target.value })}
                      className="input-luxury text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-secondary mb-1.5 block">Customer Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9823456789"
                      value={manualForm.customerPhone}
                      onChange={(e) => setManualForm({ ...manualForm, customerPhone: e.target.value })}
                      className="input-luxury text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-text-secondary mb-1.5 block">Customer Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="e.g. rahul@gmail.com"
                    value={manualForm.customerEmail}
                    onChange={(e) => setManualForm({ ...manualForm, customerEmail: e.target.value })}
                    className="input-luxury text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-text-secondary mb-1.5 block">Pickup Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hinjewadi Phase 1, Pune"
                      value={manualForm.pickupAddress}
                      onChange={(e) => setManualForm({ ...manualForm, pickupAddress: e.target.value })}
                      className="input-luxury text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-secondary mb-1.5 block">Drop Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bandra West, Mumbai"
                      value={manualForm.dropAddress}
                      onChange={(e) => setManualForm({ ...manualForm, dropAddress: e.target.value })}
                      className="input-luxury text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-xs text-text-secondary mb-1.5 block">Pickup Date & Time *</label>
                    <input
                      type="datetime-local"
                      required
                      value={manualForm.pickupDateTime}
                      onChange={(e) => setManualForm({ ...manualForm, pickupDateTime: e.target.value })}
                      className="input-luxury text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-secondary mb-1.5 block">Vehicle Category</label>
                    <select
                      value={manualForm.vehicleType}
                      onChange={(e) => setManualForm({ ...manualForm, vehicleType: e.target.value })}
                      className="input-luxury text-sm cursor-pointer"
                    >
                      <option value="SEDAN">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="PREMIUM_SUV">Premium SUV</option>
                      <option value="LUXURY">Luxury</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/10 mt-6">
                  <AnimatedButton variant="secondary" onClick={() => setShowManualModal(false)}>
                    Cancel
                  </AnimatedButton>
                  <AnimatedButton type="submit" disabled={formSubmitting}>
                    {formSubmitting ? "Submitting..." : "Generate Booking"}
                  </AnimatedButton>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
