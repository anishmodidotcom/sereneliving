import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: {
    name: string;
    email: string;
    topic: string;
    message: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Name, email and message are required" },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.info("Contact form submission (no Resend key)", body);
    return NextResponse.json({ ok: true, source: "mock" });
  }

  try {
    const Resend = (await import("resend")).Resend;
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Serene Living <stays@serenelivingdxb.com>",
      to: ["stays@serenelivingdxb.com"],
      replyTo: body.email,
      subject: `Site, ${body.topic}, from ${body.name}`,
      text: `${body.message}\n\nFrom ${body.name} <${body.email}>`,
    });
    return NextResponse.json({ ok: true, source: "resend" });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Send failed" },
      { status: 502 },
    );
  }
}
