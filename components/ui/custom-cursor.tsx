"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorType, setCursorType] = useState<
    "default" | "hover" | "magnetic" | "text"
  >("default");

  useEffect(() => {
    // Check if device supports touch
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Set initial positions offscreen
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const onMouseMove = (e: MouseEvent) => {
      // Dot follows mouse exactly
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: "power2.out",
      });

      // Ring follows mouse with spring delay
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target) return;

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer");

      const isMagnetic = target.closest(".magnetic-target");
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("input");

      if (isMagnetic) {
        setCursorType("magnetic");
      } else if (isClickable) {
        setCursorType("hover");
      } else if (isInput) {
        setCursorType("text");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Fade cursor in/out when leaving screen
    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };
    const onMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  // Set ring dimensions and colors based on current hover type
  const getRingStyles = () => {
    switch (cursorType) {
      case "hover":
        return "w-10 h-10 border-luxury-400 bg-luxury-400/10 scale-110";
      case "magnetic":
        return "w-14 h-14 border-luxury-400 bg-luxury-400/20 scale-125 border-dashed";
      case "text":
        return "w-4 h-8 border-white/50 bg-transparent rounded-none scale-90";
      default:
        return "w-6 h-6 border-white/30 bg-transparent scale-100";
    }
  };

  const getDotStyles = () => {
    switch (cursorType) {
      case "hover":
      case "magnetic":
        return "bg-luxury-400 scale-75";
      case "text":
        return "bg-white opacity-0";
      default:
        return "bg-luxury-400 scale-100";
    }
  };

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] w-2 h-2 rounded-full transition-transform duration-300 ${getDotStyles()}`}
      />
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border transition-all duration-300 ease-out ${getRingStyles()}`}
      />
    </>
  );
}
