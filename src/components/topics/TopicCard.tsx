import { useTranslation } from "react-i18next";
import { TopicResponse } from "@/types/topic/topic";
import { ChevronRight } from "@/assets/icons";

interface TopicCardProperties {
    topic: TopicResponse;
    onClick: (topicId: string) => void;
}


export function TopicCard({ topic, onClick }: TopicCardProperties) {
    const { t } = useTranslation();

    return (
        <div
            className="group relative flex flex-col justify-between p-6 bg-white bg-opacity-70 backdrop-blur-lg border border-gray-200 border-opacity-50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => onClick(topic.id)}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10 flex items-start justify-between mb-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border}`}>
                    {topic.difficulty}
                </span>

                <div className="flex bg-gray-100 rounded-full px-2 py-1 items-center">
                    <span className="text-xs font-medium text-gray-500">
                        {t('topics.order', { orderIndex: topic.orderIndex })}
                    </span>
                </div>
            </div>

            <div className="relative z-10 flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                    {topic.name}
                </h3>

                {topic.description ? (
                    <p className="text-sm text-gray-600 line-clamp-3">
                        {topic.description}
                    </p>
                ) : (
                    <p className="text-sm text-gray-400 italic">
                        {t('topics.no_desc')}
                    </p>
                )}
            </div>

            <div className="relative z-10 mt-6 flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                {t('topics.practice_btn')}
                <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
            </div>
        </div>
    );
}
