"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  variant?: "primary" | "secondary" | "gold";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  magnetic?: boolean;
  glow?: boolean;
  type?: "button" | "submit" | "reset";
}

export function AnimatedButton({
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled = false,
  className,
  magnetic = false,
  glow = false,
  type = "button",
}: AnimatedButtonProps) {
  const variants = {
    primary: "bg-luxury-400 text-background hover:bg-luxury-500",
    secondary:
      "bg-surface-light text-text-primary border border-luxury-400/30 hover:bg-luxury-400/10",
    gold: "bg-gradient-to-r from-luxury-400 to-luxury-500 text-background",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  const MagneticButton = () => {
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const ref = React.useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          "rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-luxury-400 focus:ring-offset-2 focus:ring-offset-background",
          variants[variant],
          sizes[size],
          glow && "gold-glow",
          className,
        )}
        onClick={onClick}
        disabled={disabled}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        whileTap={{ scale: 0.95 }}
        type={type}
      >
        {children}
      </motion.button>
    );
  };

  if (magnetic) {
    return <MagneticButton />;
  }

  return (
    <motion.button
      className={cn(
        "rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-luxury-400 focus:ring-offset-2 focus:ring-offset-background",
        variants[variant],
        sizes[size],
        glow && "gold-glow",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      type={type}
    >
      {children}
    </motion.button>
  );
}
