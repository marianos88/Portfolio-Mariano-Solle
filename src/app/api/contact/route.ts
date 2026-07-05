import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_BODY_SIZE = 20_000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

interface ValidationResult {
  valid: boolean;
  error?: string;
}

function validate(name: string, email: string, message: string): ValidationResult {
  if (!name) return { valid: false, error: "Name is required." };
  if (name.length > MAX_NAME_LENGTH) return { valid: false, error: `Name must be at most ${MAX_NAME_LENGTH} characters.` };

  if (!email) return { valid: false, error: "Email is required." };
  if (email.length > MAX_EMAIL_LENGTH) return { valid: false, error: `Email must be at most ${MAX_EMAIL_LENGTH} characters.` };
  if (!EMAIL_REGEX.test(email)) return { valid: false, error: "Invalid email address." };

  if (!message) return { valid: false, error: "Message is required." };
  if (message.length > MAX_MESSAGE_LENGTH) return { valid: false, error: `Message must be at most ${MAX_MESSAGE_LENGTH} characters.` };

  return { valid: true };
}

function buildHtml(name: string, email: string, message: string, timestamp: string): string {
  const lines = message.replace(/\n/g, "<br>");
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;width:100%">
        <tr><td style="background:#1a1a1a;padding:24px 32px">
          <p style="margin:0;color:#a8e6cf;font-size:11px;letter-spacing:2px;text-transform:uppercase">marianosolle.com</p>
          <p style="margin:8px 0 0;color:#ffffff;font-size:20px;font-weight:500">New contact message</p>
        </td></tr>
        <tr><td style="padding:32px">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-bottom:20px;border-bottom:1px solid #eeeeee">
                <p style="margin:0 0 4px;font-size:11px;color:#999999;letter-spacing:1px;text-transform:uppercase">From</p>
                <p style="margin:0;font-size:15px;color:#1a1a1a;font-weight:500">${name}</p>
                <p style="margin:4px 0 0;font-size:14px;color:#555555">${email}</p>
              </td>
            </tr>
            <tr>
              <td style="padding-top:20px">
                <p style="margin:0 0 8px;font-size:11px;color:#999999;letter-spacing:1px;text-transform:uppercase">Message</p>
                <p style="margin:0;font-size:14px;color:#1a1a1a;line-height:1.7">${lines}</p>
              </td>
            </tr>
          </table>
        </td></tr>
        <tr><td style="padding:16px 32px;background:#f9f9f9;border-top:1px solid #eeeeee">
          <p style="margin:0;font-size:11px;color:#aaaaaa">Received: ${timestamp}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildText(name: string, email: string, message: string, timestamp: string): string {
  return [
    "New contact message — marianosolle.com",
    "----------------------------------------",
    `From:    ${name}`,
    `Email:   ${email}`,
    "",
    "Message:",
    message,
    "",
    "----------------------------------------",
    `Received: ${timestamp}`,
  ].join("\n");
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Reject oversized payloads before parsing
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json({ error: "Payload too large." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;

  // Honeypot — bots fill this, humans don't
  const honeypot = typeof raw.website === "string" ? raw.website : "";
  if (honeypot.length > 0) {
    // Return 200 to avoid signalling detection to bots
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";

  const validation = validate(name, email, message);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const safeName = sanitize(name);
  const safeEmail = sanitize(email);
  const safeMessage = sanitize(message);
  const timestamp = new Date().toUTCString();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "contact@marianosolle.com",
      to: "mariano.solle@gmail.com",
      replyTo: email,
      subject: "New contact from marianosolle.com",
      html: buildHtml(safeName, safeEmail, safeMessage, timestamp),
      text: buildText(name, email, message, timestamp),
    });
  } catch {
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

export function GET(): NextResponse {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

export function PUT(): NextResponse {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

export function DELETE(): NextResponse {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

export function PATCH(): NextResponse {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
