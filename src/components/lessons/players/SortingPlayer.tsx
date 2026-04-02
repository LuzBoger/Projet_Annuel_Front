import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SortingExerciseRequest } from "@/types/lesson/lesson";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "@/assets/icons";
import { PlayerLayout } from "./common/PlayerLayout";
import { PlayerHeader } from "./common/PlayerHeader";
import { PlayerCard } from "./common/PlayerCard";
import { PlayerFeedback } from "./common/PlayerFeedback";
import { PlayerFooter } from "./common/PlayerFooter";

interface SortingPlayerProps {
    exercises: SortingExerciseRequest[];
    onFinish: (score: number) => void;
}

interface SortableItem {
    id: string;
    text: string;
    originalIndex: number;
}

export function SortingPlayer({ exercises, onFinish }: SortingPlayerProps) {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pool, setPool] = useState<SortableItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<SortableItem[]>([]);
    const [isValidated, setIsValidated] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);

    useEffect(() => {
        if (!exercises || exercises.length === 0 || !exercises[currentIndex]) {
            return;
        }

        const currentExercise = exercises[currentIndex];
        
        const initialItems: SortableItem[] = currentExercise.items.map((text, index) => ({
            id: `item-${currentIndex}-${index}`,
            text,
            originalIndex: index
        }));

        for (let idx = initialItems.length - 1; idx > 0; idx--) {
            const randomIndex = Math.floor(Math.random() * (idx + 1));
            [initialItems[idx], initialItems[randomIndex]] = [initialItems[randomIndex], initialItems[idx]];
        }

        setPool(initialItems);
        setSelectedItems([]);
        setIsValidated(false);
        setIsCorrect(false);
    }, [exercises, currentIndex]);

    if (!exercises || exercises.length === 0) {
        return (
            <PlayerLayout>
                <div className="text-center p-8 text-gray-500 font-medium bg-white rounded-2xl shadow-sm w-full">
                    {t('common.empty')}
                </div>
            </PlayerLayout>
        );
    }

    const currentExercise = exercises[currentIndex];

    const expectedSequenceText = currentExercise.correctOrder
        ? currentExercise.correctOrder.map(idx => currentExercise.items[idx]).join(" ")
        : currentExercise.items.join(" ");

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

        const expectedOrder = currentExercise.correctOrder || currentExercise.items.map((_, i) => i);
        const isOrderCorrect = selectedItems.length === expectedOrder.length && 
                               selectedItems.every((item, index) => item.originalIndex === expectedOrder[index]);
        
        setIsCorrect(isOrderCorrect);
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

    return (
        <PlayerLayout>
            <PlayerHeader current={currentIndex + 1} total={exercises.length} />

            <PlayerCard instruction={t('lessons.sorting.instruction')}>
                <div className="space-y-8">
                    <div className="min-h-[140px] w-full border-t-2 border-b-2 border-dashed border-gray-200 py-6 px-4 flex flex-wrap gap-2 items-center justify-center content-start transition-all bg-gray-50/50 rounded-xl">
                        {selectedItems.length === 0 && (
                            <span className="text-gray-400 font-medium select-none text-sm sm:text-base text-center">
                                {t('lessons.sorting.empty_target')}
                            </span>
                        )}
                        
                        {selectedItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => handleTargetDeselection(item)}
                                disabled={isValidated}
                                className="px-4 py-2.5 bg-white border-2 border-indigo-200 shadow-sm rounded-xl text-indigo-900 font-medium text-[15px] sm:text-lg hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all active:scale-95 disabled:hover:scale-100 disabled:opacity-90 disabled:cursor-default"
                            >
                                {item.text}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2.5 justify-center min-h-[100px] content-start">
                        {pool.map(item => (
                            <button
                                key={item.id}
                                onClick={() => handlePoolSelection(item)}
                                disabled={isValidated}
                                className="px-4 py-2.5 bg-white border-2 border-gray-200 shadow-sm rounded-xl text-gray-800 font-medium text-[15px] sm:text-lg hover:border-indigo-400 hover:text-indigo-800 hover:shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {item.text}
                            </button>
                        ))}
                    </div>
                </div>
            </PlayerCard>

            <PlayerFeedback 
                isVisible={isValidated}
                isCorrect={isCorrect}
                title={isCorrect ? t('lessons.qcm.correct') : t('lessons.qcm.incorrect')}
                description={!isCorrect ? (
                    <>
                        {t('lessons.sorting.correct_order_prefix')} 
                        <strong className="font-bold ml-1">{expectedSequenceText}</strong>
                    </>
                ) : undefined}
            />

            <PlayerFooter>
                {!isValidated ? (
                    <Button 
                        onClick={handleValidationAction}
                        disabled={!isAllSelected}
                        fullWidth
                        size="lg"
                        className="py-6 font-medium text-lg shadow-sm rounded-2xl"
                    >
                        {t('lessons.sorting.validate')}
                    </Button>
                ) : (
                    <Button 
                        onClick={handleNextAction}
                        fullWidth
                        size="lg"
                        className="py-6 !bg-gray-900 hover:!bg-gray-800 text-white rounded-2xl font-medium text-lg shadow-sm flex items-center justify-center gap-2"
                    >
                        <span>{currentIndex < exercises.length - 1 ? t('lessons.sorting.next') : t('lessons.finish')}</span>
                        {currentIndex < exercises.length - 1 && <ChevronRight className="w-5 h-5 ml-2" />}
                    </Button>
                )}
            </PlayerFooter>
        </PlayerLayout>
    );
}
