import { useState, useCallback } from 'react';
import { topicService } from '@/services/topicService';
import type { TopicResponse, CreateTopicRequest, UpdateTopicRequest } from '@/types/topic/topic';
import { useToast } from '@/hooks/useToast';
import { useTranslation } from 'react-i18next';

export function useTopic() {
    const { addToast } = useToast();
    const { t } = useTranslation();
    const [topics, setTopics] = useState<TopicResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAllTopics = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await topicService.getAllTopics();
            setTopics(data);
        } catch (err: unknown) {
            console.error('Error fetching topics:', err);
            const errorMessage = t('error.fetchTopics', 'Impossible de récupérer les topics.');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const searchTopics = useCallback(async (name?: string, difficulty?: string, isActive?: boolean) => {
        try {
            setLoading(true);
            setError(null);
            const data = await topicService.searchTopics(name, difficulty, isActive);
            setTopics(data);
        } catch (err: unknown) {
            console.error('Error searching topics:', err);
            const errorMessage = t('error.searchTopics', 'Impossible de rechercher les topics.');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const createTopic = useCallback(async (topicData: CreateTopicRequest) => {
        try {
            setLoading(true);
            setError(null);
            const newTopic = await topicService.createTopic(topicData);
            setTopics(prev => [...prev, newTopic]);
            addToast({ type: 'success', message: t('admin.topics.create_success', 'Topic créé avec succès.') });
            return newTopic;
        } catch (err: unknown) {
            console.error('Error creating topic:', err);
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.createTopic', 'Impossible de créer le topic.');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const updateTopic = useCallback(async (id: string, topicData: UpdateTopicRequest) => {
        try {
            setLoading(true);
            setError(null);
            const updatedTopic = await topicService.updateTopic(id, topicData);
            setTopics(prev => prev.map(t => t.id === id ? updatedTopic : t));
            addToast({ type: 'success', message: t('admin.topics.update_success', 'Topic mis à jour avec succès.') });
            return updatedTopic;
        } catch (err: unknown) {
            console.error('Error updating topic:', err);
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.updateTopic', 'Impossible de mettre à jour le topic.');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const deleteTopic = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            await topicService.deleteTopic(id);
            setTopics(prev => prev.filter(t => t.id !== id));
            addToast({ type: 'success', message: t('admin.topics.delete_success', 'Topic supprimé avec succès.') });
        } catch (err: unknown) {
            console.error('Error deleting topic:', err);
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.deleteTopic', 'Impossible de supprimer le topic.');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    return {
        topics,
        loading,
        error,
        fetchAllTopics,
        searchTopics,
        createTopic,
        updateTopic,
        deleteTopic
    };
}
