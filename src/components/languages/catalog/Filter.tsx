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
                                ? "bg-gray-900 text-white border-gray-900"
                                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
                        }`}
                    >
                        {t(`languages.regions.${region.toLowerCase()}`)}
                    </Button>
                );
            })}
        </div>
    );
}
