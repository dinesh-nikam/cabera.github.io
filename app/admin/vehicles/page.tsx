"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Plus, Car, Users, Gauge, Truck } from "lucide-react";
import { VehicleCard } from "@/components/admin/vehicle-card";
import { VehicleForm } from "@/components/admin/vehicle-form";
import { RatingDisplay } from "@/components/admin/rating-display";
import { calculateVehicleScore } from "@/lib/services/rating-algorithm";
import { cn } from "@/lib/utils";

type VehicleStatus = "ACTIVE" | "INACTIVE" | "MAINTENANCE" | "DOCUMENT_EXPIRED";
type VehicleType =
  | "SEDAN"
  | "SUV"
  | "PREMIUM_SUV"
  | "LUXURY"
  | "TEMPO_TRAVELLER"
  | "MINI_BUS";

interface Vehicle {
  id: string;
  registrationNumber: string;
  make: string;
  model: string;
  vehicleType: string;
  seatingCapacity: number;
  luggageCapacity: number;
  fuelType: string;
  color?: string;
  year: number;
  status: VehicleStatus;
  insuranceExpiry?: string | Date;
  permitExpiry?: string | Date;
  features?: string[] | string;
  driver?: {
    id: string;
    name: string;
    rating: number;
  } | null;
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<VehicleStatus | "all">(
    "all",
  );
  const [typeFilter, setTypeFilter] = useState<VehicleType | "all">("all");
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  // Fetch vehicles on mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/vehicles");
      const data = await response.json();
      setVehicles(data.vehicles || []);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || v.status === statusFilter;
    const matchesType = typeFilter === "all" || v.vehicleType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleEdit = (id: string) => {
    const vehicle = vehicles.find((v) => v.id === id);
    if (vehicle) {
      setEditingVehicle(vehicle);
      setShowForm(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;

    try {
      await fetch(`/api/vehicles/${id}`, { method: "DELETE" });
      setVehicles(vehicles.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
    }
  };

  const handleFormSubmit = async (data: {
    registrationNumber: string;
    make: string;
    model: string;
    vehicleType: string;
    seatingCapacity: number;
    luggageCapacity: number;
    fuelType: string;
    color?: string;
    year: number;
    insuranceExpiry: string;
    permitExpiry: string;
    features: string[];
  }) => {
    try {
      if (editingVehicle) {
        const response = await fetch(`/api/vehicles/${editingVehicle.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const updated = await response.json();
          setVehicles(
            vehicles.map((v) => (v.id === editingVehicle.id ? updated : v)),
          );
          setShowForm(false);
          setEditingVehicle(null);
        }
      } else {
        const response = await fetch("/api/vehicles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const created = await response.json();
          setVehicles([created, ...vehicles]);
          setShowForm(false);
        }
      }
    } catch (error) {
      console.error("Failed to save vehicle:", error);
    }
  };

  // Stats calculation
  const stats = {
    total: vehicles.length,
    active: vehicles.filter((v) => v.status === "ACTIVE").length,
    maintenance: vehicles.filter((v) => v.status === "MAINTENANCE").length,
    byType: vehicles.reduce(
      (acc, v) => {
        acc[v.vehicleType] = (acc[v.vehicleType] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">
            Vehicle Management
          </h1>
          <p className="text-text-secondary mt-1">
            Manage your fleet of vehicles
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Vehicle
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-luxury p-4 text-center">
          <Car className="w-8 h-8 mx-auto mb-2 text-luxury-400" />
          <p className="text-2xl font-bold">{stats.total}</p>
          <p className="text-sm text-text-secondary">Total Vehicles</p>
        </div>
        <div className="card-luxury p-4 text-center">
          <div className="w-8 h-8 mx-auto mb-2 bg-green-500/20 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-green-400">{stats.active}</p>
          <p className="text-sm text-text-secondary">Active</p>
        </div>
        <div className="card-luxury p-4 text-center">
          <div className="w-8 h-8 mx-auto mb-2 bg-amber-500/20 rounded-full flex items-center justify-center">
            <Gauge className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-amber-400">
            {stats.maintenance}
          </p>
          <p className="text-sm text-text-secondary">Maintenance</p>
        </div>
        <div className="card-luxury p-4 text-center">
          <div className="w-8 h-8 mx-auto mb-2 bg-luxury-400/20 rounded-full flex items-center justify-center">
            <Truck className="w-5 h-5 text-luxury-400" />
          </div>
          <p className="text-2xl font-bold">{stats.byType.SEDAN || 0}</p>
          <p className="text-sm text-text-secondary">Sedans</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input
            type="text"
            placeholder="Search vehicles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-luxury pl-12 w-full"
            aria-label="Search vehicles"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as VehicleStatus | "all")
          }
          className="input-luxury cursor-pointer"
          aria-label="Filter by status"
        >
          <option value="all">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="MAINTENANCE">Maintenance</option>
          <option value="DOCUMENT_EXPIRED">Docs Expired</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as VehicleType | "all")}
          className="input-luxury cursor-pointer"
          aria-label="Filter by vehicle type"
        >
          <option value="all">All Types</option>
          <option value="SEDAN">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="PREMIUM_SUV">Premium SUV</option>
          <option value="LUXURY">Luxury</option>
          <option value="TEMPO_TRAVELLER">Tempo Traveller</option>
          <option value="MINI_BUS">Mini Bus</option>
        </select>
      </div>

      {/* Vehicle Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card-luxury p-6 animate-pulse">
              <div className="h-48 bg-surface-light rounded-lg" />
            </div>
          ))}
        </div>
      ) : filteredVehicles.length === 0 ? (
        <div className="card-luxury p-12 text-center">
          <Car className="w-16 h-16 mx-auto mb-4 text-luxury-400/50" />
          <h3 className="text-xl font-semibold mb-2">No vehicles found</h3>
          <p className="text-text-secondary mb-6">
            {searchQuery || statusFilter !== "all" || typeFilter !== "all"
              ? "Try adjusting your filters"
              : "Add your first vehicle to get started"}
          </p>
          {!searchQuery && statusFilter === "all" && typeFilter === "all" && (
            <button onClick={() => setShowForm(true)} className="btn-primary">
              Add Vehicle
            </button>
          )}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          {filteredVehicles.map((vehicle) => (
            <motion.div
              key={vehicle.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <VehicleCard
                vehicle={vehicle}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            className="card-luxury w-full max-w-2xl p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <h2 className="text-2xl font-bold mb-4">
              {editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
            </h2>
            <VehicleForm
              initialData={
                editingVehicle
                  ? {
                      registrationNumber: editingVehicle.registrationNumber,
                      make: editingVehicle.make,
                      model: editingVehicle.model,
                      vehicleType: editingVehicle.vehicleType,
                      seatingCapacity: editingVehicle.seatingCapacity,
                      luggageCapacity: editingVehicle.luggageCapacity,
                      fuelType: editingVehicle.fuelType,
                      color: editingVehicle.color || "",
                      year: editingVehicle.year,
                      insuranceExpiry: editingVehicle.insuranceExpiry
                        ? new Date(editingVehicle.insuranceExpiry)
                            .toISOString()
                            .split("T")[0]
                        : "",
                      permitExpiry: editingVehicle.permitExpiry
                        ? new Date(editingVehicle.permitExpiry)
                            .toISOString()
                            .split("T")[0]
                        : "",
                      features: Array.isArray(editingVehicle.features)
                        ? editingVehicle.features
                        : typeof editingVehicle.features === "string"
                          ? editingVehicle.features.split(",").filter(Boolean)
                          : [],
                    }
                  : undefined
              }
              drivers={[]}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingVehicle(null);
              }}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
