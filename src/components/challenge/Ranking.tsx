import { sortParticipants, updateParticipantProgress } from "@/lib/utils/challenge";
import { ChallengeParticipant, ChallengeProgress } from "@/types/challenges/challenge";
import { Avatar } from "@/components/ui/Avatar";
import { useTranslation } from "react-i18next";
import { getProfileImageUrl } from "@/lib/utils/image";
import { RANKING_COLORS_POSITIONS } from "@/constants/rankingChallenge";
import { ViewProfileButton } from "@/components/ui/ViewProfileButton";
import { useAuth } from "@/hooks/useAuth";

interface RankingProps {
    participants: ChallengeParticipant[];
    progressChallenge: ChallengeProgress[];
    isPublic?: boolean;
}

export default function Ranking({ participants, progressChallenge }: RankingProps) {
    const { t } = useTranslation();
    const { user } = useAuth();
    const sorted = sortParticipants(updateParticipantProgress(participants, progressChallenge));

    if (sorted.length === 0) {
        return (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 px-6 py-10 text-center text-sm text-gray-500">
                {t("challenge.ranking.empty")}
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {sorted.map((participant, index) => {
                const rank = participant.finalRank ?? index + 1;
                const rankingPosition = RANKING_COLORS_POSITIONS[rank - 1];

                return (
                    <div key={participant.accountId} className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200
                            ${rankingPosition ? `${rankingPosition.bg} ${rankingPosition.border}` : 'bg-white dark:bg-gray-800/40 border-gray-200 dark:border-gray-700/60'}`}>
                        <span className={`w-7 text-center font-bold text-base shrink-0 ${rankingPosition ? rankingPosition.text : 'text-gray-400 dark:text-gray-500'}`}>
                            {rankingPosition ? rankingPosition.label : rank}
                        </span>

                        <Avatar imageUrl={participant.photoUrl ? getProfileImageUrl(participant.photoUrl) : undefined} size="w-9 h-9"/>

                        <span className="flex-1 text-sm font-semibold text-gray-900 dark:text-white truncate">{participant.username}</span>

                        {participant.accountId !== user?.id && (
                            <ViewProfileButton accountId={participant.accountId} iconOnly />
                        )}

                        {participant.hasCompleted ? (
                            <div className="shrink-0 text-right">
                                {participant.score !== null ? (
                                    <>
                                        <div className={`text-base font-bold leading-tight ${rankingPosition ? rankingPosition.text : 'text-gray-900 dark:text-white'}`}>
                                            {participant.score.toFixed(0)}%
                                        </div>
                                        <div className="text-xs text-gray-400 mt-0.5">
                                            {participant.timePassed}s
                                            {participant.xpGained > 0 && (
                                                <span className="ml-1.5 text-yellow-500 font-medium">+{participant.xpGained} XP</span>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <span className="text-xs text-gray-500">{t("challenge.ranking.score.hidden", { username: participant.username })}</span>
                                )}
                            </div>
                        ) : participant.hasStarted ? (
                            <div className="flex items-center gap-1.5 text-xs text-gray-400 shrink-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                                {t("challenge.ranking.in-progress")}
                            </div>
                        ) : (
                            <span className="text-xs text-gray-400 shrink-0">
                                {participant.accountId === user?.id
                                    ? t("challenge.ranking.not_played_self")
                                    : t("challenge.ranking.not_played")}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
