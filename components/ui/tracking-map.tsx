"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTracking } from "@/lib/tracking/tracking-context";
import { calculateDistance } from "@/lib/utils";

interface TrackingMapProps {
  bookingId: string;
  pickupLat?: number;
  pickupLng?: number;
  dropLat?: number;
  dropLng?: number;
  className?: string;
}

export function TrackingMap({
  bookingId,
  pickupLat = 18.52,
  pickupLng = 73.86,
  dropLat = 19.07,
  dropLng = 72.88,
  className = "",
}: TrackingMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { driverLocation, bookingStatus, isConnected } = useTracking();
  const [estimatedArrival, setEstimatedArrival] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 100, 150);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xd4af37, 0.8);
    directionalLight.position.set(50, 100, 50);
    scene.add(directionalLight);

    // Route line (pickup to drop)
    const routePoints = [
      new THREE.Vector3(pickupLat - 18.5, 0, pickupLng - 73.8),
      new THREE.Vector3(dropLat - 18.5, 0, dropLng - 73.8),
    ];

    const routeGeometry = new THREE.BufferGeometry().setFromPoints(routePoints);
    const routeMaterial = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      linewidth: 2,
    });
    const routeLine = new THREE.Line(routeGeometry, routeMaterial);
    scene.add(routeLine);

    // Pickup marker (green)
    const pickupGeometry = new THREE.SphereGeometry(1.5, 16, 16);
    const pickupMaterial = new THREE.MeshStandardMaterial({ color: 0x4ade80 });
    const pickupMarker = new THREE.Mesh(pickupGeometry, pickupMaterial);
    pickupMarker.position.set(routePoints[0].x, 2, routePoints[0].z);
    scene.add(pickupMarker);

    // Drop marker (red)
    const dropGeometry = new THREE.SphereGeometry(1.5, 16, 16);
    const dropMaterial = new THREE.MeshStandardMaterial({ color: 0xff6b6b });
    const dropMarker = new THREE.Mesh(dropGeometry, dropMaterial);
    dropMarker.position.set(routePoints[1].x, 2, routePoints[1].z);
    scene.add(dropMarker);

    // Driver marker (gold)
    const driverGeometry = new THREE.SphereGeometry(2, 16, 16);
    const driverMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      emissive: 0x333333,
    });
    const driverMarker = new THREE.Mesh(driverGeometry, driverMaterial);
    driverMarker.position.set(0, 3, 0);
    scene.add(driverMarker);

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Update driver position
    if (driverLocation && bookingStatus !== "COMPLETED") {
      const driverX = (driverLocation.lng - 73.8) * 10;
      const driverZ = (driverLocation.lat - 18.5) * 10;
      driverMarker.position.set(driverX, 3, driverZ);

      // Calculate estimated arrival time
      if (pickupLat && pickupLng && driverLocation.lat && driverLocation.lng) {
        const distanceToPickup = calculateDistance(
          driverLocation.lat,
          driverLocation.lng,
          pickupLat,
          pickupLng,
        );
        const avgSpeedKmh = 40;
        const arrivalMinutes = Math.ceil(
          (distanceToPickup / 1000 / avgSpeedKmh) * 60,
        );
        setEstimatedArrival(`${arrivalMinutes} min away`);
      }
    }

    // Cleanup
    return () => {
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [driverLocation, pickupLat, pickupLng, dropLat, dropLng, bookingStatus]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className="w-full h-full rounded-2xl overflow-hidden glass"
      />

      {/* Status overlay */}
      <div className="absolute top-4 left-4 flex items-center gap-2 glass px-3 py-2 rounded-lg">
        <div
          className={`w-2 h-2 rounded-full ${
            isConnected ? "bg-success" : "bg-red-400"
          } animate-pulse`}
        />
        <span className="text-xs text-text-secondary font-body">
          {isConnected ? "Live Tracking" : "Connecting..."}
        </span>
      </div>

      {estimatedArrival && (
        <div className="absolute bottom-4 right-4 glass px-3 py-2 rounded-lg">
          <span className="text-xs text-text-secondary font-body">
            ETA: {estimatedArrival}
          </span>
        </div>
      )}
    </div>
  );
}
