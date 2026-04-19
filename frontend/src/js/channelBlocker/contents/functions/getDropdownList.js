import { DATAS } from "@/js/channelBlocker/contents/variables";

/**
 * display가 block 인 <tp-yt-iron-dropdown> element 내부 메뉴를 감싸는 바로 한단계 위의 부모 element 를 리턴
 * @param {HTMLElement} dropdown display가 block 인 <tp-yt-iron-dropdown> element
 * @returns {HTMLElement|null} <tp-yt-iron-dropdown> element 한단계 위에 있는 부모 element | 없으면 null
 */
export default (dropdown) => {
  if (!dropdown) return null;

  for (const selector of DATAS.dropdowns.lists) {
    const found = dropdown.querySelector(selector);
    if (found instanceof HTMLElement) return found;
  }

  return null;
};