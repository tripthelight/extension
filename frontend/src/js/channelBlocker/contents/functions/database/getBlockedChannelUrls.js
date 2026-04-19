import { getBlockedChannelsFromStorage } from "@/js/channelBlocker/contents/functions/storage/blockedChannelsStorage";
import { normalizeChannelAddress } from "@/js/channelBlocker/common/channelAddress";

/**
 * Read blocked channel addresses from the canonical extension storage.
 *
 * Returned values are normalized as address tokens without '@'.
 *
 * @returns {Promise<string[]>}
 */
export default async function getBlockedChannelUrls() {
  const blockedChannels = await getBlockedChannelsFromStorage();

  return blockedChannels.urls
    .map((item) => normalizeChannelAddress(item))
    .filter((item) => item !== "");
}
