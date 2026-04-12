import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

interface CancelSubscriptionProps {
    isOpen: boolean;
    isLoading: boolean;
    onCancel(): void;
    onConfirm: (isCancel: boolean, reason: string) => void;
}


export function CancelSubscriptionModal({isOpen, isLoading, onCancel, onConfirm} : CancelSubscriptionProps) {

    const {t} = useTranslation();
    const [reason, setReason] = useState("");
    const [isCancel, setIsCancel] = useState(false);

    if(!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {t('subscription.cancel.title')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {t('subscription.cancel.description')}
                </p>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('subscription.cancel.reason')}
                    </label>
                    <textarea
                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:text-gray-200"
                        rows={3}
                        maxLength={500}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder={t('subscription.cancel.reason_placeholder')}
                    />
                </div>
                <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <input type="checkbox" checked={isCancel} onChange={(e) => setIsCancel(e.target.checked)} className="h-4 w-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500" />
                    {t('subscription.cancel.now')}
                    </label>
                    {isCancel && (
                        <p className="mt-1 text-xs text-red-600">
                            {t('subscription.cancel.warning')}
                        </p>
                    )}

                    <div className="flex gap-3 justify-end">
                        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
                            {t('subscription.keep_subscription')}
                        </Button>
                        <Button variant="danger" onClick={() => onConfirm(isCancel, reason)} isLoading={isLoading} disabled={isLoading}>
                            {t('subscription.cancel.confirm_cancel')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
