import { DATAS } from "@/js/channelBlocker/contents/variables";

/**
 * 화면에 있는 모든 dropdown element(tp-yt-iron-dropdown) 중 display가 block인 dropdown element를 리턴
 * 없으면 null을 리턴
 * @returns {HTMLElement|null} <tp-yt-iron-dropdown> | null
 */
export default () => {
  const dropdowns = document.querySelectorAll(DATAS.dropdowns.wrap);

  for (const dropdown of dropdowns) {
    if (
      dropdown instanceof HTMLElement &&
      window.getComputedStyle(dropdown).display === "block"
    ) {
      return dropdown;
    }
  }

  return null;
};