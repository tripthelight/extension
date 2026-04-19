/**
 * Safely decode URI component text.
 *
 * @param {string} value
 * @returns {string}
 */
export function safeDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/**
 * Normalize channel address from url/handle/plain text.
 * Returns address token without '@', preserving case.
 *
 * Examples:
 * - https://www.youtube.com/@AAA -> AAA
 * - /@AAA/videos -> AAA
 * - @AAA -> AAA
 * - AAA -> AAA
 *
 * @param {string} raw
 * @returns {string}
 */
export function normalizeChannelAddress(raw) {
  const value = String(raw || "").trim();
  if (!value) return "";

  const decoded = safeDecodeURIComponent(value);
  const match = decoded.match(/@([^/?#\s]+)/);
  if (match && match[1]) {
    return match[1].trim();
  }

  return decoded.replace(/^\/+/, "").replace(/^@/, "").trim();
}

/**
 * Extract channel address token from href/url text.
 * Returns empty string when no @handle exists.
 *
 * @param {string} href
 * @returns {string}
 */
export function extractChannelAddressFromHref(href) {
  const decoded = safeDecodeURIComponent(String(href || ""));
  const match = decoded.match(/@([^/?#\s]+)/);
  return match && match[1] ? match[1].trim() : "";
}
