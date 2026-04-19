import { getShortsData, saveShortsData, setShortsVideoBlocked } from "@/js/channelBlocker/contents/functions/database/ShortsDataDB";
import getBlockedChannelNames from "@/js/channelBlocker/contents/functions/database/getBlockedChannelNames";
import getBlockedChannelUrls from "@/js/channelBlocker/contents/functions/database/getBlockedChannelUrls";
import { openDB } from "@/js/channelBlocker/contents/database";
import { upsertBlobStringItemFront } from "@/js/channelBlocker/contents/functions/database/blobStringListStore";
import { upsertBlockedChannelToStorage } from "@/js/channelBlocker/contents/functions/storage/blockedChannelsStorage";

import {
  getIsFetching,
  changeIsFetching,
} from "@/js/store/channelBlocker/contents/ShortsDataStore";

import hideShortsByVideoId from "@/js/channelBlocker/contents/functions/hideShortsByVideoId";
import {
  clearPendingThumbs,
} from "@/js/channelBlocker/contents/functions/skeletonPendingThumb";
import { normalizeChannelAddress } from "@/js/channelBlocker/common/channelAddress";

let responseCount = 0;
const MISSING_VIDEO_TTL_MS = 1000 * 60 * 30;
const MAX_RESOLVE_IDS_PER_REQUEST = 50;
const RESOLVE_REQUEST_COOLDOWN_MS = 1000 * 3;

let lastResolveRequestAt = 0;
let lastResolveRequestKey = "";

/**
 * @param {string} resolverBaseUrl
 * @param {string} extensionToken
 * @returns {Promise<{nonce: string, expiresAt: number, signature: string}>}
 */
async function requestResolverChallenge(resolverBaseUrl, extensionToken) {
  const response = await fetch(`${resolverBaseUrl}/api/v1/challenge`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-extension-token": extensionToken,
    },
    body: "{}",
  });

  if (!response.ok) {
    throw new Error(`Resolver challenge failed (${response.status})`);
  }

  const data = await response.json();
  const nonce = String(data?.nonce || "").trim();
  const expiresAt = Number(data?.expiresAt);
  const signature = String(data?.signature || "").trim();

  if (!nonce || !Number.isFinite(expiresAt) || !signature) {
    throw new Error("Resolver challenge response is invalid.");
  }

  return { nonce, expiresAt, signature };
}

/**
 * @param {string} name
 * @returns {string}
 */
function normalizeChannelName(name) {
  return String(name || "").trim().toLowerCase();
}

/**
 * @param {string} raw
 * @returns {string}
 */
function normalizeChannelHandle(raw) {
  return normalizeChannelAddress(raw).toLowerCase();
}

/**
 * @param {string} channelName
 * @param {string[]} channelNames
 * @param {string[]} channelHandles
 * @returns {boolean}
 */
function isBlockedChannel(channelName, channelNames, channelHandles = []) {
  const blockedNameSet = new Set(
    channelNames.map((name) => normalizeChannelName(name))
  );
  const blockedHandleSet = new Set(
    channelHandles.map((handle) => normalizeChannelHandle(handle))
  );

  const normalizedName = normalizeChannelName(channelName);
  const normalizedHandle = normalizeChannelHandle(channelName);

  return (
    blockedNameSet.has(normalizedName) ||
    (normalizedHandle !== "" && blockedHandleSet.has(normalizedHandle))
  );
}

/**
 * @param {string[]} channelHandles
 * @returns {Promise<void>}
 */
async function rememberBlockedChannelHandles(channelHandles) {
  const normalizedHandles = [
    ...new Set(
      channelHandles
        .map((handle) => normalizeChannelHandle(handle))
        .filter((handle) => handle !== "")
    ),
  ];
  if (normalizedHandles.length === 0) return;

  const database = await openDB();
  await Promise.all(
    normalizedHandles.map(async (handle) => {
      await upsertBlobStringItemFront(database, "u", "channelAddresses", handle);
      await upsertBlockedChannelToStorage("urls", handle);
    })
  );
}

/**
 * @typedef {Object} ShortsItem
 * @property {string} channelName
 * @property {string} videoId
 * @property {string=} channelHandle
 */

/**
 * @typedef {Object} ShortsSaveData
 * @property {string} channelName
 * @property {string=} channelHandle
 * @property {boolean} blocked
 * @property {number=} missingAt
 */

/**
 * @typedef {Object} ResolverVideoItem
 * @property {string} videoId
 * @property {string} channelName
 * @property {string=} channelHandle
 */

/**
 * @typedef {Object} ResolverResponse
 * @property {boolean} ok
 * @property {ResolverVideoItem[]} found
 * @property {string[]=} missing
 */

/**
 * @typedef {Record<string, ShortsSaveData>} ShortsSaveDataMap
 */

/**
 * @param {{missingAt?: number}=} info
 * @returns {boolean}
 */
function isRecentMissingVideo(info) {
  const missingAt = Number(info?.missingAt || 0);
  return Number.isFinite(missingAt) && missingAt > 0 && Date.now() - missingAt < MISSING_VIDEO_TTL_MS;
}

/**
 * @param {{channelName?: string, channelHandle?: string, missingAt?: number}=} info
 * @returns {boolean}
 */
function isStaleMissingVideo(info) {
  const missingAt = Number(info?.missingAt || 0);
  if (!Number.isFinite(missingAt) || missingAt <= 0) return false;
  if (String(info?.channelName || "").trim()) return false;
  if (String(info?.channelHandle || "").trim()) return false;
  return Date.now() - missingAt >= MISSING_VIDEO_TTL_MS;
}

