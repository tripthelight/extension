import { LIST_TAG, CHANNEL_TAG } from "@/js/channelBlocker/contents/variables";
import getBlockedChannelNames from "@/js/channelBlocker/contents/functions/database/getBlockedChannelNames";
import getBlockedChannelUrls from "@/js/channelBlocker/contents/functions/database/getBlockedChannelUrls";
import extractChannelDataFromCard from "@/js/channelBlocker/contents/functions/extractChannelDataFromCard";
import {
  buildBlockedChannelMatcher,
  isBlockedChannelData,
  normalizeChannelNameKey,
} from "@/js/channelBlocker/common/channelBlockMatcher";

/**
 * Hide blocked-channel items on YouTube channel pages.
 *
 * @returns {Promise<void>}
 */
export default async function blockNotRecommendChannelInChannelPage() {
  const isChannelPage =
    location.pathname.startsWith("/@") ||
    location.pathname.startsWith("/channel/") ||
    /^\/(@|channel\/)/.test(location.pathname);

  if (!isChannelPage) return;

  const [channelNames, channelAddresses] = await Promise.all([
    getBlockedChannelNames(),
    getBlockedChannelUrls(),
  ]);
  const matcher = buildBlockedChannelMatcher(channelNames, channelAddresses);

  const listSelector = LIST_TAG.join(",");
  document.querySelectorAll(listSelector).forEach((item) => {
    if (!(item instanceof HTMLElement)) return;

    const channelData = extractChannelDataFromCard(item);
    if (isBlockedChannelData(channelData, matcher)) {
      item.classList.add("blocking-recomn");
    }
  });

  const blockedNameSet = new Set(
    channelNames
      .map((channelName) => normalizeChannelNameKey(channelName))
      .filter((channelName) => channelName !== "")
  );
  if (blockedNameSet.size === 0) return;

  const chNameElements = document.querySelectorAll(CHANNEL_TAG.chName);
  const contentsElements = document.querySelectorAll(CHANNEL_TAG.contents);
  const hasMatchedChannelName = [...chNameElements].some((chNameEl) => {
    const targets = [chNameEl, ...chNameEl.querySelectorAll("*")];

    return targets.some((el) => {
      const text = normalizeChannelNameKey(el.textContent || "");
      return text !== "" && blockedNameSet.has(text);
    });
  });

  if (!hasMatchedChannelName) return;

  contentsElements.forEach((el) => {
    el.classList.add("blocking-channel");
  });
}
