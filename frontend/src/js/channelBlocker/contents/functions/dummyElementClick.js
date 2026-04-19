/**
 * 문서에 임시 더미 요소를 만들고 click 이벤트를 발생시킨 뒤 제거합니다.
 *
 * 동작 순서:
 * 1) `.blocking-dummy-elem` 요소 조회
 * 2) 없으면 `div` 요소 생성 후 body에 추가
 * 3) 요소에 click 이벤트 발생
 * 4) 요소 제거
 *
 * @returns {void}
 */
export default () => {
  if (!document.body) return;

  /** @type {HTMLElement | null} */
  let dummyElem = document.querySelector(".blocking-dummy-elem");

  if (!dummyElem) {
    dummyElem = document.createElement("div");
    dummyElem.className = "blocking-dummy-elem";
    document.body.appendChild(dummyElem);
  }

  dummyElem.click();
  dummyElem.remove();
};