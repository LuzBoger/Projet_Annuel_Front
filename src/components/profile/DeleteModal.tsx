import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { profileService } from "@/services/profileService";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { DeleteFormData } from "@/components/profile/DeleteFormData";
import { StepDeleteAccount } from "@/types/components/data";
import { RESEND_CODE_DELAY } from "@/constants/global";
interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose(): void;
    onDeleted(): void;
}

export function DeleteAccountModal({ isOpen, onClose, onDeleted }: DeleteAccountModalProps) {
    const { t } = useTranslation();

    const [step, setStep] = useState<StepDeleteAccount>('confirm');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [remaining, setRemaining] = useState(0);

const resendTimer = useRef<ReturnType<typeof setInterval> | null>(null);
    useEffect(() => {
        return () => {
            if (resendTimer.current){
                clearInterval(resendTimer.current);
            }
        };
    }, []);


    const startTimer = () => {
        setRemaining(RESEND_CODE_DELAY);
        if (resendTimer.current){
            clearInterval(resendTimer.current);
        }
        resendTimer.current = setInterval(() => {
            setRemaining(prev => {
                if (prev <= 1) {
                    if (resendTimer.current){
                        clearInterval(resendTimer.current);
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleSendCode = async () => {
        setLoading(true);
        setError(null);
        try {
            await profileService.generateCode();
            setStep('code');
            startTimer();
        } catch {
            setError(t('data.delete.error'));
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (remaining > 0){
            return;
        }
        setError(null);
        setLoading(true);
        try {
            await profileService.generateCode();
            startTimer();
        } catch {
            setError(t('data.delete.error'));
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async (code: string) => {
        await profileService.deleteAccount(code);
        onDeleted();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('data.delete.modal_title')}>
            {error && (
                <div className="mb-4 p-3 rounded bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-400 text-sm">
                    {error}
                </div>
            )}

            {step === 'confirm' && (
                <div className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('data.delete.modal_warning')}
                    </p>
                    <div className="flex justify-end gap-3">
                        <Button variant="outline" type="button" onClick={onClose} disabled={loading}>
                            {t('common.cancel')}
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleSendCode}
                            isLoading={loading}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {t('data.delete.send_code_btn')}
                        </Button>
                    </div>
                </div>
            )}

            {step === 'code' && (
                <DeleteFormData
                    onConfirm={handleConfirm}
                    onCancel={onClose}
                    remaining={remaining}
                    onResend={handleResend}
                />
            )}
        </Modal>
    );
}