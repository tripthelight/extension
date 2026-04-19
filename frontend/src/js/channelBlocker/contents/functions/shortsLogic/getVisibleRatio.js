/**
 * 요소가 현재 화면(viewport)에 얼마나 보이는지 비율로 계산합니다.
 * 여러 Shorts 요소 중 가장 많이 보이는 요소를 현재 보고 있는 Shorts로 판단할 때 사용합니다.
 *
 * 계산 방식:
 * - 요소의 전체 면적을 구합니다.
 * - 그중 현재 화면 안에 들어와 실제로 보이는 면적을 구합니다.
 * - `보이는 면적 / 전체 면적` 값을 반환합니다.
 *
 * 반환값 범위:
 * - 0: 화면에 전혀 보이지 않음
 * - 1: 요소 전체가 화면에 완전히 보임
 * - 0 ~ 1 사이: 일부만 보임
 *
 * @param {HTMLElement} el 화면에 있는 `.reel-video-in-sequence-new` 요소 하나
 * @returns {number} 요소가 화면에 보이는 비율
 */
export default (el) => {
  if (!el || !el.isConnected) return 0;
  const rect = el.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const visibleWidth = Math.max(0, Math.min(rect.right, vw) - Math.max(rect.left, 0));
  const visibleHeight = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));

  const visibleArea = visibleWidth * visibleHeight;
  const totalArea = Math.max(1, rect.width * rect.height);

  return visibleArea / totalArea;
}