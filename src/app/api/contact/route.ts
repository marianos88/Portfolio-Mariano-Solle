import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

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

export async function POST(req: NextRequest): Promise<NextResponse> {
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
  const timestamp = new Date().toISOString();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "contact@marianosolle.com",
      to: "mariano.solle@gmail.com",
      subject: "New contact from marianosolle.com",
      html: `
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>Received at: ${timestamp}</small></p>
      `,
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
