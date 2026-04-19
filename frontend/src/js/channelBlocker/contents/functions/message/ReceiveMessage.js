import { openDB } from "@/js/channelBlocker/contents/database";
import {
  readBlobStringList,
  removeBlobStringItem,
  upsertBlobStringItemFront,
} from "@/js/channelBlocker/contents/functions/database/blobStringListStore";
import { getShortsData, saveShortsData } from "@/js/channelBlocker/contents/functions/database/ShortsDataDB";
import responseChannelName from "@/js/channelBlocker/contents/functions/fetch/responseChannelName";
import { saveBlockedData } from "@/js/channelBlocker/contents/functions/findChannelName";
import {
  openBlockedChannelListOverlay,
  openNotInterestedVideoListOverlay,
} from "@/js/channelBlocker/contents/functions/contextMenuListOverlay";
import resetRemoveTagClass from "@/js/channelBlocker/contents/functions/resetRemoveTagClass";
import scheduleRemoveVodThumb from "@/js/channelBlocker/contents/functions/scheduleRemoveVodThumb";
import blockSelectedWatchRecommendationCard, {
  blockWatchRecommendationCardsByChannelName,
  getSelectedWatchRecommendationVideoId,
} from "@/js/channelBlocker/contents/functions/blockSelectedWatchRecommendationCard";
import {
  removeBlockedChannelFromStorage,
  upsertBlockedChannelToStorage,
} from "@/js/channelBlocker/contents/functions/storage/blockedChannelsStorage";

/**
 * @typedef {"urls" | "nmes"} BlockKey
 */

/**
 * @typedef {object} RunBlockMessage
 * @property {"RUN_BLOCK"} type
 * @property {string} channel
 * @property {BlockKey} key
 */

/**
 * @typedef {object} RunUnblockMessage
 * @property {"RUN_UNBLOCK"} type
 * @property {string} channel
 * @property {BlockKey} key
 */

/**
 * @typedef {object} RunContextBlockChannelMessage
 * @property {"RUN_CONTEXT_BLOCK_CHANNEL"} type
 * @property {string} videoId
 */

/**
 * @typedef {object} RunContextNotInterestedMessage
 * @property {"RUN_CONTEXT_NOT_INTERESTED"} type
 * @property {string} videoId
 */

/**
 * @typedef {object} OpenBlockedChannelListMessage
 * @property {"OPEN_BLOCKED_CHANNEL_LIST"} type
 */

/**
 * @typedef {object} OpenNotInterestedVideoListMessage
 * @property {"OPEN_NOT_INTERESTED_VIDEO_LIST"} type
 */

/**
 * @typedef {object} GetBlockedChannelsMessage
 * @property {"GET_BLOCKED_CHANNELS"} type
 */

/**
 * @typedef {RunBlockMessage | RunUnblockMessage | RunContextBlockChannelMessage | RunContextNotInterestedMessage | OpenBlockedChannelListMessage | OpenNotInterestedVideoListMessage | GetBlockedChannelsMessage} RuntimeMessage
 */

/**
 * @typedef {object} RunBlockResponse
 * @property {boolean} ok
 * @property {string=} error
 */

/**
 * @returns {Promise<IDBDatabase>}
 */
async function ensureDatabase() {
  return openDB();
}

/**
 * @param {string} raw
 * @returns {string}
 */
