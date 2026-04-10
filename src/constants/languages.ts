export const PREDEFINED_LANGUAGES = [
    { code: "en", name: "English",    region: "Amériques" },
    { code: "fr", name: "Français",   region: "Europe" },
    { code: "es", name: "Español",    region: "Amériques" },
    { code: "de", name: "Deutsch",    region: "Europe" },
    { code: "it", name: "Italiano",   region: "Europe" },
    { code: "pt", name: "Português",  region: "Amériques" },
    { code: "ru", name: "Русский",    region: "Europe" },
    { code: "zh", name: "中文",        region: "Asie" },
    { code: "ja", name: "日本語",      region: "Asie" },
    { code: "ar", name: "العربية",    region: "Afrique" },
    { code: "hi", name: "हिन्दी",     region: "Asie" },
    { code: "ko", name: "한국어",      region: "Asie" },
    { code: "vi", name: "Tiếng Việt", region: "Asie" },
    { code: "tr", name: "Türkçe",     region: "Asie" },
    { code: "fa", name: "فارسی",      region: "Asie" },
];

export const LANGUAGE_TO_COUNTRY_MAPPING: Record<string, string> = {
    "en": "gb",
    "fr": "fr",
    "es": "es",
    "de": "de",
    "it": "it",
    "pt": "pt",
    "ru": "ru",
    "zh": "cn",
    "ja": "jp",
    "ar": "dz",
    "hi": "in",
    "ko": "kr",
    "vi": "vn",
    "tr": "tr",
    "fa": "ir",
};
export const REGION_MAP: Record<string, string> = Object.fromEntries(
    PREDEFINED_LANGUAGES.map(lang => [lang.code, lang.region])
);
export const LANG_META: Record<string, { code: string; color: string }> = {
  ja: { code: "JP", color: "#FFCDD2" },
  en: { code: "GB", color: "#BBDEFB" },
  ko: { code: "KR", color: "#C8E6C9" },
  es: { code: "ES", color: "#FFF9C4" },
  zh: { code: "CN", color: "#E1BEE7" },
  de: { code: "DE", color: "#B2EBF2" },
  fr: { code: "FR", color: "#FFE0B2" },
  pt: { code: "PT", color: "#DCEDC8" },
  it: { code: "IT", color: "#F8BBD0" },
  ar: { code: "DZ", color: "#D7CCC8" },
  ru: { code: "RU", color: "#CFD8DC" },
  vi: { code: "VN", color: "#FFE082" },
  tr: { code: "TR", color: "#FFAB91" },
  fa: { code: "IR", color: "#BCAAA4" },
  hi: { code: "IN", color: "#DCE775" },
};

export const SHOW_ACTIVE_LANGUAGE = 2;

export const getUILanguages = (t: (key: string) => string) => [
    { code: "fr", label: t('settings.languages.french'), flag: "🇫🇷" },
    { code: "en", label: t('settings.languages.english'), flag: "🇬🇧" },
];