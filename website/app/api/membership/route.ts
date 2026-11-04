import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
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

    const roleLabel = registrationType === "buyer" ? "Buyer" : "Seller";

    // Send confirmation email
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "noreply@udandiaspora.org",
      to: email,
      subject: `Welcome to UDAN Diaspora - Registered as ${roleLabel}!`,
      html: `
        <h2>Welcome, ${name}!</h2>
        <p>Thank you for registering with UDAN Diaspora as a <strong>${roleLabel}</strong>.</p>
        <p><strong>Registration Details:</strong></p>
        <ul>
          <li>Role: ${roleLabel}</li>
          <li>Email: ${email}</li>
          <li>Membership Type: ${membershipType}</li>
          <li>Primary Interest: ${agriInterests}</li>
        </ul>
        <p>Your registration is pending approval. We will contact you shortly to confirm your membership status.</p>
        <p>Best regards,<br/>UDAN Diaspora Team</p>
      `,
    });

    // Send admin notification
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "noreply@udandiaspora.org",
      to: process.env.RESEND_TO_EMAIL ?? "contact@udandiaspora.org",
      subject: `New Registration: ${name} (${roleLabel})`,
      html: `
        <h3>New Member Registration</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Registration Type:</strong> ${roleLabel}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Occupation:</strong> ${occupation || "Not provided"}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Agribusiness Interests:</strong> ${agriInterests}</p>
        <p><strong>Membership Type:</strong> ${membershipType}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Membership API error:", err);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}
