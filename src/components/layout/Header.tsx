import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { hasRole } from "@/lib/utils/roles";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "@/assets/icons";
import { Avatar } from "@/components/ui/Avatar";
import { profileService } from "@/services/profileService";
import { getProfileImageUrl } from "@/lib/utils/image";
import { globalEvents } from "@/lib/utils/eventEmitter";
import { EVENT_ACTIVE_LANGUAGE_CHANGED, EVENT_PROFILE_UPDATED, EVENT_USER_LANGUAGE_ADDED, EVENT_USER_LANGUAGE_REMOVED } from "@/constants/event";
import { UserLanguageResponse } from "@/types/userLanguage/userLanguage";
import { LanguageResponse } from "@/types/language/language";
import { LanguageSwitcherButton } from "@/components/languages/LanguageSwitcherButton";
import { userLanguageService } from "@/services/userLanguage";
import { Button } from "@/components/ui/Button";
import { LocaleLanguageSwitcher } from "@/components/layout/LocaleLanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
    const { user, isAuthenticated, logout } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [learningLanguages, setLearningLanguages] = useState<UserLanguageResponse[]>([]);
    const [activeLanguage, setActiveLanguage] = useState<LanguageResponse | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isAdmin = hasRole(user?.role, "ADMIN");

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!isAuthenticated) return;
        profileService.getMyProfile()
            .then((profile) => {
                if (profile.photoUrl) {
                    setPhotoUrl(getProfileImageUrl(profile.photoUrl));
                }
                if (profile.activeLanguage) {
                    setActiveLanguage(profile.activeLanguage);
                }
            })
            .catch(() => { });
        userLanguageService.getUserLearningLanguages()
            .then(setLearningLanguages)
            .catch(() => { });
    }, [isAuthenticated, user?.hasCompletedOnboarding]);

    useEffect(() => {
        const handler = (...args: unknown[]) => {
            const url = args[0] as string | undefined;
            setPhotoUrl(url ? getProfileImageUrl(url) : null);
        };
        globalEvents.on(EVENT_PROFILE_UPDATED, handler);
        return () => globalEvents.off(EVENT_PROFILE_UPDATED, handler);
    }, []);

    useEffect(() => {
        const handler = (...args: unknown[]) => {
            const lang = args[0] as LanguageResponse | null | undefined;
            setActiveLanguage(lang ?? null);
        };
        globalEvents.on(EVENT_ACTIVE_LANGUAGE_CHANGED, handler);
        return () => globalEvents.off(EVENT_ACTIVE_LANGUAGE_CHANGED, handler);
    }, []);

    useEffect(() => {
        const onAdded = (...args: unknown[]) => {
            setLearningLanguages((prev) => [...prev, args[0] as UserLanguageResponse]);
        };

        const onRemoved = (...args: unknown[]) => {
            setLearningLanguages((prev) => prev.filter(ul => ul.languageId !== (args[0] as string)));
        };

        globalEvents.on(EVENT_USER_LANGUAGE_ADDED, onAdded);
        globalEvents.on(EVENT_USER_LANGUAGE_REMOVED, onRemoved);

        return () => {
            globalEvents.off(EVENT_USER_LANGUAGE_ADDED, onAdded);
            globalEvents.off(EVENT_USER_LANGUAGE_REMOVED, onRemoved);
        };
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

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
                        {isAuthenticated && (
                            <>
                                {!isAdmin && (
                                    <>
                                        <Link to="/plans" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                                            {t("plans.page_title")}
                                        </Link>
                                        <Link to="/subscription" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                                            {t("subscription.title")}
                                        </Link>
                                        <Link to="/catalog-languages" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                                            {t("catalogLanguages.title")}
                                        </Link>
                                        <Link to="/ranking" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                                            {t("ranking.title")}
                                        </Link>
                                        <Link to="/training/list" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                                            {t("training.nav.liste")}
                                        </Link>
                                    </>
                                )}

                                {isAdmin && (
                                    <div className="flex items-center space-x-8">
                                        <Link to="/admin" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                                            {t("admin.dashboard.title")}
                                        </Link>
                                        <Link to="/admin/languages" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                                            {t("admin.languages.page_title")}
                                        </Link>
                                        <Link to="/admin/plans" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                                            {t("admin.plans.title")}
                                        </Link>
                                        <Link to="/admin/subscriptions" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                                            {t("admin.subscriptions.title")}
                                        </Link>
                                        <Link to="/admin/topics" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                                            {t("admin.topics.page_title")}
                                        </Link>
                                        <Link to="/ranking" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                                            {t("ranking.title")}
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                    </nav>

                    <div className="flex items-center space-x-4">
                        {isAuthenticated && !isAdmin && (
                            <LanguageSwitcherButton learningLanguage={learningLanguages} activeLanguage={activeLanguage} />
                        )}
                        {!isAuthenticated ? (
                            <div className="flex items-center space-x-8">
                                <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                                    {t("auth.login.title")}
                                </Link>
                                <Link to="/register" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                                    {t("auth.register.title")}
                                </Link>
                            </div>
                        ) : (
                            <div className="relative" ref={dropdownRef}>
                                <Button
                                    variant="none"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
                                >
                                    <Avatar imageUrl={photoUrl ?? undefined} size="w-8 h-8" />
                                    <div className="hidden sm:block text-sm text-left">
                                        <p className="font-medium text-gray-700 dark:text-gray-300">{user?.username || t('common.user')}</p>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </Button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-brand-600 transition-colors first:rounded-t-md"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            {t("profile.title")}
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-brand-600 transition-colors"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            {t("settings.title")}
                                        </Link>
                                        <Button
                                            variant="none"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                handleLogout();
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-gray-100 dark:border-gray-700 last:rounded-b-md"
                                        >
                                            {t("auth.logout")}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="flex items-center gap-2 ml-2 mr-1">
                            <ThemeToggle />
                            <LocaleLanguageSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
