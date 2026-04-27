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

export function FloatingFilterBar({searchName,onSearchNameChange,searchDifficulty,onSearchDifficultyChange}: FloatingFilterBarProperties) {
    const { t } = useTranslation();

    const difficultyOptions = [
        { label: t('topics.all_levels'), value: "" },
        ...PROFICIENCY_LEVELS.map(level => ({ label: t('topics.level', { level }), value: level }))
    ];

    return (
        <div className="sticky top-20 z-40 w-full mb-10 pt-2">
            <div className="flex flex-col sm:flex-row items-end gap-6 p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-2xl border border-white/20 dark:border-gray-700/20 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] ring-1 ring-black/5 dark:ring-white/5">
                <div className="flex-1 w-full">
                    <FormField
                        label=""
                        id="searchName"
                        type="text"
                        placeholder={t('topics.search_placeholder')}
                        value={searchName}
                        onChange={(e) => onSearchNameChange(e.target.value)}
                        className="bg-gray-50/50 dark:bg-gray-700/50 border-gray-100/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-800 transition-all rounded-2xl"
                    />
                </div>

                <div className="w-full sm:w-64">
                    <Select
                        label=""
                        id="searchDifficulty"
                        value={searchDifficulty}
                        options={difficultyOptions}
                        onChange={(value) => onSearchDifficultyChange(value)}
                        className="bg-gray-50/50 dark:bg-gray-700/50 border-gray-100/50 dark:border-gray-700/50 focus:bg-white dark:focus:bg-gray-800 transition-all rounded-2xl"
                    />
                </div>
            </div>
        </div>
    );
}
