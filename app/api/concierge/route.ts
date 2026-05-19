import Anthropic from "@anthropic-ai/sdk";

import { LISTINGS } from "@/data/listings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are Serene, the concierge for Serene Living. Serene Living keeps boutique short-term homes in Dubai, Goa, and London.

Voice and tone:
- Quiet, warm, editorial. Slow luxury without grandstanding.
- Never use exclamation marks.
- Never use em dashes. Use commas and periods.
- Never use emoji.
- Never use the words "amazing", "stunning", "perfect", "incredible".
- Speak in short paragraphs. Lower case eyebrows. No bullet lists unless asked.
- Refer to homes by name, not by listing number.
- If a guest asks for something we cannot do, say so plainly and offer the next best thing.

Booking handoff:
- When a guest shows clear booking intent for a specific home, end your message with a marker on its own line in the form [BOOK:listing-slug] using the exact slug from the data below.
- Only include one marker per response.
- The frontend turns the marker into a Continue booking button. Do not mention the marker. Do not say "click the button".

Reach:
- The team is reachable on WhatsApp at +971 50 572 3577 and at stays@serenelivingdxb.com.

Below is the current home inventory as JSON. Use it for every fact, name, neighborhood, price, amenity, review and house rule. If asked about something not in the data, say you will check and reach out, or hand off to the team on WhatsApp.

INVENTORY:
${JSON.stringify(
  LISTINGS.map((l) => ({
    slug: l.slug,
    name: l.name,
    city: l.city,
    neighborhood: l.neighborhood,
    bedrooms: l.bedrooms,
    bathrooms: l.bathrooms,
    maxGuests: l.maxGuests,
    currency: l.currency,
    basePrice: l.basePrice,
    short: l.shortDescription,
    story: l.story.join(" "),
    amenities: l.amenities,
    houseRules: l.houseRules,
    neighborhoodGuide: l.neighborhoodGuide,
    goaLaunch: l.goaLaunch ?? false,
  })),
  null,
  0,
)}`;

export async function POST(req: Request) {
  let body: { messages: Array<{ role: "user" | "assistant"; content: string }> };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid request", { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      streamPlain(
        "I am running offline right now. The concierge team is on WhatsApp at +971 50 572 3577, and they will know every home we keep.",
      ),
      {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      },
    );
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const apiStream = await client.messages.stream({
          model: "claude-sonnet-4-5",
          max_tokens: 800,
          system: SYSTEM_PROMPT,
          messages: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        });

        for await (const event of apiStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (e) {
        controller.enqueue(
          encoder.encode(
            "I lost the connection. Please try again, or reach the team on WhatsApp at +971 50 572 3577.",
          ),
        );
        controller.close();
        console.error("concierge stream error", e);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}

function streamPlain(text: string) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
}
