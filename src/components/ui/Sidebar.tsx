import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, StarIcon, BookOpen, Brain, Eye, Sparkles, Cross, LogoSkaldly } from "@/assets/icons";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";

const navItems = [
    { to: "/admin", label: "admin.nav.overview", icon: Sparkles, end: true },
    { to: "/admin/stats", label: "admin.nav.stats", icon: User },
    { to: "/admin/subscriptions", label: "admin.nav.subscriptions", icon: StarIcon },
    { to: "/admin/plans", label: "admin.nav.plans", icon: BookOpen },
    { to: "/admin/languages", label: "admin.nav.languages", icon: Brain },
    { to: "/admin/topics", label: "admin.nav.topics", icon: BookOpen },
    { to: "/admin/reviews", label: "admin.nav.reviews", icon: Eye },
];

interface SidebarProps {
    onClose?: () => void;
    photoUrl: string | null;
    handleLogout: () => void;
}

export function Sidebar({ onClose, photoUrl, handleLogout }: SidebarProps) {
    const { t } = useTranslation();
    const { user } = useAuth();

    return (
        <>
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                    <Link
                        to="/admin"
                        onClick={onClose}
                        className="flex items-center text-brand-600 dark:text-white hover:text-brand-500 transition-colors"
                    >
                        <LogoSkaldly className="h-8 w-auto shrink-0" />
                    </Link>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mt-0.5">
                        Admin
                    </p>
                </div>
                {onClose && (
                    <Button variant="none" onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors md:hidden">
                        <Cross className="w-5 h-5" />
                    </Button>
                )}
            </div>

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
