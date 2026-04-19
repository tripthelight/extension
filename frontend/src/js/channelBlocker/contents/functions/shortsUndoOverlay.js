import { DATAS } from "@/js/channelBlocker/contents/variables";
import { openDB } from "@/js/channelBlocker/contents/database";
import { readBlobStringList, removeBlobStringItem } from "@/js/channelBlocker/contents/functions/database/blobStringListStore";
import getBlockedChannelNames from "@/js/channelBlocker/contents/functions/database/getBlockedChannelNames";
import getBlockedChannelUrls from "@/js/channelBlocker/contents/functions/database/getBlockedChannelUrls";
import responseChannelName from "@/js/channelBlocker/contents/functions/fetch/responseChannelName";
import getCurrentShortsElement from "@/js/channelBlocker/contents/functions/shortsLogic/getCurrentShortsElement";
import resetRemoveTagClass from "@/js/channelBlocker/contents/functions/resetRemoveTagClass";
import { removeBlockedChannelFromStorage } from "@/js/channelBlocker/contents/functions/storage/blockedChannelsStorage";
import { normalizeChannelAddress } from "@/js/channelBlocker/common/channelAddress";

const OVERLAY_CLASS = "channel-blocker-shorts-overlay";
const UNDO_LABEL = "\uB418\uB3CC\uB9AC\uAE30";
const NOT_RECOMMENDED_MESSAGE = "\uCD94\uCC9C \uC548\uD55C Shorts \uC785\uB2C8\uB2E4. \uB418\uB3CC\uB9AC\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?";
const NOT_INTERESTED_MESSAGE = "\uAD00\uC2EC \uC5C6\uB294 Shorts \uC785\uB2C8\uB2E4. \uB418\uB3CC\uB9AC\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?";

const overlayCleanupMap = new WeakMap();
const channelDataCache = new Map();
let enforceSequence = 0;

/**
 * @returns {boolean}
 */
function isShortsPage() {
  return location.pathname.startsWith(DATAS.views.shorts.path);
}

/**
 * @returns {string}
 */
function getCurrentShortsVideoId() {
  if (!isShortsPage()) return "";
  return location.pathname.match(/^\/shorts\/([^/?#]+)/)?.[1] ?? "";
}

/**
 * @param {number} sequence
 * @param {string} videoId
 * @returns {boolean}
 */
function isStaleEvaluation(sequence, videoId) {
  return sequence !== enforceSequence || getCurrentShortsVideoId() !== videoId;
}

/**
 * @param {string} raw
 * @returns {string}
 */
function normalizeChannelHandle(raw) {
  return normalizeChannelAddress(raw);
}

/**
 * @returns {Promise<IDBDatabase>}
 */
function ensureDatabase() {
  return openDB();
}

/**
 * @param {string} videoId
 * @returns {Promise<void>}
 */
async function rollbackInterestVideo(videoId) {
  const database = await ensureDatabase();
  await removeBlobStringItem(database, "i", "videoIds", videoId);
}

/**
 * @param {string} channelName
 * @param {string} channelHandle
 * @returns {Promise<void>}
 */
async function rollbackBlockedChannel(channelName, channelHandle) {
  const database = await ensureDatabase();

  if (channelName) {
    await removeBlobStringItem(database, "b", "channelNames", channelName);
    await removeBlockedChannelFromStorage("nmes", channelName);
  }

  if (channelHandle) {
    const normalizedHandle = normalizeChannelHandle(channelHandle);
    await removeBlobStringItem(database, "u", "channelAddresses", normalizedHandle);
    await removeBlockedChannelFromStorage("urls", normalizedHandle);
  }
}

/**
 * @param {string} videoId
 * @returns {Promise<{channelName: string, channelHandle: string}>}
 */
async function getChannelDataByVideoId(videoId) {
  if (channelDataCache.has(videoId)) {
    return channelDataCache.get(videoId);
  }

  const channelData = await responseChannelName(videoId);
  const result = {
    channelName: String(channelData?.channelName || "").trim(),
    channelHandle: normalizeChannelHandle(channelData?.channelUrl || ""),
  };

  channelDataCache.set(videoId, result);
  return result;
}

/**
 * @param {HTMLVideoElement|null} video
 * @returns {void}
 */
function pauseVideo(video) {
  if (!video) return;
  video.pause();
}

/**
 * @param {HTMLVideoElement|null} video
 * @returns {void}
 */
function resumeVideo(video) {
  if (!video) return;

  const playResult = video.play();
  if (playResult && typeof playResult.catch === "function") {
    playResult.catch(() => {});
  }
}

/**
 * @param {HTMLElement} target
 * @returns {HTMLVideoElement|null}
 */
function getVideoElement(target) {
  const targetVideo = target.querySelector("video");
  if (targetVideo instanceof HTMLVideoElement) {
    return targetVideo;
  }

  const videos = Array.from(document.querySelectorAll("video"))
    .filter((node) => node instanceof HTMLVideoElement);

  videos.sort((a, b) => {
    const rectA = a.getBoundingClientRect();
    const rectB = b.getBoundingClientRect();
    const areaA = rectA.width * rectA.height;
    const areaB = rectB.width * rectB.height;
    return areaB - areaA;
  });

  return videos[0] ?? null;
}

/**
 * @returns {HTMLVideoElement|null}
 */
function getCurrentShortsVideoElement() {
  const target = getCurrentShortsElement();
  return target instanceof HTMLElement ? getVideoElement(target) : null;
}

/**
 * @param {HTMLElement} overlay
 * @returns {void}
 */
function removeOverlayElement(overlay) {
  const cleanup = overlayCleanupMap.get(overlay);
  if (cleanup) cleanup();
  overlay.remove();
}

/**
 * @param {HTMLElement} target
 * @returns {void}
 */
function removeExistingOverlays(target) {
  document.querySelectorAll(`.${OVERLAY_CLASS}`).forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if (node === target.querySelector(`.${OVERLAY_CLASS}`)) return;

    removeOverlayElement(node);
  });
}

/**
 * @param {string} videoId
 * @returns {void}
 */
function closeStaleShortsUndoOverlays(videoId) {
  document.querySelectorAll(`.${OVERLAY_CLASS}`).forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if ((node.dataset.videoId || "") === videoId) return;

    removeOverlayElement(node);
  });
}

