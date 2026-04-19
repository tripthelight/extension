import { getState, setState } from "@/js/store/channelBlocker/contents/store";
import wrapHistoryMethod from "@/js/channelBlocker/contents/functions/wrapHistoryMethod";
import handleUrlChange from "@/js/channelBlocker/contents/functions/handleUrlChange";

/**
 * @param {PopStateEvent} _event
 * @returns {void}
 */
function onPopState(_event) {
  handleUrlChange();
}

/**
 * @param {Event} _event
 * @returns {void}
 */
function onYouTubeNavigateFinish(_event) {
  handleUrlChange();
}

/**
 * Register YouTube SPA navigation watchers once.
 *
 * Watch targets:
 * - history.pushState
 * - history.replaceState
 * - popstate
 * - yt-navigate-finish
 *
 * @returns {void}
 */
export default () => {
  const state = getState();

  if (state.isUrlWatcherBound === true) {
    return;
  }

  wrapHistoryMethod("pushState");
  wrapHistoryMethod("replaceState");

  window.addEventListener("popstate", onPopState);
  document.addEventListener("yt-navigate-finish", onYouTubeNavigateFinish);

  setState({ isUrlWatcherBound: true });
};
