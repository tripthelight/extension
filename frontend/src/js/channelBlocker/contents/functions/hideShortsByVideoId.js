import { applyMainShortsBlockingClass } from "@/js/channelBlocker/contents/functions/normalizeMainShortsBlockingClasses";

const PREFERRED_SHORTS_WRAPPER_SELECTORS = [
  ".ytGridShelfViewModelGridShelfItem",
  "ytd-rich-item-renderer",
];

const FALLBACK_SHORTS_CARD_SELECTORS = [
  "ytm-shorts-lockup-view-model-v2",
  "yt-lockup-view-model",
  "ytd-video-renderer",
  "ytd-grid-video-renderer",
].join(",");

const BROAD_SHORTS_CONTAINERS = [
  ".ytGridShelfViewModelGridShelfRow",
  "ytd-rich-item-renderer.ytd-rich-shelf-renderer",
];

/**
 * @returns {boolean}
 */
function isMainPage() {
  return location.pathname === "/";
}

/**
 * @param {string} href
 * @returns {string}
 */
function extractShortsVideoId(href) {
  const value = String(href || "");
  const matched = value.match(/\/shorts\/([^/?&#]+)/);
  return matched && matched[1] ? matched[1].trim() : "";
}

/**
 * @param {Element|null} element
 * @returns {boolean}
 */
function isBroadShortsContainer(element) {
  return (
    element instanceof Element &&
    BROAD_SHORTS_CONTAINERS.some((selector) => element.matches(selector))
  );
}

/**
 * @param {HTMLAnchorElement} anchor
 * @returns {HTMLElement|null}
 */
function findShortsCardByAnchor(anchor) {
  if (isMainPage()) {
    const mainRichItem = anchor.closest("ytd-rich-item-renderer");
    if (mainRichItem instanceof HTMLElement) {
      return mainRichItem;
    }
  }

  for (const selector of PREFERRED_SHORTS_WRAPPER_SELECTORS) {
    const preferred = anchor.closest(selector);
    if (preferred instanceof HTMLElement && !isBroadShortsContainer(preferred)) {
      return preferred;
    }
  }

  const fallback = anchor.closest(FALLBACK_SHORTS_CARD_SELECTORS);
  if (fallback instanceof HTMLElement && !isBroadShortsContainer(fallback)) {
    return fallback;
  }

  let current = anchor.parentElement;
  while (current && current !== document.body) {
    if (
      current.matches(FALLBACK_SHORTS_CARD_SELECTORS) &&
      !isBroadShortsContainer(current)
    ) {
      return current;
    }
    current = current.parentElement;
  }

  return null;
}

/**
 * @param {HTMLElement} element
 * @returns {void}
 */
function hideShortsCard(element) {
  element.classList.remove("channel-blocker-pending");

  if (isMainPage()) {
    applyMainShortsBlockingClass(element);
    return;
  }

  element.classList.add("blocking-channel");
  element.classList.add("blocking-recomn");
}

/**
 * Hide only shorts-card-level nodes for one videoId.
 *
 * @param {string} videoId
 * @returns {number}
 */
export default function hideShortsByVideoId(videoId) {
  const normalized = String(videoId || "").trim();
  if (!normalized) return 0;

  const anchors = document.querySelectorAll("a[href*='/shorts/']");
  const cards = new Set();

  anchors.forEach((anchor) => {
    if (!(anchor instanceof HTMLAnchorElement)) return;

    const anchorVideoId = extractShortsVideoId(anchor.getAttribute("href") || "");
    if (anchorVideoId !== normalized) return;

    const card = findShortsCardByAnchor(anchor);
    if (card) {
      cards.add(card);
    }
  });

  cards.forEach((card) => hideShortsCard(card));
  return cards.size;
}
