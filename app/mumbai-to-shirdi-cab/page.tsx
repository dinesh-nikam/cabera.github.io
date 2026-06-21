export const metadata = {
  title: "Mumbai to Shirdi Cab | Book Online at ₹3,500",
  description:
    "Book Mumbai to Shirdi cab online. 250km journey to Sai Baba Temple with verified drivers and comfortable vehicles.",
  keywords:
    "Mumbai to Shirdi cab, Shirdi taxi, Sai Baba temple cab, pilgrimage travel",
};

export default function MumbaiToShirdiCabPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <article className="prose prose-invert max-w-4xl mx-auto">
          <h1>Mumbai to Shirdi Cab Service</h1>

          <p>
            Comfortable cab service from Mumbai to Shirdi for your pilgrimage to
            Sai Baba Temple. Travel in clean, air-conditioned vehicles with
            experienced drivers.
          </p>

          <h2>Route Details</h2>
          <ul>
            <li>Distance: 250 km</li>
            <li>Duration: 5-6 hours</li>
            <li>Route: Eastern Express Highway via Igatpuri</li>
            <li>Stops: Nashik, Igatpuri (optional)</li>
          </ul>

          <h2>Pricing</h2>
          <table>
            <thead>
              <tr>
                <th>Vehicle Type</th>
                <th>Price</th>
                <th>Capacity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sedan (Dzire/Etios)</td>
                <td>₹3,500</td>
                <td>4 passengers</td>
              </tr>
              <tr>
                <td>SUV (Ertiga/Innova)</td>
                <td>₹4,500</td>
                <td>7 passengers</td>
              </tr>
              <tr>
                <td>Premium SUV (Crysta)</td>
                <td>₹5,500</td>
                <td>8 passengers</td>
              </tr>
            </tbody>
          </table>

          <h2>Places to Visit in Shirdi</h2>
          <ul>
            <li>Sai Baba Temple</li>
            <li>Shirdi Saibaba Museum</li>
            <li>Dwarkamai</li>
            <li>Chavadi</li>
            <li>Abhishek Mandap</li>
          </ul>

          <h2>Important Information</h2>
          <ul>
            <li>Temple timing: 5 AM to 10 PM</li>
            <li>Recommended arrival: 2 hours before darshan</li>
            <li>Free parking available at temple</li>
            <li>Devotional music in vehicles on request</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
