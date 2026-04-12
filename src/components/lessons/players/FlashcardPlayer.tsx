import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlashcardRequest } from "@/types/lesson/lesson";
import { QueuedCard } from "@/types/components/flashcard";
import { Button } from "@/components/ui/Button";
import { FaceSad, FaceNeutral, FaceSmile } from "@/assets/icons";
import { PlayerLayout } from "./common/PlayerLayout";
import { PlayerHeader } from "./common/PlayerHeader";

interface FlashcardPlayerProps {
    flashcards: FlashcardRequest[];
    onFinish: (score: number) => void;
}

export function FlashcardPlayer({ flashcards, onFinish }: FlashcardPlayerProps) {
    const { t } = useTranslation();
    const [queue, setQueue] = useState<QueuedCard[]>(() => 
        flashcards ? flashcards.map((card, i) => ({ originalIndex: i, card })) : []
    );
    const [scores, setScores] = useState<number[]>(() => 
        flashcards ? new Array(flashcards.length).fill(-1) : []
    );
    const [isFlipped, setIsFlipped] = useState(false);
    const [completedCards, setCompletedCards] = useState(0);

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
        if (!isFlipped) setIsFlipped(true);
    };

    const handleAnswer = (level: 'red' | 'yellow' | 'green') => {
        const { originalIndex } = currentItem;
        
        const newScores = [...scores];
        if (newScores[originalIndex] === -1) {
            if (level === 'green') newScores[originalIndex] = 100;
            else if (level === 'yellow') newScores[originalIndex] = 50;
            else if (level === 'red') newScores[originalIndex] = 0;
            setScores(newScores);
        }

        const remainingQueue = queue.slice(1);
        let newQueue: QueuedCard[] = [];

        if (level === 'green') {
            newQueue = remainingQueue;
            setCompletedCards(prev => prev + 1);
        } else if (level === 'yellow') {
            newQueue = [...remainingQueue, currentItem];
        } else if (level === 'red') {
            newQueue = [...remainingQueue];
            const insertIndex = Math.min(2, newQueue.length);
            newQueue.splice(insertIndex, 0, currentItem);
        }

        setIsFlipped(false);
        setQueue(newQueue);

        if (newQueue.length === 0) {
            const totalScore = newScores.reduce((acc, curr) => acc + curr, 0);
            const finalScore = Math.round(totalScore / flashcards.length);
            setTimeout(() => onFinish(finalScore), 400);
        }
    };

    return (
        <PlayerLayout>
            <PlayerHeader current={completedCards} total={flashcards.length} />

            <div 
                className="relative w-full aspect-[4/3] sm:aspect-[3/2] max-w-lg cursor-pointer group"
                style={{ perspective: '1200px' }}
                onClick={handleFlip}
            >
                <div 
                    className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0.0,0.2,1)]"
                    style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'none' }}
                >
                    <div className="absolute w-full h-full bg-white dark:bg-gray-800 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center p-10 text-center hover:border-brand-100 dark:hover:border-brand-900/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all" style={{ backfaceVisibility: 'hidden' }}>
                        <span className="absolute top-6 right-8 text-xs font-bold text-gray-300 dark:text-gray-400 uppercase tracking-widest">{currentCard.frontLanguage}</span>
                        <h3 className="text-3xl sm:text-5xl font-extrabold text-gray-800 dark:text-gray-200 break-words leading-tight">{currentCard.front}</h3>
                        {!isFlipped && (
                            <div className="absolute bottom-8 flex flex-col items-center animate-bounce">
                                <p className="text-sm text-brand-400 font-bold uppercase tracking-widest mt-2 hidden sm:block">
                                    {t('lessons.click_to_flip')}
                                </p>
                            </div>
                        )}
                    </div>
                    
                    <div className="absolute w-full h-full bg-brand-50 dark:bg-brand-900/20 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-brand-100 dark:border-brand-700 flex flex-col items-center justify-center p-10 text-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        <span className="absolute top-6 right-8 text-xs font-bold text-brand-300 dark:text-brand-400 uppercase tracking-widest">{currentCard.backLanguage}</span>
                        <h3 className="text-3xl sm:text-5xl font-extrabold text-brand-900 dark:text-brand-200 break-words leading-tight">{currentCard.back}</h3>
                    </div>
                </div>
            </div>

            <div className={`mt-10 w-full max-w-lg transition-all duration-500 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                <div className="flex gap-4">
                    <Button 
                        variant="outline"
                        onClick={(e) => { e.stopPropagation(); handleAnswer('red'); }}
                        className="flex-1 py-8 bg-white dark:bg-gray-800 border-2 border-red-50 dark:border-red-900/30 text-red-500 dark:text-red-400 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-100 dark:hover:border-red-900/30 transition-colors shadow-sm flex flex-col items-center justify-center font-bold"
                        title={t('lessons.hard')}
                    >
                        <FaceSad className="w-8 h-8" />
                    </Button>
                    
                    <Button 
                        variant="outline"
                        onClick={(e) => { e.stopPropagation(); handleAnswer('yellow'); }}
                        className="flex-1 py-8 bg-white dark:bg-gray-800 border-2 border-yellow-50 dark:border-yellow-900/30 text-amber-500 dark:!text-amber-400 rounded-2xl hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:border-yellow-100 dark:hover:border-yellow-900/30 transition-colors shadow-sm flex flex-col items-center justify-center font-bold"
                        title={t('lessons.medium')}
                    >
                        <FaceNeutral className="w-8 h-8" />
                    </Button>

                    <Button 
                        variant="outline"
                        onClick={(e) => { e.stopPropagation(); handleAnswer('green'); }}
                        className="flex-1 py-8 bg-white dark:bg-gray-800 border-2 border-emerald-50 dark:border-emerald-900/30 text-emerald-500 dark:!text-emerald-400 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-100 dark:hover:border-emerald-900/30 transition-colors shadow-sm flex flex-col items-center justify-center font-bold"
                        title={t('lessons.easy')}
                    >
                        <FaceSmile className="w-8 h-8" />
                    </Button>
                </div>
            </div>
        </PlayerLayout>
    );
}
