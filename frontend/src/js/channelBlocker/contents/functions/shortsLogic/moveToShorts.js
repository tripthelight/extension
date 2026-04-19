/**
 * 대상 요소를 현재 화면의 중앙 부근으로 이동시킵니다.
 *
 * 동작 방식:
 * - 대상 요소가 없거나 이미 DOM에서 제거된 상태이면 스크롤하지 않고 `false`를 반환합니다.
 * - 대상 요소가 유효하면 `scrollIntoView()`를 사용해 화면 중앙에 가깝게 보이도록 이동시킵니다.
 *
 * 사용 목적:
 * - 특정 Shorts 요소를 현재 화면의 중심으로 가져와 사용자가 보고 있는 대상으로 맞추기 위해 사용합니다.
 * - 유튜브 Shorts의 내부 스크롤/슬라이드 동작을 최대한 건드리지 않기 위해 직접 좌표 계산 대신 `scrollIntoView()`를 사용합니다.
 *
 * @param {HTMLElement|null} targetEl 화면 중앙으로 가져오려는 대상 요소
 * @returns {boolean} 스크롤 이동을 수행했으면 true, 대상 요소가 없거나 DOM에 연결되어 있지 않으면 false
 */
export default (targetEl) => {
  if (!targetEl || !targetEl.isConnected) return false;

  targetEl.scrollIntoView({
    block: 'center',
    inline: 'nearest',
    behavior: 'auto',
  });

  return true;
}