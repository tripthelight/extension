import { LIST_TAG } from "@/js/channelBlocker/contents/variables";

const PENDING_CLASS = "channel-blocker-pending";

const BROAD_CONTAINER_SELECTORS = [
  ".ytGridShelfViewModelGridShelfRow",
  "ytd-rich-item-renderer.ytd-rich-shelf-renderer",
];

const CARD_SELECTORS = LIST_TAG
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
 * @param {HTMLAnchorElement} anchor
 * @returns {HTMLElement|null}
 */
function findCardByAnchor(anchor) {
  if (location.pathname === "/") {
    const richItem = anchor.closest("ytd-rich-item-renderer");
    if (richItem instanceof HTMLElement) {
      return richItem;
    }
  }

  const card = anchor.closest(CARD_SELECTORS);
  return card instanceof HTMLElement ? card : null;
}

/**
 * @param {string[]} videoIds
 * @returns {void}
 */
export function markPendingThumbsByVideoIds(videoIds) {
  const idSet = new Set(videoIds.map((id) => String(id || "").trim()).filter(Boolean));
  if (idSet.size === 0) return;

  const anchors = document.querySelectorAll("a[href]");
  anchors.forEach((anchor) => {
    if (!(anchor instanceof HTMLAnchorElement)) return;

    const videoId = extractVideoIdFromHref(anchor.getAttribute("href") || "");
    if (!idSet.has(videoId)) return;

    const card = findCardByAnchor(anchor);
    if (card) {
      card.classList.add(PENDING_CLASS);
    }
  });
}

/**
 * @param {string[]=} videoIds
 * @returns {void}
 */
export function clearPendingThumbs(videoIds = []) {
  const idSet = new Set(videoIds.map((id) => String(id || "").trim()).filter(Boolean));
  const elements = document.querySelectorAll(`.${PENDING_CLASS}`);

  elements.forEach((element) => {
    if (!(element instanceof HTMLElement)) return;

    if (idSet.size === 0) {
      element.classList.remove(PENDING_CLASS);
      return;
    }

    const anchors = element.querySelectorAll("a[href]");
    const hasMatchingId = Array.from(anchors).some((anchor) => {
      const videoId = extractVideoIdFromHref(anchor.getAttribute("href") || "");
      return idSet.has(videoId);
    });

    if (hasMatchingId) {
      element.classList.remove(PENDING_CLASS);
    }
  });
}
