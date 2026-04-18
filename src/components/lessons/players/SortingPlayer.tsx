import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SortableItem } from "@/types/components/sorting";
import { SortingExerciseRequest } from "@/types/lesson/lesson";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "@/assets/icons";
import { PlayerLayout } from "@/components/lessons/players/common/PlayerLayout";
import { PlayerHeader } from "@/components/lessons/players/common/PlayerHeader";
import { PlayerCard } from "@/components/lessons/players/common/PlayerCard";
import { PlayerFeedback } from "@/components/lessons/players/common/PlayerFeedback";
import { PlayerFooter } from "@/components/lessons/players/common/PlayerFooter";
import { initPool } from "@/lib/utils/sorting";
interface SortingPlayerProps {
    exercises: SortingExerciseRequest[];
    onFinish: (score: number) => void;
}

export function SortingPlayer({ exercises, onFinish }: SortingPlayerProps) {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(currentIndex);
    const [prevExercises, setPrevExercises] = useState(exercises);
    const [pool, setPool] = useState(() => initPool(exercises, currentIndex));
    const [selectedItems, setSelectedItems] = useState<SortableItem[]>([]);
    const [isValidated, setIsValidated] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [results, setResults] = useState<('correct' | 'incorrect' | 'pending')[]>(
        new Array(exercises.length).fill('pending')
    );

    if (currentIndex !== prevIndex || exercises !== prevExercises) {
        setPrevIndex(currentIndex);
        setPrevExercises(exercises);
        setPool(initPool(exercises, currentIndex));
        setSelectedItems([]);
        setIsValidated(false);
        setIsCorrect(false);
    }

    if (!exercises || exercises.length === 0) {
        return (
            <PlayerLayout>
                <div className="text-center p-8 text-gray-500 font-medium bg-white dark:bg-gray-800 rounded-2xl shadow-sm w-full">
                    {t('common.empty')}
                </div>
            </PlayerLayout>
        );
    }

    const currentExercise = exercises[currentIndex];

    const expectedSequenceText = currentExercise?.items 
        ? (currentExercise.correctOrder
            ? currentExercise.correctOrder.map(idx => currentExercise.items[idx])
            : currentExercise.items
          ).join(" ")
        : "";

    const handlePoolSelection = (item: SortableItem) => {
        if (isValidated) return;
        setPool(previous => previous.filter(poolItem => poolItem.id !== item.id));
        setSelectedItems(previous => [...previous, item]);
    };

    const handleTargetDeselection = (item: SortableItem) => {
        if (isValidated) return;
        setSelectedItems(previous => previous.filter(selectedItem => selectedItem.id !== item.id));
        setPool(previous => [...previous, item]);
    };

    const handleValidationAction = () => {
        if (selectedItems.length === 0) return;
        setIsValidated(true);

        const expectedOrder = currentExercise.correctOrder || (currentExercise.items?.map((_, i) => i) || []);
        const isOrderCorrect = selectedItems.length === expectedOrder.length && selectedItems.every((item, index) => item.originalIndex === expectedOrder[index]);
        
        setIsCorrect(isOrderCorrect);
        
        const newResults = [...results];
        newResults[currentIndex] = isOrderCorrect ? 'correct' : 'incorrect';
        setResults(newResults);

        if (isOrderCorrect) setCorrectCount(previous => previous + 1);
    };

    const handleNextAction = () => {
        if (currentIndex < exercises.length - 1) {
            setCurrentIndex(previous => previous + 1);
        } else {
            const finalScore = Math.round((correctCount / exercises.length) * 100);
            onFinish(finalScore);
        }
    };

    const isAllSelected = pool.length === 0;

    // Compute statuses for header
    const statuses = exercises.map((_, idx) => {
        if (idx === currentIndex) return 'current';
        return results[idx];
    });

    return (
        <PlayerLayout>
            <PlayerHeader 
                current={currentIndex + 1} 
                total={exercises.length} 
                statuses={statuses as any}
            />

            <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
                <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 my-auto">
                    <div className="space-y-4">
                        <PlayerCard instruction={t('lessons.sorting.instruction')}>
                        <div className="space-y-8">
                            <div className="min-h-[140px] w-full border-t-2 border-b-2 border-dashed border-gray-200 dark:border-gray-600 py-6 px-4 flex flex-wrap gap-2 items-center justify-center content-start transition-all bg-gray-50/50 dark:bg-gray-700/30 rounded-xl">
                                {selectedItems.length === 0 && (
                                    <span className="text-gray-400 font-medium select-none text-sm sm:text-base text-center">
                                        {t('lessons.sorting.empty_target')}
                                    </span>
                                )}
                                
                                {selectedItems.map(item => (
                                    <Button
                                        key={item.id}
                                        variant="none"
                                        onClick={() => handleTargetDeselection(item)}
                                        disabled={isValidated}
                                        className="px-4 py-2.5 bg-white dark:bg-gray-800 border-2 border-brand-200 dark:border-brand-900/50 shadow-sm rounded-xl text-brand-900 dark:text-brand-300 font-medium text-[15px] sm:text-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-900/30 hover:text-red-700 dark:hover:text-red-400 transition-all active:scale-95 disabled:hover:scale-100 disabled:opacity-90 disabled:cursor-default"
                                    >
                                        {item.text}
                                    </Button>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2.5 justify-center min-h-[100px] content-start">
                                {pool.map(item => (
                                    <Button
                                        key={item.id}
                                        variant="none"
                                        onClick={() => handlePoolSelection(item)}
                                        disabled={isValidated}
                                        className="px-4 py-2.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-sm rounded-xl text-gray-800 dark:text-gray-200 font-medium text-[15px] sm:text-lg hover:border-brand-400 dark:hover:border-brand-500 hover:text-brand-800 dark:hover:text-brand-300 hover:shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {item.text}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </PlayerCard>

                        {/* Feedback has been moved to the footer */}
                    </div>
                </div>
            </div>

            <PlayerFooter 
                isVisible={isValidated}
                isCorrect={isCorrect}
                feedback={
                    <div className="space-y-0.5">
                        <h4 className={`font-bold text-lg ${isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                            {isCorrect ? t('lessons.qcm.correct') : t('lessons.qcm.incorrect')}
                        </h4>
                        {!isCorrect && (
                            <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                                {t('lessons.sorting.correct_order_prefix')} <strong className="font-bold">{expectedSequenceText}</strong>
                            </p>
                        )}
                    </div>
                }
            >
                {!isValidated ? (
                    <Button 
                        onClick={handleValidationAction}
                        disabled={!isAllSelected}
                        size="lg"
                        className="px-12 rounded-xl font-bold shadow-md"
                    >
                        {t('lessons.sorting.validate')}
                    </Button>
                ) : (
                    <Button 
                        onClick={handleNextAction}
                        size="lg"
                        className="px-12 !bg-gray-900 dark:!bg-gray-700 hover:!bg-gray-800 dark:hover:!bg-gray-600 text-white rounded-xl font-bold shadow-md flex items-center justify-center gap-2"
                    >
                        <span>{currentIndex < exercises.length - 1 ? t('lessons.sorting.next') : t('lessons.finish')}</span>
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                )}
            </PlayerFooter>
        </PlayerLayout>
    );
}
