// ========================================
// YouTube menu click classifier
// DOM 우선 -> href 우선 -> fallback
// ========================================

const YT_CASE = {
  HOME_LONG: 1,
  HOME_SHORT: 2,
  SEARCH_LONG: 3,
  SEARCH_SHORT: 4,
  WATCH_MAIN: 5,
  WATCH_RECOMMEND: 6,
  SHORTS_VIDEO: 7,
  CHANNEL_HOME_HERO: 8,
  CHANNEL_HOME_STREAM: 9,
  CHANNEL_HOME_LIST: 10,
  CHANNEL_HOME_SHORTS: 11,
  CHANNEL_VIDEOS: 12,
  CHANNEL_SHORTS: 13,
  CHANNEL_LIVE: 14,

  WATCH_PLAYLIST_ITEM: "watch-playlist-item",
  SKIP: "skip",
  UNKNOWN: "unknown",
};

// ----------------------------------------
// 1) 공통 유틸
// ----------------------------------------
function getText(node) {
  if (!node) return "";
  return (node.textContent || "").replace(/\s+/g, " ").trim();
}

function safeDecode(value = "") {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function toUrlObject(href = "") {
  try {
    return new URL(href, location.origin);
  } catch {
    return null;
  }
}

function getPathname(href = "") {
  const url = toUrlObject(href);
  return url?.pathname || "";
}

function isWatchHref(href = "") {
  const url = toUrlObject(href);
  return !!url && url.pathname === "/watch" && url.searchParams.has("v");
}

function isShortsHref(href = "") {
  const path = getPathname(href);
  return path.startsWith("/shorts/");
}

function isHandleHref(href = "") {
  const path = getPathname(href);
  return path.startsWith("/@");
}

function extractVideoIdFromWatchHref(href = "") {
  const url = toUrlObject(href);
  if (!url || url.pathname !== "/watch") return "";
  return url.searchParams.get("v") || "";
}

function extractVideoIdFromShortsHref(href = "") {
  const path = getPathname(href);
  if (!path.startsWith("/shorts/")) return "";
  return path.slice("/shorts/".length).split("/")[0] || "";
}

function extractHandleFromHref(href = "") {
  const path = getPathname(href);
  if (!path.startsWith("/@")) return "";
  return safeDecode(path.slice(2).split("/")[0] || "");
}

function queryAllAnchors(root) {
  if (!root) return [];
  return Array.from(root.querySelectorAll("a[href]"));
}

function findFirstAnchor(root, predicate) {
  const anchors = queryAllAnchors(root);
  for (const a of anchors) {
    const href = a.getAttribute("href") || "";
    if (predicate(href, a)) {
      return a;
    }
  }
  return null;
}

function findFirstHandleAnchor(root) {
  return findFirstAnchor(root, (href) => isHandleHref(href));
}

function findFirstWatchAnchor(root) {
  return findFirstAnchor(root, (href) => isWatchHref(href));
}

function findFirstShortsAnchor(root) {
  return findFirstAnchor(root, (href) => isShortsHref(href));
}

// fallback용
function findChannelNameText(root) {
  if (!root) return "";

  const candidates = [
    root.querySelector("ytd-channel-name a[href^='/@']"),
    root.querySelector("ytd-channel-name a"),
    root.querySelector("#channel-name a[href^='/@']"),
    root.querySelector("#channel-name a"),
    root.querySelector("yt-lockup-metadata-view-model yt-content-metadata-view-model a"),
    root.querySelector("yt-content-metadata-view-model div:first-of-type span"),
    root.querySelector("span#byline"),
  ];

  for (const node of candidates) {
    const text = getText(node);
    if (text) return text;
  }

  return "";
}

function getChannelPageCommonInfo() {
  const h1 =
    document.querySelector(
      "body ytd-app ytd-page-manager ytd-browse ytd-tabbed-page-header h1"
    ) ||
    document.querySelector("ytd-tabbed-page-header h1");

  const channelName = getText(h1);

  const path = location.pathname || "";
  let channelHandle = "";

  if (path.startsWith("/@")) {
    channelHandle = safeDecode(path.slice(2).split("/")[0] || "");
  }

  return {
    channelName,
    channelHandle,
  };
}

// ----------------------------------------
// 2) 현재 페이지 타입 판별
// ----------------------------------------
function getPageType() {
  const path = location.pathname || "";

  if (path === "/") return "home";
  if (path === "/results") return "search";
  if (path === "/watch") return "watch";
  if (path.startsWith("/shorts/")) return "shorts";

  if (
    path.startsWith("/@") ||
    path.startsWith("/channel/") ||
    path.startsWith("/c/") ||
    path.startsWith("/user/")
  ) {
    if (path.includes("/videos")) return "channel-videos";
    if (path.includes("/shorts")) return "channel-shorts";
    if (path.includes("/streams")) return "channel-live";
    return "channel-home";
  }

  return "unknown";
}

// ----------------------------------------
// 3) 점3개 버튼 감지
// ----------------------------------------
function isThreeDotsButton(target) {
  if (!(target instanceof Element)) return false;

  const btn = target.closest("button, yt-icon-button");
  if (!btn) return false;

  if (btn.closest("ytd-menu-renderer")) return true;

  const ariaLabel = (btn.getAttribute("aria-label") || "").trim();
  const title = (btn.getAttribute("title") || "").trim();

  return (
    ariaLabel.includes("더보기") ||
    ariaLabel.includes("옵션") ||
    ariaLabel.includes("작업") ||
    ariaLabel.includes("메뉴") ||
    ariaLabel.includes("More") ||
    title.includes("더보기") ||
    title.includes("옵션") ||
    title.includes("More")
  );
}

// ----------------------------------------
// 4) skip 규칙
// ----------------------------------------
function shouldSkip(clickedEl, pageType) {
  if (
    pageType === "watch" &&
    clickedEl.closest("ytd-playlist-panel-renderer div#header")
  ) {
    return true;
  }

  if (
    pageType === "channel-home" &&
    clickedEl.closest("ytd-reel-shelf-renderer div#header")
  ) {
    return true;
  }

  return false;
}

// ----------------------------------------
// 5) 분류: DOM 우선
// ----------------------------------------
function classifyHome(clickedEl) {
  const shortCard = clickedEl.closest(
    "ytd-rich-section-renderer ytd-rich-shelf-renderer ytd-rich-item-renderer"
  );
  if (shortCard) {
    return {
      code: YT_CASE.HOME_SHORT,
      label: "메인화면 > shorts 영상",
      pageType: "home",
      cardEl: shortCard,
    };
  }

  const longCard = clickedEl.closest("ytd-rich-item-renderer");
  if (longCard) {
    return {
      code: YT_CASE.HOME_LONG,
      label: "메인화면 > long form 영상",
      pageType: "home",
      cardEl: longCard,
    };
  }

  return null;
}

function classifySearch(clickedEl) {
  const shortCard = clickedEl.closest("div.ytGridShelfViewModelGridShelfItem");
  if (shortCard) {
    return {
      code: YT_CASE.SEARCH_SHORT,
      label: "검색 후 화면 > shorts 영상",
      pageType: "search",
      cardEl: shortCard,
    };
  }

  const longCard = clickedEl.closest("ytd-video-renderer");
  if (longCard) {
    return {
      code: YT_CASE.SEARCH_LONG,
      label: "검색 후 화면 > long form 영상",
      pageType: "search",
      cardEl: longCard,
    };
  }

  return null;
}

function classifyWatch(clickedEl) {
  const playlistItem = clickedEl.closest("ytd-playlist-panel-video-renderer");
  if (playlistItem) {
    return {
      code: YT_CASE.WATCH_PLAYLIST_ITEM,
      label: "상세화면 > 재생목록 리스트",
      pageType: "watch",
      cardEl: playlistItem,
    };
  }

  const recommendCard = clickedEl.closest("yt-lockup-view-model");
  if (recommendCard) {
    return {
      code: YT_CASE.WATCH_RECOMMEND,
      label: "상세화면 > 해당 영상 오른쪽 추천영상",
      pageType: "watch",
      cardEl: recommendCard,
    };
  }

  const mainCard = clickedEl.closest("ytd-watch-metadata");
  if (mainCard) {
    return {
      code: YT_CASE.WATCH_MAIN,
      label: "상세화면 > 해당 영상",
      pageType: "watch",
      cardEl: mainCard,
    };
  }

  return null;
}

function classifyShorts(clickedEl) {
  const card = clickedEl.closest("ytd-reel-video-renderer");
  if (card) {
    return {
      code: YT_CASE.SHORTS_VIDEO,
      label: "쇼츠 영상 화면",
      pageType: "shorts",
      cardEl: card,
    };
  }

  return null;
}

function classifyChannelHome(clickedEl) {
  const shortsCard = clickedEl.closest("ytm-shorts-lockup-view-model-v2");
  if (shortsCard) {
    return {
      code: YT_CASE.CHANNEL_HOME_SHORTS,
      label: "채널페이지 > 홈 > Shorts",
      pageType: "channel-home",
      cardEl: shortsCard,
    };
  }

  const listCard = clickedEl.closest("ytd-shelf-renderer ytd-grid-video-renderer");
  if (listCard) {
    return {
      code: YT_CASE.CHANNEL_HOME_LIST,
      label: "채널페이지 > 홈 > 그 하위 영상 리스트",
      pageType: "channel-home",
      cardEl: listCard,
    };
  }

  const streamCard = clickedEl.closest(
    "ytd-channel-featured-content-renderer ytd-video-renderer"
  );
  if (streamCard) {
    return {
      code: YT_CASE.CHANNEL_HOME_STREAM,
      label: "채널페이지 > 홈 > 실시간 스트림 n개",
      pageType: "channel-home",
      cardEl: streamCard,
    };
  }

  const heroCard = clickedEl.closest("ytd-channel-video-player-renderer");
  if (heroCard) {
    return {
      code: YT_CASE.CHANNEL_HOME_HERO,
      label: "채널페이지 > 홈 > 최상단 현재 재생중인 영상",
      pageType: "channel-home",
      cardEl: heroCard,
    };
  }

  return null;
}

function classifyChannelVideos(clickedEl) {
  const card = clickedEl.closest("ytd-rich-item-renderer");
  if (!card) return null;

  return {
    code: YT_CASE.CHANNEL_VIDEOS,
    label: "채널페이지 > 동영상",
    pageType: "channel-videos",
    cardEl: card,
  };
}

function classifyChannelShorts(clickedEl) {
  const card = clickedEl.closest("ytd-rich-item-renderer");
  if (!card) return null;

  return {
    code: YT_CASE.CHANNEL_SHORTS,
    label: "채널페이지 > Shorts",
    pageType: "channel-shorts",
    cardEl: card,
  };
}

function classifyChannelLive(clickedEl) {
  const card = clickedEl.closest("ytd-rich-item-renderer");
  if (!card) return null;

  return {
    code: YT_CASE.CHANNEL_LIVE,
    label: "채널페이지 > 라이브",
    pageType: "channel-live",
    cardEl: card,
  };
}

function classifyMenuClick(clickedEl) {
  const pageType = getPageType();

  if (shouldSkip(clickedEl, pageType)) {
    return {
      code: YT_CASE.SKIP,
      label: "skip 대상 버튼",
      pageType,
      cardEl: null,
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
        cardEl: null,
      };
  }
}

// ----------------------------------------
// 6) href 우선 추출기
// ----------------------------------------
function extractByHref(cardEl, options = {}) {
  const result = {
    videoId: "",
    channelHandle: "",
  };

  const {
    videoType = "watch", // "watch" | "shorts" | "auto"
    handleRoot = cardEl,
    videoRoot = cardEl,
  } = options;

  const handleAnchor = findFirstHandleAnchor(handleRoot);
  if (handleAnchor) {
    result.channelHandle = extractHandleFromHref(
      handleAnchor.getAttribute("href") || ""
    );
  }

  if (videoType === "watch") {
    const watchAnchor = findFirstWatchAnchor(videoRoot);
    if (watchAnchor) {
      result.videoId = extractVideoIdFromWatchHref(
        watchAnchor.getAttribute("href") || ""
      );
    }
  } else if (videoType === "shorts") {
    const shortsAnchor = findFirstShortsAnchor(videoRoot);
    if (shortsAnchor) {
      result.videoId = extractVideoIdFromShortsHref(
        shortsAnchor.getAttribute("href") || ""
      );
    }
  } else {
    const watchAnchor = findFirstWatchAnchor(videoRoot);
    if (watchAnchor) {
      result.videoId = extractVideoIdFromWatchHref(
        watchAnchor.getAttribute("href") || ""
      );
    } else {
      const shortsAnchor = findFirstShortsAnchor(videoRoot);
      if (shortsAnchor) {
        result.videoId = extractVideoIdFromShortsHref(
          shortsAnchor.getAttribute("href") || ""
        );
      }
    }
  }

  return result;
}

// ----------------------------------------
// 7) fallback 추출기
// ----------------------------------------
function fillFallbackData(base, cardEl, options = {}) {
  const next = { ...base };
  const { useChannelPageCommon = false } = options;

  if (useChannelPageCommon) {
    const common = getChannelPageCommonInfo();

    if (!next.channelName) {
      next.channelName = common.channelName;
    }

    if (!next.channelHandle) {
      next.channelHandle = common.channelHandle;
    }
  }

  if (!next.channelName) {
    next.channelName = findChannelNameText(cardEl);
  }

  // 상세 main video는 href 없이도 video-id attribute가 있음
  if (!next.videoId && cardEl?.matches?.("ytd-watch-metadata")) {
    next.videoId = cardEl.getAttribute("video-id") || "";
  }

  // shorts page는 현재 url 사용 가능
  if (!next.videoId && location.pathname.startsWith("/shorts/")) {
    next.videoId = extractVideoIdFromShortsHref(location.pathname);
  }

  return next;
}

// ----------------------------------------
// 8) 케이스별 data 추출
// DOM으로 card를 찾고,
// href로 확정값을 먼저 얻고,
// 마지막에 fallback
// ----------------------------------------
function extractDataByCase(classified) {
  const { code, label, pageType, cardEl } = classified;

  const base = {
    code,
    label,
    pageType,
    channelName: "",
    channelHandle: "",
    videoId: "",
  };

  if (code === YT_CASE.SKIP || code === YT_CASE.UNKNOWN || !cardEl) {
    return base;
  }

  switch (code) {
    // 1. 메인 long
    case YT_CASE.HOME_LONG: {
      const hrefData = extractByHref(cardEl, {
        videoType: "watch",
      });

      return fillFallbackData(
        {
          ...base,
          channelHandle: hrefData.channelHandle,
          videoId: hrefData.videoId,
        },
        cardEl
      );
    }

    // 2. 메인 shorts
    case YT_CASE.HOME_SHORT: {
      const hrefData = extractByHref(cardEl, {
        videoType: "shorts",
      });

      return {
        ...base,
        videoId: hrefData.videoId,
      };
    }

    // 3. 검색 long
    case YT_CASE.SEARCH_LONG: {
      const handleRoot = cardEl.querySelector("ytd-channel-name") || cardEl;

      const hrefData = extractByHref(cardEl, {
        videoType: "watch",
        handleRoot,
      });

      return fillFallbackData(
        {
          ...base,
          channelHandle: hrefData.channelHandle,
          videoId: hrefData.videoId,
        },
        cardEl
      );
    }

    // 4. 검색 shorts
    case YT_CASE.SEARCH_SHORT: {
      const hrefData = extractByHref(cardEl, {
        videoType: "shorts",
      });

      return {
        ...base,
        videoId: hrefData.videoId,
      };
    }

    // 5. 상세 main
    case YT_CASE.WATCH_MAIN: {
      const ownerRoot =
        document.querySelector(
          "ytd-watch-metadata ytd-video-owner-renderer ytd-channel-name"
        ) || cardEl;

      const hrefData = extractByHref(cardEl, {
        videoType: "watch",
        handleRoot: ownerRoot,
        videoRoot: cardEl,
      });

      return fillFallbackData(
        {
          ...base,
          channelHandle: hrefData.channelHandle,
          videoId: cardEl.getAttribute("video-id") || hrefData.videoId,
        },
        ownerRoot
      );
    }

    // 6. 상세 오른쪽 추천영상
    case YT_CASE.WATCH_RECOMMEND: {
      const hrefData = extractByHref(cardEl, {
        videoType: "watch",
      });

      return fillFallbackData(
        {
          ...base,
          videoId: hrefData.videoId,
        },
        cardEl
      );
    }

    // playlist item
    case YT_CASE.WATCH_PLAYLIST_ITEM: {
      const hrefData = extractByHref(cardEl, {
        videoType: "watch",
      });

      return fillFallbackData(
        {
          ...base,
          videoId: hrefData.videoId,
        },
        cardEl
      );
    }

    // 7. shorts page
    case YT_CASE.SHORTS_VIDEO: {
      const hrefData = extractByHref(cardEl, {
        videoType: "shorts",
      });

      const next = fillFallbackData(
        {
          ...base,
          channelHandle: hrefData.channelHandle,
          videoId: hrefData.videoId || extractVideoIdFromShortsHref(location.pathname),
        },
        cardEl
      );

      // shorts page는 channelName fallback이 handle일 수도 있음
      if (!next.channelName && next.channelHandle) {
        next.channelName = next.channelHandle;
      }

      return next;
    }

    // 8. 채널 홈 hero
    case YT_CASE.CHANNEL_HOME_HERO: {
      const common = getChannelPageCommonInfo();

      // hero는 점3개 버튼이 없을 가능성이 크지만,
      // 혹시 잡힌 경우 현재 채널 공통정보 + watch href 사용
      const hrefData = extractByHref(cardEl, {
        videoType: "watch",
      });

      return {
        ...base,
        channelName: common.channelName,
        channelHandle: common.channelHandle,
        videoId: hrefData.videoId,
      };
    }

    // 9,10,12,14 채널 페이지의 일반 영상 카드
    case YT_CASE.CHANNEL_HOME_STREAM:
    case YT_CASE.CHANNEL_HOME_LIST:
    case YT_CASE.CHANNEL_VIDEOS:
    case YT_CASE.CHANNEL_LIVE: {
      const hrefData = extractByHref(cardEl, {
        videoType: "watch",
      });

      return fillFallbackData(
        {
          ...base,
          videoId: hrefData.videoId,
        },
        cardEl,
        { useChannelPageCommon: true }
      );
    }

    // 11,13 채널 페이지 shorts 카드
    case YT_CASE.CHANNEL_HOME_SHORTS:
    case YT_CASE.CHANNEL_SHORTS: {
      const hrefData = extractByHref(cardEl, {
        videoType: "shorts",
      });

      return {
        ...base,
        videoId: hrefData.videoId,
      };
    }

    default:
      return base;
  }
}

// ----------------------------------------
// 9) 최종 result builder
// ----------------------------------------
function buildMenuClickResult(menuButtonEl) {
  const classified = classifyMenuClick(menuButtonEl);
  if (!classified) return null;

  return extractDataByCase(classified);
}

// ----------------------------------------
// 10) 클릭 이벤트
// ----------------------------------------
function onYoutubeClick(event) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const btn = target.closest("button, yt-icon-button");
  if (!btn) return;

  if (!isThreeDotsButton(btn)) return;

  const result = buildMenuClickResult(btn);

  if (!result) {
    console.log("[YT] result 없음");
    return;
  }

  if (result.code === YT_CASE.SKIP) {
    console.log("[YT] skip");
    return;
  }

  console.log("[YT] result =", result);

  // 여기서 후속 처리
  // 예:
  // saveBlockedCandidate(result);
  // openCustomActionMenu(result);
}

// ----------------------------------------
// 11) init
// ----------------------------------------
function initYoutubeMenuClassifier() {
  document.removeEventListener("click", onYoutubeClick, true);
  document.addEventListener("click", onYoutubeClick, true);
}

// initYoutubeMenuClassifier();