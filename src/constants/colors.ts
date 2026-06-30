import { ChallengeStatus } from "@/types/challenges/challenge";
import { FlagBadgeColors } from "@/types/components/flag";
import { FriendshipStatus } from "@/types/friends/friends";


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


export const MEDALS_COLORS: Record<number, string> = {
    1: 'text-yellow-400',
    2: 'text-gray-400',
    3: 'text-orange-400',
}
export const TOP_RANK_COLORS: Record<number, string> = {
    1: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700/50',
    2: 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600/50',
    3: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700/50',
};

export const STATUS_COLORS: Record<ChallengeStatus, string> = {
    ACTIVE: 'text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-400/10 border-emerald-300 dark:border-emerald-400/30',
    PENDING: 'text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-400/10 border-yellow-300 dark:border-yellow-400/30',
    COMPLETED: 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-400/10 border-gray-300 dark:border-gray-400/30',
    EXPIRED: 'text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-400/10 border-orange-300 dark:border-orange-400/30',
    DECLINED: 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-400/10 border-red-300 dark:border-red-400/30',
    CANCELLED: 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-400/10 border-red-300 dark:border-red-400/30',
  };

export const FRIENDS_STATUS_COLORS: Record<FriendshipStatus, string> = {
  NONE: 'bg-[#c8a97e] hover:bg-[#b8926a] text-white cursor-pointer',
  PENDING_SENT: 'bg-gray-400 hover:bg-gray-500 text-white cursor-pointer',
  PENDING_RECEIVED: 'bg-blue-500 text-white cursor-default',
  ACCEPTED: 'bg-green-500 text-white cursor-default'
}