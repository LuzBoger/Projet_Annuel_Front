import { ReviewTab, Tab } from "@/types/components/reviewsTabs";
import { Button } from "@/components/ui/Button";

interface ReviewTabsProps {
    tabs: ReviewTab[];
    activeTab: Tab;
    onChange: (tab: Tab) => void;
}

export function ReviewTabs({ tabs, activeTab, onChange }: ReviewTabsProps) {
    return (
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
            {tabs.map(({ key, label, count }) => (
                <Button key={key} onClick={() => onChange(key)}
                    variant="none"
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                        activeTab === key
                            ? "border-indigo-600 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}>
                    {label}
                    {count !== undefined && count > 0 && (
                        <span className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${
                            key === "PENDING" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"
                        }`}>{count}</span>
                    )}
                </Button>
            ))}
        </div>
    );
}