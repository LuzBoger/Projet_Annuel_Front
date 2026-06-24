import { useTranslation } from "react-i18next";
import { FILTERS } from "@/constants/lesson";
import { MistakeFilterValue } from "@/types/mistakes/userMistakes";
import { Button } from "@/components/ui/Button";

interface MistakeTypeFilterProps {
  value: MistakeFilterValue;
  onChange: (value: MistakeFilterValue) => void;
}

export function MistakeTypeFilter({ value, onChange }: MistakeTypeFilterProps) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-2 flex-wrap">
      {FILTERS.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            value === filter.value ? "bg-brand-600 text-white shadow-sm" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-brand-300"
          }`}
        >
          {t(filter.labelKey)}
        </Button>
      ))}
    </div>
  );
}
