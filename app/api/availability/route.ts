import { NextResponse } from "next/server";

import { getListingAvailability } from "@/lib/hostaway";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const listingId = url.searchParams.get("listingId");
  const checkIn = url.searchParams.get("checkIn");
  const checkOut = url.searchParams.get("checkOut");
  if (!listingId || !checkIn || !checkOut) {
    return NextResponse.json(
      { error: "listingId, checkIn and checkOut are required" },
      { status: 400 },
    );
  }
  try {
    const data = await getListingAvailability(listingId, checkIn, checkOut);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Availability error" },
      { status: 502 },
    );
  }
}
