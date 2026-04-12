import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/Button";

export function LocaleLanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language.slice(0, 2).toUpperCase();
  const locales = Object.keys(i18n.options.resources ?? {}).map(l => l.toUpperCase());

  return (
    <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full px-2 py-1 shadow-sm text-sm font-medium">
      {locales.map((locale, i) => (
        <Fragment key={locale}>
          {i > 0 && <span className="text-gray-300 dark:text-gray-600 mx-0.5" aria-hidden="true">|</span>}
          <Button
            variant="none"
            onClick={() => {
              i18n.changeLanguage(locale.toLowerCase());
              localStorage.setItem('locale', locale.toLowerCase());
            }}
            className={clsx(
              'px-1 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm', 
              current === locale 
                ? 'text-brand-600 font-bold' 
                : 'text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500'
            )}
          >
            {locale}
          </Button>
        </Fragment>
      ))}
    </div>
  );

}
