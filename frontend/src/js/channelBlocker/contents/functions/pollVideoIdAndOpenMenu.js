import { MAX_RETRY, RETRY_DELAY_MS } from "@/js/channelBlocker/contents/variables";
import { setRuntime } from "@/js/store/channelBlocker/contents/store";
import clearActiveInterval from "@/js/channelBlocker/contents/functions/clearActiveInterval";
import getClickedVideoId from "@/js/channelBlocker/contents/functions/getClickedVideoId";
import { openBlockingMenu as popupMenuHandler } from "@/js/channelBlocker/contents/functions/popupMenuHandler";

/**
 * 브라우저 환경의 interval id 타입
 * @typedef {number} IntervalId
 */

/**
 * target이 유효한 HTMLElement인지 확인합니다.
 *
 * @param {HTMLElement | null | undefined} target
 * @returns {target is HTMLElement}
 */
function isValidTarget(target) {
  return target instanceof HTMLElement;
}

/**
 * 새 active interval id를 store에 저장합니다.
 *
 * @param {IntervalId} intervalId
 * @returns {void}
 */
function saveActiveIntervalId(intervalId) {
  setRuntime({
    activeIntervalId: intervalId,
  });
}

/**
 * videoId를 찾은 뒤 interval을 종료하고 팝업 메뉴 처리를 실행합니다.
 *
 * @param {string} videoId
 * @returns {void}
 */
function handleFoundVideoId(videoId, suppressBlockingButtons) {
  clearActiveInterval();
  popupMenuHandler(videoId, { suppressBlockingButtons });
}

/**
 * @param {HTMLElement} target
 * @returns {boolean}
 */
function hasAncestorTagYtShelfHeaderLayout(target) {
  return target.closest("yt-shelf-header-layout") instanceof Element;
}

/**
 * @param {HTMLElement} target
 * @returns {boolean}
 */
function hasAncestorClassContainingYtShelfHeaderLayout(target) {
  /** @type {HTMLElement | null} */
  let current = target;

  while (current) {
    const className = typeof current.className === "string" ? current.className : "";
    if (className.includes("ytShelfHeaderLayout")) {
      return true;
    }

    current = current.parentElement;
  }

  return false;
}

/**
 * @param {HTMLElement} target
 * @returns {boolean}
 */
function isMixRichItemRenderer(target) {
  const richItem = target.closest("ytd-rich-item-renderer");
  if (!(richItem instanceof HTMLElement)) {
    return false;
  }

  const anchors = richItem.querySelectorAll("a[href]");

  return Array.from(anchors).some((anchor) => {
    const href = anchor.getAttribute("href") || "";
    if (!href.includes("&list=")) {
      return false;
    }

    return anchor.querySelector("yt-collections-stack") instanceof Element;
  });
}

/**
 * @param {HTMLElement} target
 * @returns {boolean}
 */
function shouldSuppressBlockingButtons(target) {
  return (
    hasAncestorTagYtShelfHeaderLayout(target) ||
    hasAncestorClassContainingYtShelfHeaderLayout(target) ||
    isMixRichItemRenderer(target)
  );
}

/**
 * 현재 시도 횟수가 최대 재시도 횟수에 도달했는지 확인합니다.
 *
 * @param {number} attempt
 * @returns {boolean}
 */
function hasReachedMaxRetry(attempt) {
  return attempt >= MAX_RETRY;
}

/**
 * 점 3개 버튼 클릭 후, 해당 버튼이 포함된 썸네일의 videoId를
 * 일정 횟수 동안 반복 조회하여 찾으면 드롭다운 메뉴 처리 함수를 실행합니다.
 *
 * @param {HTMLElement} target 점 3개 버튼 element
 * @returns {void}
 */
export default function handleMoreButtonClick(target) {
  if (!isValidTarget(target)) return;

  clearActiveInterval();

  const suppressBlockingButtons = shouldSuppressBlockingButtons(target);
  let attempt = 0;

  /** @type {IntervalId} */
  const intervalId = window.setInterval(() => {
    attempt += 1;

    if (suppressBlockingButtons) {
      const isHandled = popupMenuHandler(null, { suppressBlockingButtons: true });
      if (isHandled) {
        clearActiveInterval();
        return;
      }
    }

    const videoId = getClickedVideoId(target, location.pathname);

    if (videoId) {
      handleFoundVideoId(videoId, suppressBlockingButtons);
      return;
    }

    if (hasReachedMaxRetry(attempt)) {
      clearActiveInterval();
    }
  }, RETRY_DELAY_MS);

  saveActiveIntervalId(intervalId);
}
