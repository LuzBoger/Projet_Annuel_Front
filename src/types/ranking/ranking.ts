export interface RankedUserResponse {
    rank: number;
    accountId: string;
    username: string;
    photoUrl: string;
    totalXP: number;
    level: number;
    levelProgressPercentage: number;
    isCurrentUser: boolean;
}

export interface RankingResponse {
    rankedUser: RankedUserResponse[];
    currentUserRank: RankedUserResponse | null;
    totalParticipants: number;
    currentPage: number;
    pageSize: number;
    xpToNextRank: number | null;
}

export type RankingType = 'global' | 'language';