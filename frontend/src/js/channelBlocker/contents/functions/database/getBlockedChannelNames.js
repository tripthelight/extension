import { openDB } from "@/js/channelBlocker/contents/database";
import { readBlobStringList } from "@/js/channelBlocker/contents/functions/database/blobStringListStore";

/**
 * Read blocked channel names from IndexedDB.
 *
 * @returns {Promise<string[]>}
 */
export default async function getBlockedChannelNames() {
  const activeDb = await openDB();
  return readBlobStringList(activeDb, "b", "channelNames");
}
