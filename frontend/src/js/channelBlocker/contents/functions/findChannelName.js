import { openDB } from "@/js/channelBlocker/contents/database";
import {
  readBlobStringList,
  upsertBlobStringItemFront,
} from "@/js/channelBlocker/contents/functions/database/blobStringListStore";
import { runChannelBlocker as removeBlockerThumb } from "@/js/channelBlocker/contents/functions/removeBlockerThumb";
import { addBlockingRecommendClass as removeInterestThumb } from "@/js/channelBlocker/contents/functions/removeInterestThumb";
import { upsertBlockedChannelToStorage } from "@/js/channelBlocker/contents/functions/storage/blockedChannelsStorage";
import { normalizeChannelAddress } from "@/js/channelBlocker/common/channelAddress";

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
 * @typedef {Object} SaveBlockedDataOptions
 * @property {string=} channelUrl
 */

/**
 * @typedef {Object} SavedChannelAddress
 * @property {string} value
 * @property {boolean} wasAdded
 */

/**
 * @typedef {Object} SaveBlockedDataResult
 * @property {SavedChannelAddress|null} savedChannelAddress
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
 * Store a normalized channel address in IndexedDB and chrome.storage.
 *
 * @param {IDBDatabase} activeDb
 * @param {string} rawAddress
 * @returns {Promise<SavedChannelAddress|null>}
 */
async function upsertBlockedChannelAddress(activeDb, rawAddress) {
  const normalizedAddress = normalizeChannelAddress(rawAddress);
  if (!normalizedAddress) return null;

  const current = await readBlobStringList(activeDb, "u", "channelAddresses");
  const wasAdded = !current.includes(normalizedAddress);

  await upsertBlobStringItemFront(activeDb, "u", "channelAddresses", normalizedAddress);
  await upsertBlockedChannelToStorage("urls", normalizedAddress);

  return { value: normalizedAddress, wasAdded };
}

/**
 * Store a blocked channel address independently from channel-name saves.
 *
 * @param {string} rawAddress
 * @returns {Promise<SavedChannelAddress|null>}
 */
export async function saveBlockedChannelAddress(rawAddress) {
  const activeDb = await openDB();
  return upsertBlockedChannelAddress(activeDb, rawAddress);
}

/**
 * Store "Don't recommend channel" or "Not interested" data in IndexedDB and
 * reflect the saved data on the current page.
 *
 * @param {string} id
 * @param {string[]} _ids Kept for backward-compatible callers.
 * @param {SaveCase} saveCase
 * @param {SaveBlockedDataOptions=} options
 * @returns {Promise<SaveBlockedDataResult>}
 */
export async function saveBlockedData(id, _ids, saveCase, options = {}) {
  const activeDb = await openDB();
  const config = getSaveConfig(saveCase);

  console.log(`${config.logLabel} : `, id);

  await upsertBlobStringItemFront(activeDb, config.storeName, config.key, id);
  let savedChannelAddress = null;

  if (saveCase === "blocker") {
    await upsertBlockedChannelToStorage("nmes", id);
    savedChannelAddress = await upsertBlockedChannelAddress(activeDb, options.channelUrl || "");
  }

  await config.afterSave();
  return { savedChannelAddress };
}
