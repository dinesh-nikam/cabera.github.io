import { NavigationBar } from "@/components/ui/navigation-bar";
import { HeroSection } from "@/components/sections/hero-section";
import { StorySection } from "@/components/sections/story-section";
import { Route3D } from "@/components/ui/route-3d";
import { ServicesSection } from "@/components/sections/services-section";
import { FleetSection } from "@/components/sections/fleet-section";
import { City3D } from "@/components/ui/city-3d";
import { RoutesSection } from "@/components/sections/routes-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";
import { StickyCta } from "@/components/ui/sticky-cta";
import { FloatingCta } from "@/components/ui/floating-cta";
import { Footer } from "@/components/ui/footer";

export const metadata = {
  title:
    "Premium Cab Service in Pune & Mumbai | Airport Transfers & Outstation Cabs",
  description:
    "Book luxury cabs in Pune & Mumbai for airport transfers, local rentals, corporate travel & outstation trips. Available 24×7 with GPS enabled verified drivers. Transparent pricing, 10,000+ trips completed.",
  keywords:
    "Pune cab service, Mumbai taxi, airport transfer, outstation cab, corporate travel, Pune to Mumbai cab",
  openGraph: {
    title: "Premium Cab Service in Pune & Mumbai",
    description:
      "Luxury cabs for airport transfers, local travel & outstation trips",
    type: "website",
    images: [
      {
        url: "/images/og-homepage.jpg",
        width: 1200,
        height: 630,
        alt: "Pune Mumbai Premium Cab Service",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background relative select-none">
      {/* Primary header overlay */}
      <NavigationBar />

      {/* Full screen split hero with interactive WebGL car model */}
      <HeroSection />

      {/* Cinematic Scroll Storytelling (6 interactive viewports) */}
      <StorySection />

      {/* 3D route mapping showcase linked to page scroll */}
      <div className="bg-surface py-12 border-t border-b border-white/5">
        <div className="container mx-auto px-4 text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white">
            Expressway Mapping
          </h2>
          <p className="text-text-secondary text-base max-w-lg mx-auto mt-2">
            Track key milestones along the 150 KM corridor in our scroll-linked
            map.
          </p>
        </div>
        <Route3D />
      </div>

      {/* Premium services grids */}
      <div id="services">
        <ServicesSection />
      </div>

      {/* Luxury fleet cards */}
      <div id="fleet">
        <FleetSection />
      </div>

      {/* Low-Poly Smart City Logistics Model */}
      <div className="bg-surface py-20 border-t border-b border-white/5">
        <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold text-luxury-400 uppercase tracking-widest block font-body">
              Urban Ecosystem
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white leading-tight">
              Smart City Logistics
            </h2>
            <p className="text-base text-text-secondary leading-relaxed font-body">
              Our automated fleet dispatch maps high-speed arterial lines across
              Mumbai and Pune&apos;s corporate zones, ensuring zero waiting time
              at airport terminals and business hubs.
            </p>
            <div className="flex gap-4">
              <div className="border border-white/10 bg-white/5 p-4 rounded-xl flex-1">
                <span className="text-xs text-luxury-400 block font-body">
                  Wait Time
                </span>
                <span className="text-xl font-bold text-white font-heading">
                  0 Minutes
                </span>
              </div>
              <div className="border border-white/10 bg-white/5 p-4 rounded-xl flex-1">
                <span className="text-xs text-luxury-400 block font-body">
                  Accuracy
                </span>
                <span className="text-xl font-bold text-white font-heading">
                  99.8%
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 h-[400px] rounded-3xl overflow-hidden glass border border-white/5 shadow-2xl">
            <City3D />
          </div>
        </div>
      </div>

      {/* Scenic popular routes */}
      <RoutesSection />

      {/* Client reviews */}
      <TestimonialsSection />

      {/* Frequently Asked Questions */}
      <div id="faq">
        <FaqSection />
      </div>

      {/* Footer */}
      <Footer />

      {/* Sticky reservation helper and floating links */}
      <StickyCta />
      <FloatingCta />
    </main>
  );
}
