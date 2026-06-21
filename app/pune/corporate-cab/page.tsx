export const metadata = {
  title: "Pune Corporate Cab Service | Monthly Billing & Employee Transport",
  description:
    "Book corporate cabs in Pune for employee transport and business travel. Monthly billing, GST invoices, and verified drivers for corporate accounts.",
  keywords:
    "Pune corporate cab, corporate travel Pune, employee transport, monthly cab billing, business travel Pune",
};

export default function PuneCorporateCabPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <article className="prose prose-invert max-w-4xl mx-auto">
          <h1>Pune Corporate Cab Service</h1>

          <p>
            Streamline your employee transportation with our corporate cab
            service in Pune. We provide dedicated monthly billing, GST invoices,
            and reliable transport for your team.
          </p>

          <h2>Corporate Travel Features</h2>
          <ul>
            <li>Monthly billing with consolidated invoicing</li>
            <li>GST compliant invoices for all bookings</li>
            <li>Dedicated account manager for support</li>
            <li>Flexible vehicle selection based on your needs</li>
            <li>Real-time tracking for all rides</li>
          </ul>

          <h2>Service Areas for Corporate</h2>
          <p>We serve all major corporate locations in Pune including:</p>
          <ul>
            <li>Hinjewadi (IT Park)</li>
            <li>Kharadi (Business District)</li>
            <li>Baner (Tech Hub)</li>
            <li>Hadapsar (Industrial Area)</li>
            <li>Magarpatta (Financial District)</li>
          </ul>

          <h2>Pricing for Corporate Accounts</h2>
          <ul>
            <li>Sedan: ₹1500 per day</li>
            <li>SUV: ₹2000 per day</li>
            <li>Premium SUV: ₹2500 per day</li>
            <li>Luxury: ₹4000 per day</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
