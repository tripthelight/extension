import { isDatabaseClosingError, openDB } from "@/js/channelBlocker/contents/database";

const operationLocks = new Map();

/**
 * @template T
 * @param {IDBRequest<T>} request
 * @returns {Promise<T>}
 */
export function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => {
      reject(request.error ?? new Error("IndexedDB request failed"));
    });
  });
}

/**
 * @param {unknown} value
 * @returns {Promise<string[]>}
 */
async function parseStringListValue(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === "string");
  }

  if (!(value instanceof Blob)) {
    return [];
  }

  const text = await value.text();
  /** @type {unknown} */
  const parsed = JSON.parse(text);

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed.filter((item) => typeof item === "string");
}

/**
 * @param {string} storeName
 * @param {string} key
 * @param {() => Promise<string[]>} operation
 * @returns {Promise<string[]>}
 */
function withStringListLock(storeName, key, operation) {
  const lockKey = `${storeName}:${key}`;
  const previous = operationLocks.get(lockKey) ?? Promise.resolve();

  const current = previous
    .catch(() => {})
    .then(operation)
    .finally(() => {
      if (operationLocks.get(lockKey) === current) {
        operationLocks.delete(lockKey);
      }
    });

  operationLocks.set(lockKey, current);
  return current;
}

/**
 * @param {IDBTransaction} transaction
 * @returns {Promise<void>}
 */
function waitForTransaction(transaction) {
  return new Promise((resolve, reject) => {
    transaction.addEventListener("complete", () => resolve());
    transaction.addEventListener("error", () => {
      reject(transaction.error ?? new Error("IndexedDB transaction failed"));
    });
    transaction.addEventListener("abort", () => {
      reject(transaction.error ?? new Error("IndexedDB transaction aborted"));
    });
  });
}

/**
 * @param {unknown} value
 * @returns {string[]|null}
 */
function parseStringListValueSync(value) {
  if (!value) return [];
  if (!Array.isArray(value)) return null;
  return value.filter((item) => typeof item === "string");
}

/**
 * @param {IDBDatabase} database
 * @param {string} storeName
 * @param {string} key
 * @param {(current: string[]) => string[]} update
 * @returns {Promise<string[]|null>}
 */
function updateStringListInSingleTransaction(database, storeName, key, update) {
  return new Promise((resolve, reject) => {
    let transaction;

    try {
      transaction = database.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const getRequest = store.get(key);

      getRequest.addEventListener("success", () => {
        const current = parseStringListValueSync(getRequest.result);
        if (current === null) {
          transaction.abort();
          resolve(null);
          return;
        }

        const nextValues = update(current);
        const putRequest = store.put(nextValues, key);
        putRequest.addEventListener("error", () => {
          reject(putRequest.error ?? new Error("IndexedDB put failed"));
        });
      });

      getRequest.addEventListener("error", () => {
        reject(getRequest.error ?? new Error("IndexedDB get failed"));
      });

      transaction.addEventListener("complete", () => {
        const current = parseStringListValueSync(getRequest.result);
        resolve(current === null ? null : update(current));
      });
      transaction.addEventListener("error", () => {
        reject(transaction.error ?? new Error("IndexedDB transaction failed"));
      });
      transaction.addEventListener("abort", () => {
        resolve(null);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Read JSON-string-array Blob from object store key.
 *
 * @param {IDBDatabase} database
 * @param {string} storeName
 * @param {string} key
 * @returns {Promise<string[]>}
 */
export async function readBlobStringList(database, storeName, key) {
  const executeRead = async (activeDb) => {
    const transaction = activeDb.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);

    /** @type {IDBRequest<unknown>} */
    const request = store.get(key);
    const value = await promisifyRequest(request);

    return parseStringListValue(value);
  };

  try {
    return await executeRead(database);
  } catch (error) {
    if (!isDatabaseClosingError(error)) {
      throw error;
    }

    const reopenedDb = await openDB(true);
    return executeRead(reopenedDb);
  }
}

/**
 * Write JSON-string-array Blob to object store key.
 *
 * @param {IDBDatabase} database
 * @param {string} storeName
 * @param {string} key
 * @param {string[]} values
 * @returns {Promise<void>}
 */
export async function writeBlobStringList(database, storeName, key, values) {
  const executeWrite = async (activeDb) => {
    const transaction = activeDb.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    /** @type {IDBRequest<IDBValidKey>} */
    const request = store.put(values, key);
    await promisifyRequest(request);
    await waitForTransaction(transaction);
  };

  try {
    await executeWrite(database);
  } catch (error) {
    if (!isDatabaseClosingError(error)) {
      throw error;
    }

    const reopenedDb = await openDB(true);
    await executeWrite(reopenedDb);
  }
}

/**
 * Add one string to the front of a JSON-string-array Blob in a single
 * readwrite transaction. Existing duplicates are moved to the front.
 *
 * @param {IDBDatabase} database
 * @param {string} storeName
 * @param {string} key
 * @param {string} value
 * @returns {Promise<string[]>}
 */
export async function upsertBlobStringItemFront(database, storeName, key, value) {
  const normalized = String(value || "").trim();
  if (!normalized) return readBlobStringList(database, storeName, key);

  return withStringListLock(storeName, key, async () => {
    let activeDb = database;
    let atomicResult;

    try {
      atomicResult = await updateStringListInSingleTransaction(
        activeDb,
        storeName,
        key,
        (current) => [normalized, ...current.filter((item) => item !== normalized)]
      );
    } catch (error) {
      if (!isDatabaseClosingError(error)) {
        throw error;
      }

      activeDb = await openDB(true);
      atomicResult = await updateStringListInSingleTransaction(
        activeDb,
        storeName,
        key,
        (current) => [normalized, ...current.filter((item) => item !== normalized)]
      );
    }

    if (atomicResult !== null) {
      return atomicResult;
    }

    const current = await readBlobStringList(activeDb, storeName, key);
    const nextValues = [normalized, ...current.filter((item) => item !== normalized)];
    await writeBlobStringList(activeDb, storeName, key, nextValues);
    return nextValues;
  });
}

/**
 * Remove one string from a JSON-string-array Blob in a single readwrite
 * transaction.
 *
 * @param {IDBDatabase} database
 * @param {string} storeName
 * @param {string} key
 * @param {string} value
 * @returns {Promise<string[]>}
 */
export async function removeBlobStringItem(database, storeName, key, value) {
  const normalized = String(value || "").trim();
  if (!normalized) return readBlobStringList(database, storeName, key);

  return withStringListLock(storeName, key, async () => {
    let activeDb = database;
    let atomicResult;

    try {
      atomicResult = await updateStringListInSingleTransaction(
        activeDb,
        storeName,
        key,
        (current) => current.filter((item) => item !== normalized)
      );
    } catch (error) {
      if (!isDatabaseClosingError(error)) {
        throw error;
      }

      activeDb = await openDB(true);
      atomicResult = await updateStringListInSingleTransaction(
        activeDb,
        storeName,
        key,
        (current) => current.filter((item) => item !== normalized)
      );
    }

    if (atomicResult !== null) {
      return atomicResult;
    }

    const current = await readBlobStringList(activeDb, storeName, key);
    const nextValues = current.filter((item) => item !== normalized);
    await writeBlobStringList(activeDb, storeName, key, nextValues);
    return nextValues;
  });
}
