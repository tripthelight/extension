import { DATAS } from "@/js/channelBlocker/contents/variables";

/**
 * 루트 요소 안에서 지정한 selector에 해당하는 HTMLElement를 찾습니다.
 *
 * @param {ParentNode | null | undefined} root
 * @param {string} selector
 * @returns {HTMLElement | null}
 */
function queryHTMLElement(root, selector) {
  if (!root) return null;

  const element = root.querySelector(selector);
  return element instanceof HTMLElement ? element : null;
}

/**
 * 요소의 실제 스크롤 크기를 기준으로
 * maxWidth, maxHeight를 px 단위로 설정합니다.
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
function applyMaxSizeFromScrollSize(element) {
  element.style.maxWidth = `${element.scrollWidth}px`;
  element.style.maxHeight = `${element.scrollHeight}px`;
}

/**
 * dropdown 내부에서 지정된 slot 값을 가진 콘텐츠 요소를 찾아
 * 해당 요소의 실제 스크롤 크기만큼 maxWidth, maxHeight를 설정합니다.
 *
 * @param {ParentNode | null | undefined} dropdown 드롭다운 루트 요소
 * @returns {void}
 */
export default function setDropdownContentMaxSize(dropdown) {
  const selector = `[slot="${DATAS.dropdowns.slot}"]`;
  const content = queryHTMLElement(dropdown, selector);

  if (!content) return;

  applyMaxSizeFromScrollSize(content);
}