import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLesson } from "@/hooks/useLesson";
import { LessonMistake, LessonResponse, LessonType } from "@/types/lesson/lesson";
import { ChevronLeft } from "@/assets/icons";
import { Button } from "@/components/ui/Button";
import { FlashcardPlayer } from "@/components/lessons/players/FlashcardPlayer";
import { QCMPlayer } from "@/components/lessons/players/QCMPlayer";
import { MatchingPlayer } from "@/components/lessons/players/MatchingPlayer";
import { SortingPlayer } from "@/components/lessons/players/SortingPlayer";
import { MetaData } from "@/components/seo/MetaData";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export default function LessonPlayer() {
    const { lessonId } = useParams<{ lessonId: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { fetchLessonById, startLesson, completeLesson } = useLesson();
    const { playSuccess } = useSoundEffects();

    const [lesson, setLesson] = useState<LessonResponse | null>(null);
    const [isStarting, setIsStarting] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const startTimeRef = useRef<number | null>(null);
    const [isCompleting, setIsCompleting] = useState(false);

    useEffect(() => {
        let mounted = true;

        async function initializeLesson() {
            if (!lessonId) return;

            try {
                const data = await fetchLessonById(lessonId);
                if (!data) {
                    if (mounted) setErrorMsg(t('lessons.not_found'));
                    return;
                }

                if (mounted) setLesson(data);
                await startLesson(lessonId);

                if (mounted) {
                    setIsStarting(false);
                    startTimeRef.current = Date.now();
                }

            } catch {
                if (mounted) setErrorMsg(t('lessons.start_error'));
            }
        }

        initializeLesson();

        return () => { mounted = false; };
    }, [lessonId, fetchLessonById, startLesson, t]);

    const handleLessonComplete = useCallback(async (score: number, correctAnswers: number, totalAnswers: number, mistakes: LessonMistake[]) => {
        if (!lessonId || isCompleting) return;

        try {
            setIsCompleting(true);
            const timeSpentSeconds = startTimeRef.current ? Math.floor((Date.now() - startTimeRef.current) / 1000) : 0;

            const response = await completeLesson(lessonId, {
                score,
                timeSpentSeconds,
                correctAnswers,
                totalAnswers,
                mistakeFlashCardIds: lesson?.lessonType === LessonType.FLASHCARD ? mistakes.map(mistake => mistake.id) : undefined,
                mistakeQcmList: lesson?.lessonType === LessonType.QCM ? mistakes : undefined,
                mistakeMatchingList: lesson?.lessonType === LessonType.MATCHING_PAIR ? mistakes : undefined,
                mistakeSortingList: lesson?.lessonType === LessonType.SORTING_EXERCISE ? mistakes : undefined,
            });

            playSuccess();

            navigate(`/lessons/${lessonId}/success`, { state: { response, lesson }, replace: true });

        } catch {
            setErrorMsg(t('lessons.complete_error'));
            setIsCompleting(false);
        }
    }, [lessonId, completeLesson, isCompleting, navigate, t, lesson, playSuccess]);

    if (errorMsg) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl p-6 text-center shadow-lg border border-red-100 dark:border-red-900/50">
                    <p className="text-red-700 font-medium mb-5">{errorMsg}</p>
                    <Button onClick={() => navigate(-1)} variant="secondary" className="w-full">
                        {t('common.back')}
                    </Button>
                </div>
            </div>
        );
    }

    if (isStarting || !lesson) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mb-6"></div>
                <p className="text-brand-600 font-medium animate-pulse">{t('lessons.starting')}</p>
            </div>
        );
    }

    return (
        <>
            <MetaData title={lesson.title} robots="noindex, nofollow" />
            <div className="h-screen overflow-hidden bg-gray-100 dark:bg-gray-950 flex flex-col">
                <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
                    <Button
                        onClick={() => navigate(-1)}
                        variant="ghost"
                        className="flex items-center text-gray-500 hover:text-red-600 font-medium"
                        title={t('common.quit')}
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        <span className="hidden sm:inline">{t('common.quit')}</span>
                    </Button>
                    <div className="flex-1 text-center font-bold text-gray-900 dark:text-white truncate px-4">
                        {lesson.title}
                    </div>
                    <div className="w-16 sm:w-32 flex justify-end">
                        {isCompleting && <span className="text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded-md font-bold">Saving...</span>}
                    </div>
                </header>

                <main className="flex-1 w-full h-screen overflow-hidden flex flex-col">
                    <div className="w-full flex-1 flex flex-col min-h-0">
                        {lesson.lessonType === LessonType.FLASHCARD && (
                            <FlashcardPlayer lessonId={lesson.id} flashcards={lesson.flashcards || []} onFinish={handleLessonComplete} />
                        )}
                        {lesson.lessonType === LessonType.QCM && (
                            <QCMPlayer lessonId={lesson.id} questions={lesson.questions || []} onFinish={handleLessonComplete} />
                        )}
                        {lesson.lessonType === LessonType.MATCHING_PAIR && (
                            <MatchingPlayer lessonId={lesson.id} pairs={lesson.matchingPairs || []} onFinish={handleLessonComplete} />
                        )}
                        {lesson.lessonType === LessonType.SORTING_EXERCISE && (
                            <SortingPlayer lessonId={lesson.id} exercises={lesson.sortingExercise || []} onFinish={handleLessonComplete} />
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
