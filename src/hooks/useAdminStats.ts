import { useCallback, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { useTranslation } from "react-i18next";
import { adminStatsService } from "@/services/adminStatsService";
import {
    LearningMetricsResponse,
    UserDetailResponse,
    UserEngagementResponse,
    UserStatsListResponse,
} from "@/types/admin/stats/stats";

export function useAdminStats() {
    const { addToast } = useToast();
    const { t } = useTranslation();

    const [engagement, setEngagement] = useState<UserEngagementResponse | null>(null);
    const [learningMetrics, setLearningMetrics] = useState<LearningMetricsResponse | null>(null);
    const [userStatsList, setUserStatsList] = useState<UserStatsListResponse | null>(null);
    const [userDetail, setUserDetail] = useState<UserDetailResponse | null>(null);

    const [loadingEngagement, setLoadingEngagement] = useState(false);
    const [loadingMetrics, setLoadingMetrics] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const fetchEngagement = useCallback(async () => {
        setLoadingEngagement(true);
        setError(null);
        try {
            const data = await adminStatsService.getUserEngagement();
            setEngagement(data);
        } catch {
            setError(t('admin.stats.fetchEngagementError'));
            addToast({ type: 'error', message: t('admin.stats.fetchEngagementError') });
        } finally {
            setLoadingEngagement(false);
        }
    }, [addToast, t]);

    const fetchLearningMetrics = useCallback(async () => {
        setLoadingMetrics(true);
        setError(null);
        try {
            const data = await adminStatsService.getLearningMetrics();
            setLearningMetrics(data);
        } catch {
            setError(t('admin.stats.fetchMetricsError'));
            addToast({ type: 'error', message: t('admin.stats.fetchMetricsError') });
        } finally {
            setLoadingMetrics(false);
        }
    }, [addToast, t]);

    const fetchUserStats = useCallback(async (search = '', page = 0, size = 10) => {
        setLoadingUsers(true);
        setError(null);
        try {
            const data = await adminStatsService.getUserStats(search, page, size);
            setUserStatsList(data);
        } catch {
            setError(t('admin.stats.fetchUsersError'));
            addToast({ type: 'error', message: t('admin.stats.fetchUsersError') });
        } finally {
            setLoadingUsers(false);
        }
    }, [addToast, t]);

    const fetchUserDetail = useCallback(async (userId: string) => {
        setUserDetail(null);
        setLoadingDetail(true);
        setError(null);
        try {
            const data = await adminStatsService.getUserDetail(userId);
            setUserDetail(data);
        } catch {
            setError(t('admin.stats.fetchUserDetailError'));
            addToast({ type: 'error', message: t('admin.stats.fetchUserDetailError') });
        } finally {
            setLoadingDetail(false);
        }
    }, [addToast, t]);

    const fetchAllStats = useCallback(async () => {
        await Promise.all([fetchEngagement(), fetchLearningMetrics()]);
    }, [fetchEngagement, fetchLearningMetrics]);

    return {
        engagement,
        learningMetrics,
        userStatsList,
        userDetail,
        loadingEngagement,
        loadingMetrics,
        loadingUsers,
        loadingDetail,
        error,
        fetchEngagement,
        fetchLearningMetrics,
        fetchUserStats,
        fetchUserDetail,
        fetchAllStats,
    };
}
