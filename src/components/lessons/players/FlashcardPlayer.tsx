import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlashcardRequest } from "@/types/lesson/lesson";
import { QueuedCard } from "@/types/components/flashcard";
import { Button } from "@/components/ui/Button";
import { FaceSad, FaceNeutral, FaceSmile } from "@/assets/icons";
import { PlayerLayout } from "./common/PlayerLayout";
import { PlayerHeader } from "./common/PlayerHeader";
import { SegmentStatus } from "@/types/components/player";

import { PlayerFooter } from "./common/PlayerFooter";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface FlashcardPlayerProps {
    flashcards: FlashcardRequest[];
    onFinish: (score: number, correctAnswers: number, totalAnswers: number) => void;
}

export function FlashcardPlayer({ flashcards, onFinish }: FlashcardPlayerProps) {
    const { t } = useTranslation();
    const { playCorrect, playIncorrect } = useSoundEffects();
    const [queue, setQueue] = useState<QueuedCard[]>(() =>
        flashcards ? flashcards.map((card, i) => ({ originalIndex: i, card })) : []
    );
    const [scores, setScores] = useState<number[]>(() =>
        flashcards ? new Array(flashcards.length).fill(-1) : []
    );
    const [isFlipped, setIsFlipped] = useState(false);
    const [completedCards, setCompletedCards] = useState(0);
    const [transitionState, setTransitionState] = useState<'idle' | 'exiting' | 'entering'>('idle');

    if (!flashcards || flashcards.length === 0) {
        return (
            <PlayerLayout>
                <div className="text-center p-8 text-gray-500 dark:text-gray-400 font-medium bg-white dark:bg-gray-800 rounded-2xl shadow-sm w-full">
                    {t('common.empty')}
                </div>
            </PlayerLayout>
        );
    }

    if (queue.length === 0 && scores.length > 0 && scores[0] !== -1) {
        return (
            <PlayerLayout>
                <div className="text-center p-8 text-brand-500 animate-pulse font-medium">
                    {t('lessons.computing_score')}
                </div>
            </PlayerLayout>
        );
    }

    if (queue.length === 0) return null;

    const currentItem = queue[0];
    const currentCard = currentItem.card;

    const handleFlip = () => {
        if (!isFlipped && transitionState === 'idle') setIsFlipped(true);
    };

    const handleAnswer = (level: 'red' | 'yellow' | 'green') => {
        if (transitionState !== 'idle') return;

        setTransitionState('exiting');

        // Wait for exit animation (300ms)
        setTimeout(() => {
            const { originalIndex } = currentItem;

            const newScores = [...scores];
            if (level === 'green') {
                newScores[originalIndex] = 100;
                playCorrect();
            } else if (level === 'yellow') {
                newScores[originalIndex] = 50;
            } else if (level === 'red') {
                newScores[originalIndex] = 0;
                playIncorrect();
            }
            setScores(newScores);

            const remainingQueue = queue.slice(1);
            let newQueue: QueuedCard[] = [];

            if (level === 'green') {
                newQueue = remainingQueue;
                setCompletedCards(prev => prev + 1);
            } else if (level === 'yellow') {
                // Return in ~5-10 min (approx 10 cards later)
                newQueue = [...remainingQueue];
                const insertIndex = Math.min(10, newQueue.length);
                newQueue.splice(insertIndex, 0, currentItem);
            } else if (level === 'red') {
                // Return in < 1 min (approx 3 cards later)
                newQueue = [...remainingQueue];
                const insertIndex = Math.min(3, newQueue.length);
                newQueue.splice(insertIndex, 0, currentItem);
            }

            // Update content while invisible
            setIsFlipped(false);
            setQueue(newQueue);

            if (newQueue.length === 0) {
                // Calculate final score: only count cards that were correctly answered (Green)
                const correctCount = newScores.filter(s => s === 100).length;
                const finalScore = Math.round((correctCount / flashcards.length) * 100);
                setTimeout(() => onFinish(finalScore, correctCount, flashcards.length), 400);
            } else {
                setTransitionState('entering');
                setTimeout(() => {
                    setTransitionState('idle');
                }, 50);
            }
        }, 300);
    };

    const getTransitionClasses = () => {
        switch (transitionState) {
            case 'exiting':
                return 'opacity-0 -translate-x-24 -rotate-6 pointer-events-none';
            case 'entering':
                return 'opacity-0 translate-x-24 rotate-6 pointer-events-none transition-none';
            default:
                return 'opacity-100 translate-x-0 rotate-0';
        }
    };

    // Calculate statuses for the segmented stepper
    const segmentStatuses = flashcards.map((_, idx) => {
        if (queue.length > 0 && idx === queue[0].originalIndex) return 'current';
        if (scores[idx] === 100) return 'correct';
        if (scores[idx] === 50) return 'medium';
        if (scores[idx] === 0) return 'incorrect';
        return 'pending';
    });

    return (
        <PlayerLayout>
            <PlayerHeader
                current={completedCards + 1}
                total={flashcards.length}
                statuses={segmentStatuses as SegmentStatus[]}
            />

            <div className="flex-1 overflow-y-auto min-h-0 py-4 flex flex-col">
                <div className="my-auto w-full py-4">
                    <div
                        className={`relative w-full aspect-[4/3] sm:aspect-[3/2] max-w-lg cursor-pointer group transition-all duration-300 ease-out mx-auto ${getTransitionClasses()}`}
                        style={{ perspective: '1200px' }}
                        onClick={handleFlip}
                    >
                        <div
                            className={`w-full h-full ${transitionState !== 'idle' ? 'transition-none' : 'transition-transform duration-700 ease-[cubic-bezier(0.4,0.0,0.2,1)]'}`}
                            style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'none' }}
                        >
                            <div className="absolute w-full h-full bg-white dark:bg-gray-800 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-gray-700/50 flex flex-col items-center justify-center p-6 text-center hover:border-brand-200 dark:hover:border-brand-700 transition-all overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
                                <span className="absolute top-6 right-8 text-[10px] font-black text-gray-300 dark:text-gray-500 uppercase tracking-[0.2em]">{currentCard.frontLanguage}</span>
                                <h3 className="text-3xl sm:text-5xl font-extrabold text-gray-800 dark:text-gray-100 break-words leading-tight tracking-tight">{currentCard.front}</h3>
                                {!isFlipped && transitionState === 'idle' && (
                                    <div className="absolute bottom-8 flex flex-col items-center animate-pulse">
                                        <p className="text-[10px] text-brand-500 dark:text-brand-400 font-black uppercase tracking-[0.2em] mt-2">
                                            {t('lessons.click_to_flip')}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="absolute w-full h-full bg-brand-50 dark:bg-brand-900/10 rounded-3xl shadow-[0_12px_40px_rgba(var(--brand-500-rgb),0.1)] border border-brand-100 dark:border-brand-800/50 flex flex-col items-center justify-center p-6 text-center overflow-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                <span className="absolute top-6 right-8 text-[10px] font-black text-brand-400/60 dark:text-brand-300 uppercase tracking-[0.2em]">{currentCard.backLanguage}</span>
                                <h3 className="text-3xl sm:text-5xl font-extrabold text-brand-900 dark:text-white break-words leading-tight tracking-tight">{currentCard.back}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PlayerFooter centerActions={true}>
                <div className={`transition-all duration-300 ${isFlipped && transitionState === 'idle' ? 'opacity-100 translate-y-0 scale-100 pb-2' : 'opacity-0 translate-y-4 scale-95 overflow-hidden pointer-events-none'}`}>
                    <div className="flex gap-4 justify-center max-w-md mx-auto">
                        <Button
                            variant="outline"
                            onClick={(e) => { e.stopPropagation(); handleAnswer('red'); }}
                            className="w-28 sm:w-36 py-5 bg-white dark:bg-gray-800 border-2 border-red-50 dark:border-red-900/20 text-red-500 dark:text-red-400 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-200 dark:hover:border-red-800 transition-all shadow-sm flex flex-col items-center justify-center font-bold focus:ring-0"
                            title={t('lessons.hard')}
                        >
                            <FaceSad className="w-8 h-8" />
                        </Button>

                        <Button
                            variant="outline"
                            onClick={(e) => { e.stopPropagation(); handleAnswer('yellow'); }}
                            className="w-28 sm:w-36 py-5 bg-white dark:bg-gray-800 border-2 border-yellow-50 dark:border-yellow-900/20 text-amber-500 dark:text-amber-400 rounded-2xl hover:bg-yellow-50 dark:hover:bg-yellow-900/30 hover:border-yellow-200 dark:hover:border-yellow-800 transition-all shadow-sm flex flex-col items-center justify-center font-bold focus:ring-0"
                            title={t('lessons.medium')}
                        >
                            <FaceNeutral className="w-8 h-8" />
                        </Button>

                        <Button
                            variant="outline"
                            onClick={(e) => { e.stopPropagation(); handleAnswer('green'); }}
                            className="w-28 sm:w-36 py-5 bg-white dark:bg-gray-800 border-2 border-emerald-50 dark:border-emerald-900/20 text-emerald-500 dark:text-emerald-400 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all shadow-sm flex flex-col items-center justify-center font-bold focus:ring-0"
                            title={t('lessons.easy')}
                        >
                            <FaceSmile className="w-8 h-8" />
                        </Button>
                    </div>
                </div>
            </PlayerFooter>
        </PlayerLayout>
    );
}
