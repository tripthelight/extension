import getBlockedChannelNames from "@/js/channelBlocker/contents/functions/database/getBlockedChannelNames";

/**
 * store 저장용 Shorts 데이터
 *
 * @typedef {Object} ShortsStoreItem
 * @property {string} channelName
 * @property {boolean} blocked
 */

/**
 * videoId -> ShortsStoreItem
 *
 * @typedef {Object.<string, ShortsStoreItem>} ShortsDataMap
 */

/**
 * Shorts 상태
 *
 * @typedef {Object} ShortsState
 * @property {ShortsDataMap} data
 * @property {string[]} oldIds
 * @property {boolean} isFetching
 */

/**
 * 전체 상태
 *
 * @typedef {Object} StoreState
 * @property {ShortsState} shorts
 */

/**
 * 여러 개 저장할 때 사용하는 Shorts 입력 데이터
 *
 * @typedef {Object} ShortsVideoEntry
 * @property {string} videoId - Shorts의 video-id
 * @property {string} channelName - 채널명
 * @property {boolean} blocked - 차단 여부
 */

/** @type {StoreState} */
const state = {
  shorts: {
    data: {},
    oldIds: [],
    isFetching: false,
  },
};

/**
 * 전체 상태 객체를 반환합니다.
 *
 * 주의:
 * 내부 원본 객체의 참조를 그대로 반환합니다.
 *
 * @returns {StoreState}
 */
export function getState() {
  return state;
}

/**
 * Shorts 데이터 목록을 반환합니다.
 *
 * @returns {ShortsDataMap}
 */
export function getShortsData() {
  return state.shorts.data;
}

/**
 * isFetching 상태를 반환합니다.
 *
 * @returns {boolean}
 */
export function getIsFetching() {
  return state.shorts.isFetching;
}

/**
 * 특정 videoId에 해당하는 Shorts 데이터를 저장합니다.
 *
 * @param {string} videoId - Shorts의 video-id
 * @param {ShortsStoreItem} item - 저장할 Shorts 데이터
 * @returns {void}
 */
export function setShortsVideo(videoId, item) {
  state.shorts.data[videoId] = item;
}

/**
 * 여러 개의 Shorts 데이터를 한 번에 저장합니다.
 *
 * @param {ShortsVideoEntry[]} entries - 저장할 Shorts 데이터 목록
 * @returns {void}
 */
export function setShortsVideos(entries) {
  entries.forEach(({ videoId, channelName, blocked }) => {
    state.shorts.data[videoId] = {
      channelName,
      blocked,
    };
  });
}

/**
 * 특정 videoId의 blocked 상태만 변경합니다.
 *
 * @param {string} videoId - Shorts의 video-id
 * @param {boolean} blocked - 차단 여부
 * @returns {void}
 */
export function setShortsVideoBlocked(videoId, blocked) {
  const current = state.shorts.data[videoId];
  if (!current) return;

  current.blocked = blocked;
}

/**
 *  API 중복 호출 방지를 위해 상태 변경
 *
 * @param {boolean} flag - true | false 상태
 * @returns {void}
 */
export function changeIsFetching(flag) {
  if (typeof flag !== "boolean") {
    return;
  }
  state.shorts.isFetching = flag
}

/**
 * Shorts 데이터만 초기화합니다.
 *
 * @returns {void}
 */
export function clearShortsDataState() {
  /** @type {ShortsDataMap} */
  state.shorts.data = {};
}

export async function overrideShortsData() {
  const channelNames = await getBlockedChannelNames();

  // 1. 먼저 빈 객체로 초기화
  clearShortsDataState();

  // 2. channelNames를 기준으로 다시 채우기
  channelNames.forEach((channelName) => {
    state.shorts.data[crypto.randomUUID()] = {
      channelName,
      blocked: true,
    };
  });
}