"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function City3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNight, setIsNight] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    // Night default background
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.FogExp2(0x050505, 0.12);

    // --- Camera Setup ---
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(5, 5, 8);
    camera.lookAt(0, 0.2, 0);

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // --- Environment Lighting ---
    const ambientLight = new THREE.AmbientLight(0x0c1e36, 0.8); // Deep blue night
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xd4af37, 0.0); // Gold daylight (off by default)
    sunLight.position.set(10, 8, 5);
    scene.add(sunLight);

    const citySpotLight = new THREE.SpotLight(
      0xffaa44,
      2,
      20,
      Math.PI / 3,
      0.5,
      1,
    );
    citySpotLight.position.set(0, 8, 0);
    scene.add(citySpotLight);

    // --- Skyscraper Cluster (Low Poly Grid) ---
    const cityGroup = new THREE.Group();
    const buildingsCount = 36;
    const buildingGeo = new THREE.BoxGeometry(0.5, 1, 0.5);

    // Materials
    const buildingMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.4,
      metalness: 0.8,
    });

    const windowGlowMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
    });

    const structures: {
      mesh: THREE.Mesh;
      windows: THREE.Group;
      baseHeight: number;
    }[] = [];

    // Arrange buildings in a grid
    const gridSize = Math.sqrt(buildingsCount);
    const spacing = 0.9;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        // Random building heights
        const heightMultiplier = 1.0 + Math.random() * 2.5;
        const bMesh = new THREE.Mesh(buildingGeo, buildingMat);

        // Scale building height
        bMesh.scale.set(1, heightMultiplier, 1);

        // Grid centering coordinates
        const posX = (i - gridSize / 2) * spacing + 0.45;
        const posZ = (j - gridSize / 2) * spacing + 0.45;
        bMesh.position.set(posX, heightMultiplier / 2 - 0.5, posZ);
        bMesh.castShadow = true;
        bMesh.receiveShadow = true;
        cityGroup.add(bMesh);

        // Add glowing window indicators to buildings
        const windowGroup = new THREE.Group();
        windowGroup.position.copy(bMesh.position);

        const rows = Math.floor(heightMultiplier * 3);
        const winGeo = new THREE.BoxGeometry(0.06, 0.06, 0.52);

        for (let r = 0; r < rows; r++) {
          if (Math.random() > 0.4) {
            // Only light up some windows
            const hOffset =
              (r / rows) * heightMultiplier - heightMultiplier / 2;
            const wMesh = new THREE.Mesh(winGeo, windowGlowMat);
            wMesh.position.y = hOffset;
            windowGroup.add(wMesh);
          }
        }
        cityGroup.add(windowGroup);

        structures.push({
          mesh: bMesh,
          windows: windowGroup,
          baseHeight: heightMultiplier,
        });
      }
    }

    scene.add(cityGroup);

    // --- Roads Grid ---
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x070707,
      roughness: 0.8,
    });
    const roadPlane = new THREE.PlaneGeometry(10, 10);
    const roads = new THREE.Mesh(roadPlane, roadMat);
    roads.rotation.x = -Math.PI / 2;
    roads.position.y = -0.51;
    roads.receiveShadow = true;
    scene.add(roads);

    // Grid overlays to mark roads
    const roadGrid = new THREE.GridHelper(10, 10, 0x111111, 0x111111);
    roadGrid.position.y = -0.5;
    scene.add(roadGrid);

    // --- Moving Headlights Particles (Light Trails) ---
    const trailCount = 40;
    const trailGeo = new THREE.BufferGeometry();
    const trailPositions = new Float32Array(trailCount * 3);
    const trailVelocities: number[] = [];

    for (let i = 0; i < trailCount; i++) {
      const isEastWest = Math.random() > 0.5;
      trailPositions[i * 3] = (Math.random() - 0.5) * 8; // x
      trailPositions[i * 3 + 1] = -0.48; // y
      trailPositions[i * 3 + 2] = (Math.random() - 0.5) * 8; // z

      if (isEastWest) {
        trailVelocities.push(0.04 + Math.random() * 0.04, 0, 0); // moves along X
      } else {
        trailVelocities.push(0, 0, 0.04 + Math.random() * 0.04); // moves along Z
      }
    }

    trailGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(trailPositions, 3),
    );

    // Glowing red and white lights for headlights & brake lights
    const headlightTrailMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.12,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const lightTrails = new THREE.Points(trailGeo, headlightTrailMat);
    scene.add(lightTrails);

    // --- Animation loop ---
    let frameId: number;
    let transitionProgress = 0; // 0 is night, 1 is day

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Subtle building rotation/oscillation
      cityGroup.rotation.y = Math.sin(Date.now() * 0.00015) * 0.1;

      // Animate Light Trails
      const posArr = trailGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < trailCount; i++) {
        posArr[i * 3] += trailVelocities[i * 3];
        posArr[i * 3 + 2] += trailVelocities[i * 3 + 2];

        // Loop boundaries
        if (posArr[i * 3] > 4.8) posArr[i * 3] = -4.8;
        if (posArr[i * 3 + 2] > 4.8) posArr[i * 3 + 2] = -4.8;
      }
      trailGeo.attributes.position.needsUpdate = true;

      // Slowly rotate camera around city
      const timer = Date.now() * 0.00008;
      camera.position.x = Math.sin(timer) * 7.5;
      camera.position.z = Math.cos(timer) * 7.5;
      camera.lookAt(0, 0.2, 0);

      renderer.render(scene, camera);
    };

    animate();

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

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);

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
    <div className="w-full h-full relative overflow-hidden bg-background">
      <div ref={containerRef} className="w-full h-full min-h-[350px]" />
      <div className="absolute top-4 left-4 glass px-4 py-2 rounded-lg pointer-events-none">
        <span className="text-xs text-luxury-400 uppercase tracking-widest font-body">
          Urban Logistics Showcase
        </span>
        <h4 className="text-sm font-semibold font-heading text-white">
          Pune - Mumbai Smart Hubs
        </h4>
      </div>
    </div>
  );
}
