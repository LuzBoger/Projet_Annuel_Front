import { useCallback, useState } from "react";
import { CreateLanguageRequest, LanguageResponse, UpdateLanguageRequest } from "@/types/language/language";
import { languageService } from "@/services/languageService";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/useToast";

export function useLanguage() {
    const { t } = useTranslation();
    const { addToast } = useToast();
    const [languages, setLanguages] = useState<LanguageResponse[]>([]);
    const [language, setLanguage] = useState<LanguageResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLanguages = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await languageService.getAllLanguages();
            setLanguages(response);
        } catch {
            setError(t('error.fetchLanguages'));
        } finally {
            setLoading(false);
        }
    }, [t]);

    const fetchLanguageById = async (languageId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await languageService.getLanguageById(languageId);
            setLanguage(response);
        } catch {
            setError(t('error.fetchLanguageById'));
        } finally {
            setLoading(false);
        }
    };

    const fetchLanguageByCode = async (code: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await languageService.getLanguageByCode(code);
            setLanguage(response);
        } catch {
            setError(t('error.fetchLanguageByCode'));
        } finally {
            setLoading(false);
        }
    };

    const createLanguage = async (data: CreateLanguageRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await languageService.createLanguage(data);
            setLanguages(prev => [...prev, response]);
            addToast({ type: 'success', message: t('admin.languages.success.create', 'Langue créée avec succès') });
        } catch {
            setError(t('error.createLanguage'));
        } finally {
            setLoading(false);
        }
    };

    const updateLanguage = async (languageId: string, data: UpdateLanguageRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await languageService.updateLanguage(languageId, data);
            setLanguages(prev => prev.map(l => l.id === languageId ? response : l));
            addToast({ type: 'success', message: t('admin.languages.success.update', 'Langue mise à jour avec succès') });
        } catch {
            setError(t('error.updateLanguage'));
        } finally {
            setLoading(false);
        }
    };

    const deleteLanguage = async (languageId: string) => {
        setLoading(true);
        setError(null);
        try {
            await languageService.deleteLanguage(languageId);
            setLanguages(prev => prev.filter(l => l.id !== languageId));
            addToast({ type: 'success', message: t('admin.languages.success.delete', 'Langue supprimée avec succès') });
        } catch {
            setError(t('error.deleteLanguage'));
        } finally {
            setLoading(false);
        }
    };

    return { 
        languages, 
        language, 
        loading, 
        error, 
        fetchLanguages, 
        fetchLanguageById, 
        fetchLanguageByCode, 
        createLanguage, 
        updateLanguage, 
        deleteLanguage 
    };
}
