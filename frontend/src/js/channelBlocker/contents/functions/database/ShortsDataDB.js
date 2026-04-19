import { openDB } from "@/js/channelBlocker/contents/database";

/**
 * Shorts 1건 데이터
 *
 * @typedef {Object} ShortsItem
 * @property {string} channelName
 * @property {string=} channelHandle
 * @property {boolean} blocked
 */

/**
 * Shorts 전체 데이터
 *
 * @typedef {Record<string, ShortsItem>} ShortsDataMap
 */

const STORE_NAME = "s";
const DATA_KEY = "shorts";

/**
 * DB가 열려 있지 않으면 열고, 열린 DB를 반환합니다.
 *
 * @returns {Promise<IDBDatabase>}
 */
async function ensureDB() {
  return openDB();
}

/**
 * 트랜잭션 완료를 기다립니다.
 *
 * @param {IDBTransaction} tx
 * @returns {Promise<void>}
 */
function waitForTransaction(tx) {
  return new Promise((resolve, reject) => {
    tx.addEventListener("complete", () => resolve());
    tx.addEventListener("error", () => {
      reject(tx.error || new Error("IndexedDB transaction error"));
    });
    tx.addEventListener("abort", () => {
      reject(tx.error || new Error("IndexedDB transaction aborted"));
    });
  });
}

/**
 * Shorts 전체 데이터를 저장합니다.
 *
 * @param {ShortsDataMap} data
 * @returns {Promise<void>}
 */
export async function saveShortsData(data) {
  const database = await ensureDB();

  return new Promise((resolve, reject) => {
    let tx;

    try {
      tx = database.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.put(data, DATA_KEY);
    } catch (error) {
      reject(error);
      return;
    }

    waitForTransaction(tx)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}

/**
 * Shorts 전체 데이터를 조회합니다.
 *
 * @returns {Promise<ShortsDataMap>}
 */
export async function getShortsData() {
  const database = await ensureDB();

  return new Promise((resolve, reject) => {
    /** @type {IDBRequest<ShortsDataMap | undefined>} */
    let req;

    try {
      const tx = database.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      req = store.get(DATA_KEY);
    } catch (error) {
      reject(error);
      return;
    }

    req.addEventListener("success", () => {
      resolve(req.result || {});
    });

    req.addEventListener("error", () => {
      reject(req.error || new Error("IndexedDB request error"));
    });
  });
}

/**
 * Shorts 전체 데이터를 삭제합니다.
 *
 * @returns {Promise<void>}
 */
export async function clearShortsData() {
  const database = await ensureDB();

  return new Promise((resolve, reject) => {
    let tx;

    try {
      tx = database.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.delete(DATA_KEY);
    } catch (error) {
      reject(error);
      return;
    }

    waitForTransaction(tx)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}

/**
 * 특정 videoId의 blocked 값을 변경합니다.
 *
 * - 해당 videoId가 없으면 아무 작업도 하지 않습니다.
 *
 * @param {string} videoId
 * @param {boolean} blocked
 * @returns {Promise<void>}
 */
export async function setShortsVideoBlocked(videoId, blocked) {
  const shortsData = await getShortsData();

  if (!shortsData[videoId]) {
    return;
  }

  shortsData[videoId] = {
    ...shortsData[videoId],
    blocked,
  };

  await saveShortsData(shortsData);
}
