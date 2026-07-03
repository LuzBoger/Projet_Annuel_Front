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
            className="relative flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl border-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer"
            style={{background:  active ? 'var(--color-indigo-50)' : 'var(--color-gray-50)', borderColor: active ? 'var(--color-indigo-500)' : 'transparent'}}
          >
            {active && (
              <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ background: 'var(--color-indigo-500)' }}>
                <Check size={8} className="text-white" strokeWidth={3} />
              </span>
            )}
            <span
              className="font-black leading-none"
              style={{fontSize: value === 'xlarge' ? '1.5rem' : value === 'large' ? '1.15rem' : '0.9rem', color: active ? 'var(--color-indigo-600)' : 'var(--color-gray-400)'}}
            >
              {sample}
            </span>
            <span className="text-[10px] font-medium" style={{ color: active ? 'var(--color-indigo-500)' : 'var(--color-gray-400)' }}>
              {t(`accessibility.${label}`)}
            </span>
          </Button>
        );
      })}
    </div>
  );
}