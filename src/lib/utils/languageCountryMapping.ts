// Maps ISO 639-1 language codes to ISO 3166-1 alpha-2 country codes
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

export const getCountryCodeFromLanguage = (languageCode: string): string => {
    const code = languageCode.toLowerCase();
    return LANGUAGE_TO_COUNTRY_MAPPING[code] || code;
};
