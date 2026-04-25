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
            className="group relative w-full text-left bg-white bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-70 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-300 flex flex-col h-full"
            onClick={onClick}
        >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-white/50 dark:from-brand-950/20 dark:to-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10 px-6 pt-6 flex items-center justify-between">
                <LanguageFlag
                    languageCode={language.code}
                    className="w-12 h-8 object-cover rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex-shrink-0"
                />
                
                {language.isPopular && (
                    <BadgeTag color="yellow" className="scale-90 origin-right">
                        <Star className="w-3 h-3 text-yellow-500" />
                        {t("popular")}
                    </BadgeTag>
                )}
            </div>

            <div className="relative z-10 px-6 pt-5 pb-4 flex-grow">
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">
                    {language.name}
                </h3>
                {language.region && (
                    <p className="text-sm font-medium text-gray-400 dark:text-gray-500 mt-1">{language.region}</p>
                )}
            </div>

            <div className="relative z-10 px-6 pb-6">
                {(language.topicsCount != null || language.lessonsCount != null) && (
                    <div className="flex items-center gap-3 mb-6">
                        {language.topicsCount != null && (
                            <BadgeTag color="brand">
                                <Layers className="w-3.5 h-3.5" />
                                <span className="text-xs font-bold">{language.topicsCount}</span>
                                <span className="text-[10px] font-black uppercase tracking-wider opacity-70">{t("catalog.topics")}</span>
                            </BadgeTag>
                        )}
                        
                        {language.lessonsCount != null && (
                            <BadgeTag color="gray">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span className="text-xs font-bold">{language.lessonsCount}</span>
                                <span className="text-[10px] font-black uppercase tracking-wider opacity-70">{t("catalog.lessons")}</span>
                            </BadgeTag>
                        )}
                    </div>
                )}

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between group/footer">
                    <div className="flex items-center min-h-[26px]">
                        {language.levelRange && (
                            <BadgeTag color="gray" className="text-[10px]">
                                {(() => {
                                    const parts = language.levelRange.split(" → ");
                                    return parts[0] === parts[1] ? parts[0] : language.levelRange;
                                })()}
                            </BadgeTag>
                        )}
                    </div>
                    
                    <div className="flex items-center text-sm font-bold text-brand-600 dark:text-indigo-400 group-hover:text-brand-700 dark:group-hover:text-indigo-300 transition-colors">
                        {isLearning ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                            <>
                                <span className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                    {t("catalog.discover")}
                                </span>
                                <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Button>
    );
}
