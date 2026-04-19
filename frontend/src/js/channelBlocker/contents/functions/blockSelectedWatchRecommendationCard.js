import { getRecentContextMenuWatchRecommendationCard } from "@/js/channelBlocker/contents/functions/contextMenuTargetStore";
import extractChannelDataFromCard from "@/js/channelBlocker/contents/functions/extractChannelDataFromCard";
import {
  buildBlockedChannelMatcher,
  isBlockedChannelData,
} from "@/js/channelBlocker/common/channelBlockMatcher";

const WATCH_RECOMMEND_CARD_SELECTOR = "yt-lockup-view-model";
const WATCH_SHORTS_CARD_SELECTOR = "ytm-shorts-lockup-view-model-v2.shortsLockupViewModelHost";
const WATCH_CARD_SELECTORS = [
  WATCH_SHORTS_CARD_SELECTOR,
  WATCH_RECOMMEND_CARD_SELECTOR,
].join(",");

/**
 * @returns {HTMLElement[]}
 */
function getWatchCards() {
  return [
    ...document.querySelectorAll(WATCH_SHORTS_CARD_SELECTOR),
    ...document.querySelectorAll(WATCH_RECOMMEND_CARD_SELECTOR),
  ].filter((card) => card instanceof HTMLElement);
}

/**
 * @param {string} href
 * @returns {string}
 */
function extractVideoId(href) {
  const value = String(href || "");

  const watchMatch = value.match(/[?&]v=([^&#]+)/);
  if (watchMatch && watchMatch[1]) return watchMatch[1].trim();

  const shortsMatch = value.match(/\/shorts\/([^/?&#]+)/);
  if (shortsMatch && shortsMatch[1]) return shortsMatch[1].trim();

  const ytimgMatch = value.match(/\/vi(?:_webp)?\/([^/?#]+)/);
  if (ytimgMatch && ytimgMatch[1]) return ytimgMatch[1].trim();

  return "";
}

/**
 * @param {Element} card
 * @param {string} videoId
 * @returns {boolean}
 */
function hasVideoId(card, videoId) {
  const elements = card.querySelectorAll("a[href],img[src],source[src],video[poster]");

  return Array.from(elements).some((element) => {
    const value =
      element.getAttribute("href") ||
      element.getAttribute("src") ||
      element.getAttribute("poster") ||
      "";

    return extractVideoId(value) === videoId;
  });
}

/**
 * @param {string} videoId
 * @returns {HTMLElement|null}
 */
function findWatchRecommendationCard(videoId) {
  const normalized = String(videoId || "").trim();
  if (location.pathname !== "/watch") return null;

  const recentContextMenuCard = getRecentContextMenuWatchRecommendationCard();
  if (recentContextMenuCard?.matches(WATCH_CARD_SELECTORS)) {
    return recentContextMenuCard;
  }

  if (!normalized) return null;

  const cards = getWatchCards();

  for (const card of cards) {
    if (hasVideoId(card, normalized)) {
      return card;
    }
  }

  return null;
}

/**
 * @param {string} fallbackVideoId
 * @returns {string}
 */
function getSelectedWatchRecommendationVideoId(fallbackVideoId = "") {
  if (location.pathname !== "/watch") {
    return String(fallbackVideoId || "").trim();
  }

  const recentContextMenuCard = getRecentContextMenuWatchRecommendationCard();
  if (recentContextMenuCard?.matches(WATCH_CARD_SELECTORS)) {
    const elements = recentContextMenuCard.querySelectorAll("a[href],img[src],source[src],video[poster]");

    for (const element of elements) {
      const value =
        element.getAttribute("href") ||
        element.getAttribute("src") ||
        element.getAttribute("poster") ||
        "";
      const videoId = extractVideoId(value);
      if (videoId) return videoId;
    }
  }

  return String(fallbackVideoId || "").trim();
}

/**
 * @param {HTMLElement} card
 * @returns {void}
 */
function applyWatchCardBlockingClass(card) {
  if (card.matches(WATCH_SHORTS_CARD_SELECTOR)) {
    card.classList.add("blocking-channel");
    card.classList.remove("blocking-recomn");
    return;
  }

  card.classList.add("blocking-recomn");
  card.classList.remove("blocking-channel");
}

/**
 * @param {string} videoId
 * @returns {boolean}
 */
export default function blockSelectedWatchRecommendationCard(videoId) {
  const card = findWatchRecommendationCard(videoId);
  if (!card) return false;

  applyWatchCardBlockingClass(card);
  return true;
}

/**
 * @param {string} channelName
 * @returns {number}
 */
function blockWatchRecommendationCardsByChannelName(channelName) {
  const normalizedChannelName = String(channelName || "").trim();
  if (!normalizedChannelName || location.pathname !== "/watch") return 0;

  let blockedCount = 0;
  const cards = getWatchCards();
  const matcher = buildBlockedChannelMatcher([normalizedChannelName], []);

  cards.forEach((card) => {
    if (
      card.matches(WATCH_RECOMMEND_CARD_SELECTOR) &&
      card.querySelector(WATCH_SHORTS_CARD_SELECTOR)
    ) {
      return;
    }

    if (!isBlockedChannelData(extractChannelDataFromCard(card), matcher)) return;

    applyWatchCardBlockingClass(card);
    blockedCount += 1;
  });

  return blockedCount;
}

export { blockWatchRecommendationCardsByChannelName, getSelectedWatchRecommendationVideoId };
