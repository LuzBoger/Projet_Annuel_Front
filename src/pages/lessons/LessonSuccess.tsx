import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CompleteLessonResponse, LessonResponse } from "@/types/lesson/lesson";

export default function LessonSuccess() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Le "state" est passé par navigate() dans LessonPlayer.tsx
    const state = location.state as { response?: CompleteLessonResponse, lesson?: LessonResponse } | null;
    
    if (!state || !state.response || !state.lesson) {
        // Fallback de sécurité si l'utilisateur rafraîchit la page de succès sans le Context Router
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <p className="text-gray-500 mb-4 font-medium">{t('lessons.session_invalid', 'Session introuvable ou expirée.')}</p>
                <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl">
                    {t('common.home', 'Retour à l\'accueil')}
                </button>
            </div>
        );
    }
    
    const { response, lesson } = state;

    return (
        <div className="min-h-screen bg-indigo-50/50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl shadow-indigo-100/50 p-8 sm:p-10 text-center animate-[fade-in-up_0.5s_ease-out]">
                {/* Icône de victoire animée */}
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-yellow-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-yellow-50">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div>
                
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
                    {t('lessons.lesson_completed', 'Leçon terminée !')}
                </h2>
                <p className="text-gray-500 font-medium mb-8 bg-gray-50 py-2 px-4 rounded-xl inline-block border border-gray-100">
                    {lesson.title}
                </p>

                {/* Badges de score */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-30 transform rotate-45 translate-x-6 -translate-y-6"></div>
                        <p className="text-indigo-800 text-[10px] font-bold uppercase tracking-widest mb-1">{t('lessons.xp_earned', 'XP Gagné')}</p>
                        <p className="text-3xl font-extrabold text-indigo-600">+{response.xpEarned}</p>
                    </div>
                    
                    <div className={`rounded-2xl p-5 border relative overflow-hidden ${response.success ? 'bg-emerald-50 border-emerald-100/50' : 'bg-red-50 border-red-100/50'}`}>
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-30 transform rotate-45 translate-x-6 -translate-y-6"></div>
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${response.success ? 'text-emerald-800' : 'text-red-800'}`}>{t('lessons.status', 'Résultat')}</p>
                        <p className={`text-2xl font-extrabold ${response.success ? 'text-emerald-600' : 'text-red-500'}`}>{response.success ? t('lessons.success', 'Validée') : t('lessons.failed', 'Échouée')}</p>
                    </div>
                </div>

                {/* Bannière de passage de niveau */}
                {response.leveledUp && (
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold p-4 rounded-2xl mb-8 shadow-lg animate-bounce">
                        🎉 {t('lessons.level_up', 'Niveau Supérieur ! Level {{level}}', { level: response.newLevel })}
                    </div>
                )}

                <button 
                    onClick={() => navigate(`/topics/${lesson.topicId}`)}
                    className="w-full py-4 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-colors font-medium text-lg shadow-sm"
                >
                    {t('common.continue', 'Continuer l\'apprentissage')}
                </button>
            </div>
        </div>
    );
}
