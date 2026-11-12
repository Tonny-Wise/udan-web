import { NextRequest, NextResponse } from "next/server";
import { contactAdminEmail } from "@/lib/emailTemplate";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? "noreply@udandiaspora.org",
          to: process.env.RESEND_TO_EMAIL ?? "info@udandiaspora.org",
          reply_to: email,
          subject: `Contact Form: ${subject ?? "(no subject)"} - from ${name}`,
          html: contactAdminEmail({ name, email, subject, message }),
        });
      } catch (emailErr) {
        console.error("Contact email failed:", emailErr);
      }
    } else {
      console.log(`Contact form submission from ${name} <${email}>: ${message}`);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
