import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";

interface FilterProps {
    regions: string[];
    selectedFilter: string;
    onChange: (region: string) => void;
}

export function Filter({ regions, selectedFilter, onChange }: Readonly<FilterProps>) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap gap-2">
            {regions.map((region) => {
                const isActive = selectedFilter === region;
                return (
                    <Button
                        key={region}
                        type="button"
                        variant="none"
                        onClick={() => onChange(region)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
                            isActive
                                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400 hover:text-gray-900 dark:hover:text-white"
                        }`}
                    >
                        {t(`languages.regions.${region.toLowerCase()}`)}
                    </Button>
                );
            })}
        </div>
    );
}
