export const metadata = {
  title: "Pune to Nashik Cab | Book Online at ₹3,000",
  description:
    "Book Pune to Nashik cab online. 200km journey via Ahmednagar with verified drivers and comfortable vehicles.",
  keywords:
    "Pune to Nashik cab, Nashik taxi, enroute temple tour, Trimbakeshwar cab, Shirdi via Nashik",
};

export default function PuneToNashikCabPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <article className="prose prose-invert max-w-4xl mx-auto">
          <h1>Pune to Nashik Cab Service</h1>

          <p>
            Travel comfortably from Pune to Nashik with our premium cab service.
            Perfect for visiting Trimbakeshwar Temple, Kalaram Temple, and other
            religious sites.
          </p>

          <h2>Route Details</h2>
          <ul>
            <li>Distance: 200 km</li>
            <li>Duration: 4 hours</li>
            <li>Route: Via Ahmednagar</li>
            <li>Stops: Shirdi, Yeola (optional)</li>
          </ul>

          <h2>Temples to Visit in Nashik</h2>
          <ul>
            <li>Trimbakeshwar Temple - One of the 12 Jyotirlingas</li>
            <li>Kalaram Temple - Dedicated to Lord Rama</li>
            <li>Shri Laxmi Narayan Temple</li>
            <li> Muktidham - Marble temple complex</li>
          </ul>

          <h2>Pricing</h2>
          <table>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sedan</td>
                <td>₹3,000</td>
              </tr>
              <tr>
                <td>SUV</td>
                <td>₹4,500</td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    </main>
  );
}
