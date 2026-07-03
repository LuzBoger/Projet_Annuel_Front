import { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LocaleLanguageSwitcher } from "@/components/layout/LocaleLanguageSwitcher";
import { LogoSk, LogoSkaldly } from "@/assets/icons";

export function Header() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLessonsClick = () => {
        setMenuOpen(false);
        if (location.pathname === '/') {
            document.getElementById('lessons')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/');
            setTimeout(() => {
                document.getElementById('lessons')?.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    };

    return (
        <header className="bg-gray-100 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
            <div className="max-w-full mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">

                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center text-brand-600 dark:text-white hover:text-brand-500 dark:hover:text-gray-300 transition-colors">
                            <LogoSkaldly className="hidden md:block h-8 w-auto shrink-0" />
                            <LogoSk className="block md:hidden h-8 w-8 shrink-0" />
                        </Link>
                    </div>

                    <nav className="hidden md:flex flex-1 justify-center space-x-8">
                        <button
                            onClick={handleLessonsClick}
                            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors cursor-pointer"
                        >
                            {t("header.nav.lessons")}
                        </button>
                        <Link to="/plans" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                            {t("header.nav.plans")}
                        </Link>
                        <Link to="/contact" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                            {t("header.nav.contact")}
                        </Link>
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                            {t("auth.login.title")}
                        </Link>
                        <Link to="/register" className="text-sm font-medium px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white transition-colors">
                            {t("auth.register.title")}
                        </Link>
                        <LocaleLanguageSwitcher />
                    </div>

                    <div className="flex md:hidden items-center gap-2">
                        <LocaleLanguageSwitcher />
                        <button
                            onClick={() => setMenuOpen(o => !o)}
                            className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Menu"
                        >
                            {menuOpen ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-950 px-4 pb-4 space-y-1">
                    <button
                        onClick={handleLessonsClick}
                        className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                    >
                        {t("header.nav.lessons")}
                    </button>
                    <Link
                        to="/plans"
                        onClick={() => setMenuOpen(false)}
                        className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                    >
                        {t("header.nav.plans")}
                    </Link>
                    <Link
                        to="/contact"
                        onClick={() => setMenuOpen(false)}
                        className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                    >
                        {t("header.nav.contact")}
                    </Link>
                    <div className="border-t border-gray-200 dark:border-gray-800 pt-3 mt-2 flex flex-col gap-2">
                        <Link
                            to="/login"
                            onClick={() => setMenuOpen(false)}
                            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                        >
                            {t("auth.login.title")}
                        </Link>
                        <Link
                            to="/register"
                            onClick={() => setMenuOpen(false)}
                            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 transition-colors text-center"
                        >
                            {t("auth.register.title")}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
