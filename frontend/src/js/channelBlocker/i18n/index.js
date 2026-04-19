import ko from "@/js/channelBlocker/i18n/locales/ko.json";
import en from "@/js/channelBlocker/i18n/locales/en.json";
import ja from "@/js/channelBlocker/i18n/locales/ja.json";
import zh from "@/js/channelBlocker/i18n/locales/zh.json";

const LOCALES = {
  ko,
  en,
  ja,
  zh,
};

const DEFAULT_LOCALE = "en";

/**
 * @returns {string}
 */
function getRawLocale() {
  try {
    if (typeof chrome !== "undefined" && chrome?.i18n?.getUILanguage) {
      const uiLang = chrome.i18n.getUILanguage();
      if (uiLang) return uiLang;
    }
  } catch {
    // ignore and fallback
  }

  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language;
  }

  return "ko-KR";
}

/**
 * @param {string} locale
 * @returns {{ language: string, region: string }}
 */
function parseLocale(locale) {
  const normalized = String(locale || "").replace("_", "-");
  const parts = normalized.split("-");

  return {
    language: String(parts[0] || "").toLowerCase(),
    region: String(parts[1] || "").toUpperCase(),
  };
}

/**
 * 지역 기준 우선 매핑 (요구사항 반영)
 * @param {string} region
 * @returns {string | null}
 */
function mapLocaleByRegion(region) {
  if (region === "US") return "en";
  if (region === "CN") return "zh";
  if (region === "JP") return "ja";
  if (region === "KR") return "ko";

  return null;
}

/**
 * @param {string} language
 * @returns {string}
 */
function mapLocaleByLanguage(language) {
  if (language.startsWith("en")) return "en";
  if (language.startsWith("zh")) return "zh";
  if (language.startsWith("ja")) return "ja";
  if (language.startsWith("ko")) return "ko";

  return DEFAULT_LOCALE;
}

/**
 * @returns {"ko" | "en" | "ja" | "zh"}
 */
export function getLocaleCode() {
  const { language, region } = parseLocale(getRawLocale());

  const byRegion = mapLocaleByRegion(region);
  if (byRegion && LOCALES[byRegion]) {
    return /** @type {"ko" | "en" | "ja" | "zh"} */ (byRegion);
  }

  const byLanguage = mapLocaleByLanguage(language);
  return /** @type {"ko" | "en" | "ja" | "zh"} */ (byLanguage);
}

/**
 * @param {string} template
 * @param {Record<string, string | number>=} params
 * @returns {string}
 */
function interpolate(template, params = {}) {
  return String(template).replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
    if (!(key in params)) return "";
    return String(params[key]);
  });
}

/**
 * @param {string} key
 * @param {Record<string, string | number>=} params
 * @returns {string}
 */
export function t(key, params = {}) {
  const localeCode = getLocaleCode();
  const localeTable = LOCALES[localeCode] || LOCALES[DEFAULT_LOCALE];
  const fallbackTable = LOCALES[DEFAULT_LOCALE];

  const raw = localeTable[key] ?? fallbackTable[key] ?? key;
  return interpolate(raw, params);
}

/**
 * @param {ParentNode=} root
 * @returns {void}
 */
export function applyDocumentTranslations(root = document) {
  root.querySelectorAll("[data-i18n]").forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    const key = node.dataset.i18n;
    if (!key) return;
    node.textContent = t(key);
  });

  root.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    const key = node.dataset.i18nPlaceholder;
    if (!key) return;
    node.setAttribute("placeholder", t(key));
  });

  root.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    const key = node.dataset.i18nAriaLabel;
    if (!key) return;
    node.setAttribute("aria-label", t(key));
  });
}
