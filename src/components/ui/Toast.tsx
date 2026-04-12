import { clsx } from "clsx";
import { ToastMessage } from "@/types/toast/toast";
import { Check, Cross, Warning, Info } from "@/assets/icons";
import { useEffect, useState } from "react";

interface ToastProps {
    toast: ToastMessage;
    onClose: () => void;
}

export function Toast({ toast, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); 
    };
    
    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'success':
                return {
                    bg: 'bg-green-50 dark:bg-green-900/20',
                    border: 'border-green-200 dark:border-green-700',
                    text: 'text-green-800 dark:text-green-200',
                    iconColor: 'text-green-500 dark:text-green-400',
                    Icon: Check,
                };
            case 'error':
                return {
                    bg: 'bg-red-50 dark:bg-red-900/20',
                    border: 'border-red-200 dark:border-red-700',
                    text: 'text-red-800 dark:text-red-200',
                    iconColor: 'text-red-500 dark:text-red-400',
                    Icon: Cross,
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
                    border: 'border-yellow-200 dark:border-yellow-700',
                    text: 'text-yellow-800 dark:text-yellow-200',
                    iconColor: 'text-yellow-500 dark:text-yellow-400',
                    Icon: Warning,
                };
            case 'info':
            default:
                return {
                    bg: 'bg-blue-50 dark:bg-blue-900/20',
                    border: 'border-blue-200 dark:border-blue-700',
                    text: 'text-blue-800 dark:text-blue-200',
                    iconColor: 'text-blue-500 dark:text-blue-400',
                    Icon: Info,
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
