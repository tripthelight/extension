/**
 * Normalize and dedupe video IDs while preserving first-seen order.
 *
 * The extension may send duplicates because many thumbnails can point to the
 * same Shorts or VOD item during fast scrolling.
 *
 * @param {string[]} rawVideoIds
 * @returns {string[]}
 */
export function normalizeVideoIds(rawVideoIds) {
  const seen = new Set();
  const normalized = [];

  for (const rawValue of rawVideoIds) {
    const value = String(rawValue).trim();
    if (!value) continue;
    if (seen.has(value)) continue;

    seen.add(value);
    normalized.push(value);
  }

  return normalized;
}
