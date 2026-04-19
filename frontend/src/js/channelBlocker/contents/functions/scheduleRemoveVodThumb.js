import { getRuntime, setRuntime } from "@/js/store/channelBlocker/contents/store";
import { addBlockingRecommendClass as removeInterestThumb } from "@/js/channelBlocker/contents/functions/removeInterestThumb";
import { runChannelBlocker as removeBlockerThumb } from "@/js/channelBlocker/contents/functions/removeBlockerThumb";
import enforceWatchUndoOverlay from "@/js/channelBlocker/contents/functions/enforceWatchUndoOverlay";
import normalizeMainShortsBlockingClasses from "@/js/channelBlocker/contents/functions/normalizeMainShortsBlockingClasses";

const REMOVE_VOD_THUMB_DELAY_MS = 120;

/**
 * @typedef {object} ChannelBlockerState
 * @property {number|null} removeVodThumbRaf
 */

/**
 * Execute recommendation filtering pipeline.
 *
 * @returns {void}
 */
async function flushVodThumbRemoval() {
  try {
    const results = await Promise.allSettled([
      Promise.resolve(removeInterestThumb()),
      Promise.resolve(removeBlockerThumb()),
    ]);

    results.forEach((result) => {
      if (result.status === "rejected") {
        console.warn(result.reason);
      }
    });

    enforceWatchUndoOverlay().catch(() => {});
    normalizeMainShortsBlockingClasses();
  } finally {
    setRuntime({ removeVodThumbRaf: null });
  }
}

/**
 * Batch UI filtering work into one delayed pass.
 *
 * @returns {void}
 */
export default () => {
  /** @type {ChannelBlockerState} */
  const runtime = getRuntime();

  if (runtime.removeVodThumbRaf !== null) {
    clearTimeout(runtime.removeVodThumbRaf);
  }

  const timerId = window.setTimeout(() => {
    flushVodThumbRemoval().catch((error) => {
      console.warn(error);
      setRuntime({ removeVodThumbRaf: null });
    });
  }, REMOVE_VOD_THUMB_DELAY_MS);

  setRuntime({ removeVodThumbRaf: timerId });
};
