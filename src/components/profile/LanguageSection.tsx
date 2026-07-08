import { EVENT_USER_LANGUAGE_REMOVED } from "@/constants/event";
import { globalEvents } from "@/lib/utils/eventEmitter";
import { userLanguageService } from "@/services/userLanguage";
import { UserLanguageResponse } from "@/types/userLanguage/userLanguage";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { getLanguageColor } from "@/lib/utils/color";
import { AddIcon, RemoveIcon } from "@/assets/icons";

interface ProfileLanguageSectionProps {
    languages: UserLanguageResponse[];
    onLanguageRemove: (userLanguageId: string) => void;
    isProfileOwner?: boolean;
}

export function ProfileLanguageSection({ languages, onLanguageRemove, isProfileOwner = false }: ProfileLanguageSectionProps) {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const learningLanguages = languages.filter((language) => language.languageType === "LEARNING");

    const handleRemoveLanguage = async (language: UserLanguageResponse) => {
        await userLanguageService.deleteUserLanguage(language.id);
        globalEvents.emit(EVENT_USER_LANGUAGE_REMOVED, language.languageId);
        onLanguageRemove(language.id);
    }

    return (
        <div className="mt-6">
            <div className="flex items-start justify-between mb-4 gap-3">
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {t("profile.languageSection.learningLanguages")}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-neutral-500 mt-0.5">
                        {learningLanguages.length} {t("profile.languageSection.learningLanguages").toLowerCase()}
                    </p>
                </div>
                {isProfileOwner && (
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate("/catalog-languages")}
                        className="flex-shrink-0 flex items-center gap-1.5 text-xs"
                    >
                        <AddIcon className="text-white" />
                        {t("profile.languageSection.addLanguage")}
                    </Button>
                )}
            </div>

            {learningLanguages.length === 0 ? (
                <p className="text-sm text-neutral-500">
                    {t("profile.languageSection.noLearningLanguages")}.{" "}
                    {isProfileOwner && (
                        <Button onClick={() => navigate("/catalog-languages")} className="text-neutral-400 underline hover:text-white transition-colors">
                            {t("profile.languageSection.chooseLanguage")}
                        </Button>
                    )}
                </p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {learningLanguages.map((lang) => (
                        <div
                            key={lang.id}
                            className="inline-flex items-center gap-1.5 bg-gray-50 dark:bg-neutral-800/60 border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-500 rounded-full px-2.5 py-1.5 transition-colors"
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
                            <span className="text-xs text-gray-700 dark:text-neutral-300 whitespace-nowrap">
                                {lang.languageName}
                            </span>
                            {isProfileOwner && (
                                <Button
                                    variant="none"
                                    onClick={() => handleRemoveLanguage(lang)}
                                    className="w-4 h-4 rounded-full bg-gray-200 dark:bg-neutral-700 hover:bg-red-100 dark:hover:bg-red-900/30 flex items-center justify-center flex-shrink-0 ml-0.5 transition-colors group"
                                >
                                    <RemoveIcon className="text-gray-500 dark:text-neutral-500 group-hover:text-red-650 dark:group-hover:text-red-400" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}
