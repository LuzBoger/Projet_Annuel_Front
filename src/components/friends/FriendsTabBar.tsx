import { Tab } from "@/types/friends/friends";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";

interface FriendsTabBarProps {
    activeTab: Tab;
    onChange: (tab: Tab) => void;
    friendsCount: number;
    pendingRequestsCount: number;
}

export function FriendsTabBar({ activeTab, onChange, friendsCount, pendingRequestsCount }: FriendsTabBarProps) {
    const {t} = useTranslation();

    const tabs: { key: Tab; label: string; count?: number }[] = [
        { key: 'friends',  label: t('friends.tabs.friends'),  count: friendsCount || undefined },
        { key: 'requests', label: t('friends.tabs.requests'), count: pendingRequestsCount || undefined },
        { key: 'search',   label: t('friends.tabs.search') },
    ];


    return (
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
            {tabs.map(tab => (
                <Button
                    key={tab.key}
                    variant="none"
                    onClick={() => onChange(tab.key)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.key ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                    {tab.label}
                    {tab.count !== undefined && (
                        <span className="ml-2 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 text-xs font-semibold px-2 py-0.5 rounded-full">
                            {tab.count}
                        </span>
                    )}
                </Button>
            ))}
        </div>
    );
}