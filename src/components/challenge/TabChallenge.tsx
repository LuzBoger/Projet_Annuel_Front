import { ChallengeTabs, Tab } from "@/types/components/challengeOption";
import { Button } from "@/components/ui/Button";

interface TabChallengeProps {
  tabs: ChallengeTabs[];
  activeTab: Tab;
  onChange: (key: Tab) => void;
}

export function TabChallenge({ tabs, activeTab, onChange }: TabChallengeProps) {
  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/60 dark:border-gray-700/40 p-1.5 flex gap-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <Button
            key={tab.key}
            variant="none"
            onClick={() => onChange(tab.key)}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
              ${isActive ? 'bg-brand-600 dark:bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.25)] dark:shadow-[0_0_20px_rgba(79,70,229,0.2)]'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100/70 dark:hover:bg-gray-700/50'
              }
            `}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`
                  inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-bold
                  ${isActive ? 'bg-white/25 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }
                `}
              >
                {tab.count}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
}
