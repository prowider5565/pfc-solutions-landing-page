import { NextResponse } from "next/server";
import { INDUSTRY_TELEGRAM_LABELS, isIndustryKey } from "@/lib/industries";
import { sendContactToTelegram } from "@/lib/telegram-bot";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  company?: unknown;
  industry?: unknown;
  phone?: unknown;
  problem?: unknown;
  website?: unknown;
};

const FIELD_LIMITS = {
  name: 100,
  company: 120,
  phone: 40,
  problem: 1200,
} as const;

function cleanField(value: unknown, limit: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, limit);
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { message: "So‘rov formati noto‘g‘ri." },
      { status: 400 },
    );
  }

  const name = cleanField(payload.name, FIELD_LIMITS.name);
  const company = cleanField(payload.company, FIELD_LIMITS.company);
  const phone = cleanField(payload.phone, FIELD_LIMITS.phone);
  const problem = cleanField(payload.problem, FIELD_LIMITS.problem);

  // Optional, and validated against the fixed key list rather than trusted as
  // free text — the select only ever submits one of these or an empty string,
  // so anything else is a hand-rolled request and is dropped rather than
  // rejected. Resolved to its canonical Uzbek name here because the Telegram
  // message is Uzbek whatever locale the visitor was browsing in.
  const industry = isIndustryKey(payload.industry)
    ? INDUSTRY_TELEGRAM_LABELS[payload.industry]
    : "";

  if (!name || !company || !phone || !problem || phone.length < 7) {
    return NextResponse.json(
      { message: "Barcha maydonlarni to‘g‘ri to‘ldiring." },
      { status: 400 },
    );
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    console.error(
      "Telegram sozlanmagan: TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID kerak.",
    );
    return NextResponse.json(
      { message: "Xabar yuborish xizmati sozlanmagan." },
      { status: 503 },
    );
  }

  // Silently accept bot submissions without persisting them.
  if (typeof payload.website === "string" && payload.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendContactToTelegram(botToken, chatId, {
      name,
      company,
      industry,
      phone,
      problem,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram murojaatini yuborishda xato:", error);
    return NextResponse.json(
      { message: "Murojaatni yuborib bo‘lmadi." },
      { status: 500 },
    );
  }
}
