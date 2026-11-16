import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string;
    const email = formData.get("email") as string;

    if (!file || !type || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Create upload path
    const timestamp = new Date().getTime();
    const sanitizedEmail = email.replace(/[^a-z0-9]/g, "_");
    const filePath = `diaspora-forms/${sanitizedEmail}/${type}_${timestamp}_${file.name}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from("diaspora-forms")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("diaspora-forms").getPublicUrl(filePath);

    return NextResponse.json({ filePath: publicUrl });
  } catch (err) {
    console.error("File upload API error:", err);
    return NextResponse.json({ error: "Failed to process upload" }, { status: 500 });
  }
}
