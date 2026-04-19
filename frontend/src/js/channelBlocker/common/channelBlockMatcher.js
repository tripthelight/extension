import { normalizeChannelAddress } from "./channelAddress.js";

/**
 * @typedef {Object} ChannelBlockMatcher
 * @property {Set<string>} names
 * @property {Set<string>} addresses
 */

/**
 * @typedef {Object} ChannelLikeData
 * @property {string=} channelName
 * @property {string=} channelUrl
 * @property {string=} channelHandle
 */

/**
 * @param {string} value
 * @returns {string}
 */
export function normalizeChannelNameKey(value) {
  return String(value || "").replace(/\s+/g, " ").trim().toLowerCase();
}

/**
 * @param {string} value
 * @returns {string}
 */
export function normalizeChannelAddressKey(value) {
  return normalizeChannelAddress(value).toLowerCase();
}

/**
 * @param {string[]} channelNames
 * @param {string[]} channelAddresses
 * @returns {ChannelBlockMatcher}
 */
export function buildBlockedChannelMatcher(channelNames, channelAddresses) {
  return {
    names: new Set(
      channelNames
        .map((name) => normalizeChannelNameKey(name))
        .filter((name) => name !== "")
    ),
    addresses: new Set(
      channelAddresses
        .map((address) => normalizeChannelAddressKey(address))
        .filter((address) => address !== "")
    ),
  };
}

/**
 * @param {ChannelLikeData|null|undefined} channelData
 * @param {ChannelBlockMatcher} matcher
 * @returns {boolean}
 */
export function isBlockedChannelData(channelData, matcher) {
  if (!channelData) return false;

  const channelName = normalizeChannelNameKey(channelData.channelName || "");
  if (channelName && matcher.names.has(channelName)) {
    return true;
  }

  const channelUrl = normalizeChannelAddressKey(channelData.channelUrl || "");
  if (channelUrl && matcher.addresses.has(channelUrl)) {
    return true;
  }

  const channelHandle = normalizeChannelAddressKey(channelData.channelHandle || "");
  return channelHandle !== "" && matcher.addresses.has(channelHandle);
}
