import Flag from 'react-world-flags';
import { getCountryCodeFromLanguage } from '@/lib/utils/languageCountryMapping';

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
