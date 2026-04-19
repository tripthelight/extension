import { DATAS } from "@/js/channelBlocker/contents/variables";
import findVideoIdFromAnchors from "@/js/channelBlocker/contents/functions/findVideoIdFromAnchors";
import findClosestBySelectors from "@/js/channelBlocker/contents/functions/findClosestBySelectors";

/**
 * [ 메인화면, 검색 후 화면, 상세화면, 채널페이지, 재생목록 ] 구분
 * @param {object} target document.body에서 click한 object
 * @param {string} path location.pathname
 * @return {string|null} 점3개 버튼을 클릭한 썸제일의 video-id, 화면에 있는 모든 shorts의 video-id 모음 배열 을 stringiy한 문자열 | null
 */
export default (target, path) => {
  // 재생목록
  if (target?.closest(DATAS.views.playlist.lists)) {
    return findVideoIdFromAnchors(target?.closest(DATAS.views.playlist.list));
  }

  // 메인화면 - Shorts 리스트 있음
  if (path === DATAS.views.main.path) {
    return findVideoIdFromAnchors(target?.closest(DATAS.views.main.list));
  }

  // 검색 후 화면 - Shorts 리스트 있음
  if (path === DATAS.views.results.path) {
    return findVideoIdFromAnchors(
      findClosestBySelectors(target, DATAS.views.results.list)
    );
  }

  // 상세화면 - Shorts 리스트 있음
  if (path === DATAS.views.watch.path) {
    if (target?.closest(DATAS.views.watch.current)) {
      return new URL(location.href).searchParams.get("v");
    }

    return findVideoIdFromAnchors(
      findClosestBySelectors(target, DATAS.views.watch.recommends)
    );
  }

  // 채널 페이지 - Shorts 리스트 있음
  if (
    // location.pathname 이 "/@" 로 시작
    (
      location.pathname.startsWith('/@') ||
      /^\/@/.test(location.pathname)
    ) || 
    // location.pathname 이 "/channel" 로 시작
    (
      location.pathname.startsWith(`${DATAS.views.channel.path}`) ||
      /^\/@/.test(`${DATAS.views.channel.path}`)
    )
  ) {
    return findVideoIdFromAnchors(
      findClosestBySelectors(target, DATAS.views.channel.list)
    );
  }

  // Shorts 화면
  if (location.pathname.startsWith(`${DATAS.views.shorts.path}`) || /^\/@/.test(`${DATAS.views.shorts.path}`)) {
    return location.pathname.match(/^\/shorts\/([^/?#]+)/)?.[1];
  }

  return null;
}