export const metadata = {
  title: "Andheri Cab Service | Mumbai West Taxi Booking",
  description:
    "Book cabs in Andheri, Mumbai. Airport transfers, local travel, and outstation trips with verified drivers.",
  keywords:
    "Andheri cab service, Andheri taxi, Mumbai cab booking, Andheri to airport, Andheri West East",
};

export default function AndheriCabPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <article className="prose prose-invert max-w-4xl mx-auto">
          <h1>Cab Service in Andheri, Mumbai</h1>

          <p>
            Premium cab service in Andheri - covering both West and East areas.
            We provide reliable transportation for daily commute, airport
            transfers, and local travel.
          </p>

          <h2>Services in Andheri</h2>
          <ul>
            <li>Airport transfers to/from Mumbai Airport (8 km)</li>
            <li>Local taxi services within Andheri</li>
            <li>Commute to Bandra, Juhu, Powai</li>
            <li>Outstation trips to Pune, Nashik, Goa</li>
            <li>Corporate travel for business districts</li>
          </ul>

          <h2>Nearby Areas</h2>
          <ul>
            <li>
              <a href="/bandra-cab-service">Bandra</a> - 6 km
            </li>
            <li>
              <a href="/powai-cab-service">Powai</a> - 5 km
            </li>
            <li>Juhu - 4 km</li>
            <li>Mahindra - 8 km</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
