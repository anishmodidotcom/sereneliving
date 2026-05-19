import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LISTINGS, getListing } from "@/data/listings";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { ListingHero, ListingMeta } from "@/components/listing/listing-hero";
import { ListingStory } from "@/components/listing/listing-story";
import { ListingGallery } from "@/components/listing/listing-gallery";
import { AmenitiesList } from "@/components/listing/amenities-list";
import { NeighborhoodGuide } from "@/components/listing/neighborhood-guide";
import { ReviewsBlock } from "@/components/listing/reviews-block";
import { HouseNotes } from "@/components/listing/house-notes";
import { StickyBookingCard } from "@/components/listing/sticky-booking-card";

export async function generateStaticParams() {
  return LISTINGS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) return {};
  return {
    title: listing.name,
    description: listing.shortDescription,
    openGraph: {
      title: listing.name,
      description: listing.shortDescription,
      images: [{ url: listing.heroImage }],
    },
  };
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();

  return (
    <>
      <Nav tone="auto" />
      <main id="main" className="pb-24 md:pb-0">
        <ListingHero listing={listing} />
        <ListingMeta listing={listing} />

        <Container>
          <div className="grid gap-12 py-0 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-8">
              <ListingStory paragraphs={listing.story} />
            </div>
            <div className="md:col-span-4 md:py-24">
              <StickyBookingCard listing={listing} />
            </div>
          </div>
        </Container>

        <ListingGallery images={listing.gallery} alt={listing.name} />
        <AmenitiesList amenities={listing.amenities} />
        <NeighborhoodGuide listing={listing} />
        <ReviewsBlock reviews={listing.reviews} />
        <HouseNotes listing={listing} />
      </main>
      <Footer />
    </>
  );
}
