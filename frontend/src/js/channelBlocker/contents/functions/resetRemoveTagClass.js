import { LIST_TAG, CHANNEL_TAG, SHORTS_TAG } from "@/js/channelBlocker/contents/variables";

/**
 * CSS 선택자에 해당하는 모든 요소에서 지정한 클래스를 제거합니다.
 *
 * @param {string} selector
 * CSS 선택자
 *
 * @param {string} className
 * 제거할 클래스명
 *
 * @returns {void}
 */
function removeClassFromAll(selector, className) {
  if (!selector) {
    return;
  }

  /** @type {NodeListOf<Element>} */
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    element.classList.remove(className);
  });
}

/**
 * 차단 처리 때문에 추가했던 CSS 클래스를 제거합니다.
 *
 * - 목록/썸네일 관련 요소에서는 "blocking-recomn" 클래스를 제거합니다.
 * - 채널 콘텐츠 관련 요소에서는 "blocking-channel" 클래스를 제거합니다.
 *
 * 이 함수는 차단 상태를 해제하거나 화면을 원래 상태로 복원할 때 사용합니다.
 *
 * @returns {void}
 */
export default () => {
  /** @type {string[]} */
  const listTags = Array.isArray(LIST_TAG) ? LIST_TAG : [];

  /** @type {string} */
  const listSelector = listTags.join(",");

  /** @type {string} */
  const channelContentsSelector =
    typeof CHANNEL_TAG?.contents === "string" ? CHANNEL_TAG.contents : "";

  /** @type {string} */
  const shortsSelector = Array.isArray(SHORTS_TAG?.contents)
    ? SHORTS_TAG.contents.join(",")
    : "";

  removeClassFromAll(listSelector, "blocking-recomn");
  removeClassFromAll(listSelector, "blocking-channel");
  removeClassFromAll(shortsSelector, "blocking-recomn");
  removeClassFromAll(channelContentsSelector, "blocking-channel");
  removeClassFromAll(shortsSelector, "blocking-channel");
}
