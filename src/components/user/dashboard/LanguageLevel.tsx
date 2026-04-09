import { LanguageFlag } from "@/components/languages/LanguageFlag";
import { Button } from "@/components/ui/Button";
import { SHOW_ACTIVE_LANGUAGE } from "@/constants/languages";
import { LanguageLevelResponse } from "@/types/progress/progress";
import { useTranslation } from "react-i18next";

interface LanguageLevelProps {
    languageLevels: LanguageLevelResponse[];
    activeLanguageId: string | null;
    onSelect: (languageId: string) => void;
}

export function LanguageLevel({ languageLevels, activeLanguageId, onSelect }: LanguageLevelProps) {
    const {t} = useTranslation();

    const sortedActivelanguage = [...languageLevels].filter((lang) => lang.languageId && lang.languageCode).sort((a,b) => b.level - a.level).slice(0, SHOW_ACTIVE_LANGUAGE);
        
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">{t("dashboard.language.active")}</p>
            <div className="flex gap-2 flex-wrap">
                {sortedActivelanguage.map((lang) => {
                    const isActive = lang.languageId === activeLanguageId;
                    return (
                        <Button
                            key={lang.languageId}
                            variant="none"
                            onClick={() => onSelect(lang.languageId)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                                isActive
                                    ? "bg-gray-900 border-gray-900 text-white"
                                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-400"
                            }`}
                        >
                            <LanguageFlag languageCode={lang.languageCode} className="w-6 h-4 object-cover rounded-sm" />
                            <div className="text-left">
                                <p className="text-xs font-semibold leading-none">{lang.languageCode?.toUpperCase()}</p>
                                <p className={`text-xs leading-none mt-0.5 ${isActive ? "text-gray-300" : "text-gray-400"}`}>
                                    {t("dashboard.language.level", { level: lang.level })}
                                </p>
                            </div>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}