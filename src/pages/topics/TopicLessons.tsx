import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLesson } from "@/hooks/useLesson";
import { LessonResponse } from "@/types/lesson/lesson";
import { ChevronLeft, ChevronRight, IconQcm } from "@/assets/icons";
import { LessonCard } from "@/components/topics/LessonCard";

export default function TopicLessons() {
    const { topicId } = useParams<{ topicId: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { lessons, loading, error, fetchLessonsByTopic } = useLesson();

    useEffect(() => {
        if (topicId) {
            fetchLessonsByTopic(topicId);
        }
    }, [topicId, fetchLessonsByTopic]);

    return (
        <div className="min-h-screen pb-32 pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 mb-8 transition-colors"
            >
                <ChevronLeft className="w-5 h-5 mr-1" />
                {t('common.back', 'Back')}
            </button>

            <div className="mb-12 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-indigo-600 tracking-tight">
                    {t('topics.lessons_title', 'Lessons Playground')}
                </h1>
                <p className="mt-3 text-lg text-gray-600 max-w-2xl">
                    {t('topics.lessons_desc', 'Explore the lessons below in chronological order to progress and master this topic.')}
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-24">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : error ? (
                <div className="mb-8 p-6 bg-red-50 rounded-2xl border border-red-100 text-center">
                    <p className="text-red-800 font-medium">{error}</p>
                </div>
            ) : lessons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative items-stretch">
                    {lessons.map((lesson: LessonResponse, index: number) => {
                        const isLastItem = index === lessons.length - 1;
                        const isLastInRowLg = (index + 1) % 3 === 0;
                        const isLastInRowMd = (index + 1) % 2 === 0;

                        return (
                            <div key={lesson.id} className="relative flex flex-col">
                                <LessonCard 
                                    lesson={lesson} 
                                    index={index + 1}
                                    onClick={() => navigate(`/lessons/${lesson.id}/play`)}
                                />
                                
                                {/* Flèche connectrice de droite - Desktop 3 colonnes */}
                                {!isLastItem && !isLastInRowLg && (
                                    <div className="hidden lg:flex absolute top-1/2 left-full transform -translate-y-1/2 ml-4 -translate-x-1/2 w-6 h-6 items-center justify-center z-0 pointer-events-none text-gray-300">
                                        <ChevronRight className="w-6 h-6 opacity-60 stroke-[3px]" />
                                    </div>
                                )}
                                
                                {/* Flèche connectrice de droite - Tablette 2 colonnes */}
                                {!isLastItem && !isLastInRowMd && (
                                    <div className="hidden md:flex lg:hidden absolute top-1/2 left-full transform -translate-y-1/2 ml-4 -translate-x-1/2 w-6 h-6 items-center justify-center z-0 pointer-events-none text-gray-300">
                                        <ChevronRight className="w-6 h-6 opacity-60 stroke-[3px]" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 bg-white bg-opacity-70 rounded-3xl border border-gray-200 border-dashed shadow-sm">
                    <IconQcm className="w-16 h-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900">{t('topics.no_lessons_title', 'No lessons found')}</h3>
                    <p className="mt-2 text-sm text-gray-500 max-w-sm text-center">{t('topics.no_lessons_desc', 'Check back later for new exercise challenges in this topic.')}</p>
                </div>
            )}
        </div>
    );
}
