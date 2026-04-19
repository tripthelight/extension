import { isDatabaseClosingError, openDB } from "@/js/channelBlocker/contents/database";
import { saveBlockedData } from "@/js/channelBlocker/contents/functions/findChannelName";
import { addBlockingRecommendClass as removeInterestThumb } from "@/js/channelBlocker/contents/functions/removeInterestThumb";
import dummyElementClick from "@/js/channelBlocker/contents/functions/dummyElementClick";
import hideVideoCardsByVideoId from "@/js/channelBlocker/contents/functions/hideVideoCardsByVideoId";
import { openWatchUndoOverlay } from "@/js/channelBlocker/contents/functions/watchUndoOverlay";
import enforceShortsUndoOverlay from "@/js/channelBlocker/contents/functions/shortsUndoOverlay";
import resetRemoveTagClass from "@/js/channelBlocker/contents/functions/resetRemoveTagClass";
import scheduleRemoveVodThumb from "@/js/channelBlocker/contents/functions/scheduleRemoveVodThumb";
import { t } from "@/js/channelBlocker/contents/i18n";
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
 * @param {IDBDatabase} database
 * @returns {Promise<unknown>}
 */
async function readVideoIdsValue(database) {
  const transaction = database.transaction("i", "readonly");
  const store = transaction.objectStore("i");
  const request = store.get("videoIds");

  return promisifyRequest(request);
}

/**
 * @param {unknown} value
 * @returns {Promise<string[]>}
 */
async function parseVideoIdsValue(value) {
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
    throw new Error("videoIds data is not an array");
  }

  return parsed.filter((item) => typeof item === "string");
}

/**
 * @param {IDBDatabase} database
 * @param {string[]} videoIds
 * @returns {Promise<void>}
 */
async function writeVideoIds(database, videoIds) {
  const transaction = database.transaction("i", "readwrite");
  const store = transaction.objectStore("i");
  const blob = new Blob([JSON.stringify(videoIds)], { type: "application/json" });
  const request = store.put(blob, "videoIds");
  await promisifyRequest(request);
}

/**
 * @param {IDBDatabase} database
 * @param {string} videoId
 * @returns {Promise<void>}
 */
async function removeVideoIdFromInterestStore(database, videoId) {
  const value = await readVideoIdsValue(database);
  if (!value) return;

  const videoIds = await parseVideoIdsValue(value);
  const nextIds = videoIds.filter((id) => id !== videoId);
  await writeVideoIds(database, nextIds);
}

/**
 * @param {string[]} videoIds
 * @param {string} videoId
 * @returns {boolean}
 */
function hasVideoId(videoIds, videoId) {
  return videoIds.includes(videoId);
}

/**
 * @param {MouseEvent} event
 * @returns {Promise<void>}
 */
export async function handleInterestClick(event) {
  const videoId = getVideoIdFromEvent(event);
  if (!videoId) return;

  hideVideoCardsByVideoId(videoId);
  markPendingThumbsByVideoIds([videoId]);
  dummyElementClick();

  let isNewlyAdded = false;
  const value = await executeWithDbRecovery((database) => readVideoIdsValue(database));

  if (!value) {
    await saveBlockedData(videoId, [], "interest");
    isNewlyAdded = true;
  } else {
    const videoIds = await parseVideoIdsValue(value);

    if (hasVideoId(videoIds, videoId)) {
      clearPendingThumbs([videoId]);
      removeInterestThumb();
    } else {
      await saveBlockedData(videoId, videoIds, "interest");
      isNewlyAdded = true;
    }
  }

  if (isShortsPage()) {
    await enforceShortsUndoOverlay();
    return;
  }

  if (shouldShowWatchOverlay(videoId)) {
    openWatchUndoOverlay({
      message: t("message.undo_not_interested"),
      onUndo: async () => {
        if (!isNewlyAdded) return;

        await executeWithDbRecovery((database) =>
          removeVideoIdFromInterestStore(database, videoId)
        );
        resetRemoveTagClass();
        scheduleRemoveVodThumb();
      },
    });
  }
}
