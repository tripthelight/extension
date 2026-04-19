/**
 * @param {object} target document.body에서 click한 object
 * @param {Array<string>} selectors video 썸네일을 감싸는 list tag element 모음 배열
 * @returns {HTMLElement|null} 점3개 버튼을 클릭한 썸네일의 반복 리스트 tag element | selectors 배열 tag들에 해당되지 않으면 null
 */
export default (target, selectors) => {
  for (const selector of selectors) {
    const found = target?.closest(selector);
    if (found) return found;
  }

  return null;
}