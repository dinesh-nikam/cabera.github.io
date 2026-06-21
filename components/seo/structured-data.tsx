export default function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Schema generators for different page types
export const schemas = {
  localBusiness: (props: {
    name: string;
    description: string;
    address: string;
    phone: string;
    areaServed: string[];
  }) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: props.name,
    description: props.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: props.address,
    },
    telephone: props.phone,
    areaServed: props.areaServed,
    availableLanguage: ["English", "Marathi", "Hindi"],
  }),

  service: (props: {
    name: string;
    description: string;
    areaServed: string[];
    offers: { price: number; priceCurrency: string };
  }) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: props.name,
    description: props.description,
    serviceArea: props.areaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    offers: {
      "@type": "Offer",
      price: props.offers.price,
      priceCurrency: props.offers.priceCurrency,
    },
  }),

  faq: (faqs: Array<{ question: string; answer: string }>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }),

  review: (
    reviews: Array<{ author: string; rating: number; reviewBody: string }>,
  ) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody: reviews.map((r) => r.reviewBody).join(" "),
    reviewRating: {
      "@type": "Rating",
      ratingValue:
        reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length,
    },
  }),
};
