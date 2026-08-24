import { randomBytes } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export type PendingContact = {
  id: string;
  name: string;
  company: string;
  phone: string;
  problem: string;
  createdAt: string;
};

const CONTACT_TTL_MS = 24 * 60 * 60 * 1000;

const storeGlobal = globalThis as typeof globalThis & {
  contactStoreQueue?: Promise<void>;
};

function storePath() {
  return (
    process.env.CONTACT_STORE_PATH ??
    path.join(process.cwd(), ".data", "pending-contacts.json")
  );
}

async function readContacts(): Promise<PendingContact[]> {
  try {
    const contents = await readFile(
      /* turbopackIgnore: true */ storePath(),
      "utf8",
    );
    const parsed: unknown = JSON.parse(contents);
    return Array.isArray(parsed) ? (parsed as PendingContact[]) : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function writeContacts(contacts: PendingContact[]) {
  const filename = storePath();
  await mkdir(path.dirname(filename), { recursive: true });
  const temporaryFilename = `${filename}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temporaryFilename, JSON.stringify(contacts), {
    encoding: "utf8",
    mode: 0o600,
  });
  await rename(temporaryFilename, filename);
}

function removeExpired(contacts: PendingContact[]) {
  const cutoff = Date.now() - CONTACT_TTL_MS;
  return contacts.filter((contact) => Date.parse(contact.createdAt) >= cutoff);
}

async function withStoreLock<T>(operation: () => Promise<T>): Promise<T> {
  const previous = storeGlobal.contactStoreQueue ?? Promise.resolve();
  let release = () => {};
  storeGlobal.contactStoreQueue = new Promise<void>((resolve) => {
    release = resolve;
  });

  await previous;
  try {
    return await operation();
  } finally {
    release();
  }
}

export async function createPendingContact(
  contact: Omit<PendingContact, "id" | "createdAt">,
) {
  return withStoreLock(async () => {
    const pendingContact: PendingContact = {
      ...contact,
      id: randomBytes(18).toString("base64url"),
      createdAt: new Date().toISOString(),
    };
    const contacts = removeExpired(await readContacts());
    contacts.push(pendingContact);
    await writeContacts(contacts);
    return pendingContact;
  });
}

export async function getPendingContact(id: string) {
  return withStoreLock(async () => {
    const allContacts = await readContacts();
    const contacts = removeExpired(allContacts);
    if (contacts.length !== allContacts.length) await writeContacts(contacts);
    return contacts.find((contact) => contact.id === id) ?? null;
  });
}

export async function deletePendingContact(id: string) {
  return withStoreLock(async () => {
    const contacts = removeExpired(await readContacts());
    await writeContacts(contacts.filter((contact) => contact.id !== id));
  });
}
