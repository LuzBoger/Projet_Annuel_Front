import { RankingType } from "@/types/ranking/ranking";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";

interface RankingTabsProps {
    selectedTab: RankingType;
    onChangeTab: (tab: RankingType) => void;
}

export function RankingTabs({selectedTab, onChangeTab}: RankingTabsProps) {
    const {t} = useTranslation();

    return (
        <div className="flex gap-2">
            {(['global', 'language'] as RankingType[]).map((tab) => (
                <Button
                    key={tab}
                    variant="none"
                    onClick={() => onChangeTab(tab)}
                    className={clsx('pb-3 px-4 text-sm font-medium border-b-2 transition-colors',
                        selectedTab === tab ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
                    )}
                >
                    {t(`ranking.tab.${tab}`)}
                </Button>
            ))}
        </div>
    );

}