import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SortableItem } from "@/types/components/sorting";
import { SortingExerciseExamResponse } from "@/types/topic/topic";
import { PlayerCard } from "@/components/lessons/players/common/PlayerCard";
import { Button } from "@/components/ui/Button";

interface ExamSortingQuestionProps {
    exercise: SortingExerciseExamResponse;
    shuffledIndices: number[];
    userOrder: number[];
    onChange: (order: number[]) => void;
}

export function ExamSortingQuestion({ exercise, shuffledIndices, userOrder, onChange }: ExamSortingQuestionProps) {
    const { t } = useTranslation();

    const initialItems = useMemo(() => exercise.items.map((text, index) => ({
        id: `item-${exercise.id}-${index}`,
        text,
        originalIndex: index
    })), [exercise]);

    const selectedItems = useMemo(() =>
        userOrder.map(idx => initialItems.find(item => item.originalIndex === idx)!).filter(Boolean)
        , [initialItems, userOrder]);

    const pool = useMemo(() => {
        const selectedIndices = new Set(userOrder);
        return shuffledIndices
            .map(idx => initialItems[idx])
            .filter(item => !selectedIndices.has(item.originalIndex));
    }, [initialItems, shuffledIndices, userOrder]);

    const handlePoolSelection = (item: SortableItem) => {
        onChange([...userOrder, item.originalIndex]);
    };

    const handleTargetDeselection = (item: SortableItem) => {
        onChange(userOrder.filter(idx => idx !== item.originalIndex));
    };

    return (
        <PlayerCard
            instruction={
                <div className="flex justify-center mb-4">
                    <span className="px-4 py-1.5 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 rounded-full text-sm font-bold tracking-wide uppercase">
                        {t('lessons.sorting.instruction')}
                    </span>
                </div>
            }
        >
            <div className="w-full space-y-8 max-w-lg mx-auto">
                <div className="min-h-[140px] w-full border-t-2 border-b-2 border-dashed border-gray-100 dark:border-gray-700 py-8 px-4 flex flex-wrap gap-2 items-center justify-center content-start transition-all bg-gray-50/50 dark:bg-gray-700/50 rounded-[2rem]">
                    {selectedItems.length === 0 && (
                        <span className="text-gray-400 dark:text-gray-500 font-medium select-none text-sm sm:text-base text-center">
                            {t('lessons.sorting.empty_target')}
                        </span>
                    )}

                    {selectedItems.map(item => (
                        <Button
                            key={item.id}
                            variant="none"
                            onClick={() => handleTargetDeselection(item)}
                            className="px-5 py-3 bg-white dark:bg-gray-700 border-2 border-brand-200 dark:border-brand-700 shadow-sm rounded-2xl text-brand-900 dark:text-brand-200 font-medium text-[15px] sm:text-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-700 hover:text-red-700 dark:hover:text-red-300 transition-all active:scale-95 shadow-[0_4px_12px_rgb(0,0,0,0.03)]"
                        >
                            {item.text}
                        </Button>
                    ))}
                </div>

                <div className="flex flex-wrap gap-3 justify-center min-h-[100px] content-start">
                    {pool.map(item => (
                        <Button
                            key={item.id}
                            variant="none"
                            onClick={() => handlePoolSelection(item)}
                            className="px-5 py-3 bg-white dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-700 shadow-sm rounded-2xl text-gray-800 dark:text-gray-200 font-medium text-[15px] sm:text-lg hover:border-brand-400 dark:hover:border-brand-500 hover:text-brand-800 dark:hover:text-brand-200 hover:shadow-md transition-all active:scale-95"
                        >
                            {item.text}
                        </Button>
                    ))}
                </div>
            </div>
        </PlayerCard>
    );
}
