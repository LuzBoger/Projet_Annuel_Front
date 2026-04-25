import { userLanguageService } from "@/services/userLanguage";
import { AddUserLanguageRequest, UserLanguageResponse } from "@/types/userLanguage/userLanguage";
import axios from "axios";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "./useToast";

export function useUserLanguage() {

    const [userLanguages, setUserLanguages] = useState<UserLanguageResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const {addToast} = useToast();
    const {t} = useTranslation();
    const fetchLearningLanguages = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await userLanguageService.getUserLearningLanguages();
            setUserLanguages(response);
        } catch {
            setError(t('error.fetchUserLearningLanguages'));
            addToast({type: 'error', message: t('error.fetchUserLearningLanguages')});
            
        } finally {
            setLoading(false);
        }
    }, [t, addToast]);

    const addLanguage = async (data: AddUserLanguageRequest): Promise<UserLanguageResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await userLanguageService.addUserLanguage(data);
            setUserLanguages(prev => [...prev, response]);
            return response;
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 400) {
                await fetchLearningLanguages();
            }
            return null;
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
            addToast({type: 'error', message: t('error.deleteUserLanguage')});
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
