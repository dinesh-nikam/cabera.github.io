"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Navigation, Compass } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Route3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Real-time counter states
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeMarker, setActiveMarker] = useState("Pune (Departure)");

  useEffect(() => {
    const container = containerRef.current;
    const trigger = triggerRef.current;
    if (!container || !trigger) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.15);

    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 4, 7);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const goldSpotLight = new THREE.SpotLight(
      0xd4af37,
      4,
      15,
      Math.PI / 4,
      0.5,
      1,
    );
    goldSpotLight.position.set(0, 5, 0);
    scene.add(goldSpotLight);

    const blueLight = new THREE.DirectionalLight(0x00a8ff, 1.0);
    blueLight.position.set(-5, 2, -5);
    scene.add(blueLight);

    // --- Route Path Generation ---
    // Curved highway trajectory (Pune -> Lonavala -> Navi Mumbai -> Mumbai Airport)
    const points = [
      new THREE.Vector3(-3.5, -0.5, 2.0), // Pune Start
      new THREE.Vector3(-1.8, 0.2, 1.2), // Talegaon
      new THREE.Vector3(-0.4, 0.5, 0.0), // Lonavala Ghats (Elevation peak)
      new THREE.Vector3(1.0, -0.1, -1.0), // Khalapur Toll
      new THREE.Vector3(2.2, -0.4, -1.8), // Navi Mumbai
      new THREE.Vector3(3.5, -0.5, -2.5), // Mumbai Destination
    ];

    const routeCurve = new THREE.CatmullRomCurve3(points);

    // Draw route line mesh
    const tubeGeo = new THREE.TubeGeometry(routeCurve, 64, 0.06, 8, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.5,
      metalness: 0.8,
    });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(tube);

    // Glowing golden highway center line
    const glowTubeGeo = new THREE.TubeGeometry(routeCurve, 64, 0.015, 8, false);
    const glowTubeMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
    });
    const glowTube = new THREE.Mesh(glowTubeGeo, glowTubeMat);
    scene.add(glowTube);

    // --- Scenic Terrain Grids ---
    const gridHelper = new THREE.GridHelper(20, 20, 0x111111, 0x1a1a1a);
    gridHelper.position.y = -0.6;
    scene.add(gridHelper);

    // --- Driveable Vehicle ---
    const vehicleGroup = new THREE.Group();

    // Mini block luxury vehicle
    const bodyGeo = new THREE.BoxGeometry(0.2, 0.08, 0.4);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Golden premium car
      metalness: 0.9,
      roughness: 0.1,
    });
    const carBody = new THREE.Mesh(bodyGeo, bodyMat);
    carBody.castShadow = true;
    vehicleGroup.add(carBody);

    const headlightsGeo = new THREE.BoxGeometry(0.16, 0.02, 0.02);
    const headlightsMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const headlights = new THREE.Mesh(headlightsGeo, headlightsMat);
    headlights.position.set(0, 0.01, 0.2);
    vehicleGroup.add(headlights);

    scene.add(vehicleGroup);

    // --- Destination Markers (Toll, Ghats, Airport) ---
    const markerGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.6, 8);
    const pinGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0xd4af37,
      emissiveIntensity: 0.2,
    });

    const createMarker = (position: THREE.Vector3, label: string) => {
      const markerGroup = new THREE.Group();
      markerGroup.position.copy(position);

      const pole = new THREE.Mesh(
        markerGeo,
        new THREE.MeshStandardMaterial({ color: 0x888888 }),
      );
      pole.position.y = 0.3;
      markerGroup.add(pole);

      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.y = 0.6;
      markerGroup.add(pin);

      // Pulse ring
      const ringGeo = new THREE.RingGeometry(0.08, 0.16, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.01;
      markerGroup.add(ring);

      scene.add(markerGroup);
      return { group: markerGroup, ring };
    };

    const markers = [
      {
        pos: points[0],
        name: "Pune (Departure)",
        m: createMarker(points[0], "Pune"),
      },
      {
        pos: points[2],
        name: "Lonavala (Western Ghats)",
        m: createMarker(points[2], "Lonavala"),
      },
      {
        pos: points[3],
        name: "Khalapur Toll Plaza",
        m: createMarker(points[3], "Toll Plaza"),
      },
      {
        pos: points[5],
        name: "Mumbai Airport (Terminal 2)",
        m: createMarker(points[5], "Mumbai"),
      },
    ];

    // --- GSAP Scroll-Linked Animation ---
    // Object containing current progress factor
    const scrollObj = { progress: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top center",
        end: "bottom center",
        scrub: 1.2,
        onUpdate: (self) => {
          // Dynamic dashboard values
          const p = self.progress;
          const currDist = Math.round(p * 150);
          const currDur = Number((p * 3.5).toFixed(1));
          setDistance(currDist);
          setDuration(currDur);

          // Active region checker
          if (p < 0.25) {
            setActiveMarker(markers[0].name);
          } else if (p >= 0.25 && p < 0.6) {
            setActiveMarker(markers[1].name);
          } else if (p >= 0.6 && p < 0.85) {
            setActiveMarker(markers[2].name);
          } else {
            setActiveMarker(markers[3].name);
          }
        },
      },
    });

    tl.to(scrollObj, {
      progress: 1,
      ease: "none",
    });

    // --- Window Resize ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // --- Animation Loop ---
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // 1. Position car along Bezier path
      const t = scrollObj.progress;
      const pos = routeCurve.getPointAt(t);
      vehicleGroup.position.copy(pos);

      // Make car face forward on the curve
      const tangent = routeCurve.getTangentAt(t).normalize();
      const carTarget = pos.clone().add(tangent);
      vehicleGroup.lookAt(carTarget);

      // 2. Animate pulse rings
      markers.forEach(({ m }) => {
        m.ring.scale.setScalar(1 + Math.sin(Date.now() * 0.005) * 0.2);
      });

      // 3. Move camera dynamically with vehicle path
      camera.position.x = pos.x + 0.5;
      camera.position.y = pos.y + 2.5;
      camera.position.z = pos.z + 4.5;
      camera.lookAt(pos);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);

      // Cleanup Three.js
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div
      ref={triggerRef}
      className="w-full min-h-[120vh] relative flex flex-col justify-between py-12"
    >
      {/* 3D Render Screen */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <div ref={containerRef} className="w-full h-full" />
      </div>

      {/* Floating HUD Dashboard */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-4">
        <div className="glass px-6 py-4 rounded-xl flex items-center gap-4 max-w-sm">
          <div className="p-3 bg-luxury-400/20 rounded-lg text-luxury-400">
            <Navigation className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs text-text-secondary uppercase tracking-widest block">
              Live Location
            </span>
            <span className="font-bold text-white font-heading text-lg">
              {activeMarker}
            </span>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="glass px-6 py-4 rounded-xl text-center min-w-[120px]">
            <span className="text-xs text-text-secondary uppercase tracking-widest block mb-1">
              Distance
            </span>
            <span className="text-2xl font-bold text-luxury-400 font-heading">
              {distance} KM
            </span>
          </div>
          <div className="glass px-6 py-4 rounded-xl text-center min-w-[120px]">
            <span className="text-xs text-text-secondary uppercase tracking-widest block mb-1">
              Travel Time
            </span>
            <span className="text-2xl font-bold text-luxury-400 font-heading">
              {duration} HRS
            </span>
          </div>
        </div>
      </div>

      {/* Bottom storytelling context */}
      <div className="relative z-10 container mx-auto px-4 mb-8">
        <div className="max-w-md glass p-6 rounded-xl space-y-2 border-l-4 border-l-luxury-400">
          <div className="flex items-center gap-2 text-luxury-400 text-sm font-semibold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Interactive Route Corridor</span>
          </div>
          <h3 className="text-xl font-bold font-heading text-white">
            Pune - Mumbai Expressway
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            Experience premium mobility traversing the scenic Western Ghats.
            Avoid toll delays and heavy traffic with our GPS-routed automated
            dispatch system.
          </p>
          <div className="pt-2 text-xs text-luxury-400/60 animate-bounce">
            Scroll down to drive →
          </div>
        </div>
      </div>
    </div>
  );
}
