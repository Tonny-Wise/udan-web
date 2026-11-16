import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
// @ts-ignore
import * as ExcelJS from "exceljs";
// @ts-ignore
import PDFDocument from "pdfkit";
// @ts-ignore
import Papa from "papaparse";

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const format = req.nextUrl.searchParams.get("format") || "csv"; // csv, excel, pdf
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch all registrations from the members table
    const { data: members, error } = await supabase
      .from("members")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch registrations" },
        { status: 500 }
      );
    }

    if (!members || members.length === 0) {
      return NextResponse.json(
        { error: "No registrations found" },
        { status: 404 }
      );
    }

    // Prepare data for export
    const exportData = members.map((m: any) => ({
      "Full Name": m.full_name || "",
      Email: m.email || "",
      Phone: m.phone || "",
      Gender: m.gender || "",
      Region: m.region || "",
      Country: m.country || "",
      Occupation: m.occupation || "",
      Company: m.company || "",
      "Agri Interests": m.agri_interests || "",
      "Membership Type": m.membership_type || "",
      "Registration Type": m.registration_type || "",
      Status: m.status || "",
      "Created At": m.created_at ? new Date(m.created_at).toLocaleDateString() : "",
    }));

    if (format === "csv") {
      return exportCSV(exportData);
    } else if (format === "excel") {
      return await exportExcel(exportData);
    } else if (format === "pdf") {
      return (await exportPDF(exportData)) as Response;
    }

    return NextResponse.json(
      { error: "Invalid format. Use: csv, excel, or pdf" },
      { status: 400 }
    );
  } catch (err) {
    console.error("Export error:", err);
    return NextResponse.json(
      { error: "Failed to export registrations" },
      { status: 500 }
    );
  }
}

function exportCSV(data: any[]) {
  const csv = Papa.unparse(data);
  const timestamp = new Date().toISOString().split("T")[0];

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="udan-registrations-${timestamp}.csv"`,
    },
  });
}

async function exportExcel(data: any[]) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Registrations");

  // Add headers
  const headers = Object.keys(data[0]);
  worksheet.addRow(headers);

  // Style header row
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF1b2238" },
  };

  // Add data rows
  data.forEach((row) => {
    worksheet.addRow(Object.values(row));
  });

  // Auto-fit columns
  worksheet.columns.forEach((column) => {
    let maxLength = 0;
    column.eachCell?.({ includeEmpty: true }, (cell) => {
      const cellLength = cell.value ? String(cell.value).length : 0;
      if (cellLength > maxLength) {
        maxLength = cellLength;
      }
    });
    column.width = Math.min(maxLength + 2, 50);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const timestamp = new Date().toISOString().split("T")[0];

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="udan-registrations-${timestamp}.xlsx"`,
    },
  });
}

function exportPDF(data: any[]): Promise<Response> {
  return new Promise((resolve) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
      bufferPages: true,
    });

    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => {
      const timestamp = new Date().toISOString().split("T")[0];
      resolve(
        new NextResponse(Buffer.concat(chunks), {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="udan-registrations-${timestamp}.pdf"`,
          },
        })
      );
    });

    // Title
    doc.fontSize(16).font("Helvetica-Bold").text("UDAN Registrations Report", {
      align: "center",
    });
    doc.fontSize(10).fillColor("#666").text(
      `Generated: ${new Date().toLocaleDateString()}`,
      { align: "center" }
    );
    doc.moveDown();

    // Summary
    doc
      .fontSize(10)
      .fillColor("#000")
      .text(`Total Registrations: ${data.length}`, { align: "left" });
    doc.moveDown();

    // Table header
    const headers = Object.keys(data[0]);
    const columnWidth = 540 / headers.length;
    let y = doc.y;

    doc.rect(40, y, 540, 20).fillAndStroke("#1b2238", "#1b2238");
    doc.fillColor("white").fontSize(9).font("Helvetica-Bold");

    headers.forEach((header, i) => {
      doc.text(header, 40 + i * columnWidth + 5, y + 5, {
        width: columnWidth - 10,
        height: 15,
        align: "left",
      });
    });

    y += 25;
    doc.fillColor("black").fontSize(8).font("Helvetica");

    // Table rows (limit to 50 rows per page)
    data.slice(0, 50).forEach((row, idx) => {
      if (y > 700) {
        doc.addPage();
        y = 40;
      }

      headers.forEach((header, i) => {
        const value = String(row[header] || "").substring(0, 20);
        doc.text(value, 40 + i * columnWidth + 5, y, {
          width: columnWidth - 10,
          height: 15,
          align: "left",
        });
      });

      if (idx % 2 === 0) {
        doc.rect(40, y - 5, 540, 15).stroke("#ddd");
      }
      y += 18;
    });

    // Footer
    doc.fontSize(8).fillColor("#999").text(
      `Page 1 of 1 | Total Records: ${data.length}`,
      40,
      750,
      { align: "center" }
    );

    doc.end();
  });
}
