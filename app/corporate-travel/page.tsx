"use client";

import { motion } from "framer-motion";
import { NavigationBar } from "@/components/ui/navigation-bar";
import { Footer } from "@/components/ui/footer";
import { StickyCta } from "@/components/ui/sticky-cta";
import { FloatingCta } from "@/components/ui/floating-cta";
import {
  Briefcase,
  Building2,
  CreditCard,
  Clock,
  Star,
  Phone,
} from "lucide-react";
import { use3DTilt, useMagnetic } from "@/lib/motion/motion-system";

export default function CorporateTravelPage() {
  const tiltRef = use3DTilt(6, 1.02);
  const bookBtnRef = useMagnetic(30, 0.25);

  const corporatePlans = [
    {
      name: "Standard Business",
      units: "1-5 Vehicles",
      billing: "Weekly Invoicing",
      features: [
        "GST Invoicing",
        "Verified Driver Pools",
        "24/7 Hotline support",
      ],
      border: "border-white/5",
    },
    {
      name: "Premium Fleet Leases",
      units: "6-20 Vehicles",
      billing: "Monthly Consolidations",
      features: [
        "Dedicated Dispatch Board",
        "Preferred Chauffeur queues",
        "Consolidated monthly statements",
      ],
      border:
        "border-luxury-400/30 bg-luxury-400/5 shadow-[0_4px_25px_rgba(212,175,55,0.05)]",
      highlight: true,
    },
    {
      name: "Enterprise Mobility",
      units: "20+ Vehicles",
      billing: "Custom Billing Cycle",
      features: [
        "On-site logistics desk",
        "SLA contract compliance",
        "Custom API route pricing",
      ],
      border: "border-white/5",
    },
  ];

  return (
    <main className="min-h-screen bg-background relative">
      <NavigationBar />

      {/* Header Banner */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full bg-luxury-400 blur-[150px] pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-luxury-400/10 border border-luxury-400/20 rounded-full">
                <Briefcase className="w-4 h-4 text-luxury-400 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-widest text-luxury-400 font-body">
                  Corporate Accounts Office
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-heading text-white leading-tight">
                Corporate Ground Logistics
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed font-body">
                Consolidated transportation accounts engineered for modern
                enterprises. Simplify executive commutes between Pune and Mumbai
                with centralized monthly invoicing, full GST compliance, and
                dedicated client panels.
              </p>

              <div className="flex gap-4">
                <motion.button
                  ref={bookBtnRef as any}
                  onClick={() => (window.location.href = "/#booking-widget")}
                  className="btn-primary rounded-full px-8 py-3 text-sm tracking-wider uppercase font-semibold font-body"
                >
                  Setup Account
                </motion.button>
                <a
                  href="tel:+919876543210"
                  className="btn-secondary flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide"
                >
                  <Phone className="w-4 h-4 text-luxury-400" />
                  Account Desk
                </a>
              </div>
            </div>

            {/* Right Interactive Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                ref={tiltRef as any}
                className="relative group w-full max-w-sm h-[320px] rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl preserve-3d"
              >
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800"
                  alt="Corporate Executives Meeting"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-75" />
                <div className="absolute bottom-6 left-6 text-left">
                  <span className="text-[10px] text-luxury-400 uppercase tracking-widest block font-body">
                    Executive Mobility
                  </span>
                  <span className="text-lg font-bold font-heading text-white">
                    Centralized Invoicing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Account Plans Grid */}
      <section className="py-20 border-t border-white/5 bg-surface/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-semibold text-luxury-400 uppercase tracking-widest block font-body">
              Pricing Matrix
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">
              Enterprise Accounts & Leases
            </h2>
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              Centralized accounts structured around typical fleet requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corporatePlans.map((plan) => (
              <div
                key={plan.name}
                className={`glass p-8 rounded-3xl border flex flex-col justify-between items-start space-y-6 ${plan.border}`}
              >
                <div className="space-y-2">
                  {plan.highlight && (
                    <span className="text-[10px] font-semibold text-luxury-400 uppercase tracking-wider block bg-luxury-400/10 px-2 py-0.5 rounded-full w-max">
                      Most Active
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-white font-heading">
                    {plan.name}
                  </h3>
                  <span className="text-xs text-luxury-400 uppercase tracking-widest block font-body">
                    {plan.units}
                  </span>
                </div>

                <div className="text-left w-full border-t border-b border-white/5 py-4">
                  <span className="text-[10px] text-text-secondary uppercase block mb-1">
                    Billing Protocol
                  </span>
                  <span className="text-base font-bold text-white font-heading">
                    {plan.billing}
                  </span>
                </div>

                <div className="space-y-3 w-full">
                  <span className="text-xs text-text-secondary block font-semibold uppercase">
                    Included Features:
                  </span>
                  <ul className="space-y-2.5 text-xs text-text-secondary font-body">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-luxury-400" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => (window.location.href = "/#booking-widget")}
                  className="w-full btn-primary py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold font-body"
                >
                  Get Proposal
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Features */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-semibold text-luxury-400 uppercase tracking-widest block font-body">
              Reliability Standards
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">
              Centralized Logistics Desk
            </h2>
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              Our accounts feature dedicated SLA standards to protect business
              transit continuity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-luxury p-6 space-y-4 text-center">
              <Building2 className="w-10 h-10 text-luxury-400 mx-auto" />
              <h3 className="text-lg font-bold font-heading text-white">
                Dedicated Fleet Pools
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body">
                We set aside a dedicated pool of luxury vehicles specifically
                allocated to cover your account bookings.
              </p>
            </div>

            <div className="card-luxury p-6 space-y-4 text-center">
              <CreditCard className="w-10 h-10 text-luxury-400 mx-auto" />
              <h3 className="text-lg font-bold font-heading text-white">
                Unified Invoicing
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body">
                No individual trip payouts. Receive a single monthly
                consolidated invoice showing itemized route logs and tax
                breakdowns.
              </p>
            </div>

            <div className="card-luxury p-6 space-y-4 text-center">
              <Clock className="w-10 h-10 text-luxury-400 mx-auto" />
              <h3 className="text-lg font-bold font-heading text-white">
                99.9% Dispatch SLA
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body">
                Contractual assurance of driver dispatch punctuality, guarded by
                our automated fallback redundancy systems.
              </p>
            </div>
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
