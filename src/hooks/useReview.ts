import { useState, useCallback } from 'react';
import { reviewService } from '@/services/reviewService';
import type { TopicReviewRequest, TopicReviewResponse } from '@/types/review/review';
import { useToast } from '@/hooks/useToast';
import { useTranslation } from 'react-i18next';

export function useReview() {
    const { addToast } = useToast();
    const { t } = useTranslation();
    const [reviews, setReviews] = useState<TopicReviewResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTopicReviews = useCallback(async (topicId: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await reviewService.getTopicReviews(topicId);
            setReviews(data.reviews);
        } catch (err: unknown) {
            console.error('Error fetching topic reviews:', err);
            const errorMessage = t('error.fetchReviews');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const fetchAllReviews = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await reviewService.getAllReviews();
            setReviews(data);
        } catch (err: unknown) {
            console.error('Error fetching all reviews:', err);
            const errorMessage = t('error.fetchReviews');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const fetchPendingReviews = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await reviewService.getPendingReviews();
            setReviews(data);
        } catch (err: unknown) {
            console.error('Error fetching pending reviews:', err);
            const errorMessage = t('error.fetchReviews');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const addReview = useCallback(async (topicId: string, review: TopicReviewRequest) => {
        try {
            setLoading(true);
            setError(null);
            const newReview = await reviewService.addReview(topicId, review);
            setReviews(prev => [...prev, newReview]);
            addToast({ type: 'success', message: t('review.add_success') });
            return newReview;
        } catch (err: unknown) {
            console.error('Error adding review:', err);
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.addReview');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const updateReview = useCallback(async (reviewId: string, review: TopicReviewRequest) => {
        try {
            setLoading(true);
            setError(null);
            const updatedReview = await reviewService.updateReview(reviewId, review);
            setReviews(prev => prev.map(r => r.id === reviewId ? updatedReview : r));
            addToast({ type: 'success', message: t('review.update_success') });
            return updatedReview;
        } catch (err: unknown) {
            console.error('Error updating review:', err);
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.updateReview');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const deleteReview = useCallback(async (reviewId: string) => {
        try {
            setLoading(true);
            setError(null);
            await reviewService.deleteReview(reviewId);
            setReviews(prev => prev.filter(r => r.id !== reviewId));
            addToast({ type: 'success', message: t('review.delete_success') });
        } catch (err: unknown) {
            console.error('Error deleting review:', err);
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.deleteReview');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const approveReview = useCallback(async (reviewId: string) => {
        try {
            setLoading(true);
            setError(null);
            const approved = await reviewService.approveReview(reviewId);
            setReviews(prev => prev.map(r => r.id === reviewId ? approved : r));
            addToast({ type: 'success', message: t('review.approve_success') });
            return approved;
        } catch (err: unknown) {
            console.error('Error approving review:', err);
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.approveReview');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const fetchUserReview = useCallback(async (topicId: string) => {
        try {
            setLoading(true);
            setError(null);
            return await reviewService.getUserReview(topicId);
        } catch (err: unknown) {
            console.error('Error fetching user review:', err);
            setError(t('error.fetchReviews'));
            return null;
        } finally {
            setLoading(false);
        }
    }, [t]);

    const rejectReview = useCallback(async (reviewId: string) => {
        try {
            setLoading(true);
            setError(null);
            await reviewService.rejectReview(reviewId);
            setReviews(prev => prev.filter(r => r.id !== reviewId));
            addToast({ type: 'success', message: t('review.reject_success') });
        } catch (err: unknown) {
            console.error('Error rejecting review:', err);
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('error.rejectReview');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    return {
        fetchUserReview,
        reviews,
        loading,
        error,
        fetchTopicReviews,
        fetchAllReviews,
        fetchPendingReviews,
        addReview,
        updateReview,
        deleteReview,
        approveReview,
        rejectReview,
    };
}
