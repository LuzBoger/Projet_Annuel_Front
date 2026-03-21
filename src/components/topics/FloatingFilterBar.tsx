import { useTranslation } from "react-i18next";
import { PROFICIENCY_LEVELS } from "@/types/topic/topic";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";

interface FloatingFilterBarProperties {
    searchName: string;
    onSearchNameChange: (newName: string) => void;
    searchDifficulty: string;
    onSearchDifficultyChange: (newDifficulty: string) => void;
}

export function FloatingFilterBar({
    searchName,
    onSearchNameChange,
    searchDifficulty,
    onSearchDifficultyChange
}: FloatingFilterBarProperties) {
    const { t } = useTranslation();

    const difficultyOptions = [
        { label: t('topics.all_levels'), value: "" },
        ...PROFICIENCY_LEVELS.map(level => ({ label: t('topics.level', { level }), value: level }))
    ];

    return (
        <div className="sticky top-20 z-40 w-full mb-8 pt-2">
            <div className="flex flex-col sm:flex-row items-end gap-4 p-4 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-xl">
                <div className="flex-1 w-full">
                    <FormField
                        label=""
                        id="searchName"
                        type="text"
                        placeholder={t('topics.search_placeholder')}
                        value={searchName}
                        onChange={(e) => onSearchNameChange(e.target.value)}
                    />
                </div>
                
                <div className="w-full sm:w-48 pb-1">
                    <Select
                        label=""
                        id="searchDifficulty"
                        value={searchDifficulty}
                        options={difficultyOptions}
                        onChange={(value) => onSearchDifficultyChange(value)}
                    />
                </div>
            </div>
        </div>
    );
}
