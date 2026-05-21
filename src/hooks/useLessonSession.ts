import { useState, useCallback } from 'react';
import { lessonSessionService } from '@/services/lessonSessionService';
import type { LessonSessionResponse } from '@/types/lessonSession/lessonSession';
import { useToast } from '@/hooks/useToast';
import { useTranslation } from 'react-i18next';

export function useLessonSession() {
    const { addToast } = useToast();
    const { t } = useTranslation();
    const [lessonSessions, setLessonSessions] = useState<LessonSessionResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAllUserLessonSessions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await lessonSessionService.getAllUserLessonSessions();
            setLessonSessions(data);
        } catch  {
            const errorMessage = t('error.fetchLessonSessions');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    return {lessonSessions,loading,error,fetchAllUserLessonSessions};
}
