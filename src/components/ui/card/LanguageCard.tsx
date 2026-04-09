import { LanguageResponse } from "@/types/language/language";
import { useTranslation } from "react-i18next";
import { LanguageFlag } from "@/components/languages/LanguageFlag";
import { BadgeTag } from "@/components/ui/BadgeTag";
import { Star, BookOpen, Layers, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface LanguageCardProps {
    language: LanguageResponse;
    isLearning: boolean;
    onClick: () => void;
}

export function LanguageCard({ language, isLearning, onClick }: Readonly<LanguageCardProps>) {
    const { t } = useTranslation();

    return (
        <Button
            type="button"
            variant="none"
            className="group w-full text-left bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            onClick={onClick}
        >
            <div className="px-5 pt-5 flex items-center gap-3">
                <LanguageFlag
                    languageCode={language.code}
                    className="w-12 h-8 object-cover rounded-lg shadow-sm border border-gray-100 flex-shrink-0"
                />
                {language.isPopular && (
                    <BadgeTag variant="popular">
                        <Star className="w-3 h-3 text-yellow-500 inline mr-1" />
                        {t("popular")}
                    </BadgeTag>
                )}
            </div>

            <div className="px-5 pt-3 pb-4">
                <p className="font-bold text-gray-900 text-base leading-tight truncate">
                    {language.name}
                </p>
                {language.region && (
                    <p className="text-xs text-gray-400 mt-0.5">{language.region}</p>
                )}
            </div>

            {(language.topicsCount != null || language.lessonsCount != null) && (
                <div className="px-5 pb-4 flex items-center gap-5">
                    {language.topicsCount != null && (
                        <div className="flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-800">{language.topicsCount}</span>
                            <span className="text-xs text-gray-400">{t("catalog.topics")}</span>
                        </div>
                    )}
                    {language.topicsCount != null && language.lessonsCount != null && (
                        <div className="w-px h-4 bg-gray-200" />
                    )}
                    {language.lessonsCount != null && (
                        <div className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-800">{language.lessonsCount}</span>
                            <span className="text-xs text-gray-400">{t("catalog.lessons")}</span>
                        </div>
                    )}
                </div>
            )}

            <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between">
                {language.levelRange
                    ? <BadgeTag variant="default">{
                        (() => {
                            const parts = language.levelRange.split(" → ");
                            return parts[0] === parts[1] ? parts[0] : language.levelRange;
                        })()
                    }</BadgeTag>
                    : <span />
                }
                {isLearning
                    ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    : <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 transition-colors" />
                }
            </div>
        </Button>
    );
}
