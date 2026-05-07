import { LanguagesSettings } from "@/components/settings/languages/LanguagesSettings";
import { NotificationPreferences } from "@/components/settings/notifications/NotificationPreferences";
import { SideBar } from "@/components/settings/SideBar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { PasswordSettings } from "@/pages/settings/PasswordSettings";
import { ProfileSettings } from "@/pages/settings/ProfileSettings";
import TwoFactorSettings from "@/pages/settings/TwoFactorSettings";
import { SettingsTab } from "@/types/components/menutItem";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function SettingsLayout() {
    const {t} = useTranslation();
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
    
    
    return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          {t('settings.title')}
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <SideBar activeTab={activeTab} onTabChange={setActiveTab} />

          <main className="flex-1 bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 sm:p-6 md:p-8">
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
)
    
}
