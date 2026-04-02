import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SortingExerciseExamResponse } from "@/types/topic/topic";
import { PlayerCard } from "@/components/lessons/players/common/PlayerCard";

interface ExamSortingQuestionProps {
    exercise: SortingExerciseExamResponse;
    shuffledIndices: number[];
    userOrder: number[]; 
    onChange: (order: number[]) => void;
}

interface SortableItem {
    id: string;
    text: string;
    originalIndex: number;
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
                    <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold tracking-wide uppercase">
                        {t('lessons.sorting.instruction')}
                    </span>
                </div>
            }
        >
            <div className="w-full space-y-8 max-w-lg mx-auto">
                <div className="min-h-[140px] w-full border-t-2 border-b-2 border-dashed border-gray-100 py-8 px-4 flex flex-wrap gap-2 items-center justify-center content-start transition-all bg-gray-50/50 rounded-[2rem]">
                    {selectedItems.length === 0 && (
                        <span className="text-gray-400 font-medium select-none text-sm sm:text-base text-center">
                            {t('lessons.sorting.empty_target')}
                        </span>
                    )}
                    
                    {selectedItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => handleTargetDeselection(item)}
                            className="px-5 py-3 bg-white border-2 border-indigo-200 shadow-sm rounded-2xl text-indigo-900 font-medium text-[15px] sm:text-lg hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all active:scale-95 shadow-[0_4px_12px_rgb(0,0,0,0.03)]"
                        >
                            {item.text}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap gap-3 justify-center min-h-[100px] content-start">
                    {pool.map(item => (
                        <button
                            key={item.id}
                            onClick={() => handlePoolSelection(item)}
                            className="px-5 py-3 bg-white border-2 border-gray-100 shadow-sm rounded-2xl text-gray-800 font-medium text-[15px] sm:text-lg hover:border-indigo-400 hover:text-indigo-800 hover:shadow-md transition-all active:scale-95"
                        >
                            {item.text}
                        </button>
                    ))}
                </div>
            </div>
        </PlayerCard>
    );
}
