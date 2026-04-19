/**
 * @typedef {Object} CardChannelData
 * @property {string} channelName
 * @property {string} channelUrl
 */

const CHANNEL_NAME_SELECTORS = [
  "ytd-channel-name yt-formatted-string",
  "#channel-name yt-formatted-string",
  "yt-formatted-string.ytd-channel-name",
  ".ytd-channel-name",
  ".yt-lockup-metadata-view-model-wiz__metadata a[href*='/@']",
  ".yt-lockup-metadata-view-model-wiz__metadata a[href*='/channel/']",
  "a[href^='/@']",
  "a[href*='youtube.com/@']",
  "a[href^='/channel/']",
  "a[href*='youtube.com/channel/']",
];

const CHANNEL_LINK_SELECTORS = [
  "a[href^='/@']",
  "a[href*='youtube.com/@']",
  "a[href^='/channel/']",
  "a[href*='youtube.com/channel/']",
  "a[href^='/c/']",
  "a[href*='youtube.com/c/']",
  "a[href^='/user/']",
  "a[href*='youtube.com/user/']",
];

/**
 * @param {string} value
 * @returns {string}
 */
function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

/**
 * @param {string} href
 * @returns {string}
 */
function normalizeHref(href) {
  const value = String(href || "").trim();
  if (!value) return "";

  try {
    const origin = typeof location !== "undefined" && location.origin
      ? location.origin
      : "https://www.youtube.com";
    return new URL(value, origin).href;
  } catch {
    return value;
  }
}

/**
 * @param {HTMLElement} card
 * @returns {string}
 */
function findChannelUrl(card) {
  for (const selector of CHANNEL_LINK_SELECTORS) {
    const anchor = card.querySelector(selector);
    if (anchor instanceof HTMLAnchorElement) {
      const href = normalizeHref(anchor.getAttribute("href") || anchor.href || "");
      if (href) return href;
    }
  }

  return "";
}

/**
 * @param {HTMLElement} card
 * @returns {string}
 */
function findChannelName(card) {
  for (const selector of CHANNEL_NAME_SELECTORS) {
    const element = card.querySelector(selector);
    if (!(element instanceof HTMLElement)) continue;

    const text = cleanText(element.textContent || "");
    if (!text) continue;
    if (text.startsWith("@")) continue;
    if (/^https?:\/\//i.test(text)) continue;

    return text;
  }

  return "";
}

/**
 * @param {HTMLElement|null} card
 * @returns {CardChannelData|null}
 */
export default function extractChannelDataFromCard(card) {
  if (!(card instanceof HTMLElement)) return null;

  const channelName = findChannelName(card);
  const channelUrl = findChannelUrl(card);

  if (!channelName && !channelUrl) return null;

  return { channelName, channelUrl };
}
