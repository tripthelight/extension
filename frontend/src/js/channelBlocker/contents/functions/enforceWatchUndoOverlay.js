import { openDB } from "@/js/channelBlocker/contents/database";
import { readBlobStringList, removeBlobStringItem } from "@/js/channelBlocker/contents/functions/database/blobStringListStore";
import getBlockedChannelNames from "@/js/channelBlocker/contents/functions/database/getBlockedChannelNames";
import responseChannelName from "@/js/channelBlocker/contents/functions/fetch/responseChannelName";
import { addBlockingRecommendClass as removeInterestThumb } from "@/js/channelBlocker/contents/functions/removeInterestThumb";
import { runChannelBlocker as removeBlockerThumb } from "@/js/channelBlocker/contents/functions/removeBlockerThumb";
import resetRemoveTagClass from "@/js/channelBlocker/contents/functions/resetRemoveTagClass";
import { closeWatchUndoOverlay, openWatchUndoOverlay } from "@/js/channelBlocker/contents/functions/watchUndoOverlay";
import { removeBlockedChannelFromStorage } from "@/js/channelBlocker/contents/functions/storage/blockedChannelsStorage";

const channelNameCache = new Map();
let isEvaluating = false;

/**
 * @returns {string}
 */
function getCurrentWatchVideoId() {
  if (location.pathname !== "/watch") return "";

  try {
    const url = new URL(location.href);
    return (url.searchParams.get("v") || "").trim();
  } catch {
    const match = location.href.match(/[?&]v=([^&#]+)/);
    return match && match[1] ? match[1].trim() : "";
  }
}

/**
 * @returns {Promise<IDBDatabase>}
 */
async function ensureDatabase() {
  return openDB();
}

/**
 * @param {string} videoId
 * @returns {Promise<void>}
 */
async function rollbackInterestVideo(videoId) {
  const database = await ensureDatabase();
  await removeBlobStringItem(database, "i", "videoIds", videoId);
}

/**
 * @param {string} channelName
 * @returns {Promise<void>}
 */
async function rollbackBlockedChannel(channelName) {
  const database = await ensureDatabase();
  await removeBlobStringItem(database, "b", "channelNames", channelName);
  await removeBlockedChannelFromStorage("nmes", channelName);
}

/**
 * @param {string} videoId
 * @returns {Promise<string>}
 */
async function getChannelNameByVideoId(videoId) {
  if (channelNameCache.has(videoId)) {
    return channelNameCache.get(videoId) || "";
  }

  const channelData = await responseChannelName(videoId);
  const channelName = String(channelData?.channelName || "").trim();

  channelNameCache.set(videoId, channelName);
  return channelName;
}

/**
 * Ensure blocked watch video displays undo overlay on revisit/back navigation.
 *
 * @returns {Promise<void>}
 */
export default async function enforceWatchUndoOverlay() {
  if (location.pathname !== "/watch") {
    closeWatchUndoOverlay(false);
    return;
  }

  if (isEvaluating) return;
  isEvaluating = true;

  try {
    const videoId = getCurrentWatchVideoId();
    if (!videoId) {
      closeWatchUndoOverlay(false);
      return;
    }

    const database = await ensureDatabase();
    const interestVideoIds = await readBlobStringList(database, "i", "videoIds");
    const blockedByInterest = interestVideoIds.includes(videoId);

    if (blockedByInterest) {
      openWatchUndoOverlay({
        overlayKey: `interest:${videoId}`,
        message: "\uAD00\uC2EC \uC5C6\uB294 \uC601\uC0C1\uC785\uB2C8\uB2E4. \uB418\uB3CC\uB9AC\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
        onUndo: async () => {
          await rollbackInterestVideo(videoId);
          resetRemoveTagClass();
          removeInterestThumb();
          await removeBlockerThumb();
        },
      });
      return;
    }

    const channelName = await getChannelNameByVideoId(videoId);
    if (!channelName) {
      closeWatchUndoOverlay(false);
      return;
    }

    const blockedChannelNames = await getBlockedChannelNames();
    const blockedByChannel = blockedChannelNames.includes(channelName);

    if (blockedByChannel) {
      openWatchUndoOverlay({
        overlayKey: `blocker:${videoId}:${channelName}`,
        message: "\uCD94\uCC9C \uD558\uC9C0 \uC54A\uB294 \uC601\uC0C1\uC785\uB2C8\uB2E4. \uB418\uB3CC\uB9AC\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
        onUndo: async () => {
          await rollbackBlockedChannel(channelName);
          resetRemoveTagClass();
          removeInterestThumb();
          await removeBlockerThumb();
        },
      });
      return;
    }

    closeWatchUndoOverlay(false);
  } finally {
    isEvaluating = false;
  }
}
