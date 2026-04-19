import { openDB } from "@/js/channelBlocker/contents/database";
import { DATAS, LIST_TAG } from "@/js/channelBlocker/contents/variables";
import { readBlobStringList } from "@/js/channelBlocker/contents/functions/database/blobStringListStore";
import hideShortsByVideoId from "@/js/channelBlocker/contents/functions/hideShortsByVideoId";
import { applyMainShortsBlockingClass } from "@/js/channelBlocker/contents/functions/normalizeMainShortsBlockingClasses";
import enforceShortsUndoOverlay from "@/js/channelBlocker/contents/functions/shortsUndoOverlay";

/**
 * @param {string} href
 * @returns {string|null}
 */
function extractVideoIdFromHref(href) {
  const watchVideoId = href.match(/[?&]v=([^&]+)/)?.[1] ?? null;
  if (watchVideoId) return watchVideoId;

  const shortsVideoId = href.match(/\/shorts\/([^?&/]+)/)?.[1] ?? null;
  return shortsVideoId;
}

/**
 * @returns {Element[]}
 */
function getCandidateElements() {
  const selector = LIST_TAG.join(",");
  return [...document.querySelectorAll(selector)].filter((element) => {
    if (!(element instanceof Element)) return false;
    if (element.matches(".ytGridShelfViewModelGridShelfRow")) return false;
    if (element.matches("ytd-rich-item-renderer.ytd-rich-shelf-renderer")) return false;
    return true;
  });
}

/**
 * @returns {boolean}
 */
function isMainPage() {
  return location.pathname === "/";
}

/**
 * @param {Element} element
 * @returns {boolean}
 */
function isMainShortsRichItem(element) {
  return (
    isMainPage() &&
    element.matches("ytd-rich-item-renderer") &&
    element.querySelector("a[href*='/shorts/']") !== null
  );
}

/**
 * @param {Element} element
 * @returns {boolean}
 */
function isMainShortsInnerItem(element) {
  if (!isMainPage()) return false;
  if (element.matches("ytd-rich-item-renderer")) return false;

  const richItem = element.closest("ytd-rich-item-renderer");
  return richItem instanceof HTMLElement && richItem.querySelector("a[href*='/shorts/']") !== null;
}

/**
 * @param {Element} element
 * @returns {number}
 */
function countDistinctVideoIds(element) {
  const anchors = [...element.querySelectorAll("a")];
  const ids = new Set();

  anchors.forEach((anchor) => {
    const href = anchor.getAttribute("href") || "";
    const id = extractVideoIdFromHref(href);
    if (id) ids.add(id);
  });

  return ids.size;
}

/**
 * @param {Element} element
 * @param {Set<string>} videoIdSet
 * @returns {boolean}
 */
function hasBlockedVideoId(element, videoIdSet) {
  const anchors = [...element.querySelectorAll("a")];

  return anchors.some((anchor) => {
    const href = anchor.getAttribute("href") || "";
    const videoId = extractVideoIdFromHref(href);
    return videoId !== null && videoIdSet.has(videoId);
  });
}

/**
 * @param {Set<string>} videoIdSet
 * @returns {void}
 */
function applyBlockingClass(videoIdSet) {
  const elements = getCandidateElements();

  elements.forEach((element) => {
    if (
      isMainShortsInnerItem(element) &&
      hasBlockedVideoId(element, videoIdSet) &&
      element.closest("ytd-rich-item-renderer") !== element
    ) {
      return;
    }

    // Ignore broad containers to avoid removing an entire Shorts row.
    if (countDistinctVideoIds(element) > 1) {
      return;
    }

    if (hasBlockedVideoId(element, videoIdSet)) {
      element.classList.remove("channel-blocker-pending");

      if (isMainShortsRichItem(element)) {
        applyMainShortsBlockingClass(element);
        return;
      }

      element.classList.add("blocking-recomn");
    }
  });
}

/**
 * @returns {Promise<void>}
 */
export async function addBlockingRecommendClass() {
  if (location.pathname.startsWith(DATAS.views.shorts.path)) {
    await enforceShortsUndoOverlay();
    return;
  }

  const activeDb = await openDB();
  const videoIds = await readBlobStringList(activeDb, "i", "videoIds");
  if (videoIds.length === 0) return;

  const videoIdSet = new Set(videoIds);
  videoIds.forEach((videoId) => {
    hideShortsByVideoId(videoId);
  });
  applyBlockingClass(videoIdSet);
}
