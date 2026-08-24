export type TelegramContact = {
  name: string;
  company: string;
  phone: string;
  problem: string;
  createdAt: string;
};

type TelegramResponse<T> = {
  ok: boolean;
  result?: T;
  description?: string;
};

function escapeTelegramHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function formatContactMessage(contact: TelegramContact) {
  return [
    "<b>📩 Yangi murojaat</b>",
    "",
    `<b>Ismi:</b> ${escapeTelegramHtml(contact.name)}`,
    `<b>Kompaniya:</b> ${escapeTelegramHtml(contact.company)}`,
    `<b>Telefon:</b> ${escapeTelegramHtml(contact.phone)}`,
    `<b>Muammo:</b> ${escapeTelegramHtml(contact.problem)}`,
    "",
    `<b>Qabul qilingan vaqt:</b> ${new Intl.DateTimeFormat("uz-UZ", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Tashkent",
    }).format(new Date(contact.createdAt))}`,
  ].join("\n");
}

async function telegramRequest<T>(
  botToken: string,
  method: string,
  body: Record<string, unknown>,
  timeout = 10_000,
) {
  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/${method}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(timeout),
    },
  );
  const result = (await response.json()) as TelegramResponse<T>;

  if (!response.ok || !result.ok) {
    throw new Error(result.description ?? `Telegram API xatosi: ${response.status}`);
  }

  return result.result as T;
}

async function sendMessage(botToken: string, chatId: string, text: string) {
  await telegramRequest(botToken, "sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
  });
}

export async function sendContactToTelegram(
  botToken: string,
  adminChatId: string,
  contact: TelegramContact,
) {
  await sendMessage(botToken, adminChatId, formatContactMessage(contact));
}
