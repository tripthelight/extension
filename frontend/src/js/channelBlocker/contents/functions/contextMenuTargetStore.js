const WATCH_RECOMMEND_CARD_SELECTOR = "yt-lockup-view-model";
const WATCH_SHORTS_CARD_SELECTOR = "ytm-shorts-lockup-view-model-v2.shortsLockupViewModelHost";
const RECENT_TARGET_TTL_MS = 15000;

/** @type {{ card: HTMLElement | null, capturedAt: number }} */
const lastContextMenuTarget = {
  card: null,
  capturedAt: 0,
};

/**
 * @param {EventTarget|null} target
 * @returns {HTMLElement|null}
 */
function findWatchRecommendationCardFromTarget(target) {
  if (!(target instanceof Element)) return null;

  const shortsCard = target.closest(WATCH_SHORTS_CARD_SELECTOR);
  if (shortsCard instanceof HTMLElement) return shortsCard;

  const recommendCard = target.closest(WATCH_RECOMMEND_CARD_SELECTOR);
  return recommendCard instanceof HTMLElement ? recommendCard : null;
}

/**
 * @param {Event} event
 * @returns {void}
 */
export function rememberContextMenuTarget(event) {
  const card = findWatchRecommendationCardFromTarget(event.target);

  lastContextMenuTarget.card = card;
  lastContextMenuTarget.capturedAt = card ? Date.now() : 0;
}

/**
 * @returns {HTMLElement|null}
 */
export function getRecentContextMenuWatchRecommendationCard() {
  const card = lastContextMenuTarget.card;
  if (!card) return null;
  if (!card.isConnected) return null;
  if (Date.now() - lastContextMenuTarget.capturedAt > RECENT_TARGET_TTL_MS) {
    return null;
  }

  return card;
}
