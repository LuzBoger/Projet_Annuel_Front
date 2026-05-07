import { useTranslation } from "react-i18next";

interface HeaderProps {
    nbLanguages: number;
}

export function Header({ nbLanguages }: HeaderProps) {
    const { t } = useTranslation();
    return (
         <div className="mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 mb-4">
                • {nbLanguages} {t('languages.available')}
            </span>
            <h1 className="text-5xl font-black text-gray-900 dark:text-white leading-tight">
                {t('languages.chooseYour')}
            </h1>
            <h1 className="text-5xl font-black italic text-gray-400 dark:text-gray-400 leading-tight">
                {t('languages.nextLanguage')}
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-300 text-sm max-w-sm">
                {t('languages.clickToExplore')}
            </p>
        </div>
    )
}
