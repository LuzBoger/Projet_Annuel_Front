import { Button } from "@/components/ui/Button";
import { EVENT_USER_LANGUAGE_REMOVED } from "@/constants/event";
import { globalEvents } from "@/lib/utils/eventEmitter";
import { userLanguageService } from "@/services/userLanguage";
import { UserLanguageResponse } from "@/types/userLanguage/userLanguage";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AddLanguageToList } from "@/components/profile/languages/AddLanguageToList";
import { Badge } from "@/components/profile/languages/Badge";

interface LanguagesSectionProps {
    languages: UserLanguageResponse[];
    onRemove: (userLanguageId: string) => void;
}

export function LanguagesSection({ languages, onRemove }: LanguagesSectionProps) {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const learningLanguages = languages.filter(lang => lang.languageType === "LEARNING");
    const nativeLanguages = languages.filter(lang => lang.languageType === "NATIVE");
    const handleRemove = async (language: UserLanguageResponse) => {
        await userLanguageService.deleteUserLanguage(language.id);
        globalEvents.emit(EVENT_USER_LANGUAGE_REMOVED, language.languageId);
        onRemove(language.id);
    }

    return (
        <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {t("profile.profileLanguages.title")}
                </h3>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/catalog-languages")}
                    className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-100 dark:hover:bg-brand-900/30 rounded-full border-0"
                >
                    <Plus className="w-3 h-3" />
                    {t("common.add")}
                </Button>
            </div>
            {nativeLanguages.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-sm font-semibold text-white mb-2">
                        {t("profile.languageSection.nativeLanguages")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {nativeLanguages.map((lang) => (
                            <div key={lang.id} className="inline-flex items-center gap-1.5 bg-neutral-800 border border-neutral-700 rounded-full px-2.5 py-1.5">
                                <span className="text-[10px] font-bold">
                                    {lang.languageCode.toUpperCase()}
                                </span>
                                <span className="text-xs text-neutral-300">{lang.languageName}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {learningLanguages.length === 0 ? (
                <AddLanguageToList/>
            ) : (
                <div className="space-y-2">
                    {learningLanguages.map((lang, index) => (
                        <div
                            key={lang.id}
                            className="flex items-center justify-between px-3 py-2.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <Badge code={lang.languageCode} index={index} />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{lang.languageName}</span>
                                    <span className="text-xs text-gray-400 dark:text-gray-500">{t("profile.profileLanguages.learning")}</span>
                                </div>
                            </div>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleRemove(lang)}
                                className="text-xs bg-transparent text-red-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border-0"
                            >
                                {t("common.remove")}
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
