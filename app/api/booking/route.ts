import { NextResponse } from "next/server";

import { createReservation, getQuote } from "@/lib/hostaway";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Parameters<
      typeof createReservation
    >[0];
    const reservation = await createReservation(body);

    const quote = await getQuote({
      listingId: body.listingId,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      guests: body.guests.adults + body.guests.children,
    });

    let clientSecret: string | null = null;
    if (process.env.STRIPE_SECRET_KEY && quote) {
      try {
        const Stripe = (await import("stripe")).default;
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const intent = await stripe.paymentIntents.create({
          amount: Math.round(quote.total * (quote.currency === "INR" ? 100 : 100)),
          currency: quote.currency.toLowerCase(),
          metadata: { reservationId: reservation.reservationId },
        });
        clientSecret = intent.client_secret;
      } catch {
        clientSecret = null;
      }
    }

    return NextResponse.json({
      reservationId: reservation.reservationId,
      status: reservation.status,
      source: reservation.source,
      clientSecret,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Booking error" },
      { status: 502 },
    );
  }
}
