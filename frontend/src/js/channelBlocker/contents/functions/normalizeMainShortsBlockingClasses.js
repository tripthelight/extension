const MAIN_SHORTS_CARD_SELECTOR = "ytd-rich-item-renderer";
const MAIN_SHORTS_INNER_SELECTOR = "ytm-shorts-lockup-view-model-v2";
const BLOCKING_SELECTOR = ".blocking-channel,.blocking-recomn";

/**
 * @returns {boolean}
 */
function isMainPage() {
  return location.pathname === "/";
}

/**
 * @param {Element} element
 * @returns {HTMLElement|null}
 */
function findMainShortsCard(element) {
  const card = element.closest(MAIN_SHORTS_CARD_SELECTOR);
  if (!(card instanceof HTMLElement)) return null;
  return card;
}

/**
 * @param {Element} target
 * @returns {boolean}
 */
function applyMainShortsBlockingClass(target) {
  const card = findMainShortsCard(target);
  if (!card) return false;

  card.querySelectorAll(BLOCKING_SELECTOR).forEach((child) => {
    child.classList.remove("blocking-channel", "blocking-recomn");
  });

  card.classList.add("blocking-channel");
  card.classList.remove("blocking-recomn");
  return true;
}

/**
 * Move accidental blocking classes from YouTube's inner Shorts component to
 * the main page list item that owns the thumbnail.
 *
 * @param {ParentNode=} root
 * @returns {number}
 */
export default function normalizeMainShortsBlockingClasses(root = document) {
  if (!isMainPage()) return 0;

  const scopedRoot = root instanceof Element || root instanceof Document
    ? root
    : document;
  const movedCards = new Set();

  if (
    scopedRoot instanceof Element &&
    scopedRoot.matches(MAIN_SHORTS_INNER_SELECTOR) &&
    scopedRoot.matches(BLOCKING_SELECTOR)
  ) {
    const card = findMainShortsCard(scopedRoot);
    if (card) movedCards.add(card);
  }

  scopedRoot
    .querySelectorAll(`${MAIN_SHORTS_INNER_SELECTOR}${BLOCKING_SELECTOR}`)
    .forEach((inner) => {
      const card = findMainShortsCard(inner);
      if (card) movedCards.add(card);
    });

  movedCards.forEach((card) => applyMainShortsBlockingClass(card));
  return movedCards.size;
}

export { applyMainShortsBlockingClass, findMainShortsCard };
