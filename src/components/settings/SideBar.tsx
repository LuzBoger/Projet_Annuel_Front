import { Bell, Globe, Lock, Shield, User } from "lucide-react";
import { MenuItem, SettingsTab } from "@/types/components/menutItem";
import { useTranslation } from "react-i18next";
import { NotificationToggle } from "@/components/ui/NotificationToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import clsx from "clsx";

interface SideBarProps {
    activeTab: SettingsTab;
    onTabChange: (tab: SettingsTab) => void;
}

export function SideBar({ activeTab, onTabChange }: SideBarProps) {
    const {t} = useTranslation();

    const menuItems: MenuItem[] = [
        { id: 'profile', label: t('settings.menu.profile'), icon: <User className="w-5 h-5" /> },
        { id: 'password', label: t('settings.menu.password'), icon: <Lock className="w-5 h-5" /> },
        { id: '2fa', label: t('settings.menu.2fa'), icon: <Shield className="w-5 h-5" /> },
        { id: 'language', label: t('settings.menu.language'), icon: <Globe className="w-5 h-5" /> },
        { id: 'notifications', label: t('settings.menu.notifications'), icon: <Bell className="w-5 h-5" /> },

    ];

    return (
    <aside className="w-full md:w-72 flex-shrink-0 flex flex-col gap-2">
      <nav className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 group border-b border-gray-100 dark:border-gray-800/50 last:border-0",
                activeTab === item.id 
                    ? "bg-gray-100 dark:bg-gray-800 text-brand-600 dark:text-brand-400" 
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200",
                "first:rounded-t-xl last:rounded-b-xl"
            )}
          >
            <span className={clsx(
                "transition-colors",
                activeTab === item.id ? "text-brand-600 dark:text-brand-400" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
            )}>
                {item.icon}
            </span>
            <span className="font-semibold text-sm whitespace-nowrap">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 flex items-center justify-between border border-gray-200 dark:border-gray-800 shadow-sm">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('settings.menu.theme')}</span>
        <ThemeToggle />
      </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 flex items-center justify-between">
        <NotificationToggle />

      </div>
    </aside>
  );
}
