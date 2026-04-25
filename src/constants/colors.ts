import { FlagBadgeColors } from "@/types/components/flag";


export const statusColors: Record<string, string> = {
    ACTIVE: 'bg-green-50/40 dark:bg-green-500/20 border-green-200 dark:border-green-500/40 text-green-600 dark:text-green-400',
    PENDING: 'bg-yellow-50/40 dark:bg-yellow-500/20 border-yellow-200 dark:border-yellow-500/40 text-yellow-600 dark:text-yellow-400',
    CANCELED: 'bg-red-50/40 dark:bg-red-500/20 border-red-200 dark:border-red-500/40 text-red-600 dark:text-red-400',
    EXPIRED: 'bg-gray-50/40 dark:bg-gray-500/20 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-400',
}

export const paymentStatusColors: Record<string, string> = {
    SUCCEEDED: 'bg-green-50/40 dark:bg-green-500/20 border-green-200 dark:border-green-500/40 text-green-600 dark:text-green-400',
    PENDING: 'bg-yellow-50/40 dark:bg-yellow-500/20 border-yellow-200 dark:border-yellow-500/40 text-yellow-600 dark:text-yellow-400',
    FAILED: 'bg-red-50/40 dark:bg-red-500/20 border-red-200 dark:border-red-500/40 text-red-600 dark:text-red-400',
    REFUNDED: 'bg-blue-50/40 dark:bg-blue-500/20 border-blue-200 dark:border-blue-500/40 text-blue-600 dark:text-blue-400',
}

export const PIE_CHART_COLORS = ['#94a3b8', '#4f46e5'];


export const FLAG_BADGE_COLORS: Record<number, FlagBadgeColors> = {
    0: { background: "#EEF2FF", text: "#4F46E5" }, 
    1: { background: "#FEF3C7", text: "#D97706" }, 
    2: { background: "#F0FDF4", text: "#16A34A" }, 
    3: { background: "#FFF1F2", text: "#E11D48" }, 
    4: { background: "#F0F9FF", text: "#0284C7" }, 
}

export const COLORS = ["#4F8EF7", "#F7634F", "#F7A84F", "#A84FF7", "#4FF7A8", "#F74FA8", "#4FF7F7", "#A8F74F", "#F74F4F", "#4F4FF7"];
export const COLORS_PIE_CHART = ['#4f46e5', '#06b6d4'];
