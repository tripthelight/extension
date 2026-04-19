import { isDatabaseClosingError, openDB } from "@/js/channelBlocker/contents/database";
import responseChannelName from "@/js/channelBlocker/contents/functions/fetch/responseChannelName";
import { saveBlockedData } from "@/js/channelBlocker/contents/functions/findChannelName";
import { runChannelBlocker as removeBlockerThumb } from "@/js/channelBlocker/contents/functions/removeBlockerThumb";
import hideShortsByVideoId from "@/js/channelBlocker/contents/functions/hideShortsByVideoId";
import dummyElementClick from "@/js/channelBlocker/contents/functions/dummyElementClick";
import { openWatchUndoOverlay } from "@/js/channelBlocker/contents/functions/watchUndoOverlay";
import enforceShortsUndoOverlay from "@/js/channelBlocker/contents/functions/shortsUndoOverlay";
import resetRemoveTagClass from "@/js/channelBlocker/contents/functions/resetRemoveTagClass";
import scheduleRemoveVodThumb from "@/js/channelBlocker/contents/functions/scheduleRemoveVodThumb";
import { t } from "@/js/channelBlocker/contents/i18n";
import { removeBlockedChannelFromStorage } from "@/js/channelBlocker/contents/functions/storage/blockedChannelsStorage";
import {
  clearPendingThumbs,
  markPendingThumbsByVideoIds,
} from "@/js/channelBlocker/contents/functions/skeletonPendingThumb";

/**
 * @template T
 * @param {IDBRequest<T>} request
 * @returns {Promise<T>}
 */
function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.addEventListener("success", () => {
      resolve(request.result);
    });

    request.addEventListener("error", () => {
      reject(request.error ?? new Error("IndexedDB request failed"));
    });
  });
}

/**
 * @returns {Promise<IDBDatabase>}
 */
async function ensureDatabase() {
  return openDB();
}

/**
 * @template T
 * @param {(database: IDBDatabase) => Promise<T>} callback
 * @returns {Promise<T>}
 */
async function executeWithDbRecovery(callback) {
  const activeDb = await ensureDatabase();

  try {
    return await callback(activeDb);
  } catch (error) {
    if (!isDatabaseClosingError(error)) {
      throw error;
    }

    const reopenedDb = await openDB(true);
    return callback(reopenedDb);
  }
}

/**
 * @param {MouseEvent} event
 * @returns {HTMLElement|null}
 */
function getCurrentTargetElement(event) {
  return event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
}

/**
 * @param {MouseEvent} event
 * @returns {string|null}
 */
function getVideoIdFromEvent(event) {
  const currentTarget = getCurrentTargetElement(event);
  if (!currentTarget) return null;

  return currentTarget.dataset.videoId ?? null;
}

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
 * @param {string|null} videoId
 * @returns {boolean}
 */
function shouldShowWatchOverlay(videoId) {
  if (location.pathname !== "/watch") return false;
  if (!videoId) return false;
  return videoId === getCurrentWatchVideoId();
}

/**
 * @returns {boolean}
 */
function isShortsPage() {
  return location.pathname.startsWith("/shorts/");
}

/**
 * @param {IDBDatabase} database
 * @returns {Promise<unknown>}
 */
async function readChannelNamesValue(database) {
  const transaction = database.transaction("b", "readonly");
  const store = transaction.objectStore("b");
  const request = store.get("channelNames");

  return promisifyRequest(request);
}

/**
 * @param {unknown} value
 * @returns {Promise<string[]>}
 */
async function parseChannelNamesValue(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === "string");
  }

  if (typeof value === "string") {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  }

  if (!(value instanceof Blob)) {
    return [];
  }

  const text = await value.text();
  const parsed = JSON.parse(text);

  if (!Array.isArray(parsed)) {
    throw new Error("channelNames data is not an array");
  }

  return parsed.filter((item) => typeof item === "string");
}

/**
 * @param {IDBDatabase} database
 * @param {string[]} channelNames
 * @returns {Promise<void>}
 */
async function writeChannelNames(database, channelNames) {
  const transaction = database.transaction("b", "readwrite");
  const store = transaction.objectStore("b");
  const blob = new Blob([JSON.stringify(channelNames)], { type: "application/json" });
  const request = store.put(blob, "channelNames");
  await promisifyRequest(request);
}

/**
 * @param {IDBDatabase} database
 * @param {string} channelName
 * @returns {Promise<void>}
 */
async function removeBlockedChannelNameFromIndexedDb(database, channelName) {
  const value = await readChannelNamesValue(database);
  if (!value) return;

  const channelNames = await parseChannelNamesValue(value);
  const nextNames = channelNames.filter((name) => name !== channelName);
  await writeChannelNames(database, nextNames);
}

/**
 * @typedef {Object} ChannelNameResponse
 * @property {string} channelName
 */

/**
 * @param {string} videoId
 * @returns {Promise<string|null>}
 */
async function fetchChannelName(videoId) {
  /** @type {ChannelNameResponse | null | undefined} */
  const response = await responseChannelName(videoId);

  if (!response || !response.channelName) {
    return null;
  }

  return response.channelName;
}

/**
 * @param {string[]} channelNames
 * @param {string} channelName
 * @returns {boolean}
 */
function hasChannelName(channelNames, channelName) {
  return channelNames.includes(channelName);
}

/**
 * @param {MouseEvent} event
 * @returns {Promise<void>}
 */
export async function handleBlockChannelClick(event) {
  const videoId = getVideoIdFromEvent(event);
  if (!videoId) return;

  markPendingThumbsByVideoIds([videoId]);
  dummyElementClick();

  const channelName = await fetchChannelName(videoId);
  if (!channelName) {
    clearPendingThumbs([videoId]);
    return;
  }

  let isNewlyAdded = false;
  const value = await executeWithDbRecovery((database) => readChannelNamesValue(database));

  if (!value) {
    await saveBlockedData(channelName, [], "blocker");
    if (!isShortsPage()) {
      hideShortsByVideoId(videoId);
    }
    isNewlyAdded = true;
  } else {
    const channelNames = await parseChannelNamesValue(value);

    if (hasChannelName(channelNames, channelName)) {
      clearPendingThumbs([videoId]);
      removeBlockerThumb();
      if (!isShortsPage()) {
        hideShortsByVideoId(videoId);
      }
    } else {
      await saveBlockedData(channelName, channelNames, "blocker");
      if (!isShortsPage()) {
        hideShortsByVideoId(videoId);
      }
      isNewlyAdded = true;
    }
  }

  if (isShortsPage()) {
    await enforceShortsUndoOverlay();
    return;
  }

  if (shouldShowWatchOverlay(videoId)) {
    openWatchUndoOverlay({
      message: t("message.undo_not_recommended"),
      onUndo: async () => {
        if (!isNewlyAdded) return;

        await executeWithDbRecovery((database) =>
          removeBlockedChannelNameFromIndexedDb(database, channelName)
        );
        await removeBlockedChannelFromStorage("nmes", channelName);

        resetRemoveTagClass();
        scheduleRemoveVodThumb();
      },
    });
  }
}
