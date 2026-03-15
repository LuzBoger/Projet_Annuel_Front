import { useState, useCallback, useEffect } from "react";
import { ToastContext } from "@/contexts/ToastContext";
import { ToastData, ToastMessage } from "@/types/toast/toast";
import { Toast } from "@/components/ui/Toast";
import { globalEvents } from "@/lib/utils/eventEmitter";

export function ToastProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    const addToast = useCallback((toastData: ToastData) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast: ToastMessage = { ...toastData, id };

        setToasts((prevToasts) => [...prevToasts, newToast]);

        const duration = toastData.duration ?? 5000;
        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, [removeToast]);

    // Écouter les évènements globaux (ex: depuis les intercepteurs Axios)
    useEffect(() => {
        const unsubscribe = globalEvents.on("SHOW_TOAST", (data: unknown) => {
            addToast(data as ToastData);
        });

        return () => {
            unsubscribe();
        };
    }, [addToast]);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        toast={toast}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
}
