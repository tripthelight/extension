import getVodData from "@/js/channelBlocker/contents/functions/getVodData";

/**
 * 클릭한 점3개버튼 썸네일 리스트를 받아서, 클릭한 점3개버튼 썸네일의 voide-id와 화면전체에 있는 Shorts 의 video-id 모듬 배열을 리턴
 * 클릭한 점3개버튼 썸네일 내부에 "/shorts/" or "v=" 이 없으면 null을 리턴
 * @param {HTMLElement} container 클릭한 점3개버튼 썸네일 리스트
 * @returns {string|null} videoId: 클릭한 점3개버튼 썸네일의 video-id, videoIds: 화면에 있는 모든 Shorts의 video-id 모음 배열 - videoId와 videoIds가 들어있는 Object를 stringify 한 문자열 | 클릭한 점3개 버튼의 썸네일 내부에 "/shorts/" or "v=" 이 없으면 null
 */
export default (container) => {
  if (!container) return null;

  const anchors = container.querySelectorAll("a");
  for (const anchor of anchors) {
    const id = getVodData(anchor.getAttribute("href"));
    if (id) return id;
  }

  return null;
}