// ================================
// 1. 설정값
// ================================

const API_KEY = "YOUR_YOUTUBE_DATA_API_KEY";

/**
 * 내가 이미 "추천 안함", "관심 없음" 처리한 채널명 목록
 * 실제 프로젝트에서는 storage/db에서 불러오시면 됩니다.
 */
const BLOCKED_CHANNEL_NAMES = new Set([
  "싫은채널1".toLowerCase(),
  "싫은채널2".toLowerCase(),
  "추천안함한채널".toLowerCase(),
]);


// ================================
// 2. 메모리 저장소
// ================================

/**
 * 이미 조회한 videoId 저장소
 *
 * 구조 예:
 * {
 *   "OdOyLChWcdk": {
 *      channelName: "ABC채널",
 *      blocked: true
 *   }
 * }
 */
const knownVideos = {};

/**
 * API 중복 호출 방지용
 */
let isFetching = false;

/**
 * 디바운스용 timer
 */
let scanTimer = null;


// ================================
// 3. 유틸 함수
// ================================

/**
 * 채널명 비교용 정규화
 */
function normalizeChannelName(name) {
  return String(name || "").trim().toLowerCase();
}

/**
 * 차단 채널 여부 확인
 */
function isBlockedChannel(channelName) {
  return BLOCKED_CHANNEL_NAMES.has(normalizeChannelName(channelName));
}

/**
 * 배열 중복 제거
 */
function unique(arr) {
  return [...new Set(arr)];
}

/**
 * 배열을 50개씩 자르기
 */
function chunkArray(arr, size) {
  const result = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}


// ================================
// 4. DOM에서 Shorts 찾기
// ================================

/**
 * 현재 화면에서 Shorts 관련 노드들을 찾습니다.
 *
 * 유튜브 DOM 구조는 바뀔 수 있어서
 * 실제 프로젝트에서는 selector를 조금씩 보강하셔야 합니다.
 */
function getShortsNodes() {
  return [
    ...document.querySelectorAll("[video-id]"),
    ...document.querySelectorAll("a[href^='/shorts/']"),
  ];
}

/**
 * node에서 videoId 추출
 */
function getVideoIdFromNode(node) {
  if (!(node instanceof Element)) return "";

  // 1. 자신에게 video-id가 있는 경우
  const selfVideoId = node.getAttribute("video-id");
  if (selfVideoId) return selfVideoId.trim();

  // 2. 자식에게 video-id가 있는 경우
  const child = node.querySelector("[video-id]");
  if (child instanceof Element) {
    const childVideoId = child.getAttribute("video-id");
    if (childVideoId) return childVideoId.trim();
  }

  // 3. /shorts/주소에서 파싱
  const anchor = node.matches("a[href^='/shorts/']")
    ? node
    : node.querySelector("a[href^='/shorts/']");

  if (anchor instanceof HTMLAnchorElement) {
    const href = anchor.getAttribute("href") || "";
    const match = href.match(/\/shorts\/([^/?&#]+)/);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return "";
}

/**
 * videoId로 현재 화면의 node들 찾기
 */
function findNodesByVideoId(videoId) {
  const allNodes = getShortsNodes();
  return allNodes.filter((node) => getVideoIdFromNode(node) === videoId);
}

/**
 * Shorts node 숨기기
 */
function hideNode(node) {
  if (!(node instanceof HTMLElement)) return;
  node.style.setProperty("display", "none", "important");
}

/**
 * 같은 videoId를 가진 썸네일들 숨기기
 */
function hideShortsByVideoId(videoId) {
  const nodes = findNodesByVideoId(videoId);
  nodes.forEach(hideNode);
}


// ================================
// 5. YouTube API 요청
// ================================

/**
 * videoIds 배열로 YouTube API 호출
 * 필요한 정보는 channelTitle 뿐이라 snippet만 요청
 */
async function fetchVideoInfos(videoIds) {
  const chunks = chunkArray(videoIds, 50);
  const allItems = [];

  for (const ids of chunks) {
    const url =
      "https://www.googleapis.com/youtube/v3/videos" +
      `?part=snippet&id=${ids.join(",")}&key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`YouTube API 요청 실패: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data.items)) {
      allItems.push(...data.items);
    }
  }

  return allItems;
}


// ================================
// 6. 핵심 처리
// ================================

/**
 * 현재 화면의 Shorts를 검사해서
 * 새 videoId만 API 조회하고, 차단 채널이면 숨깁니다.
 */
async function scanShorts() {
  if (isFetching) return;
  isFetching = true;

  try {
    const nodes = getShortsNodes();

    // 1. 화면에 있는 모든 videoId 수집isFetching
    const allVideoIds = unique(
      nodes
        .map(getVideoIdFromNode)
        .filter(Boolean)
    );

    // 2. 이미 조회한 videoId는 제외
    const newVideoIds = allVideoIds.filter((videoId) => !knownVideos[videoId]);

    // 3. 이미 알고 있는 것 중 차단된 것은 바로 숨김
    allVideoIds.forEach((videoId) => {
      const info = knownVideos[videoId];
      if (info && info.blocked) {
        hideShortsByVideoId(videoId);
      }
    });

    // 4. 새로 조회할 것이 없으면 종료
    if (newVideoIds.length === 0) {
      return;
    }

    // 5. 새 videoId만 API 요청
    const items = await fetchVideoInfos(newVideoIds);

    // 6. 응답 결과를 knownVideos에 저장
    items.forEach((item) => {
      const videoId = item.id;
      const channelName = item?.snippet?.channelTitle || "";
      const blocked = isBlockedChannel(channelName);

      knownVideos[videoId] = {
        channelName,
        blocked,
      };

      // 차단 채널이면 화면에서 숨김
      if (blocked) {
        hideShortsByVideoId(videoId);
      }
    });

    // 7. API 응답에 없는 videoId도 조회 완료 처리
    //    (삭제되었거나 응답 누락될 수도 있으니)
    newVideoIds.forEach((videoId) => {
      if (!knownVideos[videoId]) {
        knownVideos[videoId] = {
          channelName: "",
          blocked: false,
        };
      }
    });
  } catch (error) {
    console.error("[scanShorts error]", error);
  } finally {
    isFetching = false;
  }
}


// ================================
// 7. 스크롤로 새 노드가 생길 때 다시 검사
// ================================

/**
 * 너무 자주 실행되지 않도록 살짝 모아서 실행
 */
function scheduleScan() {
  clearTimeout(scanTimer);

  scanTimer = setTimeout(() => {
    scanShorts();
  }, 200);
}

function startObserver() {
  const observer = new MutationObserver((mutations) => {
    let hasNewShorts = false;

    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;

        if (
          node.matches?.("[video-id]") ||
          node.matches?.("a[href^='/shorts/']") ||
          node.querySelector?.("[video-id]") ||
          node.querySelector?.("a[href^='/shorts/']")
        ) {
          hasNewShorts = true;
        }
      });
    });

    if (hasNewShorts) {
      scheduleScan();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}


// ================================
// 8. 시작
// ================================

function start() {
  scanShorts();
  startObserver();
}

start();