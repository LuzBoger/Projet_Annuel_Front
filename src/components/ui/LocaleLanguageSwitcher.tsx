import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/Button";

export function LocaleLanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language.slice(0, 2).toUpperCase();
  const locales = Object.keys(i18n.options.resources ?? {}).map(l => l.toUpperCase());

  return (
    <div className="fixed top-4 right-4 flex items-center gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1.5 shadow-sm text-sm font-medium z-50">
      {locales.map((locale, i) => (
        <Fragment key={locale}>
          {i > 0 && <span className="text-gray-300">|</span>}
          <Button
            variant="none"
            onClick={() => {
              i18n.changeLanguage(locale.toLowerCase());
              localStorage.setItem('locale', locale.toLowerCase());
            }}
            className={clsx('px-1 transition-colors', current === locale ? 'text-indigo-600 font-bold' : 'text-gray-400 hover:text-gray-600')}
          >
            {locale}
          </Button>
        </Fragment>
      ))}
    </div>
  );

}