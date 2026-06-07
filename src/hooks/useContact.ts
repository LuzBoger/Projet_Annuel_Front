import { useState, useCallback } from 'react';
import { contactService } from '@/services/contactSerivce';
import type { ContactFormRequest } from '@/types/contact/contact';
import { useToast } from '@/hooks/useToast';
import { useTranslation } from 'react-i18next';

export function useContact() {
    const { addToast } = useToast();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendContactMessage = useCallback(async (data: ContactFormRequest) => {
        try {
            setLoading(true);
            setError(null);
            await contactService.sendContactMessage(data);
        } catch (err) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            const errorMessage = axiosError.response?.data?.message || t('contact.error');
            setError(errorMessage);
            addToast({ type: 'error', message: errorMessage });
            throw err;
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    return {
        sendContactMessage,
        loading,
        error,
    };
}
