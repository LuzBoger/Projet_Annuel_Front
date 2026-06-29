import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Sparkles, Brain, StarIcon, BookOpen, Eye, User, Cross, LogoSkaldly } from "@/assets/icons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LocaleLanguageSwitcher } from "@/components/layout/LocaleLanguageSwitcher";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcherButton } from "@/components/languages/LanguageSwitcherButton";
import { userLanguageService } from "@/services/userLanguage";
import { profileService } from "@/services/profileService";
import { globalEvents } from "@/lib/utils/eventEmitter";
import { EVENT_ACTIVE_LANGUAGE_CHANGED, EVENT_USER_LANGUAGE_ADDED, EVENT_USER_LANGUAGE_REMOVED } from "@/constants/event";
import { UserLanguageResponse } from "@/types/userLanguage/userLanguage";
import { LanguageResponse } from "@/types/language/language";

const navItems = [
    { to: "/dashboard", label: "dashboard.page_title", icon: Sparkles, end: true },
    { to: "/catalog-languages", label: "catalogLanguages.title", icon: Brain },
    { to: "/ranking", label: "ranking.title", icon: StarIcon },
    { to: "/training/list", label: "training.nav.liste", icon: BookOpen },
    { to: "/challenges", label: "challenge.title", icon: Eye },
    { to: "/subscription", label: "subscription.title", icon: User },
];

interface UserSidebarProps {
    onClose?: () => void;
    photoUrl: string | null;
    handleLogout: () => void;
}

export function UserSidebar({ onClose, photoUrl, handleLogout }: UserSidebarProps) {
    const { t } = useTranslation();
    const { user, isAuthenticated } = useAuth();
    const [learningLanguages, setLearningLanguages] = useState<UserLanguageResponse[]>([]);
    const [activeLanguage, setActiveLanguage] = useState<LanguageResponse | null>(null);

    useEffect(() => {
        if (!isAuthenticated) return;
        profileService.getMyProfile()
            .then((profile) => {
                if (profile.activeLanguage) setActiveLanguage(profile.activeLanguage);
            })
            .catch(() => {});
        userLanguageService.getUserLearningLanguages()
            .then(setLearningLanguages)
            .catch(() => {});
    }, [isAuthenticated]);

    useEffect(() => {
        const handler = (...args: unknown[]) => {
            const lang = args[0] as LanguageResponse | null | undefined;
            setActiveLanguage(lang ?? null);
        };
        globalEvents.on(EVENT_ACTIVE_LANGUAGE_CHANGED, handler);
        return () => globalEvents.off(EVENT_ACTIVE_LANGUAGE_CHANGED, handler);
    }, []);

    useEffect(() => {
        const onAdded = (...args: unknown[]) => setLearningLanguages(prev => [...prev, args[0] as UserLanguageResponse]);
        const onRemoved = (...args: unknown[]) => {
            const removedId = args[0] as string;
            setLearningLanguages(prev => prev.filter(l => l.languageId !== removedId));
            setActiveLanguage(prev => prev?.id === removedId ? null : prev);
        };
        globalEvents.on(EVENT_USER_LANGUAGE_ADDED, onAdded);
        globalEvents.on(EVENT_USER_LANGUAGE_REMOVED, onRemoved);
        return () => {
            globalEvents.off(EVENT_USER_LANGUAGE_ADDED, onAdded);
            globalEvents.off(EVENT_USER_LANGUAGE_REMOVED, onRemoved);
        };
    }, []);

    return (
        <>
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <Link
                    to="/dashboard"
                    onClick={onClose}
                    className="flex items-center text-brand-600 dark:text-white hover:text-brand-500 transition-colors"
                >
                    <LogoSkaldly className="h-8 w-auto shrink-0" />
                </Link>
                {onClose && (
                    <Button variant="none" onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors md:hidden">
                        <Cross className="w-5 h-5" />
                    </Button>
                )}
            </div>

            {learningLanguages.length > 0 && (
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <LanguageSwitcherButton learningLanguage={learningLanguages} activeLanguage={activeLanguage} />
                </div>
            )}

            <nav className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-3 mb-2">
                    Navigation
                </p>
                {navItems.map(({ to, label, icon: Icon, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        onClick={onClose}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                isActive ? "bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                            }`
                        }
                    >
                        <Icon className="w-4 h-4 shrink-0" />
                        {t(label)}
                    </NavLink>
                ))}
            </nav>

            <div className="border-t border-gray-100 dark:border-gray-800 p-3 flex flex-col gap-1">
                <div className="flex items-center justify-between px-3 py-1.5">
                    <LocaleLanguageSwitcher />
                    <ThemeToggle />
                </div>
                <Link
                    to="/profile"
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    {t("profile.title")}
                </Link>
                <Link
                    to="/settings"
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    {t("settings.title")}
                </Link>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left w-full"
                >
                    {t("auth.logout")}
                </button>
                <div className="flex items-center gap-2.5 px-3 py-2.5 mt-1 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <Avatar imageUrl={photoUrl ?? undefined} size="w-7 h-7" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                        {user?.username}
                    </span>
                </div>
            </div>
        </>
    );
}
