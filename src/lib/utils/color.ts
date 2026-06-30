import { COLORS, FLAG_BADGE_COLORS, STATUS_COLORS } from "@/constants/colors";
import { LANG_META } from "@/constants/languages";
import { ChallengeStatus } from "@/types/challenges/challenge";

export const getColor = (index: number) => FLAG_BADGE_COLORS[index % Object.keys(FLAG_BADGE_COLORS).length];

export const getLanguageColor = (code: string): string => {
    let hash = 5381;
    for (let i = 0; i < code.length; i++) hash = ((hash << 5) + hash) ^ (code.codePointAt(i) ?? 0);
    return COLORS[Math.abs(hash) % COLORS.length];
}

export const lang = (code: string) => LANG_META[code] || { code: code.toUpperCase(), color: '#E0E0E0' };


export const challengeStatusBadgeColor = (status: ChallengeStatus) => {
    switch (status) {
        case 'ACTIVE': return 'green' as const;
        case 'COMPLETED': return 'gray' as const;
        case 'PENDING': return 'yellow' as const;
        default: return 'red' as const;
    };
}

export const challengeStatusBorderColor = (status: ChallengeStatus) => {
    switch (status) {
        case 'ACTIVE': return 'border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.1)] dark:shadow-[0_0_30px_rgba(16,185,129,0.05)]';
        case 'PENDING': return 'border-yellow-400/40 shadow-[0_0_20px_rgba(234,179,8,0.08)]';
        default: return 'border-gray-200/50 dark:border-gray-800/50 shadow-sm hover:shadow-xl hover:border-brand-500/30';
    }
};

export const getStatusStyle = (status: ChallengeStatus) => {
    switch (status) {
        case 'ACTIVE': return 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]';
        case 'PENDING': return 'bg-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.4)]';
        case 'COMPLETED': return 'bg-gray-400';
        default: return 'bg-red-400';
    }
};

export const getStatusTextColor = (status: ChallengeStatus) => {
    return STATUS_COLORS[status] ?? 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-400/10 border-gray-300 dark:border-gray-400/30';
};
