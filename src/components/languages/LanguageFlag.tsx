import Flag from 'react-world-flags';

// Maps ISO 639-1 language codes to ISO 3166-1 alpha-2 country codes
export const LANGUAGE_TO_COUNTRY_MAPPING: Record<string, string> = {
    "en": "gb", // English -> Great Britain
    "fr": "fr", // French -> France
    "es": "es", // Spanish -> Spain
    "de": "de", // German -> Germany
    "it": "it", // Italian -> Italy
    "pt": "pt", // Portuguese -> Portugal
    "ru": "ru", // Russian -> Russia
    "zh": "cn", // Chinese -> China
    "ja": "jp", // Japanese -> Japan
    "ar": "dz", // Arabic -> Saudi Arabia
    "hi": "in", // Hindi -> India
    "ko": "kr", // Korean -> South Korea
    "vi": "vn", // Vietnamese -> Vietnam
    "tr": "tr", // Turkish -> Turkey
    "fa": "ir", // Persian (Farsi) -> Iran
};

export const getCountryCodeFromLanguage = (languageCode: string): string => {
    const code = languageCode.toLowerCase();
    return LANGUAGE_TO_COUNTRY_MAPPING[code] || code; // Fallback to the code itself if mapping is missing
};

interface LanguageFlagProps {
    languageCode: string;
    className?: string;
}

export function LanguageFlag({ languageCode, className = "w-5 h-5 object-cover rounded-sm border border-gray-200" }: LanguageFlagProps) {
    const countryCode = getCountryCodeFromLanguage(languageCode);
    
    return (
        <div className="flex-shrink-0 inline-flex items-center justify-center">
            <Flag code={countryCode} className={`${className} shadow-sm`} fallback={<span>{languageCode.toUpperCase()}</span>} />
        </div>
    );
}
