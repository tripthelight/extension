import { DATAS, SHORTS_TAG } from "@/js/channelBlocker/contents/variables";
import escapeRegExp from "@/js/module/escapeRegExp";

/**
 * 현재 페이지에 렌더링된 Shorts 관련 요소들에서
 * Shorts 영상 ID(videoId)들을 중복 없이 추출합니다.
 *
 * 처리 순서:
 * 1. Shorts 경로를 기준으로 videoId 추출용 정규식을 생성
 * 2. SHORTS_TAG.contents에 정의된 selector들을 순회하며 대상 요소 조회
 * 3. 현재 화면에 실제로 속한 요소인지 검사하여 중복/불필요 요소 제외
 * 4. 각 요소 내부의 a[href] 링크에서 Shorts URL을 찾음
 * 5. URL에서 videoId를 추출하여 중복 없이 배열에 저장
 *
 * 주의:
 * - 반환되는 값은 문자열 배열이며, 각 문자열은 Shorts videoId입니다.
 * - 같은 videoId가 여러 번 발견되어도 한 번만 반환됩니다.
 * - 현재 페이지 위치(location.pathname)에 따라
 *   메인/검색/상세/채널/쇼츠 화면의 유효 DOM 범위만 검사합니다.
 *
 * @function getShortsVideoIds
 * @returns {string[]}
 * 현재 문서에서 추출한 Shorts videoId 목록
 */
export default function getShortsVideoIds() {
  /** @type {string[]} */
  const videoIds = [];

  /** @type {Set<string>} */
  const seen = new Set();

  const shortsPath = DATAS.views.shorts.path;

  const shortsPathForRegex = shortsPath.endsWith("/")
    ? shortsPath.slice(0, -1)
    : shortsPath;

  const shortsRegex = new RegExp(
    `${escapeRegExp(shortsPathForRegex)}/([^/?#]+)`
  );

  for (const selector of SHORTS_TAG.contents) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(
      /**
       * Shorts 후보 요소 내부에서 a[href]를 검사하여
       * Shorts videoId를 추출합니다.
       *
       * @param {Element} element
       * @returns {void}
       */
      (element) => {
        // ———————————————————————————————
        // element 조회 시 코드에만 있고, 화면에는 없는 중복 tag 조회 방지
        // ———————————————————————————————
        if (
          location.pathname === "/" &&
          !element.closest(`${DATAS.views.main.wrap}`)
        ) {
          return;
        } else if (
          location.pathname === "/results" &&
          !element.closest(`${DATAS.views.results.wrap}`)
        ) {
          return;
        } else if (
          location.pathname === "/watch" &&
          !element.closest(`${DATAS.views.watch.wrap}`)
        ) {
          return;
        } else if (
          ((location.pathname.startsWith("/@") || /^\/@/.test(location.pathname)) ||
            (location.pathname.startsWith(`${DATAS.views.channel.path}`) ||
              /^\/@/.test(`${DATAS.views.channel.path}`))) &&
          !element.closest(`${DATAS.views.channel.wrap}`)
        ) {
          return;
        } else if (
          (location.pathname.startsWith(`${DATAS.views.shorts.path}`) ||
            /^\/@/.test(`${DATAS.views.shorts.path}`)) &&
          !element.closest(`${DATAS.views.shorts.wrap}`)
        ) {
          return;
        }
        // ———————————————————————————————

        const aTags = element.querySelectorAll("a[href]");

        aTags.forEach(
          /**
           * anchor의 href에서 Shorts videoId를 추출합니다.
           *
           * @param {HTMLAnchorElement} aTag
           * @returns {void}
           */
          (aTag) => {
            const href = aTag.getAttribute("href") || "";

            if (
              href.startsWith(shortsPathForRegex + "/") ||
              href.includes(shortsPathForRegex + "/")
            ) {
              const match = href.match(shortsRegex);

              if (match && match[1]) {
                const videoId = match[1];

                if (!seen.has(videoId)) {
                  seen.add(videoId);
                  videoIds.push(videoId);
                }
              }
            }
          }
        );
      }
    );
  }

  // Fallback: selector 기반 수집에서 누락되는 경우를 위해
  // 문서 전체의 shorts 링크를 한 번 더 스캔합니다.
  const allShortsAnchors = document.querySelectorAll("a[href*='/shorts/']");
  allShortsAnchors.forEach((aTag) => {
    const href = aTag.getAttribute("href") || "";
    const match = href.match(shortsRegex);
    if (!match || !match[1]) return;

    const videoId = match[1];
    if (!seen.has(videoId)) {
      seen.add(videoId);
      videoIds.push(videoId);
    }
  });

  return [...new Set(videoIds)];
}
