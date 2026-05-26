export interface ChallengeOption {
    icon: React.ReactNode;
    label: string;
    description: string;
}
export type Tab = 'user' | 'public' | 'duel';

export interface ChallengeTabs {
    key: Tab;
    label: string;
    icon: React.ReactNode;
    count?: number;
}