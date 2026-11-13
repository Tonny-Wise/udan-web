const LOGO_URL = "https://akcpppgfytrztkpyysvg.supabase.co/storage/v1/object/public/logos/278134-removebg-preview.png";
const SITE_URL = "https://udandiaspora.org";

function base(formTitle: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${formTitle} | UDAN</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#131c33;padding:28px 32px;text-align:center;">
              <img src="${LOGO_URL}" alt="UDAN" width="72" height="72" style="display:block;margin:0 auto 12px;object-fit:contain;" />
              <p style="margin:0;color:#c6ac62;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Uganda Diaspora in Agribusiness Network</p>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:20px;font-weight:700;line-height:1.3;">${formTitle}</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 32px;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#64748b;">Uganda Diaspora in Agribusiness Network (UDAN)</p>
              <p style="margin:0 0 4px;font-size:12px;color:#64748b;">Kampala, Uganda &nbsp;|&nbsp; <a href="mailto:udan.ug.org@gmail.com" style="color:#1377a4;text-decoration:none;">udan.ug.org@gmail.com</a></p>
              <p style="margin:8px 0 0;font-size:11px;color:#94a3b8;"><a href="${SITE_URL}" style="color:#94a3b8;">udandiaspora.org</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 0;font-size:13px;color:#64748b;width:160px;vertical-align:top;font-weight:600;">${label}</td>
    <td style="padding:6px 0;font-size:13px;color:#1b2238;vertical-align:top;">${value || "-"}</td>
  </tr>`;
}

function table(rows: string): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:12px;">${rows}</table>`;
}

function heading(text: string): string {
  return `<h2 style="margin:0 0 16px;font-size:18px;font-weight:700;color:#1b2238;">${text}</h2>`;
}

function para(text: string): string {
  return `<p style="margin:0 0 12px;font-size:14px;color:#374151;line-height:1.6;">${text}</p>`;
}

function divider(): string {
  return `<hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />`;
}

function badge(text: string, color = "#1377a4"): string {
  return `<span style="display:inline-block;padding:3px 10px;background:${color}22;color:${color};border-radius:20px;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">${text}</span>`;
}

// Contact Form
export function contactAdminEmail(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): string {
  const body = `
    ${heading("New Contact Form Submission")}
    ${badge("Contact Form", "#1377a4")}
    ${divider()}
    ${table([
      row("Name", data.name),
      row("Email", `<a href="mailto:${data.email}" style="color:#1377a4;">${data.email}</a>`),
      row("Subject", data.subject || "(no subject)"),
    ].join(""))}
    ${divider()}
    <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#64748b;">Message</p>
    <div style="background:#f8fafc;border-left:3px solid #1377a4;padding:12px 16px;border-radius:0 6px 6px 0;font-size:13px;color:#374151;line-height:1.6;">
      ${data.message.replace(/\n/g, "<br/>")}
    </div>
    ${divider()}
    ${para(`Reply directly to this email to respond to <strong>${data.name}</strong>.`)}
  `;
  return base("Contact Form - UDAN Website", body);
}

// Membership - Admin notification
export function membershipAdminEmail(data: {
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  region?: string;
  country?: string;
  occupation?: string;
  company?: string;
  agriInterests?: string;
  membershipType?: string;
  registrationType?: string;
  roleLabel: string;
  isDiaspora?: string;
}): string {
  const body = `
    ${heading("New Membership Registration")}
    ${badge("Membership Form", "#63b849")}
    ${divider()}
    ${table([
      row("Full Name", data.name),
      row("Email", `<a href="mailto:${data.email}" style="color:#1377a4;">${data.email}</a>`),
      row("Phone", data.phone || "Not provided"),
      row("Role", data.roleLabel),
      row("Diaspora Member", data.isDiaspora === "yes" ? "Yes" : data.isDiaspora === "no" ? "No (Based in Uganda)" : (data.isDiaspora || "Not specified")),
      row("Gender", data.gender || "Not provided"),
      row("Region", data.region || "Not provided"),
      row("Country", data.country || "Not provided"),
      row("Occupation", data.occupation || "Not provided"),
      row("Company", data.company || "Not provided"),
      row("Agri Interests", data.agriInterests || "Not provided"),
      row("Membership Type", data.membershipType || "Not provided"),
    ].join(""))}
    ${divider()}
    ${para("Log in to the <strong>UDAN Admin Portal</strong> to review and approve this registration.")}
  `;
  return base("New Membership Registration - UDAN", body);
}

// Membership - Confirmation to applicant
export function membershipConfirmEmail(data: {
  name: string;
  email: string;
  roleLabel: string;
  membershipType?: string;
  agriInterests?: string;
}): string {
  const body = `
    ${heading(`Welcome to UDAN, ${data.name}!`)}
    ${para(`Thank you for registering with the <strong>Uganda Diaspora in Agribusiness Network (UDAN)</strong> as a <strong>${data.roleLabel}</strong>.`)}
    ${divider()}
    ${table([
      row("Name", data.name),
      row("Email", data.email),
      row("Role", data.roleLabel),
      row("Membership Type", data.membershipType || "Not provided"),
      row("Primary Interest", data.agriInterests || "Not provided"),
    ].join(""))}
    ${divider()}
    <div style="background:#f0f9ed;border-left:3px solid #63b849;padding:12px 16px;border-radius:0 6px 6px 0;font-size:13px;color:#374151;line-height:1.6;">
      Your registration is <strong>pending review</strong>. The UDAN Secretariat will reach out to confirm your membership status.
    </div>
    ${divider()}
    ${para(`In the meantime, explore our programs at <a href="${SITE_URL}/programs" style="color:#1377a4;">udandiaspora.org/programs</a>.`)}
  `;
  return base("Membership Registration Confirmed - UDAN", body);
}

// Newsletter
export function newsletterConfirmEmail(email: string): string {
  const body = `
    ${heading("You're subscribed!")}
    ${badge("Newsletter", "#c6ac62")}
    ${divider()}
    ${para(`<strong>${email}</strong> has been added to the UDAN Diaspora newsletter.`)}
    ${para("You will receive updates on our programs, events, conference highlights, and diaspora agribusiness news.")}
    ${divider()}
    ${para(`Visit us at <a href="${SITE_URL}" style="color:#1377a4;">udandiaspora.org</a> to explore our programs and upcoming events.`)}
  `;
  return base("Newsletter Subscription Confirmed - UDAN", body);
}

// Newsletter - Admin notification
export function newsletterAdminEmail(email: string): string {
  const body = `
    ${heading("New Newsletter Subscriber")}
    ${badge("Newsletter Form", "#c6ac62")}
    ${divider()}
    ${table([row("Email", `<a href="mailto:${email}" style="color:#1377a4;">${email}</a>`)].join(""))}
  `;
  return base("New Newsletter Subscriber - UDAN", body);
}
