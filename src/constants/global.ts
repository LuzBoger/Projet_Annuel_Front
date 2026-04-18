export const MAX_FILE_SIZE = 2 * 1024 * 1024; 
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{12,}$/;
export const TWO_FACTOR_CODE_PATTERN = /^\d+$/;
export const USERNAME_PATTERN = /^[a-zA-Z0-9_.-]+$/;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_URL = import.meta.env.VITE_API_URL;
export const PUBLIC_ENDPOINTS = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/forgot-password', '/auth/reset-password', '/auth/verify-2fa', '/auth/admin/login', '/auth/me'];
export const AUTH_PATH = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-2fa', '/admin/login'];
export const SSE_EVENT: Record<string, { key: string; type: "info" | "success" | "warning" | "error" }> = {
    REVIEW_PENDING:       { key: "reviews.notif_pending",       type: "info"    },
    NEW_PENDING_REVIEW:   { key: "reviews.notif_new_pending",   type: "info"    },
    REVIEW_APPROVED:      { key: "reviews.notif_approved",      type: "success" },
    REVIEW_REJECTED:      { key: "reviews.notif_rejected",      type: "warning" },
    REVIEW_AUTO_REJECTED: { key: "reviews.notif_auto_rejected", type: "warning" },
    REVIEW_BANNED:        { key: "reviews.notif_banned",        type: "error"   },

};