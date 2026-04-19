import { LIST_TAG } from "@/js/channelBlocker/contents/variables";
import { applyMainShortsBlockingClass } from "@/js/channelBlocker/contents/functions/normalizeMainShortsBlockingClasses";

const BROAD_CONTAINER_SELECTORS = [
  ".ytGridShelfViewModelGridShelfRow",
  "ytd-rich-item-renderer.ytd-rich-shelf-renderer",
];

const CARD_SELECTOR = LIST_TAG
  .filter((selector) => !BROAD_CONTAINER_SELECTORS.includes(selector))
  .join(",");

/**
 * @param {string} href
 * @returns {string}
 */
function extractVideoIdFromHref(href) {
  const value = String(href || "");
  return value.match(/[?&]v=([^&#]+)/)?.[1]?.trim() ||
    value.match(/\/shorts\/([^/?&#]+)/)?.[1]?.trim() ||
    "";
}

/**
 * @returns {boolean}
 */
function isMainPage() {
  return location.pathname === "/";
}

/**
 * @param {Element} element
 * @returns {number}
 */
function countDistinctVideoIds(element) {
  const ids = new Set();
  element.querySelectorAll("a[href]").forEach((anchor) => {
    const href = anchor.getAttribute("href") || "";
    const id = extractVideoIdFromHref(href);
    if (id) ids.add(id);
  });
  return ids.size;
}

/**
 * @param {HTMLAnchorElement} anchor
 * @returns {HTMLElement|null}
 */
function findCardByAnchor(anchor) {
  if (isMainPage()) {
    const mainCard = anchor.closest("ytd-rich-item-renderer");
    if (mainCard instanceof HTMLElement) {
      return mainCard;
    }
  }

  const card = anchor.closest(CARD_SELECTOR);
  if (!(card instanceof HTMLElement)) return null;
  if (BROAD_CONTAINER_SELECTORS.some((selector) => card.matches(selector))) return null;
  if (countDistinctVideoIds(card) > 1) return null;

  return card;
}

/**
 * @param {HTMLElement} card
 * @returns {void}
 */
function hideCard(card) {
  card.classList.remove("channel-blocker-pending");

  if (isMainPage() && card.querySelector("a[href*='/shorts/']")) {
    applyMainShortsBlockingClass(card);
    return;
  }

  card.classList.add("blocking-recomn");
}

/**
 * Hide visible video/shorts cards that contain one videoId.
 *
 * @param {string} videoId
 * @returns {number}
 */
export default function hideVideoCardsByVideoId(videoId) {
  const normalized = String(videoId || "").trim();
  if (!normalized) return 0;

  const cards = new Set();
  document.querySelectorAll("a[href]").forEach((anchor) => {
    if (!(anchor instanceof HTMLAnchorElement)) return;

    const href = anchor.getAttribute("href") || anchor.href || "";
    if (extractVideoIdFromHref(href) !== normalized) return;

    const card = findCardByAnchor(anchor);
    if (card) cards.add(card);
  });

  cards.forEach((card) => hideCard(card));
  return cards.size;
}
