import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Accessibility, X, RotateCcw, Check, ChevronRight, Moon } from 'lucide-react';
import { ThemeContext } from '@/contexts/ThemeContext';
import {OPTION_CARDS} from '@/constants/accessibility';
import { useAccessibility } from '@/hooks/useAccessibility';
import { countActiveSettings } from '@/lib/utils/accessibility';
import { Button } from '@/components/ui/Button';
import { FontSizeSwitcher } from '@/components/ui/accessibility/FontSizeSwitcher';
import { AccessibilityOption } from '@/components/ui/accessibility/AccessibilityOption';
import { ToggleAccessibility } from '@/types/components/accessibility';


export function AccessibilityControls() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { settings, updateSettings, resetSettings } = useAccessibility();
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx?.theme === 'dark';
  const count = countActiveSettings(settings);

  const subtitle = count === 0 ? t('accessibility.subtitle_none') : t( count === 1 ? 'accessibility.subtitle_active_one' : 'accessibility.subtitle_active_other',{ count });

  return (
    <>
      
      <Button
        variant="none"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 cursor-pointer"
        style={{ background: 'linear-gradient(135deg, var(--color-indigo-500), var(--color-indigo-700))' }}
        aria-label={t('accessibility.open')}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Accessibility size={20} className="text-white" aria-hidden="true" />
        {count > 0 && (<span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-brand-600 text-[10px] font-bold flex items-center justify-center shadow border border-brand-100">
            {count}
          </span>
        )}
      </Button>

      {open && (
        <>
          
          <div className="animate-accessibility-backdrop fixed inset-0 z-40 bg-[#0e1217]/50 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true"/>
            <div role="dialog" aria-modal="true" aria-label={t('accessibility.title')} className="animate-accessibility-panel fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md bg-white dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-gray-800 rounded-t-3xl sm:left-auto sm:right-6 sm:bottom-20 sm:max-w-xs sm:rounded-3xl"
              style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 20px)' }}
            >
              <div className="w-10 h-1 rounded-full mx-auto mt-3 bg-gray-200 dark:bg-gray-700 sm:hidden" aria-hidden="true" />

            <div className="flex items-center justify-between px-5 py-4 rounded-t-3xl sm:rounded-t-3xl" style={{ background: 'linear-gradient(135deg, var(--color-indigo-600), var(--color-indigo-800))' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Accessibility size={15} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-white leading-tight">
                    {t('accessibility.title')}
                  </h2>
                  <p className="text-[11px] text-indigo-200 leading-tight">{subtitle}</p>
                </div>
              </div>
              <Button
                variant="none"
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                aria-label={t('accessibility.close')}
              >
                <X size={14} />
              </Button>
            </div>
            <div className="px-4 pt-4 pb-1 flex flex-col gap-4 overflow-y-auto max-h-[65vh] custom-scrollbar">

              <section aria-label={t('accessibility.aria_font_size_section')}>
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 px-1">
                  {t('accessibility.text_size')}
                </p>
                <FontSizeSwitcher currentFontSize={settings.fontSize} onChange={value => updateSettings({ fontSize: value })} />
              </section>

              <div className="h-px bg-gray-100 dark:bg-gray-800" />

              <section aria-label={t('accessibility.aria_visual_section')}>
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 px-1">
                  {t('accessibility.visual_options')}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {OPTION_CARDS.map(option => (
                    <AccessibilityOption key={option.key} option={option} active={settings[option.key as ToggleAccessibility]} onToggle={() => updateSettings({ [option.key]: !settings[option.key as ToggleAccessibility] })}/>
                  ))}

                  <Button
                    variant="none"
                    onClick={() => themeCtx?.toggle()}
                    role="switch"
                    aria-checked={isDark}
                    aria-label={t('accessibility.dark_mode_label')}
                    className={`col-span-2 flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer ${
                      isDark ? 'border-indigo-400 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:border-gray-200 dark:hover:border-gray-700'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isDark ? 'bg-indigo-100 dark:bg-indigo-900/30' : 'bg-white dark:bg-gray-700'}`}>
                      <Moon size={15} aria-hidden="true" className={isDark ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-gray-800 dark:text-gray-100 block">
                        {t('accessibility.dark_mode_label')}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 block">
                        {t('accessibility.dark_mode_desc')}
                      </span>
                    </div>
                    {isDark && (
                      <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--color-indigo-500)' }}>
                        <Check size={8} className="text-white" strokeWidth={3} />
                      </span>
                    )}
                  </Button>
                </div>
              </section>

              {count > 0 ? (
                <Button
                  variant="none"
                  onClick={resetSettings}
                  className="flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 cursor-pointer"
                  aria-label={t('accessibility.reset_label')}
                >
                  <RotateCcw size={11} aria-hidden="true" />
                  {t('accessibility.reset')}
                </Button>
              ) : (
                <div className="flex items-center justify-center gap-1 py-2 text-[10px] text-gray-300 dark:text-gray-600">
                  <ChevronRight size={10} />
                  {t('accessibility.hint')}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
