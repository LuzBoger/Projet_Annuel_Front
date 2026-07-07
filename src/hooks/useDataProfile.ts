import { useState, useCallback } from 'react';
import { profileService } from '@/services/profileService';
import { useToast } from '@/hooks/useToast';
import { useTranslation } from 'react-i18next';

export function useDataProfile() {
    const { addToast } = useToast();
    const { t } = useTranslation();
    const [exportLoading, setExportLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const exportData = useCallback(async () => {
        try {
            setExportLoading(true);
            setError(null);
            const { blob, filename } = await profileService.exportData();
            const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/json' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            addToast({ type: 'success', message: t('data.exportSuccess') });
        } catch (err) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('data.exportError');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setExportLoading(false);
        }
    }, [addToast, t]);

    const deleteAccount = useCallback(async (password: string) => {
        try {
            setDeleteLoading(true);
            setError(null);
            await profileService.deleteAccount(password);
        } catch (err) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('data.deleteError');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setDeleteLoading(false);
        }
    }, [addToast, t]);

    return {
        exportData,
        deleteAccount,
        exportLoading,
        deleteLoading,
        error,
    };
}
