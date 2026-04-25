import { SegmentStatus } from "@/types/components/player";

export const getSegmentColor = (status: SegmentStatus) => {
    switch (status) {
        case 'correct': return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]';
        case 'medium': return 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.3)]';
        case 'incorrect': return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]';
        case 'current': return 'border-2 border-brand-500 dark:border-brand-400 bg-transparent ring-2 ring-brand-500/20 animate-pulse';
        default: return 'bg-gray-200 dark:bg-gray-700/50';
    }
};
