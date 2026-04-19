import { LIST_TAG, CHANNEL_TAG } from "@/js/channelBlocker/contents/variables";
import getBlockedChannelNames from "@/js/channelBlocker/contents/functions/database/getBlockedChannelNames";

/**
 * IndexedDB에 저장된 차단 채널명 목록을 읽어와,
 * 현재 유튜브 채널 페이지에서 차단 대상 채널 관련 요소를 숨깁니다.
 *
 * 동작 순서:
 * 1. 현재 페이지가 채널 페이지인지 확인
 * 2. IndexedDB에서 차단 채널명 목록(channelNames) 조회
 * 3. 채널 페이지 내부 목록 요소들 중 차단 채널명이 포함된 항목에
 *    "blocking-recomn" 클래스를 추가
 * 4. 현재 채널 페이지의 채널명이 차단 목록에 포함되어 있으면
 *    contents 요소들에 "blocking-channel" 클래스를 추가
 *
 * 주의:
 * - 현재 페이지가 채널 페이지가 아니면 아무 동작도 하지 않습니다.
 * - IndexedDB의 objectStore "b" 안에 "channelNames" 키로 Blob 데이터가
 *   저장되어 있다고 가정합니다.
 * - Blob 내부 값은 JSON 문자열이며, 파싱 결과는 문자열 배열이어야 합니다.
 *
 * @function blockNotRecommendChannelInChannelPage
 * @returns {Promise<void>}
 */
export default async function blockNotRecommendChannelInChannelPage() {
  // 채널 페이지 여부 체크
  const isChannelPage =
    location.pathname.startsWith("/@") ||
    location.pathname.startsWith("/channel/") ||
    /^\/(@|channel\/)/.test(location.pathname);

  if (!isChannelPage) return;

  const channelNames = await getBlockedChannelNames();

  // 채널 안에 다른 채널명을 가진 차단 채널 썸네일이 있을 경우 hide
  const listSelector = LIST_TAG.join(",");
  document.querySelectorAll(listSelector).forEach(
    /**
     * 목록 요소를 검사하여 차단 채널명이 포함되어 있으면
     * "blocking-recomn" 클래스를 추가합니다.
     *
     * @param {Element} item
     * @returns {void}
     */
    (item) => {
      const text = item.textContent?.trim();
      if (!text) return;

      const hasChannelName = channelNames.some(
        /**
         * @param {string} channelName
         * @returns {boolean}
         */
        (channelName) => text.includes(channelName)
      );

      if (hasChannelName) {
        item.classList.add("blocking-recomn");
      }
    }
  );

  // 차단 채널 전체 hide
  const chNameElements = document.querySelectorAll(CHANNEL_TAG.chName);
  const contentsElements = document.querySelectorAll(CHANNEL_TAG.contents);
  const hasMatchedChannelName = [...chNameElements].some(
    /**
     * 채널명 영역과 그 하위 요소들 안에
     * 차단 채널명이 포함되어 있는지 검사합니다.
     *
     * @param {Element} chNameEl
     * @returns {boolean}
     */
    (chNameEl) => {
      const targets = [chNameEl, ...chNameEl.querySelectorAll("*")];

      return targets.some(
        /**
         * @param {Element} el
         * @returns {boolean}
         */
        (el) =>
          channelNames.some(
            /**
             * @param {string} channelName
             * @returns {boolean}
             */
            (channelName) => el.textContent?.includes(channelName) ?? false
          )
      );
    }
  );

  if (!hasMatchedChannelName) return;

  contentsElements.forEach(
    /**
     * 현재 채널 페이지가 차단 채널일 경우
     * contents 요소를 숨기기 위한 클래스를 추가합니다.
     *
     * @param {Element} el
     * @returns {void}
     */
    (el) => {
      el.classList.add("blocking-channel");
    }
  );
}