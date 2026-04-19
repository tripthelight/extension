import { SHORTS_TAG } from "@/js/channelBlocker/contents/variables";
import getVisibleRatio from "@/js/channelBlocker/contents/functions/shortsLogic/getVisibleRatio";

/**
 * 현재 화면에 있는 Shorts 목록 중 화면에 가장 많이 보이는 요소를 찾습니다.
 *
 * 동작 방식:
 * - `SHORTS_TAG.list` 셀렉터로 모든 Shorts 요소를 조회합니다.
 * - 각 요소의 화면 노출 비율을 `getVisibleRatio()`로 계산합니다.
 * - 가장 높은 노출 비율을 가진 요소를 선택합니다.
 *
 * 사용 목적:
 * - 여러 Shorts 요소가 동시에 DOM에 존재할 때
 * - 현재 사용자가 실제로 보고 있는 Shorts 요소를 판별하기 위해 사용합니다.
 *
 * @returns {HTMLElement|null} 현재 화면에서 가장 많이 보이는 Shorts 요소, 없으면 null
 */
export default () => {
  const items = document.querySelectorAll(SHORTS_TAG.list);
  if (!items.length) return null;

  /** @type {HTMLElement|null} */
  let bestEl = null;
  let bestRatio = -1;

  for (const el of items) {
    if (!(el instanceof HTMLElement)) continue;

    const ratio = getVisibleRatio(el);
    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestEl = el;
    }
  }

  return bestEl;
};