const DEFAULT_BLOCKED_CHANNELS = {
  nmes: [],
  urls: [],
  links: [],
};
const CONTENT_DB_MIGRATED_KEY = "blockedChannelsContentDbMigrated";

/**
 * @returns {typeof chrome.storage | typeof browser.storage | null}
 */
function findExtStorage() {
  const extStorage =
    typeof browser !== "undefined" && browser?.storage
      ? browser.storage
      : typeof chrome !== "undefined" && chrome?.storage
        ? chrome.storage
        : null;

  return extStorage;
}

/**
 * @param {unknown} value
 * @returns {string[]}
 */
function normalizeStringList(value) {
  return Array.isArray(value)
    ? value.map((item) => String(item || "").trim()).filter((item) => item !== "")
    : [];
}

/**
 * @param {unknown} value
 * @returns {{nmes: string[], urls: string[], links: string[]}}
 */
function normalizeBlockedChannels(value) {
  /** @type {{nmes?: unknown, urls?: unknown, links?: unknown}} */
  const source = value && typeof value === "object" ? value : {};

  return {
    nmes: normalizeStringList(source.nmes),
    urls: normalizeStringList(source.urls),
    links: normalizeStringList(source.links),
  };
}

/**
 * @returns {Promise<{nmes: string[], urls: string[], links: string[]}>}
 */
export async function getBlockedChannelsFromStorage() {
  const extStorage = findExtStorage();
  if (!extStorage) {
    return { ...DEFAULT_BLOCKED_CHANNELS };
  }

  const { blockedChannels = DEFAULT_BLOCKED_CHANNELS } =
    await extStorage.local.get("blockedChannels");

  return normalizeBlockedChannels(blockedChannels);
}

/**
 * @returns {Promise<boolean>}
 */
export async function isContentDbMigratedToStorage() {
  const extStorage = findExtStorage();
  if (!extStorage) return true;

  const result = await extStorage.local.get(CONTENT_DB_MIGRATED_KEY);
  return result?.[CONTENT_DB_MIGRATED_KEY] === true;
}

/**
 * @returns {Promise<void>}
 */
export async function markContentDbMigratedToStorage() {
  const extStorage = findExtStorage();
  if (!extStorage) return;

  await extStorage.local.set({ [CONTENT_DB_MIGRATED_KEY]: true });
}

/**
 * @param {{nmes?: string[], urls?: string[], links?: string[]}} blockedChannels
 * @returns {Promise<void>}
 */
async function setBlockedChannelsToStorage(blockedChannels) {
  const extStorage = findExtStorage();
  if (!extStorage) return;

  await extStorage.local.set({
    blockedChannels: normalizeBlockedChannels(blockedChannels),
  });
}

/**
 * @param {"nmes" | "urls" | "links"} key
 * @param {string} value
 * @returns {Promise<string[]>}
 */
export async function upsertBlockedChannelToStorage(key, value) {
  const normalized = String(value || "").trim();
  const blockedChannels = await getBlockedChannelsFromStorage();

  if (!normalized || !Array.isArray(blockedChannels[key])) {
    return [];
  }

  blockedChannels[key] = [
    normalized,
    ...blockedChannels[key].filter((item) => item !== normalized),
  ];

  await setBlockedChannelsToStorage(blockedChannels);
  return blockedChannels[key];
}

/**
 * @param {"nmes" | "urls" | "links"} key
 * @param {string} value
 * @returns {Promise<string[]>}
 */
export async function removeBlockedChannelFromStorage(key, value) {
  const normalized = String(value || "").trim();
  const blockedChannels = await getBlockedChannelsFromStorage();

  if (!normalized || !Array.isArray(blockedChannels[key])) {
    return [];
  }

  blockedChannels[key] = blockedChannels[key].filter((item) => item !== normalized);

  await setBlockedChannelsToStorage(blockedChannels);
  return blockedChannels[key];
}

/**
 * @param {{nmes?: string[], urls?: string[], links?: string[]}} values
 * @returns {Promise<{nmes: string[], urls: string[], links: string[]}>}
 */
export async function mergeBlockedChannelsToStorage(values) {
  const blockedChannels = await getBlockedChannelsFromStorage();
  const incoming = normalizeBlockedChannels(values);

  /** @type {("nmes" | "urls" | "links")[]} */
  const keys = ["nmes", "urls", "links"];
  keys.forEach((key) => {
    const merged = [...incoming[key], ...blockedChannels[key]];
    blockedChannels[key] = [...new Set(merged)];
  });

  await setBlockedChannelsToStorage(blockedChannels);
  return blockedChannels;
}
