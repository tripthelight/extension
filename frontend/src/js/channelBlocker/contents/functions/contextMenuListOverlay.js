import { openDB } from "@/js/channelBlocker/contents/database";
import {
  readBlobStringList,
  removeBlobStringItem,
} from "@/js/channelBlocker/contents/functions/database/blobStringListStore";
import resetRemoveTagClass from "@/js/channelBlocker/contents/functions/resetRemoveTagClass";
import scheduleRemoveVodThumb from "@/js/channelBlocker/contents/functions/scheduleRemoveVodThumb";
import { t } from "@/js/channelBlocker/contents/i18n";
import { removeBlockedChannelFromStorage } from "@/js/channelBlocker/contents/functions/storage/blockedChannelsStorage";

const OVERLAY_CLASS = "channel-blocker-list-overlay";
const OVERLAY_PANEL_CLASS = "channel-blocker-list-overlay__panel";
const OVERLAY_HEADER_CLASS = "channel-blocker-list-overlay__header";
const OVERLAY_TITLE_CLASS = "channel-blocker-list-overlay__title";
const OVERLAY_CLOSE_CLASS = "channel-blocker-list-overlay__close";
const OVERLAY_BODY_CLASS = "channel-blocker-list-overlay__body";
const OVERLAY_EMPTY_CLASS = "channel-blocker-list-overlay__empty";
const OVERLAY_LIST_CLASS = "channel-blocker-list-overlay__list";
const OVERLAY_ROW_CLASS = "channel-blocker-list-overlay__row";
const OVERLAY_LABEL_BUTTON_CLASS = "channel-blocker-list-overlay__label-button";
const OVERLAY_LABEL_TEXT_CLASS = "channel-blocker-list-overlay__label-text";
const OVERLAY_REMOVE_CLASS = "channel-blocker-list-overlay__remove";

/**
 * @returns {void}
 */
function removeExistingOverlay() {
  document.querySelectorAll(`.${OVERLAY_CLASS}`).forEach((node) => {
    node.remove();
  });
}

/**
 * @typedef {object} OverlayElements
 * @property {HTMLElement} overlay
 * @property {HTMLElement} body
 */

/**
 * @param {string} titleText
 * @returns {OverlayElements}
 */
function createOverlayFrame(titleText) {
  removeExistingOverlay();

  const overlay = document.createElement("section");
  overlay.className = OVERLAY_CLASS;

  const panel = document.createElement("article");
  panel.className = OVERLAY_PANEL_CLASS;

  const header = document.createElement("header");
  header.className = OVERLAY_HEADER_CLASS;

  const title = document.createElement("h2");
  title.className = OVERLAY_TITLE_CLASS;
  title.textContent = titleText;

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = OVERLAY_CLOSE_CLASS;
  closeButton.textContent = t("overlay.close");
  closeButton.addEventListener("click", () => {
    overlay.remove();
  });

  const body = document.createElement("div");
  body.className = OVERLAY_BODY_CLASS;

  header.appendChild(title);
  header.appendChild(closeButton);

  panel.appendChild(header);
  panel.appendChild(body);
  overlay.appendChild(panel);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.remove();
    }
  });

  document.body.appendChild(overlay);

  return { overlay, body };
}

/**
 * @typedef {object} ListRowOption
 * @property {string} label
 * @property {() => void=} onClickLabel
 * @property {() => Promise<void> | void} onClickRemove
 * @property {string=} labelAria
 */

/**
 * @param {HTMLElement} container
 * @param {ListRowOption} rowOption
 * @returns {void}
 */
function appendListRow(container, rowOption) {
  const row = document.createElement("div");
  row.className = OVERLAY_ROW_CLASS;

  if (rowOption.onClickLabel) {
    const labelButton = document.createElement("button");
    labelButton.type = "button";
    labelButton.className = OVERLAY_LABEL_BUTTON_CLASS;
    labelButton.textContent = rowOption.label;
    if (rowOption.labelAria) {
      labelButton.setAttribute("aria-label", rowOption.labelAria);
    }
    labelButton.addEventListener("click", rowOption.onClickLabel);
    row.appendChild(labelButton);
  } else {
    const labelText = document.createElement("span");
    labelText.className = OVERLAY_LABEL_TEXT_CLASS;
    labelText.textContent = rowOption.label;
    row.appendChild(labelText);
  }

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = OVERLAY_REMOVE_CLASS;
  removeButton.textContent = "X";
  removeButton.addEventListener("click", () => {
    Promise.resolve(rowOption.onClickRemove()).catch(() => {});
  });

  row.appendChild(removeButton);
  container.appendChild(row);
}

/**
 * @param {string} storeName
 * @param {string} key
 * @returns {Promise<string[]>}
 */
async function readList(storeName, key) {
  const database = await openDB();
  return readBlobStringList(database, storeName, key);
}

/**
 * @param {string} storeName
 * @param {string} key
 * @param {string} value
 * @returns {Promise<void>}
 */
async function removeListItem(storeName, key, value) {
  const database = await openDB();
  await removeBlobStringItem(database, storeName, key, value);

  if (storeName === "b" && key === "channelNames") {
    await removeBlockedChannelFromStorage("nmes", value);
  }

  if (storeName === "u" && key === "channelAddresses") {
    await removeBlockedChannelFromStorage("urls", value);
  }
}

/**
 * @returns {Promise<void>}
 */
export async function openBlockedChannelListOverlay() {
  const { body } = createOverlayFrame(t("menu.blocked_channel_list"));

  const render = async () => {
    const channelNames = await readList("b", "channelNames");
    body.innerHTML = "";

    if (channelNames.length === 0) {
      const empty = document.createElement("p");
      empty.className = OVERLAY_EMPTY_CLASS;
      empty.textContent = t("overlay.empty_blocked_channels");
      body.appendChild(empty);
      return;
    }

    const list = document.createElement("div");
    list.className = OVERLAY_LIST_CLASS;
    body.appendChild(list);

    channelNames.forEach((channelName) => {
      appendListRow(list, {
        label: channelName,
        onClickRemove: async () => {
          await removeListItem("b", "channelNames", channelName);
          resetRemoveTagClass();
          scheduleRemoveVodThumb();
          await render();
        },
      });
    });
  };

  await render();
}

/**
 * @returns {Promise<void>}
 */
export async function openNotInterestedVideoListOverlay() {
  const { body } = createOverlayFrame(t("menu.not_interested_video_list"));

  const render = async () => {
    const videoIds = await readList("i", "videoIds");
    body.innerHTML = "";

    if (videoIds.length === 0) {
      const empty = document.createElement("p");
      empty.className = OVERLAY_EMPTY_CLASS;
      empty.textContent = t("overlay.empty_not_interested_videos");
      body.appendChild(empty);
      return;
    }

    const list = document.createElement("div");
    list.className = OVERLAY_LIST_CLASS;
    body.appendChild(list);

    videoIds.forEach((videoId) => {
      appendListRow(list, {
        label: videoId,
        labelAria: t("overlay.open_in_new_window"),
        onClickLabel: () => {
          const url = `https://www.youtube.com/shorts/${videoId}`;
          window.open(url, "_blank", "noopener,noreferrer");
        },
        onClickRemove: async () => {
          await removeListItem("i", "videoIds", videoId);
          resetRemoveTagClass();
          scheduleRemoveVodThumb();
          await render();
        },
      });
    });
  };

  await render();
}

