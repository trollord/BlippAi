import nodemailer, { type Transporter } from "nodemailer";

export const ENQUIRY_RECIPIENTS = ["m@blippai.com", "hello@blippai.com"] as const;

let cached: Transporter | null = null;

export function isMailConfigured() {
  return Boolean(process.env["MAIL_USER"] && process.env["MAIL_PASS"]);
}

function getTransport(): Transporter {
  if (cached) return cached;

  const user = process.env["MAIL_USER"];
  const pass = process.env["MAIL_PASS"];

  if (!user || !pass) {
    const missing = [...(!user ? ["MAIL_USER"] : []), ...(!pass ? ["MAIL_PASS"] : [])];
    throw new Error(`Missing mail environment variable(s): ${missing.join(", ")}.`);
  }

  const host = process.env["MAIL_HOST"] ?? "smtp.gmail.com";
  const port = Number(process.env["MAIL_PORT"] ?? 587);

  cached = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return cached;
}

export type Enquiry = {
  name: string;
  email: string;
  organisation?: string;
  message: string;
};

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c] as string,
  );
}

export async function sendEnquiryEmail(enquiry: Enquiry) {
  const transport = getTransport();
  const from = process.env["MAIL_USER"];
  const receivedAt = `${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`;

  const rows: [string, string][] = [
    ["Name", enquiry.name],
    ["Organisation", enquiry.organisation || "—"],
    ["Email", enquiry.email],
    ["Received", receivedAt],
  ];

  const html = `
  <div style="font-family:Helvetica,Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #d8dade">
    <div style="background:#0b0e11;padding:22px 26px">
      <div style="color:#36acff;letter-spacing:3px;font-size:11px;text-transform:uppercase">BlippAI — Website Enquiry</div>
      <div style="color:#f1f3f5;font-size:17px;margin-top:6px">${escapeHtml(enquiry.name)}${
        enquiry.organisation ? ` — ${escapeHtml(enquiry.organisation)}` : ""
      }</div>
    </div>
    <table style="width:100%;border-collapse:collapse">
      ${rows
        .map(
          ([k, v], i) => `
        <tr style="background:${i % 2 ? "#f4f6f8" : "#ffffff"}">
          <td style="padding:11px 26px;color:#7c848d;font-size:12px;width:150px;vertical-align:top">${k}</td>
          <td style="padding:11px 26px;color:#0b0e11;font-size:14px">${escapeHtml(v)}</td>
        </tr>`,
        )
        .join("")}
    </table>
    <div style="padding:22px 26px;border-top:1px solid #d8dade">
      <div style="color:#7c848d;letter-spacing:2px;font-size:11px;text-transform:uppercase;margin-bottom:10px">What they are trying to solve</div>
      <div style="color:#0b0e11;font-size:14px;line-height:1.75;white-space:pre-wrap">${escapeHtml(enquiry.message)}</div>
    </div>
    <div style="padding:14px 26px;background:#f4f6f8;color:#7c848d;font-size:11px;line-height:1.7">
      Sent from the enquiry form at blippai.com. Reply directly to reach the sender.
    </div>
  </div>`;

  await transport.sendMail({
    from: `"BlippAI Website" <${from}>`,
    to: [...ENQUIRY_RECIPIENTS],
    replyTo: enquiry.email,
    subject: `Website enquiry — ${enquiry.name}${
      enquiry.organisation ? ` — ${enquiry.organisation}` : ""
    }`,
    text: [...rows.map(([k, v]) => `${k}: ${v}`), "", enquiry.message].join("\n"),
    html,
  });
}
