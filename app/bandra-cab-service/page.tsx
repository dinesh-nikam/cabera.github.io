export const metadata = {
  title: "Bandra Cab Service | Mumbai Premium Taxi Booking",
  description:
    "Book premium cabs in Bandra, Mumbai. Airport transfers, local travel, and outstation trips for BKC and surrounding areas.",
  keywords:
    "Bandra cab service, Bandra taxi, BKC cab, Mumbai premium taxi, airport transfer Bandra",
};

export default function BandraCabPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <article className="prose prose-invert max-w-4xl mx-auto">
          <h1>Cab Service in Bandra, Mumbai</h1>

          <p>
            Premium cab service in Bandra - serving Bandra Kurla Complex (BKC),
            Linking Road, and Carter Road areas. Perfect for corporate
            executives and luxury travelers.
          </p>

          <h2>Services in Bandra</h2>
          <ul>
            <li>Airport transfers (Mumbai Airport, 12 km)</li>
            <li>Bandra to South Mumbai (20 km)</li>
            <li>Bandra to Pune (150 km)</li>
            <li>Luxury vehicle options (Mercedes, BMW)</li>
            <li>Corporate travel for BKC offices</li>
          </ul>

          <h2>Luxury Vehicle Options</h2>
          <p>Available luxury vehicles in Bandra:</p>
          <ul>
            <li>Mercedes E-Class - ₹5,000 onwards</li>
            <li>BMW 5 Series - ₹4,500 onwards</li>
            <li>Audi A4 - ₹4,000 onwards</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
