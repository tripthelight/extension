const LOCALES = {
  ko: {
    "menu.block_channel": "채널 추천 안함",
    "menu.not_interested": "관심 없음",
    "menu.blocked_channel_list": "추천 안한 채널 목록",
    "menu.not_interested_video_list": "관심 없는 영상 목록",
    "message.undo_not_recommended": "추천 하지 않는 영상입니다. 되돌리시겠습니까?",
    "message.undo_not_interested": "관심 없는 영상입니다. 되돌리시겠습니까?",
    "overlay.undo": "되돌리기",
    "overlay.close": "닫기",
    "overlay.open_in_new_window": "새창 열림",
    "overlay.empty_blocked_channels": "추천 안한 채널이 없습니다.",
    "overlay.empty_not_interested_videos": "관심 없는 영상이 없습니다.",
  },
  en: {
    "menu.block_channel": "Don't recommend channel",
    "menu.not_interested": "Not interested",
    "menu.blocked_channel_list": "Not recommended channel list",
    "menu.not_interested_video_list": "Not interested video list",
    "message.undo_not_recommended": "This video was marked as not recommended. Undo?",
    "message.undo_not_interested": "This video was marked as not interested. Undo?",
    "overlay.undo": "Undo",
    "overlay.close": "Close",
    "overlay.open_in_new_window": "Open in new window",
    "overlay.empty_blocked_channels": "There are no not recommended channels.",
    "overlay.empty_not_interested_videos": "There are no not interested videos.",
  },
  ja: {
    "menu.block_channel": "このチャンネルをおすすめに表示しない",
    "menu.not_interested": "興味なし",
    "menu.blocked_channel_list": "おすすめしないチャンネル一覧",
    "menu.not_interested_video_list": "興味なし動画一覧",
    "message.undo_not_recommended": "この動画をおすすめしないようにしました。元に戻しますか？",
    "message.undo_not_interested": "この動画を興味なしにしました。元に戻しますか？",
    "overlay.undo": "元に戻す",
    "overlay.close": "閉じる",
    "overlay.open_in_new_window": "新しいウィンドウで開く",
    "overlay.empty_blocked_channels": "おすすめしないチャンネルはありません。",
    "overlay.empty_not_interested_videos": "興味なし動画はありません。",
  },
  zh: {
    "menu.block_channel": "不推荐此频道",
    "menu.not_interested": "不感兴趣",
    "menu.blocked_channel_list": "不推荐频道列表",
    "menu.not_interested_video_list": "不感兴趣视频列表",
    "message.undo_not_recommended": "已设置为不推荐该视频。是否撤销？",
    "message.undo_not_interested": "已设置为对该视频不感兴趣。是否撤销？",
    "overlay.undo": "撤销",
    "overlay.close": "关闭",
    "overlay.open_in_new_window": "新窗口打开",
    "overlay.empty_blocked_channels": "没有不推荐的频道。",
    "overlay.empty_not_interested_videos": "没有不感兴趣的视频。",
  },
};

const DEFAULT_LOCALE = "en";

function getRawLocale() {
  try {
    if (typeof chrome !== "undefined" && chrome?.i18n?.getUILanguage) {
      const uiLang = chrome.i18n.getUILanguage();
      if (uiLang) return uiLang;
    }
  } catch {
    // ignore
  }

  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language;
  }

  return "en-US";
}

function parseLocale(locale) {
  const normalized = String(locale || "").replace("_", "-");
  const parts = normalized.split("-");
  return {
    language: String(parts[0] || "").toLowerCase(),
    region: String(parts[1] || "").toUpperCase(),
  };
}

function mapLocaleByRegion(region) {
  if (region === "US") return "en";
  if (region === "CN") return "zh";
  if (region === "JP") return "ja";
  if (region === "KR") return "ko";
  return null;
}

function mapLocaleByLanguage(language) {
  if (language.startsWith("en")) return "en";
  if (language.startsWith("zh")) return "zh";
  if (language.startsWith("ja")) return "ja";
  if (language.startsWith("ko")) return "ko";
  return DEFAULT_LOCALE;
}

function getLocaleCode() {
  const { language, region } = parseLocale(getRawLocale());
  const byRegion = mapLocaleByRegion(region);
  if (byRegion && LOCALES[byRegion]) return byRegion;
  return mapLocaleByLanguage(language);
}

function interpolate(template, params = {}) {
  return String(template).replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
    if (!(key in params)) return "";
    return String(params[key]);
  });
}

export function t(key, params = {}) {
  const localeCode = getLocaleCode();
  const localeTable = LOCALES[localeCode] || LOCALES[DEFAULT_LOCALE];
  const fallbackTable = LOCALES[DEFAULT_LOCALE];
  const raw = localeTable[key] ?? fallbackTable[key] ?? key;
  return interpolate(raw, params);
}

