import { DATAS, LIST_TAG } from "@/js/channelBlocker/contents/variables";

import removeBlockerShortsPage from "@/js/channelBlocker/contents/functions/removeBlockerShortsPage";
import removeBlockerThumbChannelPage from "@/js/channelBlocker/contents/functions/removeBlockerThumbChannelPage";
import getShortsVideoIds from "@/js/channelBlocker/contents/functions/getShortsVideoIds";
import responseShortsData from "@/js/channelBlocker/contents/functions/fetch/responseShortsData";
import addBlockingChannelClass from "@/js/channelBlocker/contents/functions/addBlockingChannelClass";
import hideShortsByVideoId, {
  isShortsVideoIdHidden,
} from "@/js/channelBlocker/contents/functions/hideShortsByVideoId";
import getBlockedChannelNames from "@/js/channelBlocker/contents/functions/database/getBlockedChannelNames";
import getBlockedChannelUrls from "@/js/channelBlocker/contents/functions/database/getBlockedChannelUrls";
import { getShortsData } from "@/js/channelBlocker/contents/functions/database/ShortsDataDB";
import { applyMainShortsBlockingClass } from "@/js/channelBlocker/contents/functions/normalizeMainShortsBlockingClasses";
import extractChannelDataFromCard from "@/js/channelBlocker/contents/functions/extractChannelDataFromCard";
import {
  buildBlockedChannelMatcher,
  isBlockedChannelData,
} from "@/js/channelBlocker/common/channelBlockMatcher";

const BROAD_CONTAINER_SELECTORS = [
  ".ytGridShelfViewModelGridShelfRow",
  "ytd-rich-item-renderer.ytd-rich-shelf-renderer",
];

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
 * @param {HTMLElement} item
 * @returns {boolean}
 */
function isBroadContainer(item) {
  return BROAD_CONTAINER_SELECTORS.some((selector) => item.matches(selector));
}

/**
 * @param {string[]} channelNames
 * @param {string[]} channelHandles
 * @returns {void}
 */
function blockLongFormItems(channelNames, channelHandles) {
  const listSelector = LIST_TAG.join(",");
  const items = document.querySelectorAll(listSelector);
  const matcher = buildBlockedChannelMatcher(channelNames, channelHandles);

  for (const item of items) {
    if (!(item instanceof HTMLElement)) continue;
    if (isBroadContainer(item)) continue;
    if (isMainShortsInnerItem(item)) continue;

    const channelData = extractChannelDataFromCard(item);
    if (isBlockedChannelData(channelData, matcher)) {
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
  const matcher = buildBlockedChannelMatcher(channelNames, channelHandles);

  for (const videoId of shortsVideoIds) {
    const known = knownVideos[videoId];
    if (!known) continue;

    const blockedByRule = isBlockedChannelData(
      {
        channelName: known.channelName,
        channelHandle: known.channelHandle,
      },
      matcher
    );

    if (known.blocked || blockedByRule) {
      hideShortsByVideoId(videoId);
      shortsData.push({
        videoId,
        channelName: String(known.channelName || ""),
        channelHandle: String(known.channelHandle || ""),
      });
    }
  }

  addBlockingChannelClass(channelNames, shortsData, channelHandles);

  const idsToResolve = shortsVideoIds.filter(
    (videoId) => !isShortsVideoIdHidden(videoId)
  );
  const fetched = await responseShortsData(idsToResolve);
  if (Array.isArray(fetched) && fetched.length > 0) {
    const byVideoId = new Map(shortsData.map((item) => [item.videoId, item]));
    fetched.forEach((item) => {
      byVideoId.set(item.videoId, item);
    });
    shortsData = [...byVideoId.values()];
    addBlockingChannelClass(channelNames, shortsData, channelHandles);
  }
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
