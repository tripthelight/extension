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
 * Returns a stable token without '@', preserving case.
 *
 * Examples:
 * - https://www.youtube.com/@AAA -> AAA
 * - /@AAA/videos -> AAA
 * - https://www.youtube.com/channel/UC123/videos -> channel/UC123
 * - /c/Name/videos -> c/Name
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
  const sources = [decoded];

  try {
    const parsed = /^https?:\/\//i.test(decoded)
      ? new URL(decoded)
      : new URL(decoded, "https://www.youtube.com");

    sources.push(parsed.pathname);
  } catch {
    // Keep the raw decoded value as the fallback source.
  }

  for (const source of sources) {
    const match = String(source || "").match(/@([^/?#&\s]+)/);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  const withoutQuery = decoded.split(/[?#&]/)[0] || "";
  const withoutOrigin = withoutQuery.replace(/^https?:\/\/[^/]+/i, "");
  const segments = withoutOrigin
    .replace(/^\/+/, "")
    .split("/")
    .map((segment) => segment.trim())
    .filter((segment) => segment !== "");

  if (segments.length === 0) {
    return decoded.replace(/^@/, "").trim();
  }

  if (["channel", "c", "user"].includes(segments[0]) && segments[1]) {
    return `${segments[0]}/${segments[1]}`;
  }

  return segments[0].replace(/^@/, "").trim();
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
