import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/Button";
import { StarIcon } from "@/assets/icons";
import { CompleteLessonResponse, LessonResponse } from "@/types/lesson/lesson";
import { MetaData } from "@/components/seo/MetaData";
import { useEffect, useState } from "react";
import { SubmitReviewModal } from "@/components/reviews/SubmitReviewModal";
import { reviewService } from "@/services/reviewService";

/**
 * Component displayed upon successful completion of a lesson.
 * Triggers confetti animation and shows rewards (XP, level up).
 */
export default function LessonSuccess() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [isAlreadyReviewed,setIsAlreadyReviewed] = useState(false);

    const state = location.state as { response?: CompleteLessonResponse, lesson?: LessonResponse } | null;

    const allLessonCompleted = state?.response?.progress?.completionPercentage === 100;
    
    useEffect(() => {
        if(allLessonCompleted && state?.lesson?.topicId) {
            reviewService.getUserReview(state.lesson?.topicId).then((review) => {
                if(review) {
                    setIsAlreadyReviewed(true);
                }
            }).catch(() => {}); 
        }
    }, []);

    useEffect(() => {
        if (state?.response) {
            const duration = 1 * 1000;
            const end = Date.now() + duration;

            const frame = () => {
                // Only fire on some frames to reduce density (approx 30% of frames)
                if (Math.random() > 0.7) {
                    confetti({
                        particleCount: 1,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0, y: 0.6 },
                        colors: ['#6366f1', '#fbbf24', '#f59e0b', '#10b981']
                    });
                    confetti({
                        particleCount: 1,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1, y: 0.6 },
                        colors: ['#6366f1', '#fbbf24', '#f59e0b', '#10b981']
                    });
                }

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            
            frame();
        }
    }, [state]);

    if (!state || !state.response || !state.lesson) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4">
                <p className="text-gray-500 dark:text-gray-400 mb-4 font-medium">{t('lessons.session_invalid')}</p>
                <Button onClick={() => navigate('/dashboard')} variant="primary" size="lg">
                    {t('common.home')}
                </Button>
            </div>
        );
    }

    const { response, lesson } = state;

    const handleContinue = () => {
        if(allLessonCompleted && !isAlreadyReviewed) {
            setShowReviewModal(true);
        } else {
            navigate(`/topics/${lesson.topicId}`);
        }

    };

    const handleReviewClose = () => {
        setShowReviewModal(false);
        navigate(`/topics/${lesson.topicId}`);
    }
    return (
        <>
        <MetaData title={t('lessons.lesson_completed')} robots="noindex, nofollow"  />
        <div className="min-h-screen bg-brand-50/50 dark:bg-gray-950 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl shadow-brand-500/10 dark:shadow-none p-8 sm:p-10 text-center animate-fade-in-up">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-yellow-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-yellow-50 dark:ring-yellow-900/20 animate-medal-pop animate-medal-shine">
                    <StarIcon className="w-12 h-12" />
                </div>

                <h2 className="text-3xl sm:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-brand-900 to-brand-800 dark:bg-none dark:text-white tracking-tight mb-2">
                    {t('lessons.lesson_completed')}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium mb-8 bg-gray-50 dark:bg-gray-800 py-2 px-4 rounded-xl inline-block border border-gray-100 dark:border-gray-700">
                    {lesson.title}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-brand-50 dark:bg-brand-900/30 rounded-2xl p-5 border border-brand-100/50 dark:border-gray-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white dark:bg-brand-400 opacity-10 transform rotate-45 translate-x-6 -translate-y-6"></div>
                        <p className="text-brand-800 dark:text-white text-[10px] font-large uppercase tracking-widest mb-1">{t('lessons.xp_earned')}</p>
                        <p className="text-3xl font-medium text-brand-600 dark:text-white">+{response.xpEarned}</p>
                    </div>

                    <div className={`rounded-2xl p-5 border relative overflow-hidden ${response.success ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100/50 dark:border-gray-800' : 'bg-red-50 dark:bg-red-900/20 border-red-100/50 dark:border-gray-800'}`}>
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white dark:bg-white opacity-10 transform rotate-45 translate-x-6 -translate-y-6"></div>
                        <p className={`text-[10px] font-medium uppercase tracking-widest mb-1 ${response.success ? 'text-emerald-800 dark:text-emerald-300' : 'text-red-800 dark:text-red-300'}`}>{t('lessons.status')}</p>
                        <p className={`text-2xl font-medium ${response.success ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>{response.success ? t('lessons.success') : t('lessons.failed')}</p>
                    </div>
                </div>

                {response.leveledUp && (
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold p-4 rounded-2xl mb-8 shadow-lg animate-bounce">
                        🎉 {t('lessons.level_up', { level: response.newLevel })}
                    </div>
                )}

                  <Button onClick={handleContinue} className="w-full text-lg shadow-sm py-4 rounded-2xl" size="lg">
                        {allLessonCompleted && !isAlreadyReviewed ? t("reviews.rate_and_continue") : t("common.continue")}
                    </Button>
            </div>
        </div>
         <SubmitReviewModal
                isOpen={showReviewModal}
                topicId={lesson.topicId!}
                topicName={lesson.topicName ?? ""}
                onClose={handleReviewClose}
            />
        </>
    );
}
