import { createContext } from "react";
import { ToastData } from "@/types/toast/toast";

export interface ToastContextType {
    addToast: (toast: ToastData) => void;
    removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
