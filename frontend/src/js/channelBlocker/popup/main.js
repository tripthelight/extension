import { applyDocumentTranslations, t } from "@/js/channelBlocker/i18n";
import {
  getBlockedChannelsFromStorage,
  isContentDbMigratedToStorage,
  mergeBlockedChannelsToStorage,
  removeBlockedChannelFromStorage,
  upsertBlockedChannelToStorage,
} from "@/js/channelBlocker/storage/blockedChannelsStorage";
import { normalizeChannelAddress } from "@/js/channelBlocker/common/channelAddress";

function findExtStorage() {
  const extStorage =
    typeof browser !== "undefined" && browser?.storage
      ? browser.storage
      : typeof chrome !== "undefined" && chrome?.storage
        ? chrome.storage
        : null;

  return extStorage;
}

const DEFAULT_BLOCKED_CHANNELS = {
  nmes: [],
  urls: [],
  links: [],
};

const DB_LIST_BY_KEY = {
  nmes: { storeName: "b", key: "channelNames" },
  urls: { storeName: "u", key: "channelAddresses" },
};
const POPUP_DB_MIGRATED_KEY = "blockedChannelsPopupDbMigrated";

const LIST_CLASS_BY_KEY = {
  nmes: ".list-word",
  urls: ".list-url",
};

const OVERLAY_TITLE_KEY_BY_TYPE = {
  nmes: "popup.blocked_channel_name_title",
  urls: "popup.blocked_channel_url_title",
};

const OVERLAY_STATE = {
  key: null,
};

let IS_INITIALIZED = false;
let db = null;
let openingPromise = null;

const round2 = (num) => Math.round(num * 100) / 100;
const getWidth = (el) => round2(el.getBoundingClientRect().width);

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

function openChannelBlockerDb() {
  if (db) {
    return Promise.resolve(db);
  }

  if (openingPromise) {
    return openingPromise;
  }

  openingPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open("extension-db-ycb", 2);

    request.addEventListener("upgradeneeded", () => {
      const database = request.result;
      ["i", "b", "s", "u"].forEach((storeName) => {
        if (!database.objectStoreNames.contains(storeName)) {
          database.createObjectStore(storeName);
        }
      });
    });

    request.addEventListener("success", () => {
      db = request.result;
      bindDatabaseLifecycle(db);
      resolve(db);
    });

    request.addEventListener("error", () => {
      reject(request.error ?? new Error("IndexedDB open failed"));
    });
  });

  return openingPromise.finally(() => {
    openingPromise = null;
  });
}

function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => {
      reject(request.error ?? new Error("IndexedDB request failed"));
    });
  });
}

async function parseStringListValue(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter((item) => typeof item === "string");
  if (typeof value === "string") {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  }
  if (!(value instanceof Blob)) return [];

  const text = await value.text();
  const parsed = JSON.parse(text);
  return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
}

async function readDbStringList(storeName, key) {
  const database = await openChannelBlockerDb();
  const transaction = database.transaction(storeName, "readonly");
  const store = transaction.objectStore(storeName);
  return parseStringListValue(await promisifyRequest(store.get(key)));
}

async function writeDbStringList(storeName, key, values) {
  const database = await openChannelBlockerDb();
  const transaction = database.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  await promisifyRequest(store.put(values, key));
}

async function upsertDbStringItemFront(storeName, key, value) {
  const normalized = String(value || "").trim();
  if (!normalized) return readDbStringList(storeName, key);

  const current = await readDbStringList(storeName, key);
  const nextValues = [normalized, ...current.filter((item) => item !== normalized)];
  await writeDbStringList(storeName, key, nextValues);
  return nextValues;
}

async function removeDbStringItem(storeName, key, value) {
  const normalized = String(value || "").trim();
  if (!normalized) return readDbStringList(storeName, key);

  const current = await readDbStringList(storeName, key);
  const nextValues = current.filter((item) => item !== normalized);
  await writeDbStringList(storeName, key, nextValues);
  return nextValues;
}

