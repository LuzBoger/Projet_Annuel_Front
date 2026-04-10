import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { StarIcon } from "@/assets/icons";
import { CompleteLessonResponse, LessonResponse } from "@/types/lesson/lesson";

export default function LessonSuccess() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state as { response?: CompleteLessonResponse, lesson?: LessonResponse } | null;

    if (!state || !state.response || !state.lesson) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <p className="text-gray-500 mb-4 font-medium">{t('lessons.session_invalid')}</p>
                <Button onClick={() => navigate('/dashboard')} variant="primary" size="lg">
                    {t('common.home')}
                </Button>
            </div>
        );
    }

    const { response, lesson } = state;

    return (
        <div className="min-h-screen bg-indigo-50/50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl shadow-indigo-100/50 p-8 sm:p-10 text-center animate-[fade-in-up_0.5s_ease-out]">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-yellow-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-yellow-50">
                    <StarIcon className="w-12 h-12" />
                </div>

                <h2 className="text-3xl sm:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-indigo-800 tracking-tight mb-2">
                    {t('lessons.lesson_completed')}
                </h2>
                <p className="text-gray-500 font-medium mb-8 bg-gray-50 py-2 px-4 rounded-xl inline-block border border-gray-100">
                    {lesson.title}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-30 transform rotate-45 translate-x-6 -translate-y-6"></div>
                        <p className="text-indigo-800 text-[10px] font-large uppercase tracking-widest mb-1">{t('lessons.xp_earned')}</p>
                        <p className="text-3xl font-medium text-indigo-600">+{response.xpEarned}</p>
                    </div>

                    <div className={`rounded-2xl p-5 border relative overflow-hidden ${response.success ? 'bg-emerald-50 border-emerald-100/50' : 'bg-red-50 border-red-100/50'}`}>
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-30 transform rotate-45 translate-x-6 -translate-y-6"></div>
                        <p className={`text-[10px] font-medium uppercase tracking-widest mb-1 ${response.success ? 'text-emerald-800' : 'text-red-800'}`}>{t('lessons.status')}</p>
                        <p className={`text-2xl font-medium ${response.success ? 'text-emerald-600' : 'text-red-500'}`}>{response.success ? t('lessons.success') : t('lessons.failed')}</p>
                    </div>
                </div>

                {response.leveledUp && (
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold p-4 rounded-2xl mb-8 shadow-lg animate-bounce">
                        🎉 {t('lessons.level_up', { level: response.newLevel })}
                    </div>
                )}

                <Button
                    onClick={() => navigate(`/topics/${lesson.topicId}`)}
                    className="w-full text-lg shadow-sm py-4 rounded-2xl"
                    size="lg"
                >
                    {t('common.continue')}
                </Button>
            </div>
        </div>
    );
}
