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
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/60 dark:border-gray-700/40 p-1.5 flex gap-1 overflow-x-auto scrollbar-none max-w-full">
      {FILTERS.map((filter) => {
        const isActive = value === filter.value;
        return (
          <Button
            key={filter.value}
            variant="none"
            onClick={() => onChange(filter.value)}
            className={`
              flex-1 flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer
              ${isActive 
                ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.25)] dark:shadow-[0_0_20px_rgba(79,70,229,0.2)]' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100/70 dark:hover:bg-gray-700/50'
              }
            `}
          >
            {t(filter.labelKey)}
          </Button>
        );
      })}
    </div>
  );
}
