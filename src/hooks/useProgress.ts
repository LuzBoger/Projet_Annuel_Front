import { LanguageLevelResponse, LastLessonResponse, ProgressOverviewResponse } from "@/types/progress/progress";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";
import { useTranslation } from "react-i18next";
import { userProgressService } from "@/services/userProgressService";

export function useProgress() {
    const [overview, setOverview] = useState<ProgressOverviewResponse | null>(null);
    const [languageLevels, setLanguageLevels] = useState<LanguageLevelResponse[]>([]);
    const [lastLesson, setLastLesson] = useState<LastLessonResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToast } = useToast();
    const { t } = useTranslation();


    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [overviewData, lastLessonData] = await Promise.all([
                userProgressService.getProgress(),
                userProgressService.getLastLesson()
            ]);
            setOverview(overviewData);
            setLanguageLevels(overviewData.progressByLanguage ?? []);
            setLastLesson(lastLessonData);
        } catch  {
            setError(t('progress.fetchError'));
            addToast({ type: 'error', message: t('progress.fetchError') });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    return {
        overview,
        languageLevels,
        lastLesson,
        loading,
        error,
        fetchData
    };


}