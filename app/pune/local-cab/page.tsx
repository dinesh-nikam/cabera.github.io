export const metadata = {
  title: "Pune Local Cab Service | Hourly & Point-to-Point Taxi",
  description:
    "Book local cabs in Pune for hourly rentals and point-to-point travel. Available 24×7 with GPS enabled vehicles and verified drivers.",
  keywords:
    "Pune local cab, local taxi Pune, hourly cab rental, Pune taxi service, cab booking Pune",
};

export default function PuneLocalCabPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <article className="prose prose-invert max-w-4xl mx-auto">
          <h1>Pune Local Cab Service</h1>

          <p>
            Our local cab service in Pune offers convenient hourly rentals and
            point-to-point travel within the city. Perfect for daily commutes,
            shopping trips, or local sightseeing.
          </p>

          <h2>Local Cab Features</h2>
          <ul>
            <li>Hourly packages: 2hrs, 4hrs, 8hrs, 12hrs</li>
            <li>Multiple stops within city limits</li>
            <li>Starting from just ₹200 for short rides</li>
            <li>Verified drivers with clean background check</li>
            <li>GPS tracking for safety</li>
          </ul>

          <h2>Pricing</h2>
          <ul>
            <li>Minimum fare: ₹200</li>
            <li>Sedan: ₹15/km + ₹15/min</li>
            <li>SUV: ₹20/km + ₹20/min</li>
            <li>Hourly: ₹400/hr (4hr package)</li>
          </ul>

          <h2>Areas Covered in Pune</h2>
          <p>
            All major areas including Hinjewadi, Wakad, Baner, Aundh, Kharadi,
            Viman Nagar, Hadapsar, Wagholi, and more.
          </p>
        </article>
      </div>
    </main>
  );
}
