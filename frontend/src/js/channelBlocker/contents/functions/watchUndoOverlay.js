import { t } from "@/js/channelBlocker/contents/i18n";

const OVERLAY_CLASS = "channel-blocker-watch-overlay";
const overlayCleanupMap = new WeakMap();

/**
 * @returns {boolean}
 */
function isWatchPage() {
  return location.pathname === "/watch";
}

/**
 * @returns {HTMLVideoElement|null}
 */
function getWatchVideoElement() {
  const selectors = [
    "video.html5-main-video",
    "#player video",
    "ytd-player video",
    ".html5-video-player video",
  ];

  /** @type {HTMLVideoElement[]} */
  const candidates = [];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((node) => {
      if (node instanceof HTMLVideoElement) {
        candidates.push(node);
      }
    });
  });

  if (candidates.length === 0) return null;

  const unique = Array.from(new Set(candidates));
  unique.sort((a, b) => {
    const rectA = a.getBoundingClientRect();
    const rectB = b.getBoundingClientRect();
    const areaA = rectA.width * rectA.height;
    const areaB = rectB.width * rectB.height;
    return areaB - areaA;
  });

  return unique[0] ?? null;
}

/**
 * @returns {HTMLElement|null}
 */
function getOverlayTargetElement() {
  const selectors = [
    "#player",
    "ytd-watch-flexy #player",
    "ytd-player",
    ".html5-video-player",
  ];

  for (const selector of selectors) {
    const node = document.querySelector(selector);
    if (node instanceof HTMLElement) {
      const rect = node.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        return node;
      }
    }
  }

  const video = getWatchVideoElement();
  return video instanceof HTMLElement ? video : null;
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
 * @returns {HTMLElement|null}
 */
function getActiveOverlay() {
  const overlay = document.querySelector(`.${OVERLAY_CLASS}`);
  return overlay instanceof HTMLElement ? overlay : null;
}

/**
 * @returns {void}
 */
function removeExistingOverlay() {
  document.querySelectorAll(`.${OVERLAY_CLASS}`).forEach((node) => {
    const cleanup = overlayCleanupMap.get(node);
    if (cleanup) cleanup();
    node.remove();
  });
}

/**
 * @param {boolean=} shouldResume
 * @returns {void}
 */
export function closeWatchUndoOverlay(shouldResume = false) {
  const overlay = getActiveOverlay();
  if (!overlay) return;

  const cleanup = overlayCleanupMap.get(overlay);
  if (cleanup) cleanup();
  overlay.remove();

  if (shouldResume) {
    resumeVideo(getWatchVideoElement());
  }
}

/**
 * @param {HTMLElement} overlay
 * @param {HTMLVideoElement | null} video
 * @returns {void}
 */
function updateOverlayBounds(overlay, video) {
  const target = getOverlayTargetElement() ?? video;
  if (!target) return;

  const rect = target.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return;

  const docTop = rect.top + window.scrollY;
  const docLeft = rect.left + window.scrollX;

  overlay.style.top = `${Math.max(0, docTop)}px`;
  overlay.style.left = `${Math.max(0, docLeft)}px`;
  overlay.style.width = `${rect.width}px`;
  overlay.style.height = `${rect.height}px`;
}

/**
 * @typedef {object} WatchUndoOverlayOptions
 * @property {string} message
 * @property {() => (void | Promise<void>)} onUndo
 * @property {string=} overlayKey
 */

/**
 * Show watch-page overlay with undo button.
 *
 * @param {WatchUndoOverlayOptions} options
 * @returns {boolean}
 */
