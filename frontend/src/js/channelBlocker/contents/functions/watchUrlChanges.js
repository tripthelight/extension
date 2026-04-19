import { getState, setState } from "@/js/store/channelBlocker/contents/store";
import wrapHistoryMethod from "@/js/channelBlocker/contents/functions/wrapHistoryMethod";
import handleUrlChange from "@/js/channelBlocker/contents/functions/handleUrlChange";

/**
 * popstate 이벤트를 처리합니다.
 *
 * @param {PopStateEvent} _event
 * @returns {void}
 */
function onPopState(_event) {
  handleUrlChange();
}

/**
 * YouTube 내부 라우팅 완료 이벤트를 처리합니다.
 *
 * `yt-navigate-finish`는 비표준 커스텀 이벤트이므로
 * 일반 Event 타입으로 받는 편이 JSDoc 검사에서 더 안전합니다.
 *
 * @param {Event} _event
 * @returns {void}
 */
function onYouTubeNavigateFinish(_event) {
  handleUrlChange();
}

/**
 * URL 변경 감시기를 한 번만 등록합니다.
 *
 * 감지 대상:
 * - history.pushState
 * - history.replaceState
 * - 브라우저 뒤로가기/앞으로가기(popstate)
 * - YouTube 내부 라우팅 완료(yt-navigate-finish)
 *
 * store 상태의 `isUrlWatcherBound` 값으로 중복 등록을 방지합니다.
 *
 * @returns {void}
 */
export default () => {
  /** @type {{ isUrlWatcherBound?: boolean }} */
  const state = getState();

  if (state.isUrlWatcherBound === true) {
    return;
  }

  wrapHistoryMethod("pushState");
  wrapHistoryMethod("replaceState");

  window.addEventListener("popstate", onPopState);
  document.addEventListener("yt-navigate-finish", onYouTubeNavigateFinish);

  setState({ isUrlWatcherBound: true });
}