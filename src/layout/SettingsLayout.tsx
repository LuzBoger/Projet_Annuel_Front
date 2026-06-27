import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { profileService } from "@/services/profileService";
import { getProfileImageUrl } from "@/lib/utils/image";
import { RoleEnum } from "@/types/enum/roles";
import { Sidebar } from "@/components/ui/Sidebar";
import { Button } from "@/components/ui/Button";
import { LanguagesSettings } from "@/components/settings/languages/LanguagesSettings";
import { NotificationPreferences } from "@/components/settings/notifications/NotificationPreferences";
import { SideBar } from "@/components/settings/SideBar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PasswordSettings } from "@/pages/settings/PasswordSettings";
import { ProfileSettings } from "@/pages/settings/ProfileSettings";
import TwoFactorSettings from "@/pages/settings/TwoFactorSettings";
import { SettingsTab } from "@/types/components/menutItem";

export function SettingsLayout() {
    const { t } = useTranslation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const isAdmin = user?.role === RoleEnum.ADMIN;

    useEffect(() => {
        if (!isAdmin) return;
        profileService.getMyProfile()
            .then((profile) => {
                if (profile.photoUrl) setPhotoUrl(getProfileImageUrl(profile.photoUrl));
            })
            .catch(() => {});
    }, [isAdmin]);

    const handleLogout = async () => {
        await logout();
        navigate(isAdmin ? "/admin/login" : "/login");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
            {isAdmin && (
                <aside className="hidden md:flex w-56 shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex-col">
                    <Sidebar photoUrl={photoUrl} handleLogout={handleLogout} />
                </aside>
            )}

            {isAdmin && sidebarOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
                    <aside className="relative w-64 h-full bg-white dark:bg-gray-900 flex flex-col shadow-2xl">
                        <Sidebar
                            onClose={() => setSidebarOpen(false)}
                            photoUrl={photoUrl}
                            handleLogout={handleLogout}
                        />
                    </aside>
                </div>
            )}

            <div className="flex-1 min-w-0 flex flex-col">
                {isAdmin && (
                    <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
                        <Button
                            variant="none"
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Open menu"
                        >
                            <div className="flex flex-col gap-1.5 w-5">
                                <span className="block h-0.5 bg-current rounded" />
                                <span className="block h-0.5 bg-current rounded" />
                                <span className="block h-0.5 bg-current rounded" />
                            </div>
                        </Button>
                        <Link to="/admin" className="text-lg font-bold text-brand-600 dark:text-white">
                            Skaldly <span className="text-xs font-normal text-gray-400">Admin</span>
                        </Link>
                    </div>
                )}

                <div className="max-w-7xl mx-auto w-full px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                        {t('settings.title')}
                    </h1>

                    <div className="flex flex-col md:flex-row gap-8">
                        <SideBar activeTab={activeTab} onTabChange={setActiveTab} />

                        <main className="flex-1 min-w-0 bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 sm:p-6 md:p-8">
                            {activeTab === 'profile' && <ProfileSettings />}
                            {activeTab === 'password' && <PasswordSettings />}
                            {activeTab === '2fa' && <TwoFactorSettings />}
                            {activeTab === 'language' && <LanguagesSettings />}
                            {activeTab === 'theme' && <ThemeToggle />}
                            {activeTab === 'notifications' && <NotificationPreferences />}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}
