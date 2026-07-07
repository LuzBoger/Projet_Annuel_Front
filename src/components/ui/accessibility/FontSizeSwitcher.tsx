import { FONT_SIZES } from "@/constants/accessibility";
import { FontSize } from "@/types/components/accessibility";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

interface FontSizeSwitcherProps {
  currentFontSize: FontSize;
  onChange: (value: FontSize) => void;
}

export function FontSizeSwitcher({ currentFontSize, onChange }: FontSizeSwitcherProps) {
  const { t } = useTranslation();
  return (
    <div className="flex gap-2" role="group" aria-label={t('accessibility.aria_font_group')}>
      {FONT_SIZES.map(({ value, label, sample }) => {
        const active = currentFontSize === value;
        return (
          <Button
            variant="none"
            key={value}
            onClick={() => onChange(value)}
            aria-pressed={active}
            aria-label={t(`accessibility.${label}`)}
            className={`relative flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl border-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer ${
              active
                ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-500 dark:border-indigo-500'
                : 'bg-gray-50 dark:bg-gray-800/50 border-transparent dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {active && (
              <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center bg-indigo-500">
                <Check size={8} className="text-white" strokeWidth={3} />
              </span>
            )}
            <span
              className={`font-black leading-none ${
                active ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400'
              }`}
              style={{ fontSize: value === 'xlarge' ? '1.5rem' : value === 'large' ? '1.15rem' : '0.9rem' }}
            >
              {sample}
            </span>
            <span className={`text-[10px] font-medium ${
              active ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {t(`accessibility.${label}`)}
            </span>
          </Button>
        );
      })}
    </div>
  );
}