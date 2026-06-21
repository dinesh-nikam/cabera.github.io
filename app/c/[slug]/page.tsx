import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const seoPage = await prisma.seoPage.findUnique({ where: { slug } });

  return {
    title:
      seoPage?.metaTitle ||
      `${slug.charAt(0).toUpperCase() + slug.slice(1)} Cab Service`,
    description: seoPage?.metaDesc || `Book premium cabs in ${slug}`,
    alternates: {
      canonical: `https://punemumbaicab.com/c/${slug}`,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const seoPage = await prisma.seoPage.findUnique({ where: { slug } });

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <article className="prose prose-invert max-w-4xl mx-auto">
          {seoPage?.content ? (
            <div dangerouslySetInnerHTML={{ __html: seoPage.content }} />
          ) : (
            <>
              <h1>
                {slug.charAt(0).toUpperCase() + slug.slice(1)} Cab Service
              </h1>
              <p>Premium cab booking service in {slug}.</p>
            </>
          )}
        </article>
      </div>
    </main>
  );
}
