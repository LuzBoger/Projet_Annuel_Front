import { ReactNode } from "react";
import { Button } from "./Button";

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
    confirmText = "Confirmer",
    cancelText = "Annuler",
    confirmVariant = "primary"
}: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 overflow-hidden p-4">
            <div className="relative w-full max-w-md rounded-lg bg-white shadow-xl">
                <div className="p-6 text-center">
                    <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
                    <div className="mb-6 text-sm text-gray-500">{description}</div>
                    
                    <div className="flex justify-center gap-4">
                        <Button 
                            variant="outline" 
                            onClick={onCancel} 
                            disabled={isConfirming}
                        >
                            {cancelText}
                        </Button>
                        <Button 
                            variant={confirmVariant} 
                            onClick={onConfirm} 
                            isLoading={isConfirming}
                        >
                            {confirmText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
