import { LanguageResponse } from "@/types/language/language";
import { useTranslation } from "react-i18next";
import { LanguageFlag } from "@/components/languages/LanguageFlag";
import { BadgeTag } from "../BadgeTag";
import { Star } from "lucide-react";

interface LanguageCardProps {
    language: LanguageResponse;
    isLearning: boolean;
    onClick: () => void;
}

export function LanguageCard({ language, isLearning, onClick }: LanguageCardProps) {
        const {t} = useTranslation();

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow relative" onClick={onClick}>
            <div className="flex items-center gap-2 mb-1">
                <LanguageFlag languageCode={language.code} className="w-8 h-6 object-cover rounded-sm border border-gray-200" />
                <p className="text-lg font-bold text-gray-900">{language.name}</p>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
                {<BadgeTag variant="default">{language.levelRange ?? "A1-C2"}</BadgeTag>}

                {language.isPopular && (
                    <BadgeTag variant="popular"> <Star className="w-3 h-3 text-yellow-600" /> {t("popular")}</BadgeTag>
                )}
            </div>

            <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                <span className="text-gray-400 text-lg">→</span>
                {isLearning && (
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-50 text-indigo-600">
                        {t("languages.inLearning")}
                    </span>
                )}
            </div>
        </div>
    );
}