import { DATAS } from "@/js/channelBlocker/contents/variables";
import createMenuButton from "@/js/channelBlocker/contents/functions/createMenuButton";
import { handleBlockChannelClick as btnBlockerEvent } from "@/js/channelBlocker/contents/functions/btnBlockerEvent";
import { handleInterestClick as btnInterestEvent } from "@/js/channelBlocker/contents/functions/btnInterestEvent";
import getParamType from "@/js/module/getParamType";

/**
 * 버튼 dataset에 주입할 데이터 구조
 *
 * @typedef {Object} VideoDatasetPayload
 * @property {string[]} videoIds
 * @property {string} videoId
 */

/**
 * selector로 HTMLElement를 조회합니다.
 *
 * @param {ParentNode} root
 * @param {string} selector
 * @returns {HTMLElement|null}
 */
function queryHTMLElement(root, selector) {
  const element = root.querySelector(selector);
  return element instanceof HTMLElement ? element : null;
}

/**
 * 메뉴 버튼을 생성합니다.
 *
 * @param {string} className
 * @param {string} text
 * @param {(event: MouseEvent) => (void | Promise<void>)} onClick
 * @returns {HTMLElement}
 */
function createTypedMenuButton(className, text, onClick) {
  return /** @type {HTMLElement} */ (
    createMenuButton({
      className,
      text,
      onClick,
    })
  );
}

/**
 * 메뉴 리스트 요소 안에서 버튼을 찾고, 없으면 생성해서 추가한 뒤 반환합니다.
 *
 * @param {HTMLElement} listElement
 * @param {string} className
 * @param {string} text
 * @param {(event: MouseEvent) => (void | Promise<void>)} onClick
 * @returns {HTMLElement}
 */
function getOrCreateMenuButton(listElement, className, text, onClick) {
  const selector = `.${className}`;
  const existingButton = queryHTMLElement(listElement, selector);

  if (existingButton) {
    return existingButton;
  }

  const newButton = createTypedMenuButton(className, text, onClick);
  listElement.appendChild(newButton);
  return newButton;
}

/**
 * 버튼의 video 관련 dataset을 초기화합니다.
 *
 * @param {HTMLElement} button
 * @returns {void}
 */
function clearVideoDataset(button) {
  delete button.dataset.videoId;
  delete button.dataset.videoIds;
}

/**
 * 두 버튼의 dataset을 초기화합니다.
 *
 * @param {HTMLElement} blockerButton
 * @param {HTMLElement} interestButton
 * @returns {void}
 */
function clearButtonsDataset(blockerButton, interestButton) {
  clearVideoDataset(blockerButton);
  clearVideoDataset(interestButton);
}

/**
 * 두 버튼에 단일 videoId를 설정합니다.
 *
 * @param {HTMLElement} blockerButton
 * @param {HTMLElement} interestButton
 * @param {string} videoId
 * @returns {void}
 */
function setSingleVideoIdDataset(blockerButton, interestButton, videoId) {
  blockerButton.dataset.videoId = videoId;
  interestButton.dataset.videoId = videoId;
}

/**
 * 두 버튼에 videoId / videoIds 데이터를 설정합니다.
 *
 * @param {HTMLElement} blockerButton
 * @param {HTMLElement} interestButton
 * @param {VideoDatasetPayload} payload
 * @returns {void}
 */
function setObjectVideoDataset(blockerButton, interestButton, payload) {
  const { videoIds, videoId } = payload;
  const videoIdsText = JSON.stringify(videoIds);

  blockerButton.dataset.videoIds = videoIdsText;
  blockerButton.dataset.videoId = videoId;

  interestButton.dataset.videoIds = videoIdsText;
  interestButton.dataset.videoId = videoId;
}

/**
 * object 문자열을 버튼 dataset용 데이터 구조로 변환합니다.
 *
 * @param {string} videoObj
 * @returns {VideoDatasetPayload}
 */
function parseVideoDatasetPayload(videoObj) {
  const parsed = JSON.parse(videoObj);

  const videoIds = Array.isArray(parsed?.videoIds)
    ? parsed.videoIds.filter((item) => typeof item === "string")
    : [];

  const videoId = typeof parsed?.videoId === "string" ? parsed.videoId : "";

  return { videoIds, videoId };
}

/**
 * 점 3개 메뉴 팝업의 리스트 요소에
 * "채널 추천 안함", "관심 없음" 버튼을 보장 생성하고,
 * 전달받은 video 정보로 dataset을 세팅합니다.
 *
 * 지원 입력:
 * - 단일 videoId 문자열
 * - { videoIds, videoId }를 stringify 한 문자열
 *
 * @param {HTMLElement|null} listElement 메뉴 리스트 부모 요소
 * @param {string|null} videoObj 단일 videoId 또는 JSON 문자열
 * @returns {void}
 */
export function appendBlockingMenuButtons(listElement, videoObj) {
  if (!listElement) return;

  const blockerButton = getOrCreateMenuButton(
    listElement,
    DATAS.btns.blocker.cls,
    DATAS.btns.blocker.text,
    btnBlockerEvent
  );

  const interestButton = getOrCreateMenuButton(
    listElement,
    DATAS.btns.interest.cls,
    DATAS.btns.interest.text,
    btnInterestEvent
  );

  clearButtonsDataset(blockerButton, interestButton);

  if (!videoObj) return;

  const paramType = getParamType(videoObj);

  if (paramType === "object") {
    const payload = parseVideoDatasetPayload(videoObj);
    setObjectVideoDataset(blockerButton, interestButton, payload);
    return;
  }

  if (paramType === "string") {
    setSingleVideoIdDataset(blockerButton, interestButton, videoObj);
  }
}