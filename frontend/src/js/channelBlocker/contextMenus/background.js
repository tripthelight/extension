import { t } from "@/js/channelBlocker/i18n";

const MENU_ID_ROOT = "channel-blocker:root";
const MENU_ID_BLOCK_CHANNEL = "channel-blocker:not-recommend-channel";
const MENU_ID_BLOCK_CHANNEL_LIST = "channel-blocker:not-recommend-channel:list";
const MENU_ID_NOT_INTERESTED = "channel-blocker:not-interested";
const MENU_ID_NOT_INTERESTED_LIST = "channel-blocker:not-interested:list";

/** @type {chrome.contextMenus.CreateProperties["contexts"]} */
const ROOT_CONTEXTS = ["page", "link", "image", "video"];
/** @type {chrome.contextMenus.CreateProperties["contexts"]} */
const TARGET_CONTEXTS = ["link", "image", "video"];
/** @type {number | string} */
const ROOT_PARENT_ID = MENU_ID_ROOT;

/**
 * Typed wrapper to avoid checkJs inference issues on create() payload objects.
 *
 * @param {chrome.contextMenus.CreateProperties} options
 * @returns {number | string}
 */
function createContextMenu(options) {
  return chrome.contextMenus.create(options);
}

/**
 * @param {string} raw
 * @returns {string}
 */
function extractVideoId(raw) {
  const value = String(raw || "").trim();
  if (!value) return "";

  try {
    const url = new URL(value);
    const watchId = url.searchParams.get("v");
    if (watchId) return watchId;

    const shortsMatch = url.pathname.match(/\/shorts\/([^/?#]+)/);
    if (shortsMatch?.[1]) return shortsMatch[1];

    const ytimgMatch = url.pathname.match(/\/vi(?:_webp)?\/([^/?#]+)/);
    if (ytimgMatch?.[1]) return ytimgMatch[1];
  } catch {
    // ignore invalid URL
  }

  const watchMatch = value.match(/[?&]v=([^&]+)/);
  if (watchMatch?.[1]) return watchMatch[1];

  const shortsMatch = value.match(/\/shorts\/([^/?#]+)/);
  if (shortsMatch?.[1]) return shortsMatch[1];

  const ytimgMatch = value.match(/\/vi(?:_webp)?\/([^/?#]+)/);
  if (ytimgMatch?.[1]) return ytimgMatch[1];

  return "";
}

/**
 * @param {chrome.contextMenus.OnClickData} info
 * @returns {string}
 */
function getVideoIdFromContext(info) {
  return (
    extractVideoId(info.linkUrl || "") ||
    extractVideoId(info.srcUrl || "") ||
    extractVideoId(info.pageUrl || "")
  );
}

/**
 * @returns {void}
 */
function createYoutubeMenus() {
  chrome.contextMenus.removeAll(() => {
    createContextMenu({
      id: MENU_ID_ROOT,
      title: "Youtube Channel Ban",
      contexts: ROOT_CONTEXTS,
      documentUrlPatterns: ["https://www.youtube.com/*"],
    });

    createContextMenu({
      id: MENU_ID_BLOCK_CHANNEL,
      title: t("menu.block_channel"),
      parentId: ROOT_PARENT_ID,
      contexts: TARGET_CONTEXTS,
      documentUrlPatterns: ["https://www.youtube.com/*"],
      targetUrlPatterns: [
        "https://www.youtube.com/watch*",
        "https://www.youtube.com/shorts/*",
        "https://i.ytimg.com/*",
        "https://*.ytimg.com/*",
      ],
    });

    createContextMenu({
      id: MENU_ID_NOT_INTERESTED,
      title: t("menu.not_interested"),
      parentId: ROOT_PARENT_ID,
      contexts: TARGET_CONTEXTS,
      documentUrlPatterns: ["https://www.youtube.com/*"],
      targetUrlPatterns: [
        "https://www.youtube.com/watch*",
        "https://www.youtube.com/shorts/*",
        "https://i.ytimg.com/*",
        "https://*.ytimg.com/*",
      ],
    });

    createContextMenu({
      id: MENU_ID_BLOCK_CHANNEL_LIST,
      title: t("menu.blocked_channel_list"),
      parentId: ROOT_PARENT_ID,
      contexts: ROOT_CONTEXTS,
      documentUrlPatterns: ["https://www.youtube.com/*"],
    });

    createContextMenu({
      id: MENU_ID_NOT_INTERESTED_LIST,
      title: t("menu.not_interested_video_list"),
      parentId: ROOT_PARENT_ID,
      contexts: ROOT_CONTEXTS,
      documentUrlPatterns: ["https://www.youtube.com/*"],
    });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  createYoutubeMenus();
});

chrome.runtime.onStartup.addListener(() => {
  createYoutubeMenus();
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab?.id) return;

  if (info.menuItemId === MENU_ID_BLOCK_CHANNEL_LIST) {
    chrome.tabs.sendMessage(tab.id, {
      type: "OPEN_BLOCKED_CHANNEL_LIST",
    }).catch(() => {
      // ignore tabs without content script
    });
    return;
  }

  if (info.menuItemId === MENU_ID_NOT_INTERESTED_LIST) {
    chrome.tabs.sendMessage(tab.id, {
      type: "OPEN_NOT_INTERESTED_VIDEO_LIST",
    }).catch(() => {
      // ignore tabs without content script
    });
    return;
  }

  const videoId = getVideoIdFromContext(info);
  if (!videoId) return;

  if (info.menuItemId === MENU_ID_BLOCK_CHANNEL) {
    chrome.tabs.sendMessage(tab.id, {
      type: "RUN_CONTEXT_BLOCK_CHANNEL",
      videoId,
    }).catch(() => {
      // ignore tabs without content script
    });
  }

  if (info.menuItemId === MENU_ID_NOT_INTERESTED) {
    chrome.tabs.sendMessage(tab.id, {
      type: "RUN_CONTEXT_NOT_INTERESTED",
      videoId,
    }).catch(() => {
      // ignore tabs without content script
    });
  }
});

