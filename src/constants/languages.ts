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