async function migratePopupDatabaseToStorage() {
  const extStorage = findExtStorage();
  if (!extStorage) return;

  const migrationState = await extStorage.local.get(POPUP_DB_MIGRATED_KEY);
  if (migrationState?.[POPUP_DB_MIGRATED_KEY] === true) return;

  try {
    const [nmes, urls] = await Promise.all([
      readDbStringList("b", "channelNames"),
      readDbStringList("u", "channelAddresses"),
    ]);

    if (nmes.length > 0 || urls.length > 0) {
      await mergeBlockedChannelsToStorage({
        nmes,
        urls: urls.map((value) => normalizeChannelAddress(value)).filter((value) => value !== ""),
      });
    }
  } catch {
    // ignore: the popup-origin migration database may not exist
  } finally {
    await extStorage.local.set({ [POPUP_DB_MIGRATED_KEY]: true });
  }
}

async function syncBlockedChannelsFromActiveTab() {
  try {
    if (await isContentDbMigratedToStorage()) return;

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab?.id) return;

    const response = await chrome.tabs.sendMessage(tab.id, {
      type: "GET_BLOCKED_CHANNELS",
    });
    const blockedChannels = response?.blockedChannels;

    if (response?.ok && blockedChannels) {
      await mergeBlockedChannelsToStorage(blockedChannels);
    }
  } catch {
    // ignore: current tab may not have the content script
  }
}

async function getBlockedChannelsFromDatabase() {
  return getBlockedChannelsFromStorage();
}

async function upsertBlockedChannelToDatabase(key, value) {
  const config = DB_LIST_BY_KEY[key];
  if (!config) return [];

  return upsertBlockedChannelToStorage(key, value);
}

async function removeBlockedChannelFromDatabase(key, value) {
  const config = DB_LIST_BY_KEY[key];
  if (!config) return [];

  return removeBlockedChannelFromStorage(key, value);
}

function getListElementByKey(key) {
  const selector = LIST_CLASS_BY_KEY[key];
  if (!selector) return null;

  return document.querySelector(`#container.blocking-channel ${selector}`);
}

function getListValues(listEl) {
  if (!listEl) return [];

  return [...listEl.querySelectorAll("dl dt")]
    .map((dt) => dt.textContent?.trim() || "")
    .filter((value) => value !== "");
}

function clearArrowElements(listEl) {
  if (!listEl) return;

  listEl.querySelectorAll(".allow, .allow-bg").forEach((el) => el.remove());
}

function ensureListWrap(listEl) {
  if (!listEl) return null;

  let listWrap = listEl.querySelector("ul.inner");
  if (!listWrap) {
    listWrap = document.createElement("ul");
    listWrap.classList.add("inner");
    listEl.appendChild(listWrap);
  }

  return listWrap;
}

function splitListRows(listEl) {
  if (!listEl) return;

  const listWrap = listEl.querySelector("ul.inner");
  if (!listWrap) {
    clearArrowElements(listEl);
    return;
  }

  const dlList = [...listWrap.querySelectorAll("dl")];
  if (dlList.length === 0) {
    listWrap.remove();
    clearArrowElements(listEl);
    return;
  }

  const listTop = document.createElement("li");
  const listBottom = document.createElement("li");

  const items = dlList.map((dlEl) => ({
    el: dlEl,
    width: getWidth(dlEl),
  }));

  const totalWidth = round2(items.reduce((sum, item) => sum + item.width, 0));
  const halfWidth = round2(Math.ceil((totalWidth / 2) * 100) / 100);

  let topWidth = 0;
  items.forEach((item) => {
    const nextTopWidth = round2(topWidth + item.width);

    if (listTop.childElementCount === 0 || nextTopWidth < halfWidth) {
      topWidth = nextTopWidth;
      listTop.appendChild(item.el);
    } else {
      listBottom.appendChild(item.el);
    }
  });

  listWrap.innerHTML = "";
  listWrap.appendChild(listTop);
  if (listBottom.childElementCount > 0) {
    listWrap.appendChild(listBottom);
  }
}

function closeOverlay() {
  const overlay = document.getElementById("blocked-overlay");
  if (!overlay) return;

  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  OVERLAY_STATE.key = null;
}

function renderOverlayItems(key) {
  const overlayList = document.querySelector("#blocked-overlay .overlay-list");
  const overlayTitle = document.querySelector("#blocked-overlay .overlay-title");

  if (!overlayList || !overlayTitle) return;

  const listEl = getListElementByKey(key);
  const values = getListValues(listEl);

  overlayList.innerHTML = "";

  if (values.length === 0) {
    closeOverlay();
    return;
  }

  const titleKey = OVERLAY_TITLE_KEY_BY_TYPE[key] || "popup.block_list_title";
  overlayTitle.textContent = t(titleKey);

  values.forEach((value) => {
    const item = document.createElement("li");
    item.classList.add("overlay-item");

    const label = document.createElement("span");
    label.classList.add("overlay-item-label");
    label.textContent = value;

    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("overlay-item-remove");
    button.dataset.key = key;
    button.dataset.value = value;
    button.setAttribute("aria-label", t("popup.unblock_item_aria", { value }));
    button.textContent = "X";

    item.append(label, button);
    overlayList.appendChild(item);
  });
}

function openOverlay(key) {
  const overlay = document.getElementById("blocked-overlay");
  if (!overlay) return;

  OVERLAY_STATE.key = key;
  renderOverlayItems(key);

  if (!OVERLAY_STATE.key) return;

  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
}

function initOverlayEvents() {
  const overlay = document.getElementById("blocked-overlay");
  if (!overlay) return;
  if (overlay.dataset.bound === "true") return;

  overlay.dataset.bound = "true";

  const closeBtn = overlay.querySelector(".overlay-close");
  const overlayList = overlay.querySelector(".overlay-list");

  closeBtn?.addEventListener("click", closeOverlay);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeOverlay();
    }
  });

  overlayList?.addEventListener("click", async (event) => {
    const target = event.target instanceof HTMLElement ? event.target : null;
    if (!target) return;

    const removeBtn = target.closest(".overlay-item-remove");
    if (!(removeBtn instanceof HTMLButtonElement)) return;

    const key = removeBtn.dataset.key;
    const value = removeBtn.dataset.value;

    if (!key || !value) return;

    await removeChannelByValue(value, key);
  });
}

const SCROLL_DATA = {
  activeTarget: null,
  isDown: false,
  startX: 0,
  startScrollLeft: 0,
};

function bindDragScroll(target) {
  if (!target) return;
  if (target.dataset.dragBound === "true") return;

  target.dataset.dragBound = "true";

  target.addEventListener("mousedown", (e) => {
    SCROLL_DATA.activeTarget = target;
    SCROLL_DATA.isDown = true;
    SCROLL_DATA.startX = e.clientX;
    SCROLL_DATA.startScrollLeft = target.scrollLeft;

    target.classList.add("dragging");
  });

  target.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      target.scrollLeft += e.deltaY * 0.8;
    },
    { passive: false }
  );
}

document.addEventListener("mousemove", (e) => {
  if (!SCROLL_DATA.isDown || !SCROLL_DATA.activeTarget) return;
  const dx = e.clientX - SCROLL_DATA.startX;
  SCROLL_DATA.activeTarget.scrollLeft = SCROLL_DATA.startScrollLeft - dx;
});

document.addEventListener("mouseup", () => {
  if (SCROLL_DATA.activeTarget) {
    SCROLL_DATA.activeTarget.classList.remove("dragging");
  }
  SCROLL_DATA.isDown = false;
  SCROLL_DATA.activeTarget = null;
});

function renderArrow(target, key) {
  if (!target) return;

  clearArrowElements(target);

  const containerEl = target.closest("#container.blocking-channel");
  if (!containerEl) return;

  const innerEl = target.querySelector("ul.inner");
  if (!innerEl) return;

  const lists = innerEl.querySelectorAll("li");
  if (!lists || lists.length === 0) return;

  const styleData = {
    wrapWidth: getWidth(target),
    innerWidth: getWidth(innerEl),
  };

  if (styleData.innerWidth <= styleData.wrapWidth) return;

  const arrowEl = document.createElement("div");
  arrowEl.classList.add("allow");
  arrowEl.setAttribute("aria-label", t("popup.expand_block_list_aria"));
  arrowEl.setAttribute("role", "button");
  arrowEl.tabIndex = 0;

  const arrowBgLeft = document.createElement("div");
  arrowBgLeft.classList.add("allow-bg", "allow-bg-l");

  const arrowBgRight = document.createElement("div");
  arrowBgRight.classList.add("allow-bg", "allow-bg-r");

  target.append(arrowEl, arrowBgLeft, arrowBgRight);

  const rootStyle = document.documentElement.style;

  if (key === "nmes") {
    const right = window.getComputedStyle(containerEl).paddingRight;
    const top = target.offsetTop + target.clientHeight / 2 - arrowEl.clientHeight / 2;

    rootStyle.setProperty("--pos-list-arrow-nme-r", right);
    rootStyle.setProperty("--pos-list-arrow-nme-t", `${top}px`);
    rootStyle.setProperty("--len-list-arrow-nme-bg-h", `${target.clientHeight}px`);
    rootStyle.setProperty("--pos-list-arrow-nme-bg-t", `${target.offsetTop}px`);
    rootStyle.setProperty("--pos-list-arrow-nme-bg-l-l", `${target.offsetLeft}px`);
    rootStyle.setProperty("--pos-list-arrow-nme-bg-r-r", right);
  }

  if (key === "urls") {
    const right = window.getComputedStyle(containerEl).paddingRight;
    const top = target.offsetTop + target.clientHeight / 2 - arrowEl.clientHeight / 2;

    rootStyle.setProperty("--pos-list-arrow-url-r", right);
    rootStyle.setProperty("--pos-list-arrow-url-t", `${top}px`);
    rootStyle.setProperty("--len-list-arrow-url-bg-h", `${target.clientHeight}px`);
    rootStyle.setProperty("--pos-list-arrow-url-bg-t", `${target.offsetTop}px`);
    rootStyle.setProperty("--pos-list-arrow-url-bg-l-l", `${target.offsetLeft}px`);
    rootStyle.setProperty("--pos-list-arrow-url-bg-r-r", right);
  }

  const open = () => openOverlay(key);

  arrowEl.addEventListener("click", open);
  arrowEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  });
}

