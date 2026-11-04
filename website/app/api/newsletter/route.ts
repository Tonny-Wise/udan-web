import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Insert into Supabase newsletter_subscribers
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email }]);

    // Only log DB errors, don't fail if table doesn't exist yet
    if (dbError && !dbError.message.includes("does not exist")) {
      console.error("Database error:", dbError);
    }

    // Send confirmation email only if Resend is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? "noreply@udandiaspora.org",
          to: email,
          subject: "Thanks for subscribing to UDAN Diaspora updates!",
          html: "<h2>You are subscribed!</h2><p>Thank you for subscribing to UDAN Diaspora. You will receive updates about our programs, events, and community news.</p>",
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
