import { LANGUAGE_TO_COUNTRY_MAPPING } from "@/constants/languages";

export const getCountryCodeFromLanguage = (languageCode: string): string => {
    const code = languageCode.toLowerCase();
    return LANGUAGE_TO_COUNTRY_MAPPING[code] || code;
};
