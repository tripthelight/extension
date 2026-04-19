import { DATAS, LIST_TAG } from "@/js/channelBlocker/contents/variables";

import removeBlockerShortsPage from "@/js/channelBlocker/contents/functions/removeBlockerShortsPage";
import removeBlockerThumbChannelPage from "@/js/channelBlocker/contents/functions/removeBlockerThumbChannelPage";
import getShortsVideoIds from "@/js/channelBlocker/contents/functions/getShortsVideoIds";
import responseShortsData from "@/js/channelBlocker/contents/functions/fetch/responseShortsData";
import addBlockingChannelClass from "@/js/channelBlocker/contents/functions/addBlockingChannelClass";
import hideShortsByVideoId from "@/js/channelBlocker/contents/functions/hideShortsByVideoId";
import getBlockedChannelNames from "@/js/channelBlocker/contents/functions/database/getBlockedChannelNames";
import getBlockedChannelUrls from "@/js/channelBlocker/contents/functions/database/getBlockedChannelUrls";
import { getShortsData } from "@/js/channelBlocker/contents/functions/database/ShortsDataDB";
import { applyMainShortsBlockingClass } from "@/js/channelBlocker/contents/functions/normalizeMainShortsBlockingClasses";

/**
 * @param {string} href
 * @returns {string}
 */
function extractChannelAddressFromHref(href) {
  let decoded = String(href || "");
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    decoded = String(href || "");
  }

  const matched = decoded.match(/@([^/?#\s]+)/);
  return matched && matched[1] ? matched[1].trim() : "";
}

/**
 * @typedef {Object} ShortsItem
 * @property {string} channelName
 * @property {string} videoId
 * @property {string=} channelHandle
 */

function isShortsPage() {
  return location.pathname.startsWith(DATAS.views.shorts.path);
}

function isChannelPage() {
  return (
    location.pathname.startsWith("/@") ||
    location.pathname.startsWith("/channel/")
  );
}

/**
 * @param {string} value
 * @returns {string}
 */
function normalizeLower(value) {
  return String(value || "").trim().toLowerCase();
}

/**
 * @param {string} value
 * @returns {string}
 */
function normalizeHandle(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";

  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    decoded = raw;
  }

  const matched = decoded.match(/@([^/?#\s]+)/);
  if (matched && matched[1]) {
    return matched[1].trim().toLowerCase();
  }

  return decoded.replace(/^\/+/, "").replace(/^@/, "").trim().toLowerCase();
}

/**
 * @returns {boolean}
 */
function isMainPage() {
  return location.pathname === "/";
}

/**
 * @param {HTMLElement} item
 * @returns {boolean}
 */
function isMainShortsRichItem(item) {
  return (
    isMainPage() &&
    item.matches("ytd-rich-item-renderer") &&
    item.querySelector("a[href*='/shorts/']") !== null
  );
}

/**
 * @param {HTMLElement} item
 * @returns {boolean}
 */
function isMainShortsInnerItem(item) {
  if (!isMainPage()) return false;
  if (item.matches("ytd-rich-item-renderer")) return false;

  const richItem = item.closest("ytd-rich-item-renderer");
  return richItem instanceof HTMLElement && richItem.querySelector("a[href*='/shorts/']") !== null;
}

/**
 * @param {HTMLElement} item
 * @returns {boolean}
 */
function isWatchShortsCard(item) {
  return (
    location.pathname === DATAS.views.watch.path &&
    item.matches("ytm-shorts-lockup-view-model-v2.shortsLockupViewModelHost")
  );
}

/**
 * @param {string[]} channelNames
 * @param {string[]} channelHandles
 * @returns {void}
 */
function blockLongFormItems(channelNames, channelHandles) {
  const listSelector = LIST_TAG.join(",");
  const items = document.querySelectorAll(listSelector);
  const blockedHandles = new Set(
    channelHandles
      .map((handle) => String(handle || "").trim())
      .filter((handle) => handle !== "")
  );

  for (const item of items) {
    if (!(item instanceof HTMLElement)) continue;
    if (isMainShortsInnerItem(item)) continue;

    const text = item.textContent?.trim() ?? "";

    const hasChannelName = channelNames.some((channelName) =>
      text.includes(channelName)
    );

    let hasChannelHandle = false;
    if (blockedHandles.size > 0) {
      const anchors = item.querySelectorAll("a[href]");
      hasChannelHandle = Array.from(anchors).some((anchor) => {
        const href = anchor.getAttribute("href") || "";
        const address = extractChannelAddressFromHref(href);
        if (!address) return false;
        return blockedHandles.has(address);
      });
    }

    if (hasChannelName || hasChannelHandle) {
      item.classList.remove("channel-blocker-pending");

      if (isWatchShortsCard(item)) {
        item.classList.add("blocking-channel");
        item.classList.remove("blocking-recomn");
        continue;
      }

      if (isMainShortsRichItem(item)) {
        applyMainShortsBlockingClass(item);
        continue;
      }

      item.classList.add("blocking-recomn");
    }
  }
}

/**
 * @param {string[]} channelNames
 * @param {string[]} channelHandles
 * @returns {Promise<void>}
 */
async function blockShortsItems(channelNames, channelHandles) {
  const shortsVideoIds = getShortsVideoIds();
  if (!shortsVideoIds || shortsVideoIds.length === 0) {
    return;
  }

  /** @type {ShortsItem[]} */
  let shortsData = [];

  const knownVideos = await getShortsData();
  const blockedNameSet = new Set(channelNames.map((name) => normalizeLower(name)));
  const blockedHandleSet = new Set(
    channelHandles
      .map((handle) => normalizeHandle(handle))
      .filter((handle) => handle !== "")
  );

  for (const videoId of shortsVideoIds) {
    const known = knownVideos[videoId];
    if (!known) continue;

    const byName = blockedNameSet.has(normalizeLower(known.channelName));
    const byHandle = known.channelHandle
      ? blockedHandleSet.has(normalizeHandle(known.channelHandle))
      : false;

    if (known.blocked || byName || byHandle) {
      hideShortsByVideoId(videoId);
      shortsData.push({
        videoId,
        channelName: String(known.channelName || ""),
        channelHandle: String(known.channelHandle || ""),
      });
    }
  }

  const fetched = await responseShortsData(shortsVideoIds);
  if (Array.isArray(fetched) && fetched.length > 0) {
    const byVideoId = new Map(shortsData.map((item) => [item.videoId, item]));
    fetched.forEach((item) => {
      byVideoId.set(item.videoId, item);
    });
    shortsData = [...byVideoId.values()];
  }

  addBlockingChannelClass(channelNames, shortsData, channelHandles);
}

export async function runChannelBlocker() {
  try {
    if (isShortsPage()) {
      await removeBlockerShortsPage();
      return;
    }

    if (isChannelPage()) {
      removeBlockerThumbChannelPage();
      return;
    }

    const channelNames = await getBlockedChannelNames();
    const channelHandles = await getBlockedChannelUrls();

    if (channelNames.length === 0 && channelHandles.length === 0) {
      return;
    }

    blockLongFormItems(channelNames, channelHandles);
    await blockShortsItems(channelNames, channelHandles);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`runChannelBlocker failed: ${message}`);
  }
}
