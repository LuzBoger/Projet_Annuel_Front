import { Play } from 'lucide-react';
import Ranking from "@/components/challenge/Ranking";
import { ChallengeExam } from "@/components/challenge/ChallengeExam";
import { MetaData } from "@/components/seo/MetaData";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useChallenge } from "@/hooks/useChallenge";
import { challengeService } from "@/services/challengeService";
import { useChallengeSocket } from "@/hooks/useChallengeSocket";
import { checkIfChallengeExpired, getTimeLeft } from "@/lib/utils/challenge";
import { getStatusTextColor } from "@/lib/utils/color";
import { Clock, Globe, Swords, Users, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { SubmitChallengeRequest } from "@/types/challenges/challenge";

export default function ChallengeDetail() {
    const {challengeId} = useParams<{ challengeId: string }>();
    const {t} = useTranslation();
    const {user} = useAuth();
    const {challenge,loading,error,submitScore,fetchChallenge,joinChallenge,acceptChallenge,declineChallenge,cancelChallenge} = useChallenge();
    const {challengeProgress, isDuelStarted} = useChallengeSocket(challengeId!);
    const [isParticipants, setIsParticipants] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);

    useEffect(() => {
        if(challengeId) {
            fetchChallenge(challengeId);
        }
    }, [challengeId, fetchChallenge]);

    useEffect(() => {
        if(isDuelStarted && challengeId && challenge?.challenger.id === user?.id) {
            fetchChallenge(challengeId);
        }
    }, [isDuelStarted, challengeId, fetchChallenge, challenge?.challenger.id, user?.id]);
    


    const handleStartChallenge = async () => {
        if (!challengeId) { return; }
        if (challenge?.challengeType === 'PUBLIC') {
            const isAlreadyParticipant = challenge.participants.some(participant => participant.accountId === user?.id);
            if (!isAlreadyParticipant) {
                await joinChallenge(challengeId);
            }
        }
        await challengeService.startChallenge(challengeId);
        setStartTime(Date.now());
        setIsParticipants(true);
    }

    const handleFinishChallenge = async (answers: Omit<SubmitChallengeRequest, 'timePassed'>) => {
        if(!challengeId) { return; }
        const timePassed = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
        setIsParticipants(false);
        await submitScore(challengeId, {
            timePassed,
            ...answers
        });
    }

    const isChallengeExpired = challenge ? checkIfChallengeExpired(challenge.expiresAt) : false;
    const timeLeft = challenge ? getTimeLeft(challenge.expiresAt) : { time: 0, unit: 'hours'};
    const alreadyPlayed = challenge?.participants.some(p => p.accountId === user?.id && p.hasCompleted) ?? false;

    if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mb-6"></div>
        <p className="text-brand-600 font-medium animate-pulse">{t('common.loading')}</p>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4">
        <p className="text-red-500">{error ?? t('error.fetchChallenge')}</p>
      </div>
    );
  }

  return (
    <>
      <MetaData title={challenge?.title ?? ""} robots="noindex, nofollow" />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">

        <div className="space-y-4 pb-5 border-b border-gray-200 dark:border-gray-700/60">

          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-900 dark:text-white tracking-tight leading-tight">
              {challenge.title}
            </h1>
            <span className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${getStatusTextColor(challenge.challengeStatus)}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${challenge.challengeStatus === 'ACTIVE' ? 'bg-emerald-500 dark:bg-emerald-400 animate-pulse' : 'bg-current'}`} />
              {challenge.challengeStatus}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              {challenge.challengeType === 'DUEL' ? <Swords className="w-3.5 h-3.5 text-purple-500" /> : <Globe className="w-3.5 h-3.5 text-blue-500" />}
              {challenge.challengeType === 'DUEL' ? t('challenge.type.duel.type') : t('challenge.type.public.type')}
            </div>

            <div className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <BookOpen className="w-3.5 h-3.5 text-brand-500" />
              {challenge.lessonType}
            </div>

            <div className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <Users className="w-3.5 h-3.5 text-gray-400" />
              {challenge.participants.length > 1 ? t('challenge.participants.counts', { count: challenge.participants.length }) : t('challenge.participants.count', { count: challenge.participants.length })}
            </div>

            {!isChallengeExpired && challenge.challengeType === 'PUBLIC' && (
              <div className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                <Clock className="w-3.5 h-3.5" />
                {t(`challenge.time_left_${timeLeft.unit}`, { count: timeLeft.time })}
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500">
            {t('challenge.author', { username: challenge.challenger.username })}
          </p>
        </div>

        <div className="space-y-5">
          {challenge.challengeStatus === 'PENDING' && challenge.challengeType === 'DUEL' && challenge.challenged?.id === user?.id && (
            <div className="rounded-2xl border border-yellow-300 dark:border-yellow-400/20 bg-yellow-50 dark:bg-yellow-400/5 p-5 space-y-4">
              <p className="text-center text-sm font-medium text-yellow-700 dark:text-yellow-300">
                {t('challenge.duel.challenged_by', { username: challenge.challenger.username })}
              </p>
              <div className="flex gap-3">
                <Button onClick={() => acceptChallenge(challengeId!)} variant="primary" className="flex-1">
                  {t('challenge.details.accept')}
                </Button>
                <Button onClick={() => declineChallenge(challengeId!)} variant="danger" className="flex-1">
                  {t('challenge.details.decline')}
                </Button>
              </div>
            </div>
          )}

          {challenge.challengeStatus === 'PENDING' && challenge.challengeType === 'DUEL' && challenge.challenger.id === user?.id && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-brand-600/10 border border-brand-500/20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500" />
              </div>
              <p className="text-gray-500 dark:text-gray-300 text-sm">{t('challenge.lobby.waiting', { username: challenge.challenged?.username })}</p>
              <Button variant="danger" onClick={() => cancelChallenge(challengeId!)} size="sm">
                {t('challenge.lobby.cancel')}
              </Button>
            </div>
          )}

          {challenge.challengeStatus === 'ACTIVE' && !isParticipants && !alreadyPlayed && !isChallengeExpired &&
            (challenge.challengeType === 'PUBLIC' || challenge.challenger.id === user?.id || challenge.challenged?.id === user?.id) && (
            <Button
              variant="primary"
              size="lg"
              fullWidth={true}
              onClick={handleStartChallenge}
              className="rounded-2xl py-4 font-bold text-lg hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                {t('challenge.details.play')}
              </span>
            </Button>
          )}

          {alreadyPlayed && (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-3 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
              ✓ {t('challenge.details.already_played')}
            </div>
          )}

          {isParticipants && (
            <ChallengeExam
              lessonType={challenge.lessonType}
              qcms={challenge.qcm}
              flashcards={challenge.flashcards}
              matchingPairs={challenge.matchingPairs}
              sortingExercises={challenge.sortingExercises}
              interactives={challenge.interactives || []}
              onFinish={handleFinishChallenge}
            />
          )}

          {!isParticipants && (
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                {challenge.challengeType === 'PUBLIC' ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {t('challenge.ranking.live')}
                  </>
                ) : t('challenge.ranking.results')}
              </h2>
              <Ranking
                participants={challenge.participants ?? []}
                progressChallenge={challengeProgress}
                isPublic={challenge.challengeType === 'PUBLIC'}
              />
            </div>
          )}
        </div>

      </div>
    </>
  );
}