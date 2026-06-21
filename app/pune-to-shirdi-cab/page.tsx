export const metadata = {
  title: "Pune to Shirdi Cab | Sai Baba Temple Trip",
  description:
    "Book Pune to Shirdi cab for Sai Baba Temple darshan. 120km journey with verified drivers and comfortable vehicles.",
  keywords:
    "Pune to Shirdi cab, Shirdi taxi, Sai Baba temple cab, pilgrimage travel Pune",
};

export default function PuneToShirdiCabPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <article className="prose prose-invert max-w-4xl mx-auto">
          <h1>Pune to Shirdi Cab Service</h1>

          <p>
            Comfortable cab service from Pune to Shirdi for your pilgrimage to
            Sai Baba Temple. Travel in clean, air-conditioned vehicles with
            experienced drivers.
          </p>

          <h2>Route Details</h2>
          <ul>
            <li>Distance: 120 km</li>
            <li>Duration: 2.5 hours</li>
            <li>Route: Via Ahmednagar</li>
            <li>Stops: Optional at Nashik (add-on)</li>
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
                <td>₹2,000</td>
              </tr>
              <tr>
                <td>SUV</td>
                <td>₹2,500</td>
              </tr>
              <tr>
                <td>Premium SUV</td>
                <td>₹3,500</td>
              </tr>
            </tbody>
          </table>

          <h2>Temple Timing</h2>
          <p>Shirdi Sai Baba Temple is open:</p>
          <ul>
            <li>Morning: 5:00 AM - 12:00 PM</li>
            <li>Evening: 4:00 PM - 10:00 PM</li>
            <li>Special pujas on Thursdays and Sundays</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
