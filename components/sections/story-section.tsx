"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Shield, Map, Compass, Clock, Award } from "lucide-react";
import { use3DTilt } from "@/lib/motion/motion-system";

gsap.registerPlugin(ScrollTrigger);

const storyStages = [
  {
    id: "arrival",
    number: "01",
    badge: "First Touchpoint",
    title: "The Art of Arrival",
    description:
      "Your journey starts before you enter the vehicle. Professional, uniformed chauffeurs arrive 15 minutes early, verifying sanitization protocols and handling luggage with immaculate grace.",
    icon: Clock,
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800",
    color: "#D4AF37",
  },
  {
    id: "discovery",
    number: "02",
    badge: "Curation",
    title: "Tailored Discovery",
    description:
      "Configure your space. Select temperature settings, pick from ambient sound layouts, or enjoy quiet work compartments designed for business executives traveling between Pune and Mumbai.",
    icon: Compass,
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800",
    color: "#00a8ff",
  },
  {
    id: "booking",
    number: "03",
    badge: "Automation",
    title: "Seamless Booking",
    description:
      "Zero friction booking workflow. Instantly compare class packages, visualize capacity limits, and receive verified dispatch codes on WhatsApp in seconds.",
    icon: Shield,
    image:
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800",
    color: "#10B981",
  },
  {
    id: "journey",
    number: "04",
    badge: "Express Corridor",
    title: "Smooth Journey",
    description:
      "Traverse the majestic Western Ghats with smooth highway cruising. Our high-fidelity GPS routing ensures optimal expressway flow, letting you focus on the views or your upcoming board meetings.",
    icon: Map,
    image:
      "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=800",
    color: "#7C3AED",
  },
  {
    id: "destination",
    number: "05",
    badge: "Target Reached",
    title: "Impeccable Destination",
    description:
      "Arrive at South Mumbai, BKC, or Mumbai International Airport refreshed. No traffic fatigue, no parking struggles. Prompt drop-off right at your terminal or luxury lobby entrance.",
    icon: Award,
    image:
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=800",
    color: "#d4af37",
  },
  {
    id: "memory",
    number: "06",
    badge: "Relationships",
    title: "Lasting Memory",
    description:
      "Every ride strengthens our relationship. Automated receipt dispatches, trip logs, and continuous loyalty benefits that treat you as an essential partner in modern executive travel.",
    icon: Star,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
    color: "#ff3e3e",
  },
];

interface StoryStageRowProps {
  stage: (typeof storyStages)[0];
  idx: number;
}

function StoryStageRow({ stage, idx }: StoryStageRowProps) {
  const cardRef = use3DTilt(8, 1.03);

  return (
    <div
      id={`story-viewport-${stage.id}`}
      className="story-viewport min-h-screen flex items-center justify-center py-20 px-4 md:px-12 relative border-b border-white/5"
    >
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          background: `radial-gradient(circle 500px at 70% 50%, ${stage.color}15, transparent 80%)`,
        }}
      />

      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Area */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-luxury-400/10 rounded-full border border-luxury-400/20">
            <stage.icon className="w-4 h-4 text-luxury-400 animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-widest text-luxury-400 font-body">
              {stage.badge}
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold font-heading text-white leading-tight">
            <span className="text-luxury-400 mr-4 font-body text-xl md:text-2xl align-super block lg:inline-block">
              {stage.number}.
            </span>
            {stage.title}
          </h2>

          <p className="text-lg text-text-secondary leading-relaxed font-body">
            {stage.description}
          </p>

          <div className="pt-4 flex items-center gap-3 text-xs uppercase tracking-widest text-luxury-400/50">
            <span>Pune ↔ Mumbai Luxury Corridor</span>
            <span>•</span>
            <span>Class of Chauffeur</span>
          </div>
        </motion.div>

        {/* Graphic/Image Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, type: "spring", bounce: 0.15 }}
          className="flex justify-center"
        >
          <div
            ref={cardRef as any}
            className="relative group w-full max-w-md h-[400px] rounded-2xl overflow-hidden glass border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] preserve-3d"
          >
            <img
              src={stage.image}
              alt={stage.title}
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 text-left">
              <span className="text-xs text-luxury-400 uppercase tracking-widest block font-body">
                Executive Travel
              </span>
              <span className="text-lg font-bold font-heading text-white">
                {stage.title}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const sections = el.querySelectorAll(".story-viewport");

    sections.forEach((sec, idx) => {
      ScrollTrigger.create({
        trigger: sec,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(idx),
        onEnterBack: () => setActiveIndex(idx),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger &&
          (trigger.trigger as HTMLElement).classList?.contains("story-viewport")
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-background overflow-hidden"
      aria-label="Luxury Mobility Story"
    >
      {/* Sticky Left Navigation Index Panel */}
      <div className="hidden lg:flex fixed left-12 top-1/2 -translate-y-1/2 flex-col gap-6 z-30 pointer-events-auto">
        {storyStages.map((stage, idx) => (
          <button
            key={stage.id}
            onClick={() => {
              const element = document.getElementById(
                `story-viewport-${stage.id}`,
              );
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-4 text-left outline-none"
          >
            <div className="relative flex items-center justify-center">
              <span
                className={`text-xs font-semibold font-body transition-all duration-300 ${
                  activeIndex === idx
                    ? "text-luxury-400 scale-125"
                    : "text-text-secondary/35 group-hover:text-text-secondary"
                }`}
              >
                {stage.number}
              </span>
              {activeIndex === idx && (
                <motion.div
                  layoutId="storyDot"
                  className="absolute -right-3 w-1.5 h-1.5 rounded-full bg-luxury-400"
                />
              )}
            </div>
            <span
              className={`text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeIndex === idx
                  ? "text-white translate-x-2"
                  : "text-text-secondary/0 pointer-events-none"
              }`}
            >
              {stage.id}
            </span>
          </button>
        ))}
      </div>

      {/* Narrative viewport sections */}
      {storyStages.map((stage, idx) => (
        <StoryStageRow key={stage.id} stage={stage} idx={idx} />
      ))}
    </section>
  );
}
