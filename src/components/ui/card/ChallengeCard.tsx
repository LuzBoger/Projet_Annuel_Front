import { checkIfChallengeExpired, getTimeLeft } from "@/lib/utils/challenge";
import { Challenge } from "@/types/challenges/challenge";
import { BadgeTag } from "@/components/ui/BadgeTag";
import { ChevronRight, Swords, Globe, Users, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { challengeStatusBadgeColor, challengeStatusBorderColor, getStatusStyle } from "@/lib/utils/color";

interface ChallengeCardProps {
    challenge: Challenge;
    onClick: () => void;
}

export function ChallengeCard({ challenge, onClick }: ChallengeCardProps) {
    const { t } = useTranslation();
    const isExpired = checkIfChallengeExpired(challenge.expiresAt);
    const timeLeft = !isExpired && challenge.challengeStatus === 'ACTIVE' ? getTimeLeft(challenge.expiresAt) : null;

    return (
        <div onClick={onClick} className={`group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden ${challengeStatusBorderColor(challenge.challengeStatus)}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50/30 to-transparent dark:from-brand-950/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gray-100 dark:bg-gray-700/50 z-10" />
            <div className={`absolute bottom-0 left-0 h-[3px] z-20 w-full transition-all duration-500 ${getStatusStyle(challenge.challengeStatus)}`} />
            <div className="absolute top-4 right-5 z-20 flex items-center gap-2">
                {timeLeft !== null && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-red-500 dark:text-red-400">
                        <Clock className="w-3 h-3" />
                        {t(`challenge.time_left_${timeLeft.unit}`, { count: timeLeft.value })}
                    </span>
                )}
                <BadgeTag color={challengeStatusBadgeColor(challenge.challengeStatus)}>
                    {challenge.challengeStatus}
                </BadgeTag>
            </div>

            <div className="relative z-10 p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-center gap-2 flex-wrap">
                            <BadgeTag color={challenge.challengeType === 'DUEL' ? 'purple' : 'blue'} className="px-2 py-1">
                                {challenge.challengeType === 'DUEL' ? <><Swords className="w-3 h-3" />{t('challenge.type.duel.type')}</> : <><Globe className="w-3 h-3" />{t('challenge.type.public.type')}</>}
                            </BadgeTag>
                            <BadgeTag color="gray" className="px-2 py-1">
                                {challenge.lessonType}
                            </BadgeTag>
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {t('challenge.participants.count', { count: challenge.participants.length })}
                            </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight">
                            {challenge.title}
                        </h3>

                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            {t('challenge.author', { username: challenge.challenger.username })}
                        </p>

                    </div>

                    <div className="shrink-0 self-end mb-1 flex items-center justify-end text-sm font-bold text-brand-600 dark:text-brand-400 transition-all duration-300">
                        <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                </div>
            </div>
        </div>
    );
}