import getVisibleDropdown from "@/js/channelBlocker/contents/functions/getVisibleDropdown";
import getDropdownList from "@/js/channelBlocker/contents/functions/getDropdownList";
import { appendBlockingMenuButtons as ensureMenuButtons } from "@/js/channelBlocker/contents/functions/ensureMenuButtons";
import adjustDropdownSize from "@/js/channelBlocker/contents/functions/adjustDropdownSize";
import { DATAS } from "@/js/channelBlocker/contents/variables";

/**
 * videoObj가 버튼 주입에 사용할 수 있는 문자열인지 확인합니다.
 *
 * @param {string|null} videoObj
 * @returns {videoObj is string}
 */
function hasVideoObject(videoObj) {
  return typeof videoObj === "string" && videoObj !== "";
}

/**
 * 현재 화면에서 보이는 드롭다운을 HTMLElement로 반환합니다.
 *
 * @returns {HTMLElement|null}
 */
function getActiveDropdownElement() {
  const dropdown = getVisibleDropdown();
  return dropdown instanceof HTMLElement ? dropdown : null;
}

/**
 * 드롭다운 내부의 메뉴 리스트 요소를 HTMLElement로 반환합니다.
 *
 * @param {HTMLElement} dropdown
 * @returns {HTMLElement|null}
 */
function getDropdownListElement(dropdown) {
  const listElement = getDropdownList(dropdown);
  return listElement instanceof HTMLElement ? listElement : null;
}

/**
 * 드롭다운에 차단 관련 메뉴 버튼을 추가하고,
 * 드롭다운 크기를 다시 맞춥니다.
 *
 * @param {HTMLElement} dropdown
 * @param {HTMLElement} listElement
 * @param {string} videoObj
 * @returns {void}
 */
function applyBlockingMenuToDropdown(dropdown, listElement, videoObj) {
  ensureMenuButtons(listElement, videoObj);
  adjustDropdownSize(dropdown);
}

/**
 * @param {HTMLElement} listElement
 * @returns {void}
 */
function removeBlockingMenuButtons(listElement) {
  const selectors = [
    `.${DATAS.btns.blocker.cls}`,
    `.${DATAS.btns.interest.cls}`,
  ];

  listElement.querySelectorAll(selectors.join(",")).forEach((node) => {
    node.remove();
  });
}

/**
 * @typedef {object} OpenBlockingMenuOptions
 * @property {boolean=} suppressBlockingButtons
 */

/**
 * 현재 열려 있는 드롭다운 메뉴를 찾아
 * 차단 관련 커스텀 버튼을 추가하고 드롭다운 크기를 재조정합니다.
 *
 * @param {string|null} videoObj
 * @param {OpenBlockingMenuOptions=} options
 * @returns {boolean}
 */
export function openBlockingMenu(videoObj, options = {}) {
  const dropdown = getActiveDropdownElement();
  if (!dropdown) return false;

  const listElement = getDropdownListElement(dropdown);
  if (!listElement) return false;

  if (options.suppressBlockingButtons) {
    removeBlockingMenuButtons(listElement);
    adjustDropdownSize(dropdown);
    return true;
  }

  if (!hasVideoObject(videoObj)) return false;

  applyBlockingMenuToDropdown(dropdown, listElement, videoObj);
  return true;
}
