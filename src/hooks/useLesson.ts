import { useState, useCallback } from 'react';
import { lessonService } from '@/services/lessonService';
import type { LessonResponse, LessonRequest } from '@/types/lesson/lesson';
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
            const errorMessage = t('error.fetchLessons', 'Impossible de récupérer les leçons.');
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
            addToast({ type: 'success', message: t('admin.lessons.create_success', 'Leçon créée avec succès.') });
            return newLesson;
        } catch (err: unknown) {
            console.error('Error creating lesson:', err);
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.createLesson', 'Impossible de créer la leçon.');
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
            addToast({ type: 'success', message: t('admin.lessons.update_success', 'Leçon mise à jour avec succès.') });
            return updatedLesson;
        } catch (err: unknown) {
            console.error('Error updating lesson:', err);
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.updateLesson', 'Impossible de mettre à jour la leçon.');
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
            addToast({ type: 'success', message: t('admin.lessons.delete_success', 'Leçon supprimée avec succès.') });
        } catch (err: unknown) {
            console.error('Error deleting lesson:', err);
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.deleteLesson', 'Impossible de supprimer la leçon.');
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
        } catch (err: any) {
            setError(err.message || "Failed to fetch lesson");
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        lessons,
        loading,
        error,
        fetchLessonsByTopic,
        fetchLessonById,
        createLesson,
        updateLesson,
        deleteLesson
    };
}
