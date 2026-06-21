"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success";
}

const badgeVariants = {
  default:
    "bg-luxury-400 text-background border-transparent hover:bg-luxury-500 hover:scale-105",
  secondary:
    "bg-surface-light text-text-primary border-luxury-400/20 hover:border-luxury-400/50 hover:scale-105",
  destructive: "bg-red-500/20 text-red-400 border-red-500/30",
  outline:
    "text-text-secondary border-white/10 hover:border-white/20 hover:scale-105",
  success: "bg-green-500/20 text-green-400 border-green-500/30",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold font-body transition-all duration-300 transform cursor-default",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
}
