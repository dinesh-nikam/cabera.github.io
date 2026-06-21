import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const puneAreas = [
  {
    name: "Hinjewadi",
    slug: "hinjewadi-cab-service",
    keywords: "Hinjewadi IT Park",
  },
  { name: "Wakad", slug: "wakad-cab-service", keywords: "Wakad Chowk" },
  { name: "Baner", slug: "baner-cab-service", keywords: "Baner Road" },
  { name: "Aundh", slug: "aundh-cab-service", keywords: "Aundh Road" },
  { name: "Kharadi", slug: "kharadi-cab-service", keywords: "Kharadi Bypass" },
  {
    name: "Viman Nagar",
    slug: "viman-nagar-cab-service",
    keywords: "Viman Nagar Airport Road",
  },
  {
    name: "Hadapsar",
    slug: "hadapsar-cab-service",
    keywords: "Hadapsar Industrial Area",
  },
  { name: "Wagholi", slug: "wagholi-cab-service", keywords: "Wagholi Pune" },
];

const mumbaiAreas = [
  {
    name: "Andheri",
    slug: "andheri-cab-service",
    keywords: "Andheri West East",
  },
  {
    name: "Bandra",
    slug: "bandra-cab-service",
    keywords: "Bandra Kurla Complex",
  },
  { name: "Powai", slug: "powai-cab-service", keywords: "Powai Lake" },
  { name: "Thane", slug: "thane-cab-service", keywords: "Thane City" },
  {
    name: "Navi Mumbai",
    slug: "navi-mumbai-cab-service",
    keywords: "Navi Mumbai Sector",
  },
  {
    name: "Panvel",
    slug: "panvel-cab-service",
    keywords: "Panvel Railway Station",
  },
];

const puneServices = [
  { name: "Cab Service", slug: "cab-service-pune" },
  { name: "Taxi Service", slug: "taxi-service-pune" },
  { name: "Airport Cab", slug: "airport-cab-pune" },
  { name: "Pune Airport Taxi", slug: "pune-airport-taxi" },
  { name: "Local Cab", slug: "pune-local-cab" },
  { name: "Outstation Cab", slug: "pune-outstation-cab" },
  { name: "Corporate Cab", slug: "pune-corporate-cab" },
];

const mumbaiServices = [
  { name: "Cab Service", slug: "cab-service-mumbai" },
  { name: "Taxi Service", slug: "taxi-service-mumbai" },
  { name: "Mumbai Airport Taxi", slug: "mumbai-airport-taxi" },
  { name: "Mumbai Airport Cab", slug: "mumbai-airport-cab" },
  { name: "Local Taxi", slug: "mumbai-local-taxi" },
  { name: "Corporate Cab", slug: "mumbai-corporate-cab" },
];

const routes = [
  {
    from: "Pune",
    to: "Mumbai",
    slug: "pune-to-mumbai-cab",
    distance: "150 km",
  },
  {
    from: "Mumbai",
    to: "Pune",
    slug: "mumbai-to-pune-cab",
    distance: "150 km",
  },
  {
    from: "Pune",
    to: "Shirdi",
    slug: "pune-to-shirdi-cab",
    distance: "120 km",
  },
  {
    from: "Pune",
    to: "Nashik",
    slug: "pune-to-nashik-cab",
    distance: "200 km",
  },
  { from: "Pune", to: "Goa", slug: "pune-to-goa-cab", distance: "450 km" },
  {
    from: "Pune",
    to: "Mahabaleshwar",
    slug: "pune-to-mahabaleshwar-cab",
    distance: "120 km",
  },
  {
    from: "Pune",
    to: "Lonavala",
    slug: "pune-to-lonavala-cab",
    distance: "65 km",
  },
  {
    from: "Mumbai",
    to: "Shirdi",
    slug: "mumbai-to-shirdi-cab",
    distance: "250 km",
  },
];

function generateSeoPage(
  slug: string,
  title: string,
  metaDescription: string,
  content: string,
) {
  const pageContent = `import { Metadata } from "next";

export const metadata: Metadata = {
  title: "${title}",
  description: "${metaDescription}",
  keywords: "${slug.replace(/-/g, ", ")}, cab service, taxi, Pune, Mumbai",
  openGraph: {
    title: "${title}",
    description: "${metaDescription}",
    type: "website",
  },
  alternates: {
    canonical: "https://punemumbaicab.com/${slug}",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <article className="prose prose-invert max-w-4xl mx-auto">
          ${content}
        </article>
      </div>
    </main>
  );
}`;

  const dir = join(process.cwd(), "app", slug);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(join(dir, "page.tsx"), pageContent);
  console.log(`Generated: /${slug}`);
}

// Generate all pages
const allPages: {
  slug: string;
  title: string;
  metaDescription: string;
  content: string;
}[] = [];

// City pages
allPages.push({
  slug: "pune",
  title: "Premium Cab Service in Pune | 24×7 Taxi Booking",
  metaDescription:
    "Book premium cabs in Pune for local travel, airport transfers, and outstation trips. Serving Hinjewadi, Wakad, Baner, Kharadi with verified drivers.",
  content: `<h1>Premium Cab Service in Pune</h1>
<p>Experience luxury transportation in Pune with our premium cab service. We serve all major areas including Hinjewadi, Wakad, Baner, Aundh, Kharadi, Viman Nagar, Hadapsar, and Wagholi.</p>
<h2>Our Services in Pune</h2>
<ul>
<li>Airport Transfers - Pune to Airport & Airport to Pune</li>
<li>Local Cab Rentals - Hourly and point-to-point travel</li>
<li>Outstation Trips - Shirdi, Nashik, Mahabaleshwar, Lonavala</li>
<li>Corporate Travel - Monthly billing with dedicated account managers</li>
</ul>`,
});

