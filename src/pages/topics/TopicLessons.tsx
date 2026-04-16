import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { lessonService } from "@/services/lessonService";
import { TopicLessonsResponse } from "@/types/lesson/lesson";
import { ChevronLeft, ChevronRight, IconQcm, IconFlashcard } from "@/assets/icons";
import { LessonCard } from "@/components/topics/LessonCard";
import { TopicProgressBar } from "@/components/topics/TopicProgressBar";
import { FinalExamCard } from "@/components/topics/FinalExamCard";
import { Button } from "@/components/ui/Button";
import { MetaData } from "@/components/seo/MetaData";

export default function TopicLessons() {
    const { topicId } = useParams<{ topicId: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [details, setDetails] = useState<TopicLessonsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (topicId) {
            const fetchDetails = async () => {
                try {
                    setLoading(true);
                    const data = await lessonService.getTopicLessonsDetails(topicId);
                    setDetails(data);
                } catch {
                    setError(t('error.fetchLessons'));
                } finally {
                    setLoading(false);
                }
            };
            fetchDetails();
        }
    }, [topicId, t]);

    const lessons = details?.lessons || [];

    return (
        <>
        <MetaData title={t('topics.lessons_page_title')}  robots="noindex, nofollow"  /> 
        <div className="min-h-screen pb-32 pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <Button 
                onClick={() => navigate(-1)} 
                variant="ghost"
                size="sm"
                className="mb-8 font-bold flex items-center text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
                <ChevronLeft className="w-5 h-5 mr-1" />
                {t('common.back')}
            </Button>

            <div className="mb-12 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-900 to-brand-600 dark:from-white dark:to-gray-400 tracking-tight">
                    {t('topics.lessons_title')}
                </h1>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                    {t('topics.lessons_desc')}
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-24">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
                </div>
            ) : error ? (
                <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-800 text-center">
                    <p className="text-red-800 dark:text-red-300 font-medium">{error}</p>
                </div>
            ) : details ? (
                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-900/50 dark:backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-sm border border-brand-100 dark:border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 dark:bg-brand-500/5 rounded-bl-full opacity-50 pointer-events-none"></div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 w-full">
                            <div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 pb-4 md:pb-0 md:pr-6">
                                <p className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{t('topics.exam_status')}</p>
                                <div className="flex items-center">
                                    {details.examPassed ? (
                                        <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-extrabold text-xl">
                                            <svg className="w-5 h-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                            {t('topics.passed')}
                                        </span>
                                    ) : (
                                        <span className="text-brand-400 dark:text-gray-500 font-medium text-lg flex items-center">
                                            <IconFlashcard className="w-4 h-4 mr-1.5 opacity-70" />
                                            {t('topics.not_passed')}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 pb-4 md:pb-0 md:pr-6 md:pl-6 pl-0">
                                <p className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{t('topics.exam_attempts')}</p>
                                <p className="text-3xl font-extrabold text-brand-900 dark:text-white tracking-tighter">{details.examAttempts}</p>
                            </div>

                            <div className="flex flex-col pt-2 md:pt-0 md:pl-6 pl-0">
                                <p className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{t('topics.last_accuracy')}</p>
                                <div className="flex items-baseline space-x-2">
                                    <span className={`text-3xl font-extrabold tracking-tighter ${
                                        details.lastAccuracy && details.lastAccuracy >= 0.8 ? 'text-emerald-500' : 
                                        details.lastAccuracy && details.lastAccuracy >= 0.5 ? 'text-amber-500' : 
                                        details.lastAccuracy ? 'text-red-500' : 'text-gray-400'
                                    }`}>
                                        {details.lastAccuracy !== null && details.lastAccuracy !== undefined ? `${Math.round(details.lastAccuracy * 100)}%` : '--'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {lessons.length > 0 ? (
                        <>
                            {/* Progress Bar */}
                            <TopicProgressBar 
                                finishedCount={lessons.filter((l) => l.isAlreadyFinish).length} 
                                totalCount={lessons.length} 
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative items-stretch">
                                {lessons.map((lesson, index: number) => {
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
                                            {!isLastInRowLg && (
                                                <div className="hidden lg:flex absolute top-1/2 left-full transform -translate-y-1/2 ml-4 -translate-x-1/2 w-6 h-6 items-center justify-center z-0 pointer-events-none text-gray-300">
                                                    <ChevronRight className="w-6 h-6 opacity-60 stroke-[3px]" />
                                                </div>
                                            )}
                                            
                                            {/* Flèche connectrice de droite - Tablette 2 colonnes */}
                                            {!isLastInRowMd && (
                                                <div className="hidden md:flex lg:hidden absolute top-1/2 left-full transform -translate-y-1/2 ml-4 -translate-x-1/2 w-6 h-6 items-center justify-center z-0 pointer-events-none text-gray-300">
                                                    <ChevronRight className="w-6 h-6 opacity-60 stroke-[3px]" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                <FinalExamCard 
                                    isUnlocked={lessons.every((l) => l.isAlreadyFinish)} 
                                    onTakeExam={() => navigate(`/topics/${topicId}/exam`)} 
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-900 bg-opacity-70 rounded-3xl border border-gray-200 dark:border-gray-800 border-dashed shadow-sm">
                            <IconQcm className="w-12 h-12 text-gray-300 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('topics.no_lessons_title')}</h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">{t('topics.no_lessons_desc')}</p>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
        </>
    );
}
