import { RankingResponse } from "@/types/ranking/ranking";
import { useToast } from "@/hooks/useToast";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { rankingService } from "@/services/rankingService";
import { RANKING_PAGE_SIZE, RANKING_PAGES } from "@/constants/ranking";

export function useRanking() {
    const {addToast} = useToast();
    const {t} = useTranslation();
    const [data, setData] = useState<RankingResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const fetchGlobalRanking = useCallback(async (page = RANKING_PAGES, size = RANKING_PAGE_SIZE) => {
        try {
            setLoading(true);
            setError(null);
            const response = await rankingService.getGlobalRanking(page, size);
            setData(response);
        } catch  {
            setError(t('error.fetchGlobalRanking'));
            addToast({type: 'error', message: t('error.fetchGlobalRanking')});
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);


    const fetchByLanguageRanking = useCallback(async (languageId: string, page = RANKING_PAGES, size = RANKING_PAGE_SIZE) => {
        try {
            setLoading(true);
            setError(null);
            const response = await rankingService.getLanguageRanking(languageId, page, size);
            setData(response);
        } catch  {
            setError(t('error.fetchLanguageRanking'));
            addToast({type: 'error', message: t('error.fetchLanguageRanking')});
        }
          finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const fetchFriendsRanking = useCallback(async (page = RANKING_PAGES, size = RANKING_PAGE_SIZE) => {
    try {
        setLoading(true);
        setError(null);
        const response = await rankingService.getFriendsRanking(page, size);
        setData(response);
    } catch {
        setError(t('error.fetchFriendsRanking'));
        addToast({ type: 'error', message: t('error.fetchFriendsRanking') });
    } finally {
        setLoading(false);
    }
}, [addToast, t]);

    return { data, loading, error, fetchGlobalRanking, fetchByLanguageRanking, fetchFriendsRanking };
}