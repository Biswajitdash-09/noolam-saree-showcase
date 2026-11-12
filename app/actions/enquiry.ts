"use server";

import { shop } from "@/lib/shop";

export type EnquiryType = "contact" | "appointment" | "video-call" | "order";

export type EnquiryState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<EnquiryField, string>>; message: string }
  | { status: "sent"; name: string }
  | { status: "fallback"; whatsappText: string; message: string }
  | { status: "error"; whatsappText: string; message: string };

type EnquiryField = "name" | "phone" | "email" | "message" | "date";

const TYPE_LABEL: Record<EnquiryType, string> = {
  contact: "Enquiry",
  appointment: "Appointment request",
  "video-call": "Video call request",
  order: "Order",
};

const MIN_FILL_MS = 2500;
const clean = (value: FormDataEntryValue | null, max = 2000) =>
  String(value ?? "").replace(/\s+\n/g, "\n").trim().slice(0, max);

/**
 * Sends an enquiry to the shop by email (Resend). Every call is an untrusted
 * POST: inputs are re-validated here, a honeypot and a minimum fill time
 * screen out bots, and when email isn't configured the visitor is handed a
 * prefilled WhatsApp message instead so no enquiry is lost.
 */
export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Bots fill every field; people never see this one.
  if (clean(formData.get("website"))) return { status: "sent", name: "" };
  const startedAt = Number(formData.get("startedAt"));
  if (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "sent", name: "" };
  }

  const rawType = clean(formData.get("type"), 20) as EnquiryType;
  const type: EnquiryType = rawType in TYPE_LABEL ? rawType : "contact";
  const name = clean(formData.get("name"), 80);
  const phone = clean(formData.get("phone"), 20);
  const email = clean(formData.get("email"), 120);
  const message = clean(formData.get("message"));
  const occasion = clean(formData.get("occasion"), 40);
  const date = clean(formData.get("date"), 20);
  const visit = clean(formData.get("visit"), 30);
  const product = clean(formData.get("product"), 120);
  const order = clean(formData.get("order"), 4000);

  const errors: Partial<Record<EnquiryField, string>> = {};
  if (!name) errors.name = "Add your name so we know who to reply to.";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) {
    errors.phone = "Add a 10-digit mobile number. We reply on call or WhatsApp.";
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Check the email address, like name@mail.com — or leave it empty.";
  }
  if (type === "contact" && !message) errors.message = "Tell us what you're looking for.";
  if (type === "appointment" && !date) errors.date = "Pick a date for your visit or call.";
  if (Object.keys(errors).length) {
    return { status: "invalid", errors, message: "A few details are missing." };
  }

  const lines = [
    `${TYPE_LABEL[type]}${product ? ` — ${product}` : ""}`,
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    email && `Email: ${email}`,
    occasion && `Occasion: ${occasion}`,
    visit && `Visit: ${visit}`,
    date && `Preferred date: ${date}`,
    order && `\nOrder:\n${order}`,
    message && `\nMessage:\n${message}`,
  ].filter(Boolean) as string[];
  const body = lines.join("\n");
  const whatsappText = `Hello ${shop.name},\n\n${body}`;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL || shop.email;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  if (!apiKey || !from) {
    return {
      status: "fallback",
      whatsappText,
      message: "Email isn't set up for this shop yet. Send the same message on WhatsApp instead.",
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email || undefined,
        subject: `${TYPE_LABEL[type]}${product ? ` — ${product}` : ""} — ${name}, ${phone}`,
        text: body,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`Resend ${response.status}`);
    return { status: "sent", name };
  } catch {
    return {
      status: "error",
      whatsappText,
      message: "The message didn't go through. Send it on WhatsApp instead — it's already written.",
    };
  }
}
