import { NextResponse } from "next/server";

import { getQuote } from "@/lib/hostaway";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      listingId: string;
      checkIn: string;
      checkOut: string;
      guests: number;
    };
    const quote = await getQuote(body);
    if (!quote) {
      return NextResponse.json({ error: "No quote available" }, { status: 404 });
    }
    return NextResponse.json(quote);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Quote error" },
      { status: 400 },
    );
  }
}
