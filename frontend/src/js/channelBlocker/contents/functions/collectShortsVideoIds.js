import extractVideoId from "@/js/channelBlocker/contents/functions/extractVideoId";

/**
 * 화면의 모든 a tag의 href에 "/shorts/"가 있으면 video-id 추출
 * @returns {string[]} 화면에 있는 모든 Shorts video-id 모음 배열
 */
export default () => {
  const ids = Array.from(document.querySelectorAll('a[href*="/shorts/"]'))
    .filter((el) => el instanceof HTMLAnchorElement)
    .map((a) => extractVideoId(a.href))
    .filter((id) => typeof id === 'string');

  return Array.from(new Set(ids));
};