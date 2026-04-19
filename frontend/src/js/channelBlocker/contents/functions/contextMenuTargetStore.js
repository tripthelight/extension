const CARD_SELECTOR = [
  "ytd-rich-item-renderer",
  "ytd-video-renderer",
  "ytd-grid-video-renderer",
  "yt-lockup-view-model",
  "ytm-shorts-lockup-view-model-v2.shortsLockupViewModelHost",
  ".ytGridShelfViewModelGridShelfItem",
  "ytd-playlist-panel-video-renderer",
].join(",");
const RECENT_TARGET_TTL_MS = 15000;

/** @type {{ card: HTMLElement | null, capturedAt: number }} */
const lastContextMenuTarget = {
  card: null,
  capturedAt: 0,
};

/** @type {{ card: HTMLElement | null, capturedAt: number }} */
const lastMenuTarget = {
  card: null,
  capturedAt: 0,
};

/**
 * @param {EventTarget|null} target
 * @returns {HTMLElement|null}
 */
function findCardFromTarget(target) {
  if (!(target instanceof Element)) return null;

  const card = target.closest(CARD_SELECTOR);
  return card instanceof HTMLElement ? card : null;
}

/**
 * @param {{ card: HTMLElement | null, capturedAt: number }} targetStore
 * @returns {HTMLElement|null}
 */
function getRecentCard(targetStore) {
  const card = targetStore.card;
  if (!card) return null;
  if (!card.isConnected) return null;
  if (Date.now() - targetStore.capturedAt > RECENT_TARGET_TTL_MS) {
    return null;
  }

  return card;
}

/**
 * @param {Event} event
 * @returns {void}
 */
export function rememberContextMenuTarget(event) {
  const card = findCardFromTarget(event.target);

  lastContextMenuTarget.card = card;
  lastContextMenuTarget.capturedAt = card ? Date.now() : 0;
}

/**
 * @param {EventTarget|null} target
 * @returns {void}
 */
export function rememberMenuTarget(target) {
  const card = findCardFromTarget(target);
  if (!card) return;

  lastMenuTarget.card = card;
  lastMenuTarget.capturedAt = Date.now();
}

/**
 * @returns {HTMLElement|null}
 */
export function getRecentContextMenuWatchRecommendationCard() {
  return getRecentCard(lastContextMenuTarget);
}

/**
 * @returns {HTMLElement|null}
 */
export function getRecentMenuTargetCard() {
  return getRecentCard(lastMenuTarget);
}