function refreshListUI(key) {
  const listEl = getListElementByKey(key);
  if (!listEl) return;

  splitListRows(listEl);
  renderArrow(listEl, key);

  if (OVERLAY_STATE.key === key) {
    renderOverlayItems(key);
  }
}

function createListItem(value, key) {
  const dlEl = document.createElement("dl");
  const dtEl = document.createElement("dt");
  const ddEl = document.createElement("dd");
  const btnDel = document.createElement("button");

  dtEl.textContent = value;
  btnDel.setAttribute("aria-label", t("popup.delete_blocked_item_aria", { value }));

  btnDel.addEventListener("click", async (event) => {
    await removeChannel(event, key);
  });

  ddEl.appendChild(btnDel);
  dlEl.append(dtEl, ddEl);

  return dlEl;
}

async function removeChannelByValue(value, key) {
  const targetValue = String(value || "").trim();
  if (!targetValue) return;

  const currentItems = getListValues(getListElementByKey(key));
  if (!currentItems.includes(targetValue)) return;

  await removeBlockedChannelFromDatabase(key, targetValue);

  const listEl = getListElementByKey(key);
  if (listEl) {
    const dls = [...listEl.querySelectorAll("dl")];
    dls.forEach((dlEl) => {
      const dt = dlEl.querySelector("dt");
      if ((dt?.textContent || "").trim() === targetValue) {
        dlEl.remove();
      }
    });

    [...listEl.querySelectorAll("li")].forEach((liEl) => {
      if (!liEl.querySelector("dl")) {
        liEl.remove();
      }
    });

    const hasItem = listEl.querySelector("dl") !== null;
    if (!hasItem) {
      listEl.querySelector("ul.inner")?.remove();
      clearArrowElements(listEl);
    }
  }

  refreshListUI(key);
  await sendMessageToBrowser(targetValue, key, "RUN_UNBLOCK");
}

/**
 * @param {MouseEvent} event
 * @param {"nmes" | "urls"} key
 */
async function removeChannel(event, key) {
  const target = event.target instanceof HTMLElement ? event.target : null;
  if (!target) return;

  const removeElem = target.closest("dl");
  if (!removeElem) return;

  const removeDt = removeElem.querySelector("dt");
  const removeValue = removeDt?.textContent?.trim() || "";
  if (!removeValue) return;

  await removeChannelByValue(removeValue, key);
}

async function initList() {
  const listWord = document.querySelector(".list.list-word");
  if (!listWord) throw new Error("init word list element failed.");

  const listUrl = document.querySelector(".list.list-url");
  if (!listUrl) throw new Error("init url list element failed.");

  await migratePopupDatabaseToStorage();
  await syncBlockedChannelsFromActiveTab();
  const blockedChannels = await getBlockedChannelsFromDatabase();

  const renderList = (listEl, items, key) => {
    if (!Array.isArray(items) || items.length === 0) return;

    const listWrap = ensureListWrap(listEl);
    if (!listWrap) return;

    items.forEach((value) => {
      listWrap.appendChild(createListItem(value, key));
    });
  };

  renderList(listWord, blockedChannels.nmes, "nmes");
  renderList(listUrl, blockedChannels.urls, "urls");

  bindDragScroll(listWord);
  bindDragScroll(listUrl);

  refreshListUI("nmes");
  refreshListUI("urls");

  initOverlayEvents();
}

