import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";

interface FilterProps {
    regions: string[];
    selectedFilter: string;
    onChange: (region: string) => void;
}

export function Filter({ regions, selectedFilter, onChange }: FilterProps) {
    const {t} = useTranslation();
    return (
        <div className="flex flex-wrap gap-2 mb-8">
            {regions.map((region) => (
                <Button 
                    key={region}
                    variant={selectedFilter === region ? 'primary' : 'outline'}
                    onClick={() => onChange(region)}
                >
                    {t(`languages.regions.${region.toLowerCase()}`)}
                </Button>

            ))}
        </div>
    )
}