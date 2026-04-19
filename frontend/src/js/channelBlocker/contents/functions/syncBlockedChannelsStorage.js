import { openDB } from "@/js/channelBlocker/contents/database";
import {
  readBlobStringList,
  writeBlobStringList,
} from "@/js/channelBlocker/contents/functions/database/blobStringListStore";
import {
  getBlockedChannelsFromStorage,
  isContentDbMigratedToStorage,
  markContentDbMigratedToStorage,
  mergeBlockedChannelsToStorage,
} from "@/js/channelBlocker/contents/functions/storage/blockedChannelsStorage";

/**
 * Keep the page-origin IndexedDB used for blocking in step with the extension
 * storage used by the popup.
 *
 * @returns {Promise<void>}
 */
export default async function syncBlockedChannelsStorage() {
  const database = await openDB();
  const isMigrated = await isContentDbMigratedToStorage();
  let blockedChannels = await getBlockedChannelsFromStorage();

  if (!isMigrated) {
    const [indexedDbNames, indexedDbUrls] = await Promise.all([
      readBlobStringList(database, "b", "channelNames"),
      readBlobStringList(database, "u", "channelAddresses"),
    ]);

    blockedChannels = await mergeBlockedChannelsToStorage({
      nmes: indexedDbNames,
      urls: indexedDbUrls,
    });
    await markContentDbMigratedToStorage();
  }

  await Promise.all([
    writeBlobStringList(database, "b", "channelNames", blockedChannels.nmes),
    writeBlobStringList(database, "u", "channelAddresses", blockedChannels.urls),
  ]);
}

