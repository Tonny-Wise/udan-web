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

    // Prepare comprehensive data for export - organized by section with ALL 88+ fields
    const exportData = members.map((m: any) => ({
      // Metadata & Basic Info
      "ID": m.id || "",
      "Full Name": m.full_name || "",
      "Surname": m.surname || "",
      "Email": m.email || "",
      "Phone": m.phone || "",
      "Status": m.status || "",
      "Registration Type": m.registration_type || "",
      "Membership Type": m.membership_type || "",
      "Created At": m.created_at ? new Date(m.created_at).toLocaleDateString() : "",

      // === SECTION A: PERSONAL INFORMATION (14 fields) ===
      "A.1 Full Name": m.full_name || "",
      "A.2 Surname": m.surname || "",
      "A.3 Date of Birth": m.date_of_birth || "",
      "A.4 Gender": m.gender || "",
      "A.5 Address": m.address || "",
      "A.6 Email": m.email || "",
      "A.7 Telephone": m.phone || "",
      "A.8 Country": m.country || "",
      "A.9 Home District": m.home_district || "",
      "A.10 Diaspora Association": m.diaspora_association || "",
      "A.11 In Diaspora Network": m.diaspora_network ? "Yes" : "No",
      "A.12 Diaspora Network Name": m.diaspora_network_name || "",
      "A.13 In Agribusiness Network": m.agribusiness_network ? "Yes" : "No",
      "A.14 Agribusiness Network Name": m.agribusiness_network_name || "",

      // === SECTION B: EDUCATION (2 fields) ===
      "B.1 Education Level": m.education_level || "",
      "B.2 Agriculture Training": m.agriculture_training || "",

      // === SECTION C: EXPERTISE (10 fields) ===
      "C.1 Crop Production": m.expertise_crop ? "Yes" : "No",
      "C.2 Livestock": m.expertise_livestock ? "Yes" : "No",
      "C.3 Aquaculture": m.expertise_aquaculture ? "Yes" : "No",
      "C.4 Horticulture": m.expertise_horticulture ? "Yes" : "No",
      "C.5 Forestry": m.expertise_forestry ? "Yes" : "No",
      "C.6 Services": m.expertise_services ? "Yes" : "No",
      "C.7 Services Specify": m.expertise_services_specify || "",
      "C.8 Other": m.expertise_other ? "Yes" : "No",
      "C.9 Other Specify": m.expertise_other_specify || "",
      "C.10 Crop Commodity": m.crop_commodity || "",

      // === SECTION D: BUSINESS DESCRIPTION (24 fields) ===
      "D.1 Has Business": m.has_business ? "Yes" : "No",
      "D.2 Business Name": m.business_name || "",
      "D.3 Business Registration": m.business_registration || "",
      "D.4 Business Location Type": m.business_location_type || "",
      "D.5 Enterprise Type - Crop": m.enterprise_type_crop ? "Yes" : "No",
      "D.6 Enterprise Type - Livestock": m.enterprise_type_livestock ? "Yes" : "No",
      "D.7 Enterprise Type - Fish": m.enterprise_type_fish ? "Yes" : "No",
      "D.8 Enterprise Type - Forestry": m.enterprise_type_forestry ? "Yes" : "No",
      "D.9 Enterprise Type - Tech": m.enterprise_type_tech ? "Yes" : "No",
      "D.10 Enterprise Type - Other": m.enterprise_type_other ? "Yes" : "No",
      "D.11 Enterprise Type - Other Specify": m.enterprise_type_other_specify || "",
      "D.12 Value Chain - Production": m.value_chain_production ? "Yes" : "No",
      "D.13 Value Chain - Aggregation": m.value_chain_aggregation ? "Yes" : "No",
      "D.14 Value Chain - Processing": m.value_chain_processing ? "Yes" : "No",
      "D.15 Value Chain - Distribution": m.value_chain_distribution ? "Yes" : "No",
      "D.16 Value Chain - Inputs": m.value_chain_inputs ? "Yes" : "No",
      "D.17 Value Chain - Services": m.value_chain_services ? "Yes" : "No",
      "D.18 Value Chain - Services Specify": m.value_chain_services_specify || "",
      "D.19 Role - Owner/CEO": m.role_owner ? "Yes" : "No",
      "D.20 Role - Financier": m.role_financier ? "Yes" : "No",
      "D.21 Role - Permanent Employee": m.role_permanent ? "Yes" : "No",
      "D.22 Role - Temporary Employee": m.role_temporary ? "Yes" : "No",
      "D.23 Role - Cooperative Member": m.role_cooperative ? "Yes" : "No",
      "D.24 Years Experience": m.years_experience || "",

      // === SECTION E: BUSINESS & OPERATING MODEL (5 fields) ===
      "E.1 Business Description": m.business_description || "",
      "E.2 Target Customers": m.target_customers || "",
      "E.3 Major Suppliers": m.major_suppliers || "",
      "E.4 Partners": m.partners || "",
      "E.5 Target Market": m.target_market || "",

      // === SECTION F: STRATEGY (2 fields) ===
      "F.1 Has Business Plan": m.has_business_plan ? "Yes" : "No",
      "F.2 Growth Plans": m.growth_plans || "",

      // === SECTION G: MOTIVATING AREAS OF INTEREST (20 fields) ===
      "G.1 Join Network": m.join_network ? "Yes" : "No",
      "G.2 Network Expectations": m.network_expectations || "",
      "G.3 Willing to Invest": m.willing_invest ? "Yes" : "No",
      "G.4 Invest - Crop": m.invest_subsector_crop ? "Yes" : "No",
      "G.5 Invest - Livestock": m.invest_subsector_livestock ? "Yes" : "No",
      "G.6 Invest - Fish": m.invest_subsector_fish ? "Yes" : "No",
      "G.7 Invest - Forestry": m.invest_subsector_forestry ? "Yes" : "No",
      "G.8 Invest - Tech": m.invest_subsector_tech ? "Yes" : "No",
      "G.9 Interest in Collaboration": m.interest_collaboration ? "Yes" : "No",
      "G.10 Collab - Suppliers": m.collab_suppliers ? "Yes" : "No",
      "G.11 Collab - Customers": m.collab_customers ? "Yes" : "No",
      "G.12 Collab - Youth Monitoring": m.collab_youth_monitoring ? "Yes" : "No",
      "G.13 Collab - Community Investment": m.collab_community_investment ? "Yes" : "No",
      "G.14 Collab - Mentorship": m.collab_mentorship ? "Yes" : "No",
      "G.15 Willing to Mentor": m.willing_mentor ? "Yes" : "No",
      "G.16 Mentor Subsector": m.mentor_subsector || "",
      "G.17 Mentor - Crop Production": m.mentor_engagement_crop ? "Yes" : "No",
      "G.18 Mentor - Processing": m.mentor_engagement_processing ? "Yes" : "No",
      "G.19 Mentor - Management": m.mentor_engagement_management ? "Yes" : "No",
      "G.20 Mentor - Market": m.mentor_engagement_market ? "Yes" : "No",

      // === SECTION H: MENTORSHIP (7 fields) ===
      "H.1 Mentor - Staff": m.mentor_engagement_staff ? "Yes" : "No",
      "H.2 Mentor - Technology": m.mentor_engagement_tech ? "Yes" : "No",
      "H.3 Past Mentorship": m.past_mentorship ? "Yes" : "No",
      "H.4 Mentorship Hours": m.mentorship_hours || "",
      "H.5 Mentorship Frequency": m.mentorship_frequency || "",
      "H.6 Permanent Employees": m.employees_permanent || 0,
      "H.7 Temporary Employees": m.employees_temporary || 0,

      // === SECTION I: FILES & LINKS (4 fields) ===
      "I.1 Business Plan File URL": m.business_plan_file || "",
      "I.2 Other Documents": m.other_documents || "",
      "I.3 Useful Links": m.useful_links || "",
      "I.4 Website URL": m.website_url || "",

      // Legacy fields for backward compatibility
      "Legacy - Region": m.region || "",
      "Legacy - Occupation": m.occupation || "",
      "Legacy - Company": m.company || "",
      "Legacy - Agri Interests": m.agri_interests || "",
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
