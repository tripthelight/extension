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
  getBlockedChannelsFromStorage,
  removeBlockedChannelFromStorage,
  upsertBlockedChannelToStorage,
} from "@/js/channelBlocker/contents/functions/storage/blockedChannelsStorage";
import extractChannelDataFromCard from "@/js/channelBlocker/contents/functions/extractChannelDataFromCard";
import { getRecentContextMenuWatchRecommendationCard } from "@/js/channelBlocker/contents/functions/contextMenuTargetStore";
import hideVideoCardsByVideoId from "@/js/channelBlocker/contents/functions/hideVideoCardsByVideoId";
import { normalizeChannelAddress } from "@/js/channelBlocker/common/channelAddress";

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
function normalizeChannelName(raw) {
  return String(raw || "").trim().toLowerCase();
}

/**
 * @param {string} raw
 * @returns {string}
 */
function normalizeChannelHandle(raw) {
  return normalizeChannelAddress(raw).toLowerCase();
}

/**
 * @returns {Promise<void>}
 */
async function syncShortsBlockedState() {
  const blockedChannels = await getBlockedChannelsFromStorage();
  const blockedChannelNames = blockedChannels.nmes;
  const blockedChannelHandles = blockedChannels.urls;
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

  await syncShortsBlockedState();
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
 * @param {IDBDatabase} database
 * @param {string} channelAddress
 * @returns {Promise<void>}
 */
async function upsertBlockedChannelAddress(database, channelAddress) {
  const normalizedAddress = normalizeChannelAddress(channelAddress);
  if (!normalizedAddress) return;

  const channelAddresses = await readBlobStringList(database, "u", "channelAddresses");
  if (!channelAddresses.includes(normalizedAddress)) {
    await upsertBlobStringItemFront(database, "u", "channelAddresses", normalizedAddress);
  }
  await upsertBlockedChannelToStorage("urls", normalizedAddress);
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

  await syncShortsBlockedState();
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

  hideVideoCardsByVideoId(normalizedVideoId);
  const cardVideoData = extractChannelDataFromCard(getRecentContextMenuWatchRecommendationCard());
  const videoData = cardVideoData || await responseChannelName(normalizedVideoId);
  const channelName = String(videoData?.channelName || "").trim();
  const channelUrl = String(videoData?.channelUrl || "").trim();

  if (!channelName && !channelUrl) {
    throw new Error("failed to resolve channel name from videoId");
  }

  if (location.pathname === "/watch") {
    blockSelectedWatchRecommendationCard(normalizedVideoId);
    blockWatchRecommendationCardsByChannelName(channelName);
    const database = await ensureDatabase();
    await upsertBlockedChannelName(database, channelName);
    await upsertBlockedChannelAddress(database, channelUrl);
    await syncShortsBlockedState();
  } else {
    const database = await ensureDatabase();
    await upsertBlockedChannelName(database, channelName);
    await upsertBlockedChannelAddress(database, channelUrl);
    await syncShortsBlockedState();
    scheduleRemoveVodThumb();
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

  hideVideoCardsByVideoId(normalizedVideoId);
  await saveBlockedData(normalizedVideoId, [], "interest");
  scheduleRemoveVodThumb();
}

/**
 * @returns {Promise<{nmes: string[], urls: string[], links: string[]}>}
 */
async function getBlockedChannelsForPopup() {
  return getBlockedChannelsFromStorage();
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
