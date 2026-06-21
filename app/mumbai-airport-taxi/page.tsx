export const metadata = {
  title:
    "Mumbai Airport Taxi | Cab Booking to/from Chhatrapati Shivaji Maharaj International Airport",
  description:
    "Book Mumbai Airport taxi for domestic and international terminals. 24x7 service with flight tracking and verified drivers.",
  keywords:
    "Mumbai airport taxi, airport cab Mumbai, CSMIA taxi, airport transfer",
};

export default function MumbaiAirportTaxiPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <article className="prose prose-invert max-w-4xl mx-auto">
          <h1>Mumbai Airport Taxi Service</h1>

          <p>
            Reliable taxi service to and from Chhatrapati Shivaji Maharaj
            International Airport (CSMIA). We track your flight for delays and
            provide punctual pickups.
          </p>

          <h2>Airport Terminals</h2>
          <ul>
            <li>Terminal 1 (Domestic)</li>
            <li>Terminal 2 (International)</li>
            <li>Terminal 2 (Domestic)</li>
          </ul>

          <h2>Airport Transfer Services</h2>
          <ul>
            <li>Flight delay tracking</li>
            <li>Meet and greet service</li>
            <li>Assistance with luggage</li>
            <li>Real-time driver updates</li>
          </ul>

          <h2>Pricing from Mumbai Airport</h2>
          <table>
            <thead>
              <tr>
                <th>Destination</th>
                <th>Vehicle Type</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Andheri</td>
                <td>Sedan</td>
                <td>₹600</td>
              </tr>
              <tr>
                <td>Bandra</td>
                <td>Sedan</td>
                <td>₹500</td>
              </tr>
              <tr>
                <td>Powai</td>
                <td>Sedan</td>
                <td>₹700</td>
              </tr>
              <tr>
                <td>Thane</td>
                <td>Sedan</td>
                <td>₹800</td>
              </tr>
              <tr>
                <td>Pune</td>
                <td>Sedan</td>
                <td>₹2,400</td>
              </tr>
            </tbody>
          </table>

          <h2>Why Choose Our Airport Taxi?</h2>
          <ul>
            <li>Flight tracking for on-time pickup</li>
            <li>Verified professional drivers</li>
            <li>GPS enabled clean vehicles</li>
            <li>24x7 availability</li>
            <li>Multiple payment options</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
