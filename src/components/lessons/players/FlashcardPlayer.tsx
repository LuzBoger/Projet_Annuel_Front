import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlashcardRequest } from "@/types/lesson/lesson";
import { Button } from "@/components/ui/Button";
import { FaceSad, FaceNeutral, FaceSmile } from "@/assets/icons";

interface FlashcardPlayerProps {
    flashcards: FlashcardRequest[];
    onFinish: (score: number) => void;
}

interface QueuedCard {
    originalIndex: number;
    card: FlashcardRequest;
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
            <div className="text-center p-8 text-gray-500 font-medium bg-white rounded-2xl shadow-sm">
                {t('common.empty')}
            </div>
        );
    }

    if (queue.length === 0 && scores.length > 0 && scores[0] !== -1) {
        return (
            <div className="text-center p-8 text-indigo-500 animate-pulse font-medium">
                {t('lessons.computing_score')}
            </div>
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
        <div className="flex flex-col items-center max-w-2xl mx-auto w-full pb-8">
            <div className="w-full mb-8">
                <div className="flex justify-between text-sm font-medium text-gray-500 mb-3">
                    <span className="uppercase tracking-widest text-[10px] sm:text-xs text-indigo-500 font-bold">
                        {t('lessons.progress')}
                    </span>
                    <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                        {completedCards} / {flashcards.length}
                    </span>
                </div>
                <div className="w-full bg-gray-200/50 rounded-full h-3 shadow-inner overflow-hidden">
                    <div 
                        className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${(completedCards / flashcards.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div 
                className="relative w-full aspect-[4/3] sm:aspect-[3/2] max-w-lg cursor-pointer group"
                style={{ perspective: '1200px' }}
                onClick={handleFlip}
            >
                <div 
                    className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0.0,0.2,1)]"
                    style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'none' }}
                >
                    <div className="absolute w-full h-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-center p-10 text-center hover:border-indigo-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all" style={{ backfaceVisibility: 'hidden' }}>
                        <span className="absolute top-6 right-8 text-xs font-bold text-gray-300 uppercase tracking-widest">{currentCard.frontLanguage}</span>
                        <h3 className="text-3xl sm:text-5xl font-extrabold text-gray-800 break-words leading-tight">{currentCard.front}</h3>
                        {!isFlipped && (
                            <div className="absolute bottom-8 flex flex-col items-center animate-bounce">
                                <p className="text-sm text-indigo-400 font-bold uppercase tracking-widest mt-2 hidden sm:block">
                                    {t('lessons.click_to_flip')}
                                </p>
                            </div>
                        )}
                    </div>
                    
                    <div className="absolute w-full h-full bg-indigo-50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-indigo-100 flex flex-col items-center justify-center p-10 text-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        <span className="absolute top-6 right-8 text-xs font-bold text-indigo-300 uppercase tracking-widest">{currentCard.backLanguage}</span>
                        <h3 className="text-3xl sm:text-5xl font-extrabold text-indigo-900 break-words leading-tight">{currentCard.back}</h3>
                    </div>
                </div>
            </div>

            <div className={`mt-10 w-full max-w-lg transition-all duration-500 ${isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                <div className="flex gap-4">
                    <Button 
                        variant="outline"
                        onClick={(e) => { e.stopPropagation(); handleAnswer('red'); }}
                        className="flex-1 py-8 bg-white border-2 border-red-50 text-red-500 rounded-2xl hover:bg-red-50 hover:border-red-100 transition-colors shadow-sm flex flex-col items-center justify-center font-bold"
                        title={t('lessons.hard')}
                    >
                        <FaceSad className="w-8 h-8" />
                    </Button>
                    
                    <Button 
                        variant="outline"
                        onClick={(e) => { e.stopPropagation(); handleAnswer('yellow'); }}
                        className="flex-1 py-8 bg-white border-2 border-yellow-50 text-amber-500 rounded-2xl hover:bg-yellow-50 hover:border-yellow-100 transition-colors shadow-sm flex flex-col items-center justify-center font-bold"
                        title={t('lessons.medium')}
                    >
                        <FaceNeutral className="w-8 h-8" />
                    </Button>

                    <Button 
                        variant="outline"
                        onClick={(e) => { e.stopPropagation(); handleAnswer('green'); }}
                        className="flex-1 py-8 bg-white border-2 border-emerald-50 text-emerald-500 rounded-2xl hover:bg-emerald-50 hover:border-emerald-100 transition-colors shadow-sm flex flex-col items-center justify-center font-bold"
                        title={t('lessons.easy')}
                    >
                        <FaceSmile className="w-8 h-8" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