/**
 * @param {string[]} videoIds
 * @returns {Promise<ShortsItem[] | null>}
 */
export default async (videoIds) => {
  try {
    const isFetching = getIsFetching();
    if (isFetching) return null;
    changeIsFetching(true);

    if (!videoIds || videoIds.length === 0) return null;

    const channelNames = await getBlockedChannelNames();
    const channelHandles = await getBlockedChannelUrls();

    const blockedNameSet = new Set(
      channelNames.map((name) => normalizeChannelName(name))
    );
    const blockedHandleSet = new Set(
      channelHandles.map((handle) => normalizeChannelHandle(handle))
    );

    const knownVideosBefore = await getShortsData();

    for (const [videoId, video] of Object.entries(knownVideosBefore)) {
      const byName = blockedNameSet.has(normalizeChannelName(video.channelName));
      const byHandle = video?.channelHandle
        ? blockedHandleSet.has(normalizeChannelHandle(video.channelHandle))
        : false;

      if (byName || byHandle) {
        await setShortsVideoBlocked(videoId, true);
      }
    }

    const knownVideos = await getShortsData();

    const newVideoIds = videoIds.filter((videoId) => {
      const info = knownVideos[videoId];
      if (!info) return true;
      return isStaleMissingVideo(info);
    });
    const missingHandleVideoIds = channelHandles.length > 0
      ? videoIds.filter((videoId) => {
        const info = knownVideos[videoId];
        if (!info) return false;
        if (isRecentMissingVideo(info)) return false;
        return !String(info.channelHandle || "").trim();
      })
      : [];
    const idsToFetch = Array.from(new Set([...newVideoIds, ...missingHandleVideoIds]))
      .slice(0, MAX_RESOLVE_IDS_PER_REQUEST);

    videoIds.forEach((videoId) => {
      const info = knownVideos[videoId];
      if (info && info.blocked) {
        hideShortsByVideoId(videoId);
      }
    });

    if (idsToFetch.length === 0) {
      return null;
    }
    const requestKey = [...idsToFetch].sort().join(",");
    const now = Date.now();
    if (
      requestKey === lastResolveRequestKey &&
      now - lastResolveRequestAt < RESOLVE_REQUEST_COOLDOWN_MS
    ) {
      clearPendingThumbs(idsToFetch);
      return null;
    }
    lastResolveRequestKey = requestKey;
    lastResolveRequestAt = now;

    const resolverBaseUrl = String(import.meta.env.VITE_RESOLVER_API_BASE_URL || "https://twilight-cherry-8d84.dbkim2013.workers.dev")
      .replace(/\/+$/, "");
    const extensionToken = String(import.meta.env.VITE_EXTENSION_TOKEN || "").trim();
    const challenge = await requestResolverChallenge(resolverBaseUrl, extensionToken);

    const response = await fetch(
      `${resolverBaseUrl}/api/v1/videos/resolve`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-extension-token": extensionToken,
          "x-resolver-nonce": challenge.nonce,
          "x-resolver-expires-at": String(challenge.expiresAt),
          "x-resolver-signature": challenge.signature,
        },
        body: JSON.stringify({ videoIds: idsToFetch }),
      }
    );

    if (response.status === 401) {
      clearPendingThumbs(idsToFetch);
      throw new Error(
        "Resolver API auth failed (401): check VITE_EXTENSION_TOKEN and backend EXTENSION_SHARED_TOKEN are exactly the same."
      );
    }

    if (response.ok && response.status === 200) {
      responseCount += 1;

      /** @type {ResolverResponse} */
      const data = await response.json();
      const items = Array.isArray(data?.found) ? data.found : [];
      const missing = Array.isArray(data?.missing)
        ? data.missing.filter((videoId) => typeof videoId === "string")
        : [];

      /** @type {ShortsSaveDataMap} */
      const nextShortsData = {};
      /** @type {string[]} */
      const discoveredBlockedHandles = [];

      for (const item of items) {
        const videoId = item.videoId;
        const channelName = item.channelName || "";
        const channelHandle = normalizeChannelHandle(item.channelHandle || "");

        const blocked =
          isBlockedChannel(channelName, channelNames, channelHandles) ||
          (channelHandle !== "" && blockedHandleSet.has(channelHandle));

        nextShortsData[videoId] = {
          channelName,
          channelHandle,
          blocked,
        };

        if (blocked && channelHandle) {
          discoveredBlockedHandles.push(channelHandle);
        }
      }

      for (const videoId of missing) {
        nextShortsData[videoId] = {
          channelName: "",
          channelHandle: "",
          blocked: false,
          missingAt: Date.now(),
        };
      }

      const mergedShortsData = {
        ...knownVideos,
        ...nextShortsData,
      };
      await rememberBlockedChannelHandles(discoveredBlockedHandles);
      await saveShortsData(mergedShortsData);
      clearPendingThumbs(idsToFetch);

      /** @type {ShortsItem[]} */
      const shortsData = items.map((item) => {
        return {
          channelName: item.channelName || "",
          videoId: item.videoId,
          channelHandle: normalizeChannelHandle(item.channelHandle || ""),
        };
      });

      return shortsData;
    }

    clearPendingThumbs(idsToFetch);
    return null;
  } catch (err) {
    clearPendingThumbs();
    throw new Error(err instanceof Error ? err.message : String(err));
  } finally {
    changeIsFetching(false);
  }
};
