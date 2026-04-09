import { EVENT_USER_LANGUAGE_REMOVED } from "@/constants/event";
import { globalEvents } from "@/lib/utils/eventEmitter";
import { userLanguageService } from "@/services/userLanguage";
import { UserLanguageResponse } from "@/types/userLanguage/userLanguage";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { getLanguageColor } from "@/lib/utils/color";

interface ProfileLanguageSectionProps {
    languages: UserLanguageResponse[];
    onLanguageRemove: (userLanguageId: string) => void;
}

export function ProfileLanguageSection({ languages, onLanguageRemove }: ProfileLanguageSectionProps) {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const learningLanguages = languages.filter((language) => language.languageType === "LEARNING");

    const handleRemoveLanguage = async (language: UserLanguageResponse) => {
        await userLanguageService.deleteUserLanguage(language.id);
        globalEvents.emit(EVENT_USER_LANGUAGE_REMOVED, language.id);
        onLanguageRemove(language.id);
    }

    return (
        <div className="mt-6">
            <div className="flex items-start justify-between mb-4 gap-3">
                <div>
                    <h3 className="text-sm font-semibold text-white">
                        {t("profile.languageSection.learningLanguages")}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                        {learningLanguages.length} {t("profile.languageSection.learningLanguages").toLowerCase()}
                    </p>
                </div>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate("/catalog-languages")}
                    className="flex-shrink-0 flex items-center gap-1.5 text-xs"
                >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1v8M1 5h8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    {t("profile.languageSection.addLanguage")}
                </Button>
            </div>

            {learningLanguages.length === 0 ? (
                <p className="text-sm text-neutral-500">
                    {t("profile.languageSection.noLearningLanguages")}.{" "}
                    <Button onClick={() => navigate("/catalog-languages")} className="text-neutral-400 underline hover:text-white transition-colors">
                        {t("profile.languageSection.chooseLanguage")}
                    </Button>
                </p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {learningLanguages.map((lang) => (
                        <div
                            key={lang.id}
                            className="inline-flex items-center gap-1.5 bg-neutral-800 border border-neutral-700 hover:border-neutral-500 rounded-full px-2.5 py-1.5 transition-colors"
                        >
                            <div
                                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: `${getLanguageColor(lang.languageCode)}22` }}
                            >
                                <span
                                    className="text-[10px] font-bold leading-none"
                                    style={{ color: getLanguageColor(lang.languageCode) }}
                                >
                                    {lang.languageCode.toUpperCase()}
                                </span>
                            </div>
                            <span className="text-xs text-neutral-300 whitespace-nowrap">
                                {lang.languageName}
                            </span>
                            <button
                                onClick={() => handleRemoveLanguage(lang)}
                                className="w-4 h-4 rounded-full bg-neutral-700 hover:bg-red-900/30 flex items-center justify-center flex-shrink-0 ml-0.5 transition-colors group"
                            >
                                <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                                    <path
                                        d="M1 1l5 5M6 1L1 6"
                                        stroke="currentColor"
                                        strokeWidth="1.3"
                                        strokeLinecap="round"
                                        className="text-neutral-500 group-hover:text-red-400"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}