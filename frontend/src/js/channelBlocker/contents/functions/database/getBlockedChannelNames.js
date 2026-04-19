import { getBlockedChannelsFromStorage } from "@/js/channelBlocker/contents/functions/storage/blockedChannelsStorage";

/**
 * Read blocked channel names from the canonical extension storage.
 *
 * IndexedDB is still mirrored for legacy content-script data, but chrome.storage
 * is the source of truth shared with the popup.
 *
 * @returns {Promise<string[]>}
 */
export default async function getBlockedChannelNames() {
  const blockedChannels = await getBlockedChannelsFromStorage();
  return blockedChannels.nmes;
}
