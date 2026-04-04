import { Globe, Lock, Shield, User } from "lucide-react";
import { MenuItem, SettingsTab } from "@/types/components/menutItem";
import { useTranslation } from "react-i18next";

interface SideBarProps {
    activeTab: SettingsTab;
    onTabChange: (tab: SettingsTab) => void;
}

export function SideBar({ activeTab, onTabChange }: SideBarProps) {
    const {t} = useTranslation();

    const menuItems: MenuItem[] = [
        { id: 'profile', label: t('settings.menu.profile'), icon: <User /> },
        { id: 'password', label: t('settings.menu.password'), icon: <Lock /> },
        { id: '2fa', label: t('settings.menu.2fa'), icon: <Shield /> },
        { id: 'language', label: t('settings.menu.language'), icon: <Globe /> },
    ];

    return (
    <aside className="w-64 flex-shrink-0">
      <nav className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === item.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}