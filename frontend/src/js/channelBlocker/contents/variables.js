import { t } from "@/js/channelBlocker/contents/i18n";

const MAX_RETRY = 5;
const RETRY_DELAY_MS = 100;

const LIST_TAG = [
  "ytd-rich-item-renderer",
  ".ytGridShelfViewModelGridShelfRow",
  ".ytGridShelfViewModelGridShelfItem",
  "ytd-video-renderer",
  "yt-lockup-view-model",
  "ytm-shorts-lockup-view-model-v2",
  "ytd-grid-video-renderer",
  "ytd-playlist-panel-video-renderer",
];
const OBSERVE_TAG = [
  ... LIST_TAG,
  ".ytGridShelfViewModelGridShelfRow",
];
const CHANNEL_TAG = {
  chName: "yt-dynamic-text-view-model",
  contents: "ytd-browse",
};

const DATAS = {
  views: {
    main: {
      path: "/",
      wrap: "ytd-browse",
      list: "ytd-rich-item-renderer",
    },
    results: {
      path: "/results",
      wrap: "ytd-search",
      list: ["ytd-video-renderer", ".ytGridShelfViewModelGridShelfItem"],
    },
    watch: {
      path: "/watch",
      wrap: "ytd-watch-flexy",
      current: "ytd-watch-metadata",
      recommends: ["yt-lockup-view-model", "ytm-shorts-lockup-view-model"],
    },
    channel: {
      path: "/channel/",
      wrap: "ytd-browse",
      list: [
        // ??
        "ytd-video-renderer",
        "ytd-grid-video-renderer",
        "ytm-shorts-lockup-view-model",
        // ?숈쁺?? Shorts, ?쇱씠釉?
        "ytd-rich-item-renderer",
      ],
    },
    shorts: {
      path: "/shorts/",
      wrap: "ytd-shorts",
      data: [],
      oldIds: [],
    },
    playlist: {
      lists: "ytd-playlist-panel-renderer",
      list: "ytd-playlist-panel-video-renderer",
    },
  },
  dropdowns: {
    wrap: "tp-yt-iron-dropdown",
    slot: "dropdown-content",
    lists: ["yt-list-view-model", "tp-yt-paper-listbox", "ytd-menu-service-item-renderer"],
  },
  btns: {
    blocker: {
      cls: "btn-blocking",
      text: t("menu.block_channel"),
    },
    interest: {
      cls: "btn-interest",
      text: t("menu.not_interested"),
    },
  },
};

// Shorts ?ъ깮 ?붾㈃
const SHORTS_TAG = {
  list: ".reel-video-in-sequence-new",
  contents: [
    "ytd-rich-item-renderer.ytd-rich-shelf-renderer",
    ".ytGridShelfViewModelGridShelfItem",
    "ytm-shorts-lockup-view-model-v2.shortsLockupViewModelHost",
  ],
};

export {
  MAX_RETRY,
  RETRY_DELAY_MS,
  CHANNEL_TAG,
  LIST_TAG,
  OBSERVE_TAG,
  DATAS,
  SHORTS_TAG
}