function iptDelBtnEvt() {
  const inputWord = document.getElementById("FOBIDDEN_WORD");
  if (!inputWord) throw new Error("input forbidden word element failed.");

  const btnDelWord = document.querySelector(".btn-word-del");
  if (!btnDelWord) throw new Error("input forbidden word delete button element failed.");

  const btnAddWord = document.querySelector(".btn-word-add");
  if (!btnAddWord) throw new Error("input forbidden word add button element failed.");

  const inputUrl = document.getElementById("FOBIDDEN_URL");
  if (!inputUrl) throw new Error("input forbidden url element failed.");

  const btnDelUrl = document.querySelector(".btn-url-del");
  if (!btnDelUrl) throw new Error("input forbidden url delete button element failed.");

  const btnAddUrl = document.querySelector(".btn-url-add");
  if (!btnAddUrl) throw new Error("input forbidden url add button element failed.");

  const bindInputDeleteButton = (inputEl, buttonEl, btnAdd) => {
    const toggleButton = () => {
      const isEmpty = inputEl.value.length === 0;
      buttonEl.classList.toggle("hide", isEmpty);
      btnAdd.disabled = isEmpty;
    };

    ["change", "input", "paste"].forEach((eventName) => {
      inputEl.addEventListener(eventName, toggleButton);
    });

    buttonEl.addEventListener("click", () => {
      inputEl.value = "";
      buttonEl.classList.add("hide");
      btnAdd.disabled = true;
      inputEl.focus();
    });

    toggleButton();
  };

  bindInputDeleteButton(inputWord, btnDelWord, btnAddWord);
  bindInputDeleteButton(inputUrl, btnDelUrl, btnAddUrl);
}

async function sendMessageToBrowser(value, key, type = "RUN_BLOCK") {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (!tab?.id) return;

  try {
    await chrome.tabs.sendMessage(tab.id, {
      type,
      channel: value,
      key,
    });
  } catch {
    // ignore: current tab may not have content script
  }
}

function addBtnEvt() {
  const btnAddNme = document.querySelector(".btn-word-add");
  if (!btnAddNme) throw new Error("input forbidden word add button element failed.");

  const btnAddUrl = document.querySelector(".btn-url-add");
  if (!btnAddUrl) throw new Error("input forbidden url add button element failed.");

  const resetInput = (target, inputEl) => {
    inputEl.value = "";
    inputEl.focus();

    const btnDel = target.closest(".ipt-block")?.querySelector(".btn-del");
    if (btnDel) btnDel.classList.add("hide");
  };

  const bindAddButton = (buttonEl, key) => {
    buttonEl.addEventListener("click", async (event) => {
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (!target) return;

      const inputEl = target.closest(".ipt-block")?.querySelector("input[type='text']");
      if (!(inputEl instanceof HTMLInputElement)) {
        throw new Error("add forbidden input element failed.");
      }

      const rawValue = inputEl.value.trim();
      if (rawValue === "") return;

      const value = key === "urls" ? normalizeChannelAddress(rawValue) : rawValue;
      if (!value) return;

      const listEl = getListElementByKey(key);
      if (!listEl) return;

      const listValues = getListValues(listEl);
      if (listValues.includes(value)) {
        resetInput(target, inputEl);
        return;
      }

      await upsertBlockedChannelToDatabase(key, value);

      const listWrap = ensureListWrap(listEl);
      if (!listWrap) return;

      listWrap.prepend(createListItem(value, key));

      resetInput(target, inputEl);

      refreshListUI(key);
      await sendMessageToBrowser(value, key);
    });
  };

  bindAddButton(btnAddNme, "nmes");
  bindAddButton(btnAddUrl, "urls");
}

async function main() {
  if (IS_INITIALIZED) return;

  try {
    applyDocumentTranslations();
    await initList();
    iptDelBtnEvt();
    addBtnEvt();
    IS_INITIALIZED = true;
  } catch (error) {
    console.warn("ERROR : ", error);
  }
}

window.addEventListener("pageshow", () => {
  main();
});
