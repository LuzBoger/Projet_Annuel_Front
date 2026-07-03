import { OPTION_CARDS } from "@/constants/accessibility";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

interface AccessibilityOptionProps {
  option: typeof OPTION_CARDS[number];
  active: boolean;
  onToggle: () => void;
}

export function AccessibilityOption({option,active,onToggle}: AccessibilityOptionProps) {
  const { t } = useTranslation();
  const { labelKey, descKey, Icon, iconColor, iconBg, activeBorder, activeBg } = option;

  return (
    <Button
      variant="none"
      onClick={onToggle}
      role="switch"
      aria-checked={active}
      aria-label={t(`accessibility.${labelKey}`)}
      className={`relative flex flex-col p-3.5 rounded-2xl border-2 text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer ${
        active ? `${activeBorder} ${activeBg}` : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:border-gray-200 dark:hover:border-gray-700'}`}
    >
      {active && (
        <span className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'var(--color-indigo-500)' }}>
          <Check size={8} className="text-white" strokeWidth={3} />
        </span>
      )}

      <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 ${active ? iconBg : 'bg-white dark:bg-gray-700'}`}>
        <Icon size={15} aria-hidden="true" className={active ? iconColor : 'text-gray-400 dark:text-gray-500'} />
      </div>

      <span className="text-xs font-bold text-gray-800 dark:text-gray-100 leading-tight block">
        {t(`accessibility.${labelKey}`)}
      </span>
      <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 leading-tight block">
        {t(`accessibility.${descKey}`)}
      </span>
    </Button>
  );
}