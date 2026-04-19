import hideShortsByVideoId from "@/js/channelBlocker/contents/functions/hideShortsByVideoId";
import { applyMainShortsBlockingClass } from "@/js/channelBlocker/contents/functions/normalizeMainShortsBlockingClasses";
import { normalizeChannelAddress } from "@/js/channelBlocker/common/channelAddress";

/**
 * Shorts item
 * @typedef {Object} ShortsItem
 * @property {string} channelName
 * @property {string} videoId
 * @property {string=} channelHandle
 */

/**
 * @param {string} raw
 * @returns {string}
 */
function normalizeHandle(raw) {
  return normalizeChannelAddress(raw).toLowerCase();
}

/**
 * @param {string} href
 * @returns {string}
 */
function extractHandleFromHref(href) {
  return normalizeHandle(href);
}

/**
 * @returns {boolean}
 */
function isMainPage() {
  return location.pathname === "/";
}

/**
 * @param {Element} anchor
 * @param {string} cardSelectors
 * @returns {HTMLElement|null}
 */
function findBlockedShortsCard(anchor, cardSelectors) {
  if (isMainPage()) {
    const mainRichItem = anchor.closest("ytd-rich-item-renderer");
    if (!(mainRichItem instanceof HTMLElement)) return null;
    return mainRichItem.querySelector("a[href*='/shorts/']") ? mainRichItem : null;
  }

  const card = anchor.closest(cardSelectors);
  return card instanceof HTMLElement ? card : null;
}

/**
 * @param {HTMLElement} card
 * @returns {void}
 */
function addBlockedShortsClasses(card) {
  card.classList.remove("channel-blocker-pending");

  if (isMainPage()) {
    applyMainShortsBlockingClass(card);
    return;
  }

  card.classList.add("blocking-channel");
  card.classList.add("blocking-recomn");
}

/**
 * @param {string[]} channelNames
 * @param {ShortsItem[]} requestData
 * @param {string[]=} channelHandles
 * @returns {void}
 */
export default function blockShortsByChannelNames(channelNames, requestData, channelHandles = []) {
  const blockedNameSet = new Set(
    channelNames
      .map((name) => String(name || "").trim().toLowerCase())
      .filter((name) => name !== "")
  );

  const blockedHandleSet = new Set(
    channelHandles
      .map((handle) => normalizeHandle(handle))
      .filter((handle) => handle !== "")
  );

  const blockedVideoIds = requestData
    .filter((item) => {
      const byName = blockedNameSet.has(String(item.channelName || "").trim().toLowerCase());
      const byHandle = item?.channelHandle
        ? blockedHandleSet.has(normalizeHandle(item.channelHandle))
        : false;
      return byName || byHandle;
    })
    .map((item) => item.videoId);
  blockedVideoIds.forEach((videoId) => {
    hideShortsByVideoId(videoId);
  });

  if (blockedHandleSet.size === 0) {
    return;
  }

  const cardSelectors = [
    "ytm-shorts-lockup-view-model-v2",
    ".ytGridShelfViewModelGridShelfItem",
    "yt-lockup-view-model",
    "ytd-rich-item-renderer",
    "ytd-video-renderer",
    "ytd-grid-video-renderer",
  ].join(",");
  const anchors = document.querySelectorAll("a[href]");

  anchors.forEach((anchor) => {
    const href = anchor.getAttribute("href") || "";
    const hrefHandle = extractHandleFromHref(href);

    const anchorText = anchor.textContent?.trim() ?? "";
    const textHandle = anchorText.startsWith("@")
      ? normalizeHandle(anchorText)
      : "";

    if (
      (hrefHandle && blockedHandleSet.has(hrefHandle)) ||
      (textHandle && blockedHandleSet.has(textHandle))
    ) {
      const card = findBlockedShortsCard(anchor, cardSelectors);
      if (card) {
        addBlockedShortsClasses(card);
      }
    }
  });
}