export function openWatchUndoOverlay(options) {
  if (!isWatchPage()) return false;

  const activeOverlay = getActiveOverlay();
  const nextKey = options.overlayKey || "";
  const activeKey = activeOverlay?.dataset?.overlayKey || "";
  if (activeOverlay && nextKey && activeKey === nextKey) {
    return true;
  }

  const video = getWatchVideoElement();
  pauseVideo(video);
  removeExistingOverlay();

  const overlay = document.createElement("div");
  overlay.className = OVERLAY_CLASS;
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
  button.textContent = t("overlay.undo");

  const openedHref = location.href;
  let isClosed = false;
  let forceSyncTimerId = null;
  let frameSyncId = null;
  let playGuardVideo = null;

  const closeOverlay = (shouldResume = false) => {
    if (isClosed) return;
    isClosed = true;

    cleanup();
    overlay.remove();

    if (shouldResume) {
      resumeVideo(getWatchVideoElement() ?? video);
    }
  };

  const boundUpdate = () => {
    const activeVideo = getWatchVideoElement() ?? video;
    pauseVideo(activeVideo);
    updateOverlayBounds(overlay, activeVideo);
  };

  const attachPlayGuard = () => {
    const activeVideo = getWatchVideoElement() ?? video;
    if (!(activeVideo instanceof HTMLVideoElement)) return;

    if (playGuardVideo === activeVideo) return;

    if (playGuardVideo) {
      playGuardVideo.removeEventListener("play", boundUpdate);
      playGuardVideo.removeEventListener("playing", boundUpdate);
    }

    playGuardVideo = activeVideo;
    playGuardVideo.addEventListener("play", boundUpdate);
    playGuardVideo.addEventListener("playing", boundUpdate);
  };

  const dismissIfRouteChanged = () => {
    if (location.href !== openedHref) {
      closeOverlay(false);
    }
  };

  const dismissForNavigation = () => {
    closeOverlay(false);
  };

  window.addEventListener("resize", boundUpdate, { passive: true });
  window.addEventListener("scroll", boundUpdate, { passive: true });
  document.addEventListener("fullscreenchange", boundUpdate);
  window.addEventListener("popstate", dismissIfRouteChanged);
  window.addEventListener("hashchange", dismissIfRouteChanged);
  window.addEventListener("pagehide", dismissForNavigation);
  document.addEventListener("yt-navigate-start", dismissForNavigation);
  document.addEventListener("yt-navigate-finish", dismissIfRouteChanged);
  document.addEventListener("yt-page-data-updated", dismissIfRouteChanged);

  const cleanup = () => {
    window.removeEventListener("resize", boundUpdate);
    window.removeEventListener("scroll", boundUpdate);
    document.removeEventListener("fullscreenchange", boundUpdate);
    window.removeEventListener("popstate", dismissIfRouteChanged);
    window.removeEventListener("hashchange", dismissIfRouteChanged);
    window.removeEventListener("pagehide", dismissForNavigation);
    document.removeEventListener("yt-navigate-start", dismissForNavigation);
    document.removeEventListener("yt-navigate-finish", dismissIfRouteChanged);
    document.removeEventListener("yt-page-data-updated", dismissIfRouteChanged);

    if (forceSyncTimerId !== null) {
      window.clearInterval(forceSyncTimerId);
      forceSyncTimerId = null;
    }

    if (frameSyncId !== null) {
      window.cancelAnimationFrame(frameSyncId);
      frameSyncId = null;
    }

    if (playGuardVideo) {
      playGuardVideo.removeEventListener("play", boundUpdate);
      playGuardVideo.removeEventListener("playing", boundUpdate);
      playGuardVideo = null;
    }
  };

  overlayCleanupMap.set(overlay, cleanup);

  button.addEventListener("click", async () => {
    try {
      await options.onUndo();
    } finally {
      closeOverlay(true);
    }
  });

  panel.appendChild(message);
  panel.appendChild(button);
  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  attachPlayGuard();
  boundUpdate();

  // 1) For initial player transition frames, sync quickly via RAF.
  let frameCount = 0;
  const syncFrame = () => {
    if (isClosed) return;
    attachPlayGuard();
    boundUpdate();
    frameCount += 1;
    if (frameCount < 24) {
      frameSyncId = window.requestAnimationFrame(syncFrame);
    }
  };
  frameSyncId = window.requestAnimationFrame(syncFrame);

  // 2) Keep forcing pause/size sync for a short period.
  let tick = 0;
  forceSyncTimerId = window.setInterval(() => {
    if (isClosed) return;
    attachPlayGuard();
    boundUpdate();
    tick += 1;
    if (tick >= 30) {
      if (forceSyncTimerId !== null) {
        window.clearInterval(forceSyncTimerId);
        forceSyncTimerId = null;
      }
    }
  }, 100);

  dismissIfRouteChanged();

  return true;
}


