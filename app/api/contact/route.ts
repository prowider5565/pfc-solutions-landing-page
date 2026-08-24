import { NextResponse } from "next/server";
import { createPendingContact } from "@/lib/contact-store";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  company?: unknown;
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

  if (!name || !company || !phone || !problem || phone.length < 7) {
    return NextResponse.json(
      { message: "Barcha maydonlarni to‘g‘ri to‘ldiring." },
      { status: 400 },
    );
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const botUsername = (
    process.env.TELEGRAM_BOT_USERNAME ?? "pfc_solutions_bot"
  )
    .trim()
    .replace(/^@/, "");

  if (!botToken || !chatId) {
    console.error(
      "Telegram sozlanmagan: TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID kerak.",
    );
    return NextResponse.json(
      { message: "Xabar yuborish xizmati sozlanmagan." },
      { status: 503 },
    );
  }

  const botUrl = `https://t.me/${botUsername}`;

  // Silently accept bot submissions without persisting them.
  if (typeof payload.website === "string" && payload.website.trim()) {
    return NextResponse.json({ ok: true, botUrl });
  }

  try {
    const contact = await createPendingContact({ name, company, phone, problem });
    return NextResponse.json({
      ok: true,
      botUrl: `${botUrl}?start=${contact.id}`,
    });
  } catch (error) {
    console.error("Murojaatni vaqtincha saqlashda xato:", error);
    return NextResponse.json(
      { message: "Murojaatni saqlab bo‘lmadi." },
      { status: 500 },
    );
  }
}
