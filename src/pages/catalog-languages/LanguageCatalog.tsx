import { Filter } from "@/components/languages/catalog/Filter";
import { Header } from "@/components/languages/catalog/Header";
import { LanguageCard } from "@/components/ui/card/LanguageCard";
import { REGION_MAP } from "@/constants/languages";
import { useUserLanguage } from "@/hooks/useUserLanguage";
import { languageService } from "@/services/languageService";
import { LanguageResponse } from "@/types/language/language";
import { UserLanguageResponse } from "@/types/userLanguage/userLanguage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function LanguageCatalog() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [languages, setLanguages] = useState<LanguageResponse[]>([]);
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [loading, setLoading] = useState(false);
    const {userLanguages, fetchLearningLanguages} = useUserLanguage();

    const filters: string[] = [
        "all",
        ...Array.from(new Set(languages.map(lang => lang.region).filter((r): r is string => !!r))),
        ...(languages.some(lang => lang.isPopular) ? ["Populaires"] : []),
    ];

    useEffect(() => {
        Promise.all([
            languageService.getAllLanguages(),
            fetchLearningLanguages()
        ]).then(([languages]) => {
            setLanguages(languages.map(lang => ({...lang, region: REGION_MAP[lang.code]})));
        }).finally(() => setLoading(false));

    }, [fetchLearningLanguages]);

    const filteredLanguages = languages.filter(lang => {
        if (selectedFilter === "all") return true;
        if (selectedFilter === "Populaires") return lang.isPopular;
        return lang.region === selectedFilter;
    });

    const isLanguageAdded = (languageId: string): UserLanguageResponse | undefined => {
        return userLanguages.find(lang => lang.languageId === languageId);
    }

    if (loading) return <div className="flex justify-center py-20">{t("common.loading")}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Header nbLanguages={filteredLanguages.length} />
            <Filter regions={filters} selectedFilter={selectedFilter} onChange={setSelectedFilter} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {filteredLanguages.map((language) => (
                    <LanguageCard
                        key={language.id}
                        language={language}
                        isLearning={!!isLanguageAdded(language.id)}
                        onClick={() => navigate(`/languages/${language.id}`)}
                    />
                ))}
            </div>
        </div>
    );
}
