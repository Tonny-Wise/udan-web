import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { membershipAdminEmail, membershipConfirmEmail } from "@/lib/emailTemplate";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const {
      name,
      email,
      phone,
      gender,
      region,
      country,
      occupation,
      company,
      agriInterests,
      membershipType,
      registrationType,
      isDiaspora,
    } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
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

    // Save to Supabase
    const { error: dbError } = await supabase.from("members").insert({
      full_name: name,
      email,
      phone: phone || null,
      gender: gender || null,
      region: region || null,
      country: country || null,
      occupation: occupation || null,
      company: company || null,
      agri_interests: agriInterests,
      membership_type: membershipType,
      registration_type: registrationType,
      status: "pending",
    });

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save registration. Please try again." },
        { status: 500 }
      );
    }

    // Send emails if Resend is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        const roleLabel =
          registrationType === "buyer" ? "Buyer"
          : registrationType === "seller" ? "Seller"
          : registrationType || "Member";

        const emailData = {
          name, email, phone, gender, region, country,
          occupation, company, agriInterests, membershipType,
          registrationType, roleLabel, isDiaspora,
        };

        // Confirmation to applicant
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? "noreply@udandiaspora.org",
          to: email,
          subject: `Welcome to UDAN - Registered as ${roleLabel}`,
          html: membershipConfirmEmail(emailData),
        });

        // Admin notification
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? "noreply@udandiaspora.org",
          to: process.env.RESEND_TO_EMAIL ?? "info@udandiaspora.org",
          subject: `New Registration: ${name} (${roleLabel})`,
          html: membershipAdminEmail(emailData),
        });
      } catch (emailErr) {
        console.error("Email sending failed (registration still saved):", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Membership API error:", err);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}
