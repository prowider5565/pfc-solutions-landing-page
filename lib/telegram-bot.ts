import {
  deletePendingContact,
  getPendingContact,
  type PendingContact,
} from "@/lib/contact-store";

type TelegramUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
};

type TelegramUpdate = {
  update_id: number;
  message?: {
    text?: string;
    chat: { id: number };
    from?: TelegramUser;
  };
};

type TelegramResponse<T> = {
  ok: boolean;
  result?: T;
  description?: string;
};

const telegramGlobal = globalThis as typeof globalThis & {
  telegramContactBotStarted?: boolean;
};

function escapeTelegramHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function telegramUserLabel(user?: TelegramUser) {
  if (!user) return "Noma’lum";
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");
  const username = user.username ? `@${user.username}` : "username yo‘q";
  return `${fullName || "Noma’lum"} (${username}, ID: ${user.id})`;
}

function formatContactMessage(contact: PendingContact, user?: TelegramUser) {
  return [
    "<b>📩 Yangi murojaat</b>",
    "",
    `<b>Ismi:</b> ${escapeTelegramHtml(contact.name)}`,
    `<b>Kompaniya:</b> ${escapeTelegramHtml(contact.company)}`,
    `<b>Telefon:</b> ${escapeTelegramHtml(contact.phone)}`,
    `<b>Muammo:</b> ${escapeTelegramHtml(contact.problem)}`,
    `<b>Telegram foydalanuvchisi:</b> ${escapeTelegramHtml(telegramUserLabel(user))}`,
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

async function sendMessage(botToken: string, chatId: string | number, text: string) {
  await telegramRequest(botToken, "sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
  });
}

async function handleStart(
  botToken: string,
  adminChatId: string,
  chatId: number,
  payload: string | undefined,
  user?: TelegramUser,
) {
  if (!payload) {
    await sendMessage(
      botToken,
      chatId,
      "Assalomu alaykum! Murojaat yuborish uchun saytdagi aloqa formasini to‘ldiring.",
    );
    return;
  }

  const contact = await getPendingContact(payload);
  if (!contact) {
    await sendMessage(
      botToken,
      chatId,
      "Bu murojaat havolasi topilmadi yoki uning muddati tugagan. Iltimos, saytdagi formani qayta to‘ldiring.",
    );
    return;
  }

  try {
    await sendMessage(botToken, adminChatId, formatContactMessage(contact, user));
    await deletePendingContact(contact.id);
    await sendMessage(
      botToken,
      chatId,
      "Rahmat! Murojaatingiz qabul qilindi. Tez orada siz bilan bog‘lanamiz.",
    );
  } catch (error) {
    console.error("Telegram murojaatini yuborishda xato:", error);
    await sendMessage(
      botToken,
      chatId,
      "Murojaatni yuborishda vaqtinchalik xato yuz berdi. Iltimos, Start tugmasini yana bosing.",
    ).catch(() => undefined);
  }
}

async function pollingLoop(botToken: string, adminChatId: string) {
  let offset = 0;

  while (true) {
    try {
      const updates = await telegramRequest<TelegramUpdate[]>(
        botToken,
        "getUpdates",
        {
          offset,
          timeout: 25,
          allowed_updates: ["message"],
        },
        30_000,
      );

      for (const update of updates) {
        offset = update.update_id + 1;
        const text = update.message?.text;
        const match = text?.match(/^\/start(?:\s+([A-Za-z0-9_-]+))?$/);
        if (!match || !update.message) continue;

        await handleStart(
          botToken,
          adminChatId,
          update.message.chat.id,
          match[1],
          update.message.from,
        );
      }
    } catch (error) {
      console.error("Telegram bot polling xatosi:", error);
      await new Promise((resolve) => setTimeout(resolve, 5_000));
    }
  }
}

export function startTelegramBot() {
  if (telegramGlobal.telegramContactBotStarted) return;
  if (process.env.TELEGRAM_BOT_POLLING_ENABLED === "false") return;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const adminChatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !adminChatId) {
    console.warn(
      "Telegram bot ishga tushmadi: TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID kerak.",
    );
    return;
  }

  telegramGlobal.telegramContactBotStarted = true;
  console.log("Telegram contact bot ishga tushdi.");
  void pollingLoop(botToken, adminChatId);
}
