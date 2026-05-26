import { RankingResponse } from "@/types/ranking/ranking";
import { useToast } from "@/hooks/useToast";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { rankingService } from "@/services/rankingService";

export function useRanking() {
    const {addToast} = useToast();
    const {t} = useTranslation();
    const [data, setData] = useState<RankingResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const fetchGlobalRanking = useCallback(async (page = 0, size = 50) => {
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


    const fetchByLanguageRanking = useCallback(async (languageId: string, page = 0, size = 50) => {
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

    return { data, loading, error, fetchGlobalRanking, fetchByLanguageRanking };
}