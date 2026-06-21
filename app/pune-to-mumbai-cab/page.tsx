export const metadata = {
  title: "Pune to Mumbai Cab | Book Online at ₹2,500",
  description:
    "Book Pune to Mumbai cab online. 150km journey with verified drivers, transparent pricing, and 24×7 service. Choose from Sedan, SUV, or Luxury vehicles.",
  keywords:
    "Pune to Mumbai cab, Pune Mumbai taxi, intercity cab, airport transfer, corporate travel",
  openGraph: {
    title: "Pune to Mumbai Cab Service",
    description:
      "Book your Pune to Mumbai cab with transparent pricing and verified drivers",
    type: "website",
  },
};

export default function PuneToMumbaiCabPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <article className="prose prose-invert max-w-4xl mx-auto">
          <h1>Pune to Mumbai Cab Service</h1>

          <p>
            Travel comfortably from Pune to Mumbai in our premium vehicles. The
            150km journey takes approximately 3.5 hours with multiple pickup and
            drop points available.
          </p>

          <h2>Route Details</h2>
          <ul>
            <li>Distance: 150 km</li>
            <li>Duration: 3.5 hours</li>
            <li>Highway: Mumbai-Pune Expressway</li>
            <li>Stops: Optional refreshment stops available</li>
          </ul>

          <h2>Pricing</h2>
          <table>
            <thead>
              <tr>
                <th>Vehicle Type</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sedan (Dzire/Etios)</td>
                <td>₹2,500 onwards</td>
              </tr>
              <tr>
                <td>SUV (Ertiga/Innova)</td>
                <td>₹3,500 onwards</td>
              </tr>
              <tr>
                <td>Premium SUV (Crysta)</td>
                <td>₹4,500 onwards</td>
              </tr>
              <tr>
                <td>Luxury (Mercedes/BMW)</td>
                <td>₹6,000 onwards</td>
              </tr>
            </tbody>
          </table>

          <h2>Why Choose Our Pune-Mumbai Cab?</h2>
          <ul>
            <li>Flight tracking for airport pickups</li>
            <li>Real-time GPS location sharing</li>
            <li>Verified drivers with experience</li>
            <li>Transparent pricing with no hidden charges</li>
            <li>24×7 customer support</li>
          </ul>

          <h2>FAQ</h2>
          <h3>What is included in the fare?</h3>
          <p>
            The fare includes driver charges, fuel, tolls, and GST. No hidden
            charges.
          </p>

          <h3>Can I book for a specific time?</h3>
          <p>
            Yes, you can book for any time with advance booking available up to
            30 days.
          </p>

          <h3>Do you provide child seats?</h3>
          <p>Child seats are available on request for an additional charge.</p>
        </article>
      </div>
    </main>
  );
}
