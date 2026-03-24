import { userLanguageService } from "@/services/userLanguage";
import { AddUserLanguageRequest, UserLanguageResponse } from "@/types/userLanguage/userLanguage";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export function useUserLanguage() {

    const [userLanguages, setUserLanguages] = useState<UserLanguageResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const {t} = useTranslation();
    const fetchLearningLanguages = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await userLanguageService.getUserLearningLanguages();
            setUserLanguages(response);
        } catch {
            setError(t('error.fetchUserLearningLanguages'));
        } finally {
            setLoading(false);
        }
    }, [t]);

    const addLanguage = async (data: AddUserLanguageRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await userLanguageService.addUserLanguage(data);
            setUserLanguages(prev => [...prev, response]);
        } catch {
            setError(t('error.addUserLanguage'));
        } finally {
            setLoading(false);
        }
    };

    const deleteLanguage = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await userLanguageService.deleteUserLanguage(id);
            setUserLanguages(prev => prev.filter(lang => lang.id !== id));
        } catch {
            setError(t('error.deleteUserLanguage'));
        } finally {
            setLoading(false);
        }
    };

    return {
        userLanguages,
        loading,
        error,
        fetchLearningLanguages,
        addLanguage,
        deleteLanguage
    };
}