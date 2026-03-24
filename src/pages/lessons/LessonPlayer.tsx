import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLesson } from "@/hooks/useLesson";
import { LessonResponse, LessonType } from "@/types/lesson/lesson";
import { ChevronLeft } from "@/assets/icons";
import { FlashcardPlayer } from "@/components/lessons/players/FlashcardPlayer";
import { QCMPlayer } from "@/components/lessons/players/QCMPlayer";
import { MatchingPlayer } from "@/components/lessons/players/MatchingPlayer";
import { SortingPlayer } from "@/components/lessons/players/SortingPlayer";

export default function LessonPlayer() {
    const { lessonId } = useParams<{ lessonId: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { fetchLessonById, startLesson, completeLesson } = useLesson();
    
    const [lesson, setLesson] = useState<LessonResponse | null>(null);
    const [isStarting, setIsStarting] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    
    // Timer interne pour valider la durée de la leçon (sans forcément l'afficher grossièrement)
    const startTimeRef = useRef<number | null>(null);
    const [isCompleting, setIsCompleting] = useState(false);

    useEffect(() => {
        let mounted = true;
        
        async function initializeLesson() {
            if (!lessonId) return;
            
            try {
                // 1. Récupération des données métiers de la leçon
                const data = await fetchLessonById(lessonId);
                if (!data) {
                    if (mounted) setErrorMsg(t('lessons.not_found', 'Leçon introuvable.'));
                    return;
                }
                
                if (mounted) setLesson(data);
                
                // 2. Notification au serveur du démarrage
                await startLesson(lessonId);
                
                if (mounted) {
                    setIsStarting(false);
                    startTimeRef.current = Date.now();
                }
                
            } catch {
                if (mounted) setErrorMsg(t('lessons.start_error', 'Erreur lors du démarrage de la leçon.'));
            }
        }
        
        initializeLesson();
        
        return () => { mounted = false; };
    }, [lessonId, fetchLessonById, startLesson, t]);
    
    // Callback appelé par les enfants (Flashcard/QCM...) une fois leurs questions finies.
    const handleLessonComplete = useCallback(async (score: number) => {
        if (!lessonId || isCompleting) return;
        
        try {
            setIsCompleting(true);
            const timeSpentSeconds = startTimeRef.current ? Math.floor((Date.now() - startTimeRef.current) / 1000) : 0;
            
            const response = await completeLesson(lessonId, {
                score,
                timeSpentSeconds
            });
            
            // On navigue vers la page de succès prévue à l'étape 4, en passant les résultats
            navigate(`/lessons/${lessonId}/success`, { state: { response, lesson } });
            
        } catch {
            setErrorMsg(t('lessons.complete_error', 'Erreur de connexion lors de la validation.'));
            setIsCompleting(false);
        }
    }, [lessonId, completeLesson, isCompleting, navigate, t, lesson]);

    if (errorMsg) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl p-6 text-center shadow-lg border border-red-100">
                    <p className="text-red-700 font-medium mb-5">{errorMsg}</p>
                    <button onClick={() => navigate(-1)} className="px-5 py-2.5 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition-colors font-medium">
                        {t('common.back', 'Retour')}
                    </button>
                </div>
            </div>
        );
    }
    
    if (isStarting || !lesson) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-6"></div>
                <p className="text-indigo-600 font-medium animate-pulse">{t('lessons.starting', 'Préparation de la leçon...')}</p>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Minimalist Topbar (hors du scope scrollable) */}
            <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center text-gray-500 hover:text-red-600 transition-colors p-2 -ml-2 rounded-lg hover:bg-gray-100 font-medium"
                    title={t('common.quit', 'Quitter')}
                >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    <span className="hidden sm:inline">{t('common.quit', 'Quitter l\'entraînement')}</span>
                </button>
                <div className="flex-1 text-center font-bold text-gray-900 truncate px-4">
                    {lesson.title}
                </div>
                {/* Espace tampon pour équiliber la barre */}
                <div className="w-16 sm:w-32 flex justify-end">
                    {isCompleting && <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md font-bold">Saving...</span>}
                </div>
            </header>
            
            {/* Zone de rendu de l'exercice - S'adaptera au type */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto w-full">
                <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 h-full flex flex-col items-center">
                    {lesson.lessonType === LessonType.FLASHCARD && (
                        <FlashcardPlayer flashcards={lesson.flashcards || []} onFinish={handleLessonComplete} />
                    )}
                    {lesson.lessonType === LessonType.QCM && (
                        <QCMPlayer questions={lesson.questions || []} onFinish={handleLessonComplete} />
                    )}
                    {lesson.lessonType === LessonType.MATCHING_PAIR && (
                        <MatchingPlayer pairs={lesson.matchingPairs || []} onFinish={handleLessonComplete} />
                    )}
                    {lesson.lessonType === LessonType.SORTING_EXERCISE && (
                        <SortingPlayer exercises={lesson.sortingExercise || []} onFinish={handleLessonComplete} />
                    )}
                </div>
            </main>
        </div>
    );
}
