import { DATAS } from "@/js/channelBlocker/contents/variables";
import enforceShortsUndoOverlay from "@/js/channelBlocker/contents/functions/shortsUndoOverlay";

/**
 * @returns {boolean}
 */
function isCurrentShortsPage() {
  return location.pathname.startsWith(DATAS.views.shorts.path);
}

/**
 * @returns {Promise<void>}
 */
export default async function removeNotRecommendChannelInShortsPage() {
  if (!isCurrentShortsPage()) return;

  try {
    await enforceShortsUndoOverlay();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`removeNotRecommendChannelInShortsPage failed: ${message}`);
  }
}
