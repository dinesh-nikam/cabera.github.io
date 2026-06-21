export const metadata = {
  title: "Hinjewadi Cab Service | Pune IT Hub Taxi Booking",
  description:
    "Book cabs in Hinjewadi, Pune. Airport transfers, local travel, and corporate cab service for IT professionals.",
  keywords:
    "Hinjewadi cab service, Hinjewadi taxi, Pune IT Park cab, airport transfer Hinjewadi",
};

export default function HinjewadiCabPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <article className="prose prose-invert max-w-4xl mx-auto">
          <h1>Cab Service in Hinjewadi, Pune</h1>

          <p>
            Premium cab service in Hinjewadi - the IT hub of Pune. We provide
            reliable transportation for IT professionals working in Infosys,
            Wipro, TCS, and other tech companies.
          </p>

          <h2>Services Available in Hinjewadi</h2>
          <ul>
            <li>Airport transfers (Pune & Mumbai)</li>
            <li>Local cab bookings within Hinjewadi</li>
            <li>Commute to/from Wakad, Baner, Balewadi</li>
            <li>Outstation trips to Mumbai, Shirdi, Mahabaleshwar</li>
            <li>Corporate travel for IT companies</li>
          </ul>

          <h2>Popular Routes from Hinjewadi</h2>
          <table>
            <thead>
              <tr>
                <th>Destination</th>
                <th>Distance</th>
                <th>Price (Sedan)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mumbai Airport</td>
                <td>25 km</td>
                <td>₹800</td>
              </tr>
              <tr>
                <td>Pune Airport</td>
                <td>15 km</td>
                <td>₹400</td>
              </tr>
              <tr>
                <td>Mumbai City</td>
                <td>140 km</td>
                <td>₹2,200</td>
              </tr>
              <tr>
                <td>Shirdi</td>
                <td>135 km</td>
                <td>₹2,200</td>
              </tr>
            </tbody>
          </table>

          <h2>IT Companies Served</h2>
          <p>
            We regularly serve employees from major IT companies in Hinjewadi:
          </p>
          <ul>
            <li>Infosys</li>
            <li>Wipro</li>
            <li>TCS</li>
            <li>Tech Mahindra</li>
            <li>Accenture</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
