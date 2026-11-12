import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { newsletterConfirmEmail, newsletterAdminEmail } from "@/lib/emailTemplate";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Insert into Supabase
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email }]);

    if (dbError && !dbError.message.includes("does not exist")) {
      console.error("Database error:", dbError);
    }

    // Send emails if Resend is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Confirmation to subscriber
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? "noreply@udandiaspora.org",
          to: email,
          subject: "You're subscribed to UDAN Diaspora updates!",
          html: newsletterConfirmEmail(email),
        });

        // Admin notification
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? "noreply@udandiaspora.org",
          to: process.env.RESEND_TO_EMAIL ?? "info@udandiaspora.org",
          subject: `New Newsletter Subscriber: ${email}`,
          html: newsletterAdminEmail(email),
        });
      } catch (emailErr) {
        console.error("Newsletter email failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
