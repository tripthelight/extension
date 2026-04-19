import { SHORTS_TAG } from "@/js/channelBlocker/contents/variables";

/**
 * 현재 Shorts 요소를 기준으로, 같은 DOM 레벨에서 이전에 오는 Shorts 요소를 찾습니다.
 *
 * 동작 방식:
 * - 현재 요소의 바로 이전 형제 요소(`previousElementSibling`)부터 검사합니다.
 * - 각 형제 요소가 `SHORTS_TAG.list` 셀렉터와 일치하는지 확인합니다.
 * - 일치하는 첫 번째 요소를 찾으면 반환합니다.
 * - 끝까지 찾지 못하면 `null`을 반환합니다.
 *
 * 사용 목적:
 * - 현재 보고 있는 Shorts 요소의 바로 이전 Shorts를 찾을 때 사용합니다.
 * - DOM 순서를 기준으로 이전 Shorts로 이동하거나 탐색할 때 사용합니다.
 *
 * @param {HTMLElement|null} currentEl 현재 기준이 되는 Shorts 요소
 * @returns {HTMLElement|null} 현재 요소 이전에 있는 Shorts 요소, 없으면 null
 */
export default (currentEl) => {
  if (!currentEl) return null;

  let prev = currentEl.previousElementSibling;
  while (prev) {
    if (prev instanceof HTMLElement && prev.matches(SHORTS_TAG.list)) {
      return prev;
    }
    prev = prev.previousElementSibling;
  }

  return null;
};