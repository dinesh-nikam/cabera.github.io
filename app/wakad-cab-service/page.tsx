export const metadata = {
  title: "Wakad Cab Service | Pune West Taxi Booking",
  description:
    "Book cabs in Wakad, Pune. Airport transfers, local travel, and outstation trips with verified drivers.",
  keywords: "Wakad cab service, Wakad taxi, Pune cab booking, Wakad to airport",
};

export default function WakadCabPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <article className="prose prose-invert max-w-4xl mx-auto">
          <h1>Cab Service in Wakad, Pune</h1>

          <p>
            Reliable cab service in Wakad for your daily commute, airport
            transfers, and weekend getaways. We serve Wakad Chowk and
            surrounding areas.
          </p>

          <h2>Services in Wakad</h2>
          <ul>
            <li>Local cab service within Wakad</li>
            <li>Wakad to Pune Airport (20 km)</li>
            <li>Wakad to Hinjewadi/Baner/Hadapsar</li>
            <li>Outstation cabs to Mumbai, Lonavala, Mahabaleshwar</li>
            <li>Hourly rental packages</li>
          </ul>

          <h2>Nearby Areas</h2>
          <ul>
            <li>
              <a href="/hinjewadi-cab-service">Hinjewadi</a> - 8 km
            </li>
            <li>
              <a href="/baner-cab-service">Baner</a> - 5 km
            </li>
            <li>
              <a href="/aundh-cab-service">Aundh</a> - 12 km
            </li>
            <li>Kharadi - 10 km</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
