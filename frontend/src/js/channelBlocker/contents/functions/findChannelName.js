import { openDB } from "@/js/channelBlocker/contents/database";
import { upsertBlobStringItemFront } from "@/js/channelBlocker/contents/functions/database/blobStringListStore";
import { runChannelBlocker as removeBlockerThumb } from "@/js/channelBlocker/contents/functions/removeBlockerThumb";
import { addBlockingRecommendClass as removeInterestThumb } from "@/js/channelBlocker/contents/functions/removeInterestThumb";
import { upsertBlockedChannelToStorage } from "@/js/channelBlocker/contents/functions/storage/blockedChannelsStorage";

/**
 * @typedef {"blocker" | "interest"} SaveCase
 */

/**
 * @typedef {Object} SaveConfig
 * @property {"b" | "i"} storeName
 * @property {"channelNames" | "videoIds"} key
 * @property {() => (void | Promise<void>)} afterSave
 * @property {string} logLabel
 */

/**
 * @param {SaveCase} saveCase
 * @returns {SaveConfig}
 */
function getSaveConfig(saveCase) {
  if (saveCase === "blocker") {
    return {
      storeName: "b",
      key: "channelNames",
      afterSave: removeBlockerThumb,
      logLabel: "blocked channel name",
    };
  }

  return {
    storeName: "i",
    key: "videoIds",
    afterSave: removeInterestThumb,
    logLabel: "not interested video id",
  };
}

/**
 * Store "Don't recommend channel" or "Not interested" data in IndexedDB and
 * reflect the saved data on the current page.
 *
 * @param {string} id
 * @param {string[]} _ids Kept for backward-compatible callers.
 * @param {SaveCase} saveCase
 * @returns {Promise<void>}
 */
export async function saveBlockedData(id, _ids, saveCase) {
  const activeDb = await openDB();
  const config = getSaveConfig(saveCase);

  console.log(`${config.logLabel} : `, id);

  await upsertBlobStringItemFront(activeDb, config.storeName, config.key, id);
  if (saveCase === "blocker") {
    await upsertBlockedChannelToStorage("nmes", id);
  }
  await config.afterSave();
}
