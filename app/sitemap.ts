import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://punemumbaicab.com";

  // Main pages
  const mainPages = ["", "/about", "/contact", "/services"];

  // Pune area pages
  const puneAreas = [
    "/hinjewadi-cab-service",
    "/wakad-cab-service",
    "/baner-cab-service",
    "/aundh-cab-service",
    "/kharadi-cab-service",
    "/viman-nagar-cab-service",
    "/hadapsar-cab-service",
    "/wagholi-cab-service",
  ];

  // Mumbai area pages
  const mumbaiAreas = [
    "/andheri-cab-service",
    "/bandra-cab-service",
    "/powai-cab-service",
    "/thane-cab-service",
    "/navi-mumbai-cab-service",
    "/panvel-cab-service",
  ];

  // Service pages
  const servicePages = [
    "/cab-service-pune",
    "/taxi-service-pune",
    "/airport-cab-pune",
    "/pune-airport-taxi",
    "/pune-local-cab",
    "/pune-outstation-cab",
    "/pune-corporate-cab",
    "/cab-service-mumbai",
    "/taxi-service-mumbai",
    "/mumbai-airport-taxi",
    "/mumbai-airport-cab",
    "/mumbai-local-taxi",
    "/mumbai-corporate-cab",
  ];

  // Route pages
  const routePages = [
    "/pune-to-mumbai-cab",
    "/mumbai-to-pune-cab",
    "/pune-to-shirdi-cab",
    "/pune-to-nashik-cab",
    "/pune-to-goa-cab",
    "/pune-to-mahabaleshwar-cab",
    "/pune-to-lonavala-cab",
    "/mumbai-to-shirdi-cab",
  ];

  const allPages = [
    ...mainPages,
    ...puneAreas,
    ...mumbaiAreas,
    ...servicePages,
    ...routePages,
  ];

  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: page === "" ? 1 : 0.8,
  }));
}
