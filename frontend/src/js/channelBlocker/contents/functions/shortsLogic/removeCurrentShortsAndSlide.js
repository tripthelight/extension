import getCurrentShortsElement from "@/js/channelBlocker/contents/functions/shortsLogic/getCurrentShortsElement";
import getNextShortsElement from "@/js/channelBlocker/contents/functions/shortsLogic/getNextShortsElement";
import getPrevShortsElement from "@/js/channelBlocker/contents/functions/shortsLogic/getPrevShortsElement";
import moveToShorts from "@/js/channelBlocker/contents/functions/shortsLogic/moveToShorts";

/**
 * 현재 화면에서 보고 있는 Shorts 요소를 제거하고,
 * 가능한 경우 다음 Shorts 또는 이전 Shorts로 화면을 이동시킨 뒤 제거를 마무리합니다.
 *
 * 동작 순서:
 * 1. 현재 화면에서 가장 많이 보이는 Shorts 요소를 찾습니다.
 * 2. 현재 요소의 다음 형제 Shorts를 찾고, 없으면 이전 형제 Shorts를 찾습니다.
 * 3. 이동할 대상 요소가 있으면 먼저 그 요소를 화면 중앙으로 이동시킵니다.
 * 4. 브라우저 렌더링과 YouTube 내부 상태 반영을 잠시 기다립니다.
 * 5. 필요 시 한 번 더 대상 요소로 스크롤을 보정합니다.
 * 6. 기존 현재 Shorts 요소를 DOM에서 제거합니다.
 * 7. 제거 후에도 대상 요소가 화면에 유지되도록 다시 한 번 이동을 보정합니다.
 *
 * 사용 목적:
 * - 현재 보고 있는 Shorts를 화면에서 제거하고,
 *   사용자가 자연스럽게 다음 Shorts 또는 이전 Shorts를 계속 보도록 처리할 때 사용합니다.
 * - YouTube Shorts의 내부 스크롤/슬라이드 상태를 최대한 깨지 않도록
 *   제거 전에 먼저 이동하고, 렌더링 프레임을 기다린 뒤 제거하는 방식으로 동작합니다.
 *
 * 반환값:
 * - `true`: 현재 Shorts 제거 처리가 완료된 경우
 * - `false`: 현재 Shorts 요소를 찾지 못해 아무 작업도 하지 못한 경우
 *
 * @returns {Promise<boolean>} 현재 Shorts 제거 및 이동 처리가 성공적으로 수행되었는지 여부
 */
export default async () => {
  const currentEl = getCurrentShortsElement();
  if (!currentEl) {
    console.warn('[ShortsRemover] 현재 Shorts 요소를 찾지 못했습니다.');
    return false;
  }

  const nextEl = getNextShortsElement(currentEl);
  const prevEl = getPrevShortsElement(currentEl);

  // 우선순위: 다음 영상 -> 이전 영상
  const targetEl = nextEl || prevEl;

  // 삭제할 대상의 id는 언제든 바뀔 수 있으므로,
  // id 숫자에 의존하지 않고 DOM 위치 기준으로 처리
  if (!targetEl) {
    console.warn('[ShortsRemover] 이동할 다음/이전 Shorts가 없습니다. 현재 요소만 제거합니다.');
    currentEl.remove();
    return true;
  }

  // 1차 이동
  moveToShorts(targetEl);

  // 브라우저 렌더링/유튜브 내부 상태 반영 대기
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await new Promise((resolve) => requestAnimationFrame(resolve));

  // 혹시 한 번 더 보정
  moveToShorts(targetEl);

  // 내부 상태가 target으로 넘어갈 시간을 조금 더 줌
  await new Promise((resolve) => setTimeout(resolve, 80));

  // 현재 요소 제거
  if (currentEl.isConnected) {
    currentEl.remove();
  }

  // 제거 후 target으로 다시 한번 고정
  await new Promise((resolve) => requestAnimationFrame(resolve));
  moveToShorts(targetEl);

  return true;
}