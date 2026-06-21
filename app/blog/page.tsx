"use client";

import { motion } from "framer-motion";
import { NavigationBar } from "@/components/ui/navigation-bar";
import { Footer } from "@/components/ui/footer";
import { StickyCta } from "@/components/ui/sticky-cta";
import { FloatingCta } from "@/components/ui/floating-cta";
import { Compass, BookOpen, Clock, Tag } from "lucide-react";
import { use3DTilt } from "@/lib/motion/motion-system";

const blogPosts = [
  {
    title: "Pune Airport Guide: Terminals & Transport",
    slug: "pune-airport-guide",
    excerpt:
      "Complete guide to Pune Airport including terminals, check-in facilities, and premium chauffeur transport options.",
    category: "Airport Guide",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600",
  },
  {
    title: "Mumbai Airport Guide: Your Complete Companion",
    slug: "mumbai-airport-guide",
    excerpt:
      "Everything about Mumbai Terminal 2 domestic and international gates, and connecting VIP cab pick-ups.",
    category: "Airport Guide",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600",
  },
  {
    title: "Best Places to Visit Near Pune for Weekend Trips",
    slug: "best-places-near-pune",
    excerpt:
      "Explore scenic hill stations, beaches, and heritage forts within short driving distance from Pune.",
    category: "Weekend Travel",
    image:
      "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=600",
  },
  {
    title: "Monsoon Weekend Getaways from Mumbai",
    slug: "weekend-trips-mumbai",
    excerpt:
      "Escape the city stress. Explore perfect wet-season destinations reachable by luxury cab from Mumbai.",
    category: "Weekend Travel",
    image:
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=600",
  },
  {
    title: "Complete Taxi Fare Guide for Pune and Mumbai",
    slug: "taxi-fare-guide",
    excerpt:
      "Centralized route pricing matrices, toll charges, and corporate package calculations explained.",
    category: "Guides",
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=600",
  },
  {
    title: "How to Book Airport Taxi: Complete Guide",
    slug: "airport-taxi-booking-guide",
    excerpt:
      "A step-by-step product walkthrough of booking executive airport ground shuttles safely.",
    category: "Guides",
    image:
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=600",
  },
];

export default function BlogPage() {
  const tiltRef = use3DTilt(6, 1.02);

  return (
    <main className="min-h-screen bg-background relative">
      <NavigationBar />

      {/* Header Banner */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full bg-luxury-400 blur-[150px] pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-luxury-400/10 border border-luxury-400/20 rounded-full">
            <BookOpen className="w-4 h-4 text-luxury-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-luxury-400 font-body">
              Chauffeur Journals
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-white max-w-2xl mx-auto">
            Travel & Logistics Journals
          </h1>
          <p className="text-lg text-text-secondary max-w-xl mx-auto font-body">
            Get airport guides, outstation travel suggestions, and step-by-step
            booking resources written by our dispatch coordinators.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-20 border-t border-white/5 bg-surface/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="card-luxury overflow-hidden flex flex-col justify-between h-full group hover:border-luxury-400/30 transition-all duration-300"
              >
                <div>
                  {/* cover image */}
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 left-4 bg-luxury-400/25 border border-luxury-400/30 text-luxury-400 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest backdrop-blur-md">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h2 className="text-xl font-bold font-heading text-white leading-snug">
                      <a
                        href={`/blog/${post.slug}`}
                        className="hover:text-luxury-400 transition-colors"
                      >
                        {post.title}
                      </a>
                    </h2>
                    <p className="text-sm text-text-secondary leading-relaxed font-body">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/5 mt-4 flex justify-between items-center text-xs text-text-secondary/50 font-body">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />5 min read
                  </span>
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-luxury-400 hover:text-white transition-colors font-bold uppercase tracking-wider text-[10px] flex items-center gap-1"
                  >
                    Read Post →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer & CTA */}
      <Footer />
      <StickyCta />
      <FloatingCta />
    </main>
  );
}
