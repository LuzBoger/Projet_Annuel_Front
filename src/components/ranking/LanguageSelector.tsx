import { UserLanguageResponse } from "@/types/userLanguage/userLanguage";
import { Select } from "@/components/ui/Select";

interface LanguageSelectorProps {
    languages: UserLanguageResponse[];
    selectedLanguageId: string;
    onSelectLanguage: (languageId: string) => void;
}

export function LanguageSelector({ languages, selectedLanguageId, onSelectLanguage }: LanguageSelectorProps) {
    return (
        <Select
            value={selectedLanguageId}
            options={languages.map(language => ({ value: language.languageId, label: language.languageName }))}
            onChange={onSelectLanguage}
            className="text-sm min-w-[140px]"
        />
    );
}