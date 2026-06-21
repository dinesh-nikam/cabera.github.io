"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.08);

    // --- Camera Setup ---
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 6.5);

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // --- Controls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 3; // Keep from going below floor
    controls.maxPolarAngle = Math.PI / 2.1; // Keep from going overhead
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Dynamic key light (Gold tint)
    const keyLight = new THREE.DirectionalLight(0xf5e6b3, 1.5);
    keyLight.position.set(5, 5, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Cool rim light (Cyan/Blue tint for technology vibe)
    const rimLight = new THREE.DirectionalLight(0x00a8ff, 0.8);
    rimLight.position.set(-5, 3, -5);
    scene.add(rimLight);

    // Direct spotlight onto the car roof
    const spotLight = new THREE.SpotLight(0xd4af37, 2, 10, Math.PI / 4, 0.5, 1);
    spotLight.position.set(0, 4, 0);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // --- Floor / Reflection Plane ---
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x050505,
      roughness: 0.15,
      metalness: 0.9,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.6;
    floor.receiveShadow = true;
    scene.add(floor);

    // Floor grid
    const gridHelper = new THREE.GridHelper(30, 30, 0xd4af37, 0x111111);
    gridHelper.position.y = -0.59;
    scene.add(gridHelper);

    // --- Create Custom High-Fidelity Car Model ---
    const carGroup = new THREE.Group();

    // Core materials
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0c0c0c, // Rich dark gray
      metalness: 0.95,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    const trimMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Glossy Gold
      metalness: 1.0,
      roughness: 0.15,
    });

    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0x050505,
      transparent: true,
      opacity: 0.85,
      roughness: 0.0,
      metalness: 1.0,
    });

    const tireMaterial = new THREE.MeshStandardMaterial({
      color: 0x151515,
      roughness: 0.8,
      metalness: 0.1,
    });

    const wheelRimMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 1.0,
      roughness: 0.2,
    });

    // 1. Lower Chassis
    const chassisGeo = new THREE.BoxGeometry(1.9, 0.2, 4.2);
    const chassis = new THREE.Mesh(chassisGeo, bodyMaterial);
    chassis.position.y = 0.1;
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    carGroup.add(chassis);

    // 2. Upper Cabin Structure (Sleek aerodynamic curves simulated)
    const cabinGeo = new THREE.BoxGeometry(1.6, 0.45, 2.2);
    const cabin = new THREE.Mesh(cabinGeo, bodyMaterial);
    cabin.position.set(0, 0.42, -0.2);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // 3. Windshield and Windows
    const windshieldGeo = new THREE.BoxGeometry(1.5, 0.35, 0.8);
    const windshield = new THREE.Mesh(windshieldGeo, glassMaterial);
    windshield.position.set(0, 0.35, 0.85);
    windshield.rotation.x = -Math.PI / 6;
    carGroup.add(windshield);

    const rearWindowGeo = new THREE.BoxGeometry(1.5, 0.35, 0.8);
    const rearWindow = new THREE.Mesh(rearWindowGeo, glassMaterial);
    rearWindow.position.set(0, 0.35, -1.25);
    rearWindow.rotation.x = Math.PI / 6;
    carGroup.add(rearWindow);

    // Side windows (Right / Left)
    const sideWindowGeo = new THREE.BoxGeometry(1.62, 0.3, 1.4);
    const sideWindows = new THREE.Mesh(sideWindowGeo, glassMaterial);
    sideWindows.position.set(0, 0.4, -0.2);
    carGroup.add(sideWindows);

    // 4. Gold Trim accents running along the sides
    const trimLeftGeo = new THREE.BoxGeometry(0.05, 0.05, 3.8);
    const trimLeft = new THREE.Mesh(trimLeftGeo, trimMaterial);
    trimLeft.position.set(0.96, 0.18, 0);
    carGroup.add(trimLeft);

    const trimRight = trimLeft.clone();
    trimRight.position.x = -0.96;
    carGroup.add(trimRight);

    // 5. Hood / Grill
    const grillGeo = new THREE.BoxGeometry(1.4, 0.25, 0.25);
    const grillMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.5,
      metalness: 0.9,
    });
    const grill = new THREE.Mesh(grillGeo, grillMat);
    grill.position.set(0, 0.15, 2.05);
    carGroup.add(grill);

    // Gold borders for grill
    const grillBorderGeo = new THREE.BoxGeometry(1.5, 0.05, 0.05);
    const grillBorder = new THREE.Mesh(grillBorderGeo, trimMaterial);
    grillBorder.position.set(0, 0.28, 2.15);
    carGroup.add(grillBorder);

    // 6. Glowing Headlights (Sleek horizontal LED lines)
    const headlightGeo = new THREE.BoxGeometry(0.4, 0.06, 0.1);
    const headlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const headlightR = new THREE.Mesh(headlightGeo, headlightMat);
    headlightR.position.set(0.6, 0.2, 2.1);
    carGroup.add(headlightR);

    const headlightL = headlightR.clone();
    headlightL.position.x = -0.6;
    carGroup.add(headlightL);

    // Light cones shooting forward
    const headlightConeGeo = new THREE.ConeGeometry(0.8, 4, 16);
    const headlightConeMat = new THREE.MeshBasicMaterial({
      color: 0xf5e6b3,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });

    const headlightConeR = new THREE.Mesh(headlightConeGeo, headlightConeMat);
    headlightConeR.rotation.x = Math.PI / 2;
    headlightConeR.position.set(0.6, 0.2, 4.1);
    carGroup.add(headlightConeR);

    const headlightConeL = headlightConeR.clone();
    headlightConeL.position.x = -0.6;
    carGroup.add(headlightConeL);

    // 7. Wheels & Rims
    const wheelPositions = [
      [0.9, -0.2, 1.3], // Front Right
      [-0.9, -0.2, 1.3], // Front Left
      [0.9, -0.2, -1.3], // Rear Right
      [-0.9, -0.2, -1.3], // Rear Left
    ];

    const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.35, 32);
    const rimGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.38, 16);

    const wheels: THREE.Mesh[] = [];

    wheelPositions.forEach(([x, y, z], index) => {
      const wheelHolder = new THREE.Group();
      wheelHolder.position.set(x, y, z);

      const tire = new THREE.Mesh(wheelGeo, tireMaterial);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      wheelHolder.add(tire);

      // Gold spoke wheels
      const rim = new THREE.Mesh(rimGeo, wheelRimMaterial);
      rim.rotation.z = Math.PI / 2;
      wheelHolder.add(rim);

      // Add center cap
      const capGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.4, 8);
      const cap = new THREE.Mesh(capGeo, trimMaterial);
      cap.rotation.z = Math.PI / 2;
      wheelHolder.add(cap);

      carGroup.add(wheelHolder);
      wheels.push(tire); // Keep reference to animate rotation
    });

    // 8. Ground shadow plane below the car
    const shadowGeo = new THREE.PlaneGeometry(2.4, 4.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.65,
      blending: THREE.MultiplyBlending,
      premultipliedAlpha: true,
    });
    const groundShadow = new THREE.Mesh(shadowGeo, shadowMat);
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.y = -0.58;
    carGroup.add(groundShadow);

    // Add car group to scene
    scene.add(carGroup);

    // --- Floating Particle System (Gold Dust) ---
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Spread coordinates around the car
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = Math.random() * 3 - 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      velocities.push(
        (Math.random() - 0.5) * 0.005, // dx
        0.005 + Math.random() * 0.01, // dy (upward drift)
        (Math.random() - 0.5) * 0.005, // dz
      );
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Hide loader
    setIsLoading(false);

    // --- Interaction / Parallax ---
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onMouseMove = (event: MouseEvent) => {
      targetX = (event.clientX - windowHalfX) * 0.0002;
      targetY = (event.clientY - windowHalfY) * 0.00015;
    };
    window.addEventListener("mousemove", onMouseMove);

    // --- Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Controls update for damping & autorotate
      controls.update();

      // Slow hover floating animation for the car
      const time = clock.getElapsedTime();
      carGroup.position.y = Math.sin(time * 1.5) * 0.05;
      carGroup.rotation.y += 0.001; // subtle extra spin

      // Rotate car wheels slightly
      wheels.forEach((w) => {
        w.rotation.x += 0.015;
      });

      // Mouse Parallax effect applied to camera
      camera.position.x += (targetX * 5 - camera.position.x) * 0.05;
      camera.position.y += (1.8 + targetY * 3 - camera.position.y) * 0.05;
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // Particle float logic
      const posArr = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3] += velocities[i * 3];
        posArr[i * 3 + 1] += velocities[i * 3 + 1];
        posArr[i * 3 + 2] += velocities[i * 3 + 2];

        // Reset particles that drift too high
        if (posArr[i * 3 + 1] > 2.5) {
          posArr[i * 3] = (Math.random() - 0.5) * 8;
          posArr[i * 3 + 1] = -0.5;
          posArr[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      controls.dispose();
      renderer.dispose();

      // Dispose materials/geometries to prevent memory leak
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => mat.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-transparent to-background/5">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-20">
          <div className="relative w-16 h-16 border-2 border-luxury-400/20 border-t-luxury-400 rounded-full animate-spin" />
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
      <div className="absolute bottom-4 right-4 pointer-events-none text-xs text-luxury-400/40 uppercase tracking-widest font-body">
        Drag to Orbit • Custom WebGL
      </div>
    </div>
  );
}