function normalizeChannelAddress(raw) {
  const value = String(raw || "").trim();
  if (!value) return "";

  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    decoded = value;
  }

  const sources = [decoded];

  try {
    const parsed = /^https?:\/\//i.test(decoded)
      ? new URL(decoded)
      : new URL(decoded, "https://www.youtube.com");

    sources.push(parsed.pathname);
  } catch {
    // ignore invalid URL string
  }

  for (const source of sources) {
    const match = String(source || "").match(/@([^/?#&\s]+)/);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  const withoutQuery = decoded.split(/[?#&]/)[0] || "";
  const withoutOrigin = withoutQuery.replace(/^https?:\/\/[^/]+/i, "");
  const firstSegment = withoutOrigin.replace(/^\/+/, "").split("/")[0] || "";

  return firstSegment.replace(/^@/, "").trim();
}

/**
 * @param {string} raw
 * @returns {string}
 */
function normalizeChannelName(raw) {
  return String(raw || "").trim().toLowerCase();
}

/**
 * @param {string} raw
 * @returns {string}
 */
function normalizeChannelHandle(raw) {
  const value = String(raw || "").trim();
  if (!value) return "";

  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    decoded = value;
  }

  const match = decoded.match(/@([^/?#\s]+)/);
  if (match && match[1]) {
    return match[1].trim().toLowerCase();
  }

  return decoded.replace(/^\/+/, "").replace(/^@/, "").trim().toLowerCase();
}

/**
 * @param {IDBDatabase} database
 * @returns {Promise<void>}
 */
async function syncShortsBlockedState(database) {
  const blockedChannelNames = await readBlobStringList(database, "b", "channelNames");
  const blockedChannelHandles = await readBlobStringList(database, "u", "channelAddresses");
  const blockedChannelSet = new Set(
    blockedChannelNames.map((name) => normalizeChannelName(name)).filter((name) => name !== "")
  );
  const blockedHandleSet = new Set(
    blockedChannelHandles
      .map((handle) => normalizeChannelHandle(handle))
      .filter((handle) => handle !== "")
  );

  const shortsData = await getShortsData();
  const nextShortsData = { ...shortsData };

  let changed = false;

  for (const [videoId, data] of Object.entries(shortsData)) {
    if (!data || typeof data.channelName !== "string") continue;

    const byName = blockedChannelSet.has(normalizeChannelName(data.channelName));
    const byHandle = data?.channelHandle
      ? blockedHandleSet.has(normalizeChannelHandle(data.channelHandle))
      : false;
    const shouldBlock = byName || byHandle;

    if (data.blocked !== shouldBlock) {
      nextShortsData[videoId] = {
        ...data,
        blocked: shouldBlock,
      };
      changed = true;
    }
  }

  if (changed) {
    await saveShortsData(nextShortsData);
  }
}

/**
 * @param {string} channel
 * @param {BlockKey} key
 * @returns {Promise<void>}
 */
async function runBlockChannels(channel, key) {
  if (typeof channel !== "string") {
    throw new Error("channel must be a string");
  }

  if (key !== "nmes" && key !== "urls") {
    throw new Error("key must be one of: nmes | urls");
  }

  const database = await ensureDatabase();

  if (key === "nmes") {
    const normalizedChannel = channel.trim();
    if (normalizedChannel) {
      const channelNames = await readBlobStringList(database, "b", "channelNames");
      if (!channelNames.includes(normalizedChannel)) {
        await upsertBlobStringItemFront(database, "b", "channelNames", normalizedChannel);
      }
      await upsertBlockedChannelToStorage("nmes", normalizedChannel);
    }
  }

  if (key === "urls") {
    const normalizedAddress = normalizeChannelAddress(channel);
    if (normalizedAddress) {
      const channelAddresses = await readBlobStringList(database, "u", "channelAddresses");
      if (!channelAddresses.includes(normalizedAddress)) {
        await upsertBlobStringItemFront(database, "u", "channelAddresses", normalizedAddress);
      }
      await upsertBlockedChannelToStorage("urls", normalizedAddress);
    }
  }

  await syncShortsBlockedState(database);
  scheduleRemoveVodThumb();
}

/**
 * @param {IDBDatabase} database
 * @param {string} channelName
 * @returns {Promise<void>}
 */
async function upsertBlockedChannelName(database, channelName) {
  const normalizedChannel = String(channelName || "").trim();
  if (!normalizedChannel) return;

  await upsertBlobStringItemFront(database, "b", "channelNames", normalizedChannel);
  await upsertBlockedChannelToStorage("nmes", normalizedChannel);
}

/**
 * @param {string} channel
 * @param {BlockKey} key
 * @returns {Promise<void>}
 */
async function runUnblockChannels(channel, key) {
  if (typeof channel !== "string") {
    throw new Error("channel must be a string");
  }

  if (key !== "nmes" && key !== "urls") {
    throw new Error("key must be one of: nmes | urls");
  }

  const database = await ensureDatabase();

  if (key === "nmes") {
    const normalizedChannel = channel.trim();
    if (normalizedChannel) {
      await removeBlobStringItem(database, "b", "channelNames", normalizedChannel);
      await removeBlockedChannelFromStorage("nmes", normalizedChannel);
    }
  }

  if (key === "urls") {
    const normalizedAddress = normalizeChannelAddress(channel);
    if (normalizedAddress) {
      await removeBlobStringItem(database, "u", "channelAddresses", normalizedAddress);
      await removeBlockedChannelFromStorage("urls", normalizedAddress);
    }
  }

  await syncShortsBlockedState(database);
  resetRemoveTagClass();

  scheduleRemoveVodThumb();
}

/**
 * @param {string} videoId
 * @returns {Promise<void>}
 */
async function runContextBlockChannel(videoId) {
  const normalizedVideoId = location.pathname === "/watch"
    ? getSelectedWatchRecommendationVideoId(videoId)
    : String(videoId || "").trim();
  if (!normalizedVideoId) {
    throw new Error("videoId must be a string");
  }

  const videoData = await responseChannelName(normalizedVideoId);
  const channelName = String(videoData?.channelName || "").trim();

  if (!channelName) {
    throw new Error("failed to resolve channel name from videoId");
  }

  if (location.pathname === "/watch") {
    blockSelectedWatchRecommendationCard(normalizedVideoId);
    blockWatchRecommendationCardsByChannelName(channelName);
    const database = await ensureDatabase();
    await upsertBlockedChannelName(database, channelName);
  } else {
    await runBlockChannels(channelName, "nmes");
  }

}

/**
 * @param {string} videoId
 * @returns {Promise<void>}
 */
async function runContextNotInterested(videoId) {
  const normalizedVideoId = String(videoId || "").trim();
  if (!normalizedVideoId) {
    throw new Error("videoId must be a string");
  }

  await saveBlockedData(normalizedVideoId, [], "interest");
  scheduleRemoveVodThumb();
}

/**
 * @returns {Promise<{nmes: string[], urls: string[], links: string[]}>}
 */
async function getBlockedChannelsForPopup() {
  const database = await ensureDatabase();
  const [nmes, urls] = await Promise.all([
    readBlobStringList(database, "b", "channelNames"),
    readBlobStringList(database, "u", "channelAddresses"),
  ]);

  return { nmes, urls, links: [] };
}

let isMessageReceiverBound = false;

/**
 * Register runtime message listener from popup/background.
 *
 * @returns {void}
 */
export default function ReceiveMessage() {
  if (isMessageReceiverBound) {
    return;
  }

  chrome.runtime.onMessage.addListener((rawMessage, _sender, sendResponse) => {
    /** @type {RuntimeMessage | null} */
    const message = rawMessage && typeof rawMessage === "object"
      ? /** @type {RuntimeMessage} */ (rawMessage)
      : null;

    if (
      !message ||
      (
        message.type !== "RUN_BLOCK" &&
        message.type !== "RUN_UNBLOCK" &&
        message.type !== "RUN_CONTEXT_BLOCK_CHANNEL" &&
        message.type !== "RUN_CONTEXT_NOT_INTERESTED" &&
        message.type !== "OPEN_BLOCKED_CHANNEL_LIST" &&
        message.type !== "OPEN_NOT_INTERESTED_VIDEO_LIST" &&
        message.type !== "GET_BLOCKED_CHANNELS"
      )
    ) {
      return;
    }

    let task;

    if (message.type === "RUN_BLOCK") {
      task = runBlockChannels(message.channel, message.key);
    } else if (message.type === "RUN_UNBLOCK") {
      task = runUnblockChannels(message.channel, message.key);
    } else if (message.type === "RUN_CONTEXT_BLOCK_CHANNEL") {
      task = runContextBlockChannel(message.videoId);
    } else if (message.type === "OPEN_BLOCKED_CHANNEL_LIST") {
      task = openBlockedChannelListOverlay();
    } else if (message.type === "OPEN_NOT_INTERESTED_VIDEO_LIST") {
      task = openNotInterestedVideoListOverlay();
    } else if (message.type === "GET_BLOCKED_CHANNELS") {
      task = getBlockedChannelsForPopup();
    } else {
      task = runContextNotInterested(message.videoId);
    }

    task
      .then((result) => {
        /** @type {RunBlockResponse} */
        const response = { ok: true, blockedChannels: result };
        sendResponse(response);
      })
      .catch((error) => {
        /** @type {RunBlockResponse} */
        const response = {
          ok: false,
          error: error instanceof Error ? error.message : "unknown error",
        };
        sendResponse(response);
      });

    return true;
  });

  isMessageReceiverBound = true;
}
