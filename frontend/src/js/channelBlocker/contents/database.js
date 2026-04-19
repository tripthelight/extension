/** @type {IDBDatabase | null} */
let db = null;
/** @type {Promise<IDBDatabase> | null} */
let openingPromise = null;

/**
 * @param {unknown} error
 * @returns {boolean}
 */
function isDatabaseClosingError(error) {
  if (!(error instanceof DOMException)) return false;
  if (error.name !== "InvalidStateError") return false;

  const message = String(error.message || "").toLowerCase();
  return message.includes("connection is closing");
}

/**
 * @param {IDBDatabase} database
 * @returns {boolean}
 */
function canStartTransaction(database) {
  try {
    const tx = database.transaction("i", "readonly");
    tx.abort();
    return true;
  } catch {
    return false;
  }
}

/**
 * @param {IDBDatabase} database
 * @returns {void}
 */
function bindDatabaseLifecycle(database) {
  database.addEventListener("close", () => {
    if (db === database) {
      db = null;
    }
  });

  database.addEventListener("versionchange", () => {
    try {
      database.close();
    } catch {
      // no-op
    } finally {
      if (db === database) {
        db = null;
      }
    }
  });
}

/**
 * Open extension IndexedDB.
 *
 * - name: extension-db-ycb
 * - version: 2
 * - stores:
 *   - b: blocked channel names
 *   - i: not-interested video ids
 *   - s: shorts cache data
 *   - u: blocked channel addresses(handle without @)
 *
 * @returns {Promise<IDBDatabase>}
 */
function openDB(forceReopen = false) {
  if (!forceReopen && db && canStartTransaction(db)) {
    return Promise.resolve(db);
  }

  if (forceReopen && db) {
    try {
      db.close();
    } catch {
      // no-op
    } finally {
      db = null;
    }
  }

  if (openingPromise) {
    return openingPromise;
  }

  openingPromise = new Promise((resolve, reject) => {
    /** @type {IDBOpenDBRequest} */
    const req = indexedDB.open("extension-db-ycb", 2);

    req.addEventListener("upgradeneeded", () => {
      /** @type {IDBDatabase} */
      const database = req.result;

      if (!database.objectStoreNames.contains("i")) {
        database.createObjectStore("i");
      }

      if (!database.objectStoreNames.contains("b")) {
        database.createObjectStore("b");
      }

      if (!database.objectStoreNames.contains("s")) {
        database.createObjectStore("s");
      }

      if (!database.objectStoreNames.contains("u")) {
        database.createObjectStore("u");
      }
    });

    req.addEventListener("success", () => {
      db = req.result;
      bindDatabaseLifecycle(db);
      resolve(db);
    });

    req.addEventListener("error", () => {
      reject(req.error);
    });
  });

  return openingPromise.finally(() => {
    openingPromise = null;
  });
}

export { openDB, db, isDatabaseClosingError };
