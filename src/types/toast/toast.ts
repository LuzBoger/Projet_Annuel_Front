export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastData {
    message: string;
    type: ToastType;
    duration?: number;
}

export interface ToastMessage extends ToastData {
    id: string;
}