allPages.push({
  slug: "mumbai",
  title: "Premium Cab Service in Mumbai | 24×7 Taxi Booking",
  metaDescription:
    "Book premium cabs in Mumbai for local travel, airport transfers, and outstation trips. Serving Andheri, Bandra, Powai, Thane, Navi Mumbai.",
  content: `<h1>Premium Cab Service in Mumbai</h1>
<p>Experience luxury transportation in Mumbai with our premium cab service. We serve all major areas including Andheri, Bandra, Powai, Thane, Navi Mumbai, and Panvel.</p>
<h2>Our Services in Mumbai</h2>
<ul>
<li>Airport Transfers - Mumbai to Airport & Airport to Mumbai</li>
<li>Local Taxi - Hourly and point-to-point travel</li>
<li>Outstation Trips - Pune, Shirdi, Nashik</li>
<li>Corporate Travel - Monthly billing with dedicated account managers</li>
</ul>`,
});

// Area service pages
puneAreas.forEach((area) => {
  allPages.push({
    slug: area.slug,
    title: `Cab Service in ${area.name}, Pune | 24×7 Taxi Booking`,
    metaDescription: `Book premium cabs in ${area.name}, Pune. Airport transfers, local rentals, and outstation trips with verified drivers and transparent pricing.`,
    content: `<h1>Cab Service in ${area.name}, Pune</h1>
<p>Premium cab service available in ${area.name} (${area.keywords}). Our drivers are verified and our vehicles are well-maintained for your comfort.</p>
<h2>Services Available</h2>
<ul>
<li>Local cab bookings within ${area.name}</li>
<li>Airport transfers to/from Pune Airport</li>
<li>Outstation trips from ${area.name}</li>
<li>Corporate travel solutions</li>
</ul>`,
  });
});

mumbaiAreas.forEach((area) => {
  allPages.push({
    slug: area.slug,
    title: `Cab Service in ${area.name}, Mumbai | 24×7 Taxi Booking`,
    metaDescription: `Book premium cabs in ${area.name}, Mumbai. Airport transfers, local rentals, and outstation trips with verified drivers.`,
    content: `<h1>Cab Service in ${area.name}, Mumbai</h1>
<p>Premium cab service available in ${area.name} (${area.keywords}). Our drivers are verified and our vehicles are well-maintained for your comfort.</p>
<h2>Services Available</h2>
<ul>
<li>Local taxi bookings within ${area.name}</li>
<li>Airport transfers to/from Mumbai Airport</li>
<li>Outstation trips from ${area.name}</li>
<li>Corporate travel solutions</li>
</ul>`,
  });
});

// Service pages
puneServices.forEach((service) => {
  allPages.push({
    slug: service.slug,
    title: `${service.name} in Pune | Premium Cab Booking`,
    metaDescription: `Book ${service.name.toLowerCase()} in Pune. 24×7 availability with GPS enabled vehicles and verified drivers.`,
    content: `<h1>${service.name} in Pune</h1>
<p>Reliable ${service.name.toLowerCase()} available throughout Pune and surrounding areas. Experience premium comfort at competitive prices.</p>`,
  });
});

mumbaiServices.forEach((service) => {
  allPages.push({
    slug: service.slug,
    title: `${service.name} in Mumbai | Premium Cab Booking`,
    metaDescription: `Book ${service.name.toLowerCase()} in Mumbai. 24×7 availability with GPS enabled vehicles and verified drivers.`,
    content: `<h1>${service.name} in Mumbai</h1>
<p>Reliable ${service.name.toLowerCase()} available throughout Mumbai and surrounding areas. Experience premium comfort at competitive prices.</p>`,
  });
});

// Route pages
routes.forEach((route) => {
  allPages.push({
    slug: route.slug,
    title: `${route.from} to ${route.to} Cab | Book Online`,
    metaDescription: `Book ${route.from} to ${route.to} cab online. ${route.distance} journey with verified drivers, transparent pricing, and 24×7 service.`,
    content: `<h1>${route.from} to ${route.to} Cab Service</h1>
<p>Travel comfortably from ${route.from} to ${route.to} in our premium vehicles. Distance: ${route.distance}.</p>
<h2>Pricing</h2>
<ul>
<li>Sedan: ₹${route.from === "Pune" && route.to === "Mumbai" ? "2500" : route.distance.includes("20") ? "800" : route.distance.includes("120") ? "2000" : route.distance.includes("200") ? "3000" : route.distance.includes("65") ? "1200" : "4000"} onwards</li>
<li>SUV: ₹${route.from === "Pune" && route.to === "Mumbai" ? "3500" : route.distance.includes("20") ? "1000" : route.distance.includes("120") ? "2500" : route.distance.includes("200") ? "4500" : route.distance.includes("65") ? "1800" : "5500"} onwards</li>
<li>Luxury: ₹${route.from === "Pune" && route.to === "Mumbai" ? "5000" : route.distance.includes("20") ? "1500" : route.distance.includes("120") ? "3500" : route.distance.includes("200") ? "6500" : route.distance.includes("65") ? "2500" : "8000"} onwards</li>
</ul>`,
  });
});

// Generate all pages
allPages.forEach((page) => {
  generateSeoPage(page.slug, page.title, page.metaDescription, page.content);
});

console.log(`\nGenerated ${allPages.length} SEO pages!`);
