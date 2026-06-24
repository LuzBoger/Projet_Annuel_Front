import { MetaData } from "@/components/seo/MetaData";
import { ResumeLessonCard } from "@/components/ui/card/ResumeLessonCard";
import { StreakCard } from "@/components/ui/card/StreakCard";
import { XpCard } from "@/components/ui/card/XpCard";
import { LanguageLevel } from "@/components/user/dashboard/LanguageLevel";
import { Topics } from "@/components/user/dashboard/Topics";
import { Welcome } from "@/components/user/dashboard/Welcome";
import { DailyCheckBanner } from "@/components/mistake/DailyCheckBanner";
import { DailyCheckModal } from "@/components/mistake/DailyCheckModal";
import { EVENT_ACTIVE_LANGUAGE_CHANGED } from "@/constants/event";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import { globalEvents } from "@/lib/utils/eventEmitter";
import { profileService } from "@/services/profileService";
import { topicService } from "@/services/topicService";
import { userMistakesService } from "@/services/userMistakesService";
import { LanguageResponse } from "@/types/language/language";
import type { UserDailyQuestion } from "@/types/mistakes/userMistakes";
import { StreakResponse } from "@/types/profile/streak";
import { TopicWithProgressResponse } from "@/types/topic/topic";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
    const {user} = useAuth();
    const { t } = useTranslation();
    const { overview, languageLevels, lastLesson, loading, fetchData } = useProgress();

    const [activeLanguageId, setActiveLanguageId] = useState<string | null>(null);
    const [topics, setTopics] = useState<TopicWithProgressResponse[]>([]);
    const [streak, setStreak] = useState<StreakResponse | null>(null);
    const [dailyQuestion, setDailyQuestion] = useState<UserDailyQuestion | null>(null);
    const [showModal, setShowModal] = useState(false);
    const validLanguageLevels = languageLevels.filter(l => l.languageId && l.languageCode);

    const effectiveLanguageId = activeLanguageId ?? validLanguageLevels[0]?.languageId ?? null;

    useEffect(() => {
        userMistakesService.getDailyQuestion()
            .then((data) => {
                setDailyQuestion(data);
                if (data.hasQuestionToday) setShowModal(true);
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        fetchData();
        profileService.getMyProfile().then((profile) => {
            if (profile?.activeLanguage?.id) {
                setActiveLanguageId(profile.activeLanguage.id);
            }
        })
        .catch(() => {});
        profileService.getStreak().then(setStreak).catch(() => {});
    }, [fetchData]);

    useEffect(() => {
        if (!effectiveLanguageId) return;
        topicService.getTopicsByLanguage(effectiveLanguageId).then(setTopics);
    }, [effectiveLanguageId]);

    useEffect(() => {
    const handler = (...args: unknown[]) => {
        const lang = args[0] as LanguageResponse | null | undefined;
        if (lang?.id) {
            setActiveLanguageId(lang.id);
        }
    };
        globalEvents.on(EVENT_ACTIVE_LANGUAGE_CHANGED, handler);
        return () => globalEvents.off(EVENT_ACTIVE_LANGUAGE_CHANGED, handler);
    }, []);

    const handleLanguageSelect = async (languageId: string) => {
        setActiveLanguageId(languageId);
        try {
            const updated = await profileService.addActiveLanguage(languageId);
            globalEvents.emit(EVENT_ACTIVE_LANGUAGE_CHANGED, updated.activeLanguage);
            await fetchData();
        } catch (error) {
            console.error("Failed to change active language:", error);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-64 text-gray-400 dark:text-gray-500">{t("common.loading")}</div>;
    return (
        <>
            <MetaData title={t('dashboard.page_title')}  robots="noindex, nofollow"  /> 
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex gap-8">

                    <div className="flex-1 min-w-0">
                        <Welcome username={user?.username ?? ""} />
                        <DailyCheckBanner totalAvailableNow={dailyQuestion?.totalAvailableNow ?? 0} />
                        <Topics topics={topics} activeLanguageId={effectiveLanguageId} />
                    </div>

                    <div className="w-72 flex-shrink-0">
                        {validLanguageLevels.length > 0 && (
                            <LanguageLevel
                                languageLevels={validLanguageLevels}
                                activeLanguageId={effectiveLanguageId}
                                onSelect={handleLanguageSelect}
                            />
                        )}
                        {overview && <XpCard overview={overview} />}
                        {streak && <StreakCard streak={streak} />}
                        <ResumeLessonCard lesson={lastLesson} />
                    </div>

                </div>
            </div>
            {dailyQuestion?.hasQuestionToday && (
                <DailyCheckModal
                    isOpen={showModal}
                    dailyQuestion={dailyQuestion}
                    onClose={() => setShowModal(false)}
                    onComplete={() => {
                        setShowModal(false);
                        userMistakesService.getDailyQuestion()
                            .then(setDailyQuestion)
                            .catch(() => {});
                    }}
                />
            )}
        </>
    );
}

