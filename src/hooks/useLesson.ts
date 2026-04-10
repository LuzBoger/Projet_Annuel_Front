import { useState, useCallback } from 'react';
import { lessonService } from '@/services/lessonService';
import type { LessonResponse, LessonRequest, CompleteLessonRequest } from '@/types/lesson/lesson';
import { useToast } from '@/hooks/useToast';
import { useTranslation } from 'react-i18next';

export function useLesson() {
    const { addToast } = useToast();
    const { t } = useTranslation();
    const [lessons, setLessons] = useState<LessonResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLessonsByTopic = useCallback(async (topicId: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await lessonService.getLessonsByTopic(topicId);
            setLessons(data);
        } catch (err: unknown) {
            console.error('Error fetching lessons:', err);
            const errorMessage = t('error.fetchLessons');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const createLesson = useCallback(async (lessonData: LessonRequest) => {
        try {
            setLoading(true);
            setError(null);
            const newLesson = await lessonService.createLesson(lessonData);
            setLessons(prev => [...prev, newLesson]);
            addToast({ type: 'success', message: t('admin.lessons.create_success') });
            return newLesson;
        } catch (err: unknown) {
            console.error('Error creating lesson:', err);
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.createLesson');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const updateLesson = useCallback(async (id: string, lessonData: LessonRequest) => {
        try {
            setLoading(true);
            setError(null);
            const updatedLesson = await lessonService.updateLesson(id, lessonData);
            setLessons(prev => prev.map(l => l.id === id ? updatedLesson : l));
            addToast({ type: 'success', message: t('admin.lessons.update_success') });
            return updatedLesson;
        } catch (err: unknown) {
            console.error('Error updating lesson:', err);
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.updateLesson');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const deleteLesson = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            await lessonService.deleteLesson(id);
            setLessons(prev => prev.filter(l => l.id !== id));
            addToast({ type: 'success', message: t('admin.lessons.delete_success') });
        } catch (err: unknown) {
            console.error('Error deleting lesson:', err);
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.deleteLesson');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const fetchLessonById = useCallback(async (id: string) => {
        setLoading(true);
        try {
            const data = await lessonService.getLessonById(id);
            return data;
        } catch {
            setError(t('error.fetchLessonById'));
            return null;
        } finally {
            setLoading(false);
        }
    }, [t]);

    const startLesson = useCallback(async (lessonId: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await lessonService.startLesson(lessonId);
            return data;
        } catch (err: unknown) {
            console.error('Error starting lesson:', err);
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.startLesson');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const completeLesson = useCallback(async (lessonId: string, data: CompleteLessonRequest) => {
        try {
            setLoading(true);
            setError(null);
            const responseData = await lessonService.completeLesson(lessonId, data);
            return responseData;
        } catch (err: unknown) {
            console.error('Error completing lesson:', err);
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.completeLesson');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    return {
        lessons,
        loading,
        error,
        fetchLessonsByTopic,
        fetchLessonById,
        createLesson,
        updateLesson,
        deleteLesson,
        startLesson,
        completeLesson
    };
}
