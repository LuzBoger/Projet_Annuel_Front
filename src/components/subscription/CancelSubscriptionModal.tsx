import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

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
        <Modal
            isOpen={isOpen}
            onClose={onCancel}
            title={t('subscription.cancel.title')}
            size="md"
        >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                {t('subscription.cancel.description')}
            </p>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('subscription.cancel.reason')}
                </label>
                <TextArea
                    rows={3}
                    maxLength={500}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder={t('subscription.cancel.reason_placeholder')}
                    className="rounded-xl"
                />
            </div>
            
            <div className="mb-8">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <input 
                        type="checkbox" 
                        checked={isCancel} 
                        onChange={(e) => setIsCancel(e.target.checked)} 
                        className="h-5 w-5 text-brand-600 border-gray-300 rounded-md focus:ring-brand-500" 
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('subscription.cancel.now')}
                    </span>
                </label>
                {isCancel && (
                    <p className="mt-2 text-xs text-red-500 font-medium px-1">
                        {t('subscription.cancel.warning')}
                    </p>
                )}
            </div>

            <div className="flex gap-3 justify-end">
                <Button variant="pill-red" onClick={onCancel} disabled={isLoading}>
                    {t('subscription.keep_subscription')}
                </Button>
                <Button variant="danger" onClick={() => onConfirm(isCancel, reason)} isLoading={isLoading} disabled={isLoading} className="rounded-xl">
                    {t('subscription.cancel.confirm_cancel')}
                </Button>
            </div>
        </Modal>
    );
}
