import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import { Modal } from "./Modal";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    description: ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
    isConfirming?: boolean;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: "primary" | "secondary" | "danger" | "outline";
}

export function ConfirmModal({
    isOpen,
    title,
    description,
    onConfirm,
    onCancel,
    isConfirming = false,
    confirmText,
    cancelText,
    confirmVariant = "primary"
}: ConfirmModalProps) {
    const { t } = useTranslation();

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onCancel} 
            title={title}
            size="sm"
        >
            <div className="text-center">
                <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    {description}
                </div>
                
                <div className="flex justify-center gap-4">
                    <Button 
                        variant="outline" 
                        onClick={onCancel} 
                        disabled={isConfirming}
                    >
                        {cancelText ?? t('common.cancel')}
                    </Button>
                    <Button
                        variant={confirmVariant}
                        onClick={onConfirm}
                        isLoading={isConfirming}
                    >
                        {confirmText ?? t('common.confirm')}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
