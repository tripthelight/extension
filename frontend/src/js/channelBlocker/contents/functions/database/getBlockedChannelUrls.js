import { openDB } from "@/js/channelBlocker/contents/database";
import { readBlobStringList } from "@/js/channelBlocker/contents/functions/database/blobStringListStore";

/**
 * @param {string} raw
 * @returns {string}
 */
function normalizeChannelAddress(raw) {
  const value = String(raw || "").trim();
  if (!value) return "";

  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    decoded = value;
  }

  const match = decoded.match(/@([^/?#\s]+)/);
  if (match && match[1]) {
    return match[1].trim();
  }

  return decoded.replace(/^\/+/, "").replace(/^@/, "").trim();
}

/**
 * Read blocked channel addresses from IndexedDB store "u".
 * Returned values are normalized as address token (without '@').
 *
 * @returns {Promise<string[]>}
 */
export default async function getBlockedChannelUrls() {
  const activeDb = await openDB();
  const values = await readBlobStringList(activeDb, "u", "channelAddresses");

  return values
    .map((item) => normalizeChannelAddress(item))
    .filter((item) => item !== "");
}
