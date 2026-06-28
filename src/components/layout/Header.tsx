import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LocaleLanguageSwitcher } from "@/components/layout/LocaleLanguageSwitcher";

export function Header() {
    const { t } = useTranslation();

    return (
        <header className="bg-gray-100 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
            <div className="max-w-full mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-brand-600 dark:text-white hover:text-brand-500 dark:hover:text-gray-300 transition-colors">
                            Skaldly
                        </Link>
                    </div>

                    <nav className="hidden md:flex flex-1 justify-center space-x-8">
                        <Link to="/plans" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                            {t("plans.page_title")}
                        </Link>
                        <Link to="/contact" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                            {t("contact.title")}
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                            {t("auth.login.title")}
                        </Link>
                        <Link to="/register" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                            {t("auth.register.title")}
                        </Link>
                        <div className="flex items-center gap-2">
                            <ThemeToggle />
                            <LocaleLanguageSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
