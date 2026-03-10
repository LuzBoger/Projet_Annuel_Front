import { clsx } from "clsx";
import { ToastMessage } from "@/types/toast/toast";
import { Check, Cross } from "@/assets/icons";
import { useEffect, useState } from "react";

interface ToastProps {
    toast: ToastMessage;
    onClose: () => void;
}

export function Toast({ toast, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Déclencher l'animation d'entrée
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Attendre la fin de l'animation de sortie
    };
    
    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'success':
                return {
                    bg: 'bg-green-50',
                    border: 'border-green-200',
                    text: 'text-green-800',
                    iconColor: 'text-green-500',
                    Icon: Check,
                };
            case 'error':
                return {
                    bg: 'bg-red-50',
                    border: 'border-red-200',
                    text: 'text-red-800',
                    iconColor: 'text-red-500',
                    Icon: Cross,
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-50',
                    border: 'border-yellow-200',
                    text: 'text-yellow-800',
                    iconColor: 'text-yellow-500',
                    Icon: () => (
                        <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    ),
                };
            case 'info':
            default:
                return {
                    bg: 'bg-blue-50',
                    border: 'border-blue-200',
                    text: 'text-blue-800',
                    iconColor: 'text-blue-500',
                    Icon: () => (
                        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                };
        }
    };

    const styles = getTypeStyles(toast.type);
    const { Icon } = styles;

    return (
        <div
            className={clsx(
                "pointer-events-auto flex w-[400px] max-w-[90vw] overflow-hidden rounded-lg border shadow-lg transition-all duration-300 ease-in-out transform",
                styles.bg,
                styles.border,
                isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            )}
        >
            <div className="flex w-full items-start p-4">
                <div className="flex-shrink-0">
                    <Icon className={clsx("h-5 w-5", styles.iconColor)} />
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className={clsx("text-sm font-medium", styles.text)}>
                        {toast.message}
                    </p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                    <button
                        type="button"
                        className={clsx(
                            "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
                            styles.bg,
                            styles.text,
                            `hover:bg-opacity-80`
                        )}
                        onClick={handleClose}
                    >
                        <span className="sr-only">Fermer</span>
                        <Cross className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
