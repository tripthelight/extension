/**
 * 브라우저 환경의 interval ID 타입
 * @typedef {number} IntervalId
 */

/**
 * 브라우저 환경의 requestAnimationFrame ID 타입
 * @typedef {number} RafId
 */

/**
 * 채널 차단 기능의 일반 상태 타입
 *
 * @typedef {Object} ChannelBlockerState
 * @property {boolean} isInitialized 초기화 완료 여부
 * @property {boolean} isUrlWatcherBound URL 감시 바인딩 여부
 * @property {string} prevUrl 이전 URL
 */

/**
 * 채널 차단 기능의 일반 상태 patch 타입
 *
 * @typedef {Object} ChannelBlockerStatePatch
 * @property {boolean} [isInitialized]
 * @property {boolean} [isUrlWatcherBound]
 * @property {string} [prevUrl]
 */

/**
 * 채널 차단 기능의 런타임 상태 타입
 *
 * @typedef {Object} ChannelBlockerRuntime
 * @property {MutationObserver | null} thumbObserver 썸네일 감시 observer
 * @property {IntervalId | null} activeIntervalId 현재 활성 interval ID
 * @property {RafId | null} removeVodThumbRaf requestAnimationFrame ID
 */

/**
 * 채널 차단 기능의 런타임 상태 patch 타입
 *
 * @typedef {Object} ChannelBlockerRuntimePatch
 * @property {MutationObserver | null} [thumbObserver]
 * @property {IntervalId | null} [activeIntervalId]
 * @property {RafId | null} [removeVodThumbRaf]
 */

/** @type {ChannelBlockerState} */
const STATE = {
  isInitialized: false,
  isUrlWatcherBound: false,
  prevUrl: "",
};

/** @type {ChannelBlockerRuntime} */
const RUNTIME = {
  thumbObserver: null,
  activeIntervalId: null,
  removeVodThumbRaf: null,
};

/**
 * patch가 병합 가능한 일반 객체인지 확인합니다.
 *
 * @param {unknown} patch
 * @returns {boolean}
 */
function isPlainPatchObject(patch) {
  return !!patch && typeof patch === "object" && !Array.isArray(patch);
}

/**
 * 현재 일반 상태의 얕은 복사본을 반환합니다.
 *
 * @returns {ChannelBlockerState}
 */
export function getState() {
  return { ...STATE };
}

/**
 * 전달받은 patch를 일반 상태에 병합합니다.
 *
 * @param {ChannelBlockerStatePatch} patch
 * @returns {void}
 */
export function setState(patch) {
  if (!isPlainPatchObject(patch)) {
    console.warn("[store] setState에는 객체만 전달할 수 있습니다.", patch);
    return;
  }

  Object.assign(STATE, patch);
}

/**
 * 현재 런타임 상태의 얕은 복사본을 반환합니다.
 *
 * 주의:
 * 내부 객체 참조를 외부에서 직접 수정하지 않도록
 * 원본이 아닌 얕은 복사본을 반환합니다.
 *
 * @returns {ChannelBlockerRuntime}
 */
export function getRuntime() {
  return { ...RUNTIME };
}

/**
 * 전달받은 patch를 런타임 상태에 병합합니다.
 *
 * @param {ChannelBlockerRuntimePatch} patch
 * @returns {void}
 */
export function setRuntime(patch) {
  if (!isPlainPatchObject(patch)) {
    console.warn("[store] setRuntime에는 객체만 전달할 수 있습니다.", patch);
    return;
  }

  Object.assign(RUNTIME, patch);
}