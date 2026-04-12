import { useTranslation } from "react-i18next";
import { TopicResponse } from "@/types/topic/topic";
import { ChevronRight } from "@/assets/icons";

interface TopicCardProperties {
    topic: TopicResponse;
    onClick: (topicId: string) => void;
}

export function TopicCard({ topic, onClick }: TopicCardProperties) {
    const { t } = useTranslation();

    const handleCardClick = () => {
        onClick(topic.id);
    }

    const getDifficultyColorClass = (difficulty: string): string => {
        const uppercaseDifficulty = difficulty.toUpperCase();
        
        if (uppercaseDifficulty === "A1" || uppercaseDifficulty === "A2") {
            return "bg-green-100 text-green-800 border-green-200";
        }
        
        if (uppercaseDifficulty === "B1" || uppercaseDifficulty === "B2") {
            return "bg-blue-100 text-blue-800 border-blue-200";
        }
        
        return "bg-purple-100 text-purple-800 border-purple-200";
    }

    return (
        <div 
            className="group relative flex flex-col justify-between p-6 bg-white dark:bg-gray-800 bg-opacity-70 backdrop-blur-lg border border-gray-200 dark:border-gray-700 border-opacity-50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={handleCardClick}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-white/50 dark:from-brand-900/20 dark:to-gray-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10 flex items-start justify-between mb-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getDifficultyColorClass(topic.difficulty)}`}>
                    {topic.difficulty}
                </span>
                
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1 items-center">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {t('topics.order', { orderIndex: topic.orderIndex })}
                    </span>
                </div>
            </div>

            <div className="relative z-10 flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">
                    {topic.name}
                </h3>

                {topic.description ? (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                        {topic.description}
                    </p>
                ) : (
                    <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                        {t('topics.no_desc')}
                    </p>
                )}
            </div>

            <div className="relative z-10 mt-6 flex items-center text-sm font-medium text-brand-600 dark:text-brand-400 group-hover:text-brand-700 dark:group-hover:text-brand-300">
                {t('topics.practice_btn')}
                <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
            </div>
        </div>
    );
}
