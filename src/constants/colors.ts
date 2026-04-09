import { FlagBadgeColors } from "@/types/components/flag";


export const statusColors: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    CANCELED: 'bg-red-100 text-red-800',
    EXPIRED: 'bg-gray-100 text-gray-800',
}

export const paymentStatusColors: Record<string, string> = {
    SUCCEEDED: 'bg-green-100 text-green-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    FAILED: 'bg-red-100 text-red-800',
    REFUNDED: 'bg-blue-100 text-blue-800',
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
export const COLORS_PIE_CHART = ['#6366f1', '#a5b4fc'];