/**
 * @param {boolean=} shouldResumeCurrent
 * @returns {void}
 */
export function closeShortsUndoOverlay(shouldResumeCurrent = false) {
  document.querySelectorAll(`.${OVERLAY_CLASS}`).forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    removeOverlayElement(node);
  });

  if (shouldResumeCurrent) {
    resumeVideo(getCurrentShortsVideoElement());
  }
}

/**
 * @typedef {object} ShortsUndoOverlayOptions
 * @property {string} message
 * @property {() => (void | Promise<void>)} onUndo
 * @property {string=} overlayKey
 * @property {string=} videoId
 * @property {HTMLElement|null=} target
 */

/**
 * @param {ShortsUndoOverlayOptions} options
 * @returns {boolean}
 */
export function openShortsUndoOverlay(options) {
  if (!isShortsPage()) return false;

  const target = options.target ?? getCurrentShortsElement();
  if (!(target instanceof HTMLElement)) return false;

  const overlayVideoId = options.videoId || getCurrentShortsVideoId();
  const nextKey = options.overlayKey || "";
  const activeOverlay = target.querySelector(`.${OVERLAY_CLASS}`);
  const activeKey = activeOverlay instanceof HTMLElement ? activeOverlay.dataset.overlayKey || "" : "";
  if (activeOverlay && nextKey && activeKey === nextKey) {
    if (overlayVideoId === getCurrentShortsVideoId() && getCurrentShortsElement() === target) {
      pauseVideo(getVideoElement(target));
    }
    return true;
  }

  removeExistingOverlays(target);

  if (activeOverlay instanceof HTMLElement) {
    const cleanup = overlayCleanupMap.get(activeOverlay);
    if (cleanup) cleanup();
    activeOverlay.remove();
  }

  const video = getVideoElement(target);
  pauseVideo(video);

  const previousPosition = target.style.position;
  const computedPosition = window.getComputedStyle(target).position;
  if (computedPosition === "static") {
    target.style.position = "relative";
  }

  const overlay = document.createElement("div");
  overlay.className = OVERLAY_CLASS;
  if (overlayVideoId) {
    overlay.dataset.videoId = overlayVideoId;
  }
  if (nextKey) {
    overlay.dataset.overlayKey = nextKey;
  }

  const panel = document.createElement("div");
  panel.className = `${OVERLAY_CLASS}__panel`;

  const message = document.createElement("p");
  message.className = `${OVERLAY_CLASS}__message`;
  message.textContent = options.message;

  const button = document.createElement("button");
  button.type = "button";
  button.className = `${OVERLAY_CLASS}__undo`;
  button.textContent = UNDO_LABEL;

  let isClosed = false;
  let playGuardVideo = null;
  let forcePauseTimerId = null;

  const cleanup = () => {
    if (forcePauseTimerId !== null) {
      window.clearInterval(forcePauseTimerId);
      forcePauseTimerId = null;
    }

    if (playGuardVideo) {
      playGuardVideo.removeEventListener("play", boundPause);
      playGuardVideo.removeEventListener("playing", boundPause);
      playGuardVideo = null;
    }

    target.style.position = previousPosition;
  };

  const closeOverlay = (shouldResume = false) => {
    if (isClosed) return;
    isClosed = true;

    cleanup();
    overlay.remove();

    if (shouldResume) {
      resumeVideo(getVideoElement(target) ?? video);
    }
  };

  const isOverlayStillCurrent = () =>
    isShortsPage() &&
    overlayVideoId === getCurrentShortsVideoId() &&
    getCurrentShortsElement() === target;

  const boundPause = () => {
    if (!isOverlayStillCurrent()) {
      closeOverlay(false);
      resumeVideo(getCurrentShortsVideoElement());
      return;
    }

    const activeVideo = getVideoElement(target) ?? video;
    pauseVideo(activeVideo);
  };

  const attachPlayGuard = () => {
    if (!isOverlayStillCurrent()) {
      closeOverlay(false);
      resumeVideo(getCurrentShortsVideoElement());
      return;
    }

    const activeVideo = getVideoElement(target) ?? video;
    if (!(activeVideo instanceof HTMLVideoElement)) return;
    if (playGuardVideo === activeVideo) return;

    if (playGuardVideo) {
      playGuardVideo.removeEventListener("play", boundPause);
      playGuardVideo.removeEventListener("playing", boundPause);
    }

    playGuardVideo = activeVideo;
    playGuardVideo.addEventListener("play", boundPause);
    playGuardVideo.addEventListener("playing", boundPause);
  };

  overlayCleanupMap.set(overlay, cleanup);

  button.addEventListener("click", async () => {
    try {
      await options.onUndo();
      resetRemoveTagClass();
    } finally {
      closeOverlay(true);
    }
  });

  panel.appendChild(message);
  panel.appendChild(button);
  overlay.appendChild(panel);
  target.appendChild(overlay);

  attachPlayGuard();
  boundPause();

  let tick = 0;
  forcePauseTimerId = window.setInterval(() => {
    if (isClosed) return;
    attachPlayGuard();
    boundPause();
    tick += 1;
    if (tick >= 60 && forcePauseTimerId !== null) {
      window.clearInterval(forcePauseTimerId);
      forcePauseTimerId = null;
    }
  }, 100);

  return true;
}

/**
 * @returns {Promise<void>}
 */
export default async function enforceShortsUndoOverlay() {
  const sequence = ++enforceSequence;

  if (!isShortsPage()) {
    closeShortsUndoOverlay();
    return;
  }

  const videoId = getCurrentShortsVideoId();
  if (!videoId) {
    closeShortsUndoOverlay();
    return;
  }

  closeStaleShortsUndoOverlays(videoId);

  const database = await ensureDatabase();
  if (isStaleEvaluation(sequence, videoId)) return;

  const interestVideoIds = await readBlobStringList(database, "i", "videoIds");
  if (isStaleEvaluation(sequence, videoId)) return;

  if (interestVideoIds.includes(videoId)) {
    openShortsUndoOverlay({
      videoId,
      overlayKey: `interest:${videoId}`,
      message: NOT_INTERESTED_MESSAGE,
      onUndo: async () => {
        await rollbackInterestVideo(videoId);
      },
    });
    return;
  }

  const { channelName, channelHandle } = await getChannelDataByVideoId(videoId);
  if (isStaleEvaluation(sequence, videoId)) return;

  if (!channelName && !channelHandle) {
    closeShortsUndoOverlay(true);
    return;
  }

  const blockedChannelNames = await getBlockedChannelNames();
  if (isStaleEvaluation(sequence, videoId)) return;

  const blockedChannelHandles = await getBlockedChannelUrls();
  if (isStaleEvaluation(sequence, videoId)) return;

  const normalizedHandle = normalizeChannelHandle(channelHandle);

  const blockedByName = channelName ? blockedChannelNames.includes(channelName) : false;
  const blockedByHandle = normalizedHandle
    ? blockedChannelHandles.some((handle) => normalizeChannelHandle(handle) === normalizedHandle)
    : false;

  if (blockedByName || blockedByHandle) {
    openShortsUndoOverlay({
      videoId,
      overlayKey: `blocker:${videoId}:${channelName}:${normalizedHandle}`,
      message: NOT_RECOMMENDED_MESSAGE,
      onUndo: async () => {
        await rollbackBlockedChannel(
          blockedByName ? channelName : "",
          blockedByHandle ? normalizedHandle : ""
        );
      },
    });
    return;
  }

  closeShortsUndoOverlay(true);
}
