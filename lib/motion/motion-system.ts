"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";

/**
 * Hook to apply a magnetic attraction effect to an element.
 * Perfect for luxury buttons and cursor snap points.
 */
export function useMagnetic(range = 40, actionSpeed = 0.3) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const elX = rect.left + rect.width / 2;
      const elY = rect.top + rect.height / 2;

      const distance = Math.hypot(e.clientX - elX, e.clientY - elY);

      if (distance < range) {
        gsap.to(el, {
          x: (e.clientX - elX) * 0.45,
          y: (e.clientY - elY) * 0.45,
          duration: actionSpeed,
          ease: "power2.out",
        });
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [range, actionSpeed]);

  return ref;
}

/**
 * Hook to apply a 3D tilt perspective effect to cards based on mouse movements.
 */
export function use3DTilt(maxRotate = 10, scale = 1.02) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transformStyle = "preserve-3d";
    el.style.perspective = "1000px";

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const px = x / rect.width;
      const py = y / rect.height;

      const tiltX = (py - 0.5) * -maxRotate;
      const tiltY = (px - 0.5) * maxRotate;

      gsap.to(el, {
        rotateX: tiltX,
        rotateY: tiltY,
        scale: scale,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [maxRotate, scale]);

  return ref;
}
