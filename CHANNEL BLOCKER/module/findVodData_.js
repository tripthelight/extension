// ================================
// YouTube menu button classifier
// ================================

const YT_CASE = {
  HOME_LONG: 1,
  HOME_SHORT: 2,
  SEARCH_LONG: 3,
  SEARCH_SHORT: 4,
  WATCH_MAIN: 5,
  WATCH_RECOMMEND: 6,
  SHORTS_VIDEO: 7,
  CHANNEL_HOME_HERO: 8,
  CHANNEL_HOME_LIVE: 9,
  CHANNEL_HOME_LIST: 10,
  CHANNEL_HOME_SHORTS: 11,
  CHANNEL_VIDEOS: 12,
  CHANNEL_SHORTS: 13,
  CHANNEL_LIVE: 14,

  WATCH_PLAYLIST_ITEM: "watch-playlist-item",
  SKIP: "skip",
  UNKNOWN: "unknown",
};

// ------------------------
// 1) 현재 페이지 타입 판별
// ------------------------
function getPageType() {
  const path = location.pathname;

  if (path === "/") {
    return "home";
  }

  if (path === "/results") {
    return "search";
  }

  if (path === "/watch") {
    return "watch";
  }

  if (path.startsWith("/shorts")) {
    return "shorts";
  }

  // 채널 페이지
  if (
    path.startsWith("/@") ||
    path.startsWith("/channel/") ||
    path.startsWith("/c/") ||
    path.startsWith("/user/")
  ) {
    if (path.includes("/videos")) {
      return "channel-videos";
    }

    if (path.includes("/shorts")) {
      return "channel-shorts";
    }

    if (path.includes("/streams")) {
      return "channel-live";
    }

    return "channel-home";
  }

  return "unknown";
}

// ------------------------
// 2) 점3개 버튼인지 대략 판별
// ------------------------
// 유튜브 DOM은 자주 바뀌므로 100% 고정 셀렉터 하나로만 판별하지 않는 편이 낫습니다.
function isThreeDotsButton(target) {
  if (!(target instanceof Element)) {
    return false;
  }

  const btn = target.closest("button, yt-icon-button");
  if (!btn) {
    return false;
  }

  const ariaLabel = (btn.getAttribute("aria-label") || "").trim();
  const title = (btn.getAttribute("title") || "").trim();

  // ytd-menu-renderer 내부 버튼이면 우선 후보로 인정
  const inMenuRenderer = !!btn.closest("ytd-menu-renderer");

  // 언어/상황에 따라 바뀔 수 있는 라벨들
  const textMatched =
    ariaLabel.includes("더보기") ||
    ariaLabel.includes("작업") ||
    ariaLabel.includes("옵션") ||
    ariaLabel.includes("메뉴") ||
    ariaLabel.includes("More actions") ||
    ariaLabel.includes("Action menu") ||
    title.includes("더보기") ||
    title.includes("옵션") ||
    title.includes("More");

  return inMenuRenderer || textMatched;
}

// ------------------------
// 3) skip 해야 하는 버튼인지 판별
// ------------------------
// 사용자님이 말한 "추천안함/관심없음 필요없는 헤더 점3개" 제외
function shouldSkip(clickedEl) {
  const pageType = getPageType();

  // 상세화면 > 재생목록 전체 헤더
  if (
    pageType === "watch" &&
    clickedEl.closest("ytd-playlist-panel-renderer > div#header")
  ) {
    return true;
  }

  // 채널 홈 > Shorts 상단 header
  if (
    pageType === "channel-home" &&
    clickedEl.closest("ytd-reel-shelf-renderer > div#header")
  ) {
    return true;
  }

  return false;
}

// ------------------------
// 4) 페이지별 분류 함수
// ------------------------

function classifyHome(clickedEl) {
  // 2) 메인화면 > short
  if (
    clickedEl.closest(
      "ytd-rich-section-renderer ytd-rich-shelf-renderer ytd-rich-item-renderer"
    )
  ) {
    return {
      code: YT_CASE.HOME_SHORT,
      label: "메인화면 > shorts 영상",
      pageType: "home",
    };
  }

  // 1) 메인화면 > long
  if (clickedEl.closest("ytd-rich-item-renderer")) {
    return {
      code: YT_CASE.HOME_LONG,
      label: "메인화면 > long form 영상",
      pageType: "home",
    };
  }

  return null;
}

function classifySearch(clickedEl) {
  // 4) 검색 후 화면 > short
  if (clickedEl.closest("div.ytGridShelfViewModelGridShelfItem")) {
    return {
      code: YT_CASE.SEARCH_SHORT,
      label: "검색 후 화면 > shorts 영상",
      pageType: "search",
    };
  }

  // 3) 검색 후 화면 > long
  if (clickedEl.closest("ytd-video-renderer")) {
    return {
      code: YT_CASE.SEARCH_LONG,
      label: "검색 후 화면 > long form 영상",
      pageType: "search",
    };
  }

  return null;
}

function classifyWatch(clickedEl) {
  // 재생목록 item
  if (clickedEl.closest("ytd-playlist-panel-video-renderer")) {
    return {
      code: YT_CASE.WATCH_PLAYLIST_ITEM,
      label: "상세화면 > 재생목록 리스트",
      pageType: "watch",
    };
  }

  // 6) 상세화면 > 오른쪽 추천영상
  if (clickedEl.closest("yt-lockup-view-model")) {
    return {
      code: YT_CASE.WATCH_RECOMMEND,
      label: "상세화면 > 해당 영상 오른쪽 추천영상",
      pageType: "watch",
    };
  }

  // 5) 상세화면 > 해당 영상
  if (clickedEl.closest("ytd-watch-metadata")) {
    return {
      code: YT_CASE.WATCH_MAIN,
      label: "상세화면 > 해당 영상",
      pageType: "watch",
    };
  }

  return null;
}

function classifyShorts(clickedEl) {
  // 7) 쇼츠 영상 화면
  if (clickedEl.closest("ytd-reel-video-renderer")) {
    return {
      code: YT_CASE.SHORTS_VIDEO,
      label: "쇼츠 영상 화면",
      pageType: "shorts",
    };
  }

  return null;
}

function classifyChannelHome(clickedEl) {
  // 11) 채널페이지 > 홈 > Shorts
  if (clickedEl.closest("ytm-shorts-lockup-view-model-v2")) {
    return {
      code: YT_CASE.CHANNEL_HOME_SHORTS,
      label: "채널페이지 > 홈 > Shorts",
      pageType: "channel-home",
    };
  }

  // 10) 채널페이지 > 홈 > 그 하위 영상 리스트
  if (clickedEl.closest("ytd-shelf-renderer ytd-grid-video-renderer")) {
    return {
      code: YT_CASE.CHANNEL_HOME_LIST,
      label: "채널페이지 > 홈 > 그 하위 영상 리스트",
      pageType: "channel-home",
    };
  }

  // 9) 채널페이지 > 홈 > 실시간 스트림 n개
  if (
    clickedEl.closest("ytd-channel-featured-content-renderer ytd-video-renderer")
  ) {
    return {
      code: YT_CASE.CHANNEL_HOME_LIVE,
      label: "채널페이지 > 홈 > 실시간 스트림 n개",
      pageType: "channel-home",
    };
  }

  // 8) 채널페이지 > 홈 > 최상단 현재 재생중인 영상
  if (clickedEl.closest("ytd-channel-video-player-renderer")) {
    return {
      code: YT_CASE.CHANNEL_HOME_HERO,
      label: "채널페이지 > 홈 > 최상단 현재 재생중인 영상",
      pageType: "channel-home",
    };
  }

  return null;
}

function classifyChannelVideos(clickedEl) {
  // 12) 채널페이지 > 동영상
  if (clickedEl.closest("ytd-rich-item-renderer")) {
    return {
      code: YT_CASE.CHANNEL_VIDEOS,
      label: "채널페이지 > 동영상",
      pageType: "channel-videos",
    };
  }

  return null;
}

function classifyChannelShorts(clickedEl) {
  // 13) 채널페이지 > Shorts
  if (clickedEl.closest("ytd-rich-item-renderer")) {
    return {
      code: YT_CASE.CHANNEL_SHORTS,
      label: "채널페이지 > Shorts",
      pageType: "channel-shorts",
    };
  }

  return null;
}

function classifyChannelLive(clickedEl) {
  // 14) 채널페이지 > 라이브
  if (clickedEl.closest("ytd-rich-item-renderer")) {
    return {
      code: YT_CASE.CHANNEL_LIVE,
      label: "채널페이지 > 라이브",
      pageType: "channel-live",
    };
  }

  return null;
}

// ------------------------
// 5) 최종 분류 함수
// ------------------------
function classifyMenuClick(clickedEl) {
  const pageType = getPageType();

  if (shouldSkip(clickedEl)) {
    return {
      code: YT_CASE.SKIP,
      label: "skip 대상 버튼",
      pageType,
    };
  }

  switch (pageType) {
    case "home":
      return classifyHome(clickedEl);

    case "search":
      return classifySearch(clickedEl);

    case "watch":
      return classifyWatch(clickedEl);

    case "shorts":
      return classifyShorts(clickedEl);

    case "channel-home":
      return classifyChannelHome(clickedEl);

    case "channel-videos":
      return classifyChannelVideos(clickedEl);

    case "channel-shorts":
      return classifyChannelShorts(clickedEl);

    case "channel-live":
      return classifyChannelLive(clickedEl);

    default:
      return {
        code: YT_CASE.UNKNOWN,
        label: "분류 불가",
        pageType,
      };
  }
}

// ------------------------
// 6) 점3개 버튼 클릭 감지
// ------------------------
function onYoutubeClick(event) {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  const btn = target.closest("button, yt-icon-button");
  if (!btn) {
    return;
  }

  if (!isThreeDotsButton(btn)) {
    return;
  }

  const result = classifyMenuClick(btn);

  if (!result) {
    console.log("[YT] 분류 실패");
    return;
  }

  if (result.code === YT_CASE.SKIP) {
    console.log("[YT] skip:", result.label);
    return;
  }

  console.log("[YT] 분류 결과:", result.code, result.label, result.pageType);

  // 여기서 원하는 후속 처리
  // 예:
  // openCustomMenu(result);
  // saveLog(result);
  // blockVideoByCase(result);
}

// ------------------------
// 7) 이벤트 등록
// ------------------------
function initYoutubeMenuClassifier() {
  document.removeEventListener("click", onYoutubeClick, true);
  document.addEventListener("click", onYoutubeClick, true);
}

initYoutubeMenuClassifier();