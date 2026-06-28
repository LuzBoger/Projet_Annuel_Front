import { PAGE_SIZE } from "@/constants/challenge";
import { Challenge, ChallengeParticipant, ChallengeProgress, ChallengeTime, ExamItem } from "@/types/challenges/challenge";
import { UserPairAnswer } from "@/types/components/examMatching";

export function updateParticipantProgress(participants: ChallengeParticipant[], progressChallenge: ChallengeProgress[]) {

     return participants.map(participant => {
        const progress = progressChallenge.find(progress => progress.accountId === participant.accountId);
        return {
            ...participant,
            score: progress?.score != null ? progress.score : participant.score,
            timePassed: progress?.timePassed ?? participant.timePassed,
            finalRank : progress?.finalRank ?? participant.finalRank,
            xpGained: progress?.xpGained ?? participant.xpGained,
            hasStarted: participant.hasStarted || progress != null,
            hasCompleted: participant.hasCompleted || progress?.finalRank != null || (progress?.questionAnswered != null && progress?.totalQuestions != null && progress.questionAnswered >= progress.totalQuestions)
        };
    });

}

export function sortParticipants(participants: ChallengeParticipant[]) {
    return participants.sort((a, b) => {
        if (a.score !== null && b.score !== null) {
            if (b.score !== a.score) {
                return b.score - a.score; 
            }
            return (a.timePassed ?? 0) - (b.timePassed ?? 0);
        }
        return 0;
    })
}

export function getTimeLeft(expiresAt: string): ChallengeTime {
    const totalSeconds = Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));
    if (totalSeconds >= 3600){
        return { time: Math.floor(totalSeconds / 3600), unit: 'hours' };
    }
    if (totalSeconds >= 60) {
        return { time: Math.floor(totalSeconds / 60), unit: 'minutes' };
    }
    return { time: totalSeconds, unit: 'seconds' };
}

export function checkIfChallengeExpired(expiresAt: string): boolean {
    return new Date(expiresAt) < new Date();
}

export function getDuel(challenges: Challenge[], userId: string): Challenge | null {
    return challenges.find(challenge => challenge.challengeType === 'DUEL' && challenge.challengeStatus === 'PENDING' && challenge.challenged?.id === userId) || null;
}

export function getTotalChallenge(challenges: Challenge[]): number {
    return Math.ceil(challenges.length / PAGE_SIZE);
}

export function getChallengeByPage(challenges: Challenge[], page: number) : Challenge[] {
    return challenges.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
}

export function calculateScore(items: ExamItem[], qcmAnswers: Record<string, number>, flashcardAnswers: Record<string, string>, sortingAnswers: Record<string, number[]>, matchingAnswers: UserPairAnswer[]): number {
    let correct = 0;
    let total = 0;

    for (const item of items) {
        if (item.type === 'QCM') {
            total++;
            if (qcmAnswers[item.data.id] === item.data.correctOptionIndex){
                correct++;
            }
        }
        if (item.type === 'FLASHCARD') {
            total++;
            const user = (flashcardAnswers[item.data.id] ?? '').trim().toLowerCase();
            if (user === item.data.back.trim().toLowerCase()) {
                correct++;
            }
        }
        if (item.type === 'SORTING') {
            total++;
            const user = sortingAnswers[item.data.id] ?? [];
            if (user.length === item.data.correctOrder.length && user.every((v, i) => v === item.data.correctOrder[i])) {
                correct++;
            }
        }
        if (item.type === 'MATCHING') {
            for (const pair of item.data) {
                total++;
                if (matchingAnswers.some(answer => answer.id === pair.id)) {
                    correct++;
                }
            }
        }
        if (item.type === 'INTERACTIVE') {
            total++;
            if (item.data.systemType === 'MULTIPLE_CHOICE') {
                if (qcmAnswers[item.data.id] === Number(item.data.correctOptionIndex)) {
                    correct++;
                }
            } else {
                const user = (flashcardAnswers[item.data.id] ?? '').trim().toLowerCase();
                const correctWord = (item.data.correctWord ?? '').trim().toLowerCase();
                if (user === correctWord) {
                    correct++;
                }
            }
        }
    }

    return total === 0 ? 100 : Math.round((correct / total) * 100);
}