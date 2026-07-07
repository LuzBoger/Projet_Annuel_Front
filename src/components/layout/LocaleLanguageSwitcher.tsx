import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";

export function LocaleLanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language.slice(0, 2).toUpperCase();
  const locales = Object.keys(i18n.options.resources ?? {}).map(l => l.toUpperCase());

  return (
    <div className="flex items-center p-0.5 bg-gray-100/50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-lg">
      {locales.map((locale) => (
        <Button
          key={locale}
          variant="none"
          onClick={() => {
            const lang = locale.toLowerCase();
            i18n.changeLanguage(lang);
            localStorage.setItem('locale', lang);
            document.cookie = `myAppLocaleCookie=${lang};path=/;max-age=31536000;SameSite=Lax`;
          }}
          className={clsx(
            'px-2.5 py-1 text-[11px] uppercase font-bold transition-all duration-200 rounded-md', 
            current === locale 
              ? 'bg-gray-200/80 dark:bg-gray-950/60 text-brand-700 dark:text-brand-200' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          )}
        >
          {locale}
        </Button>
      ))}
    </div>
  );
}
