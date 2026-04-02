import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SortingExerciseExamResponse } from "@/types/topic/topic";

interface ExamSortingQuestionProps {
    exercise: SortingExerciseExamResponse;
    userOrder: number[]; 
    onChange: (order: number[]) => void;
}

interface SortableItem {
    id: string;
    text: string;
    originalIndex: number;
}

export function ExamSortingQuestion({ exercise, userOrder, onChange }: ExamSortingQuestionProps) {
    const { t } = useTranslation();
    const [pool, setPool] = useState<SortableItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<SortableItem[]>([]);

    useEffect(() => {
        const initialItems: SortableItem[] = exercise.items.map((text, index) => ({
            id: `item-${exercise.id}-${index}`,
            text,
            originalIndex: index
        }));

        // Si l'utilisateur d'un exam précédent ou lors de la navigation a déjà complété son ordre
        if (userOrder && userOrder.length > 0) {
            const newSelected = userOrder.map(idx => initialItems.find(item => item.originalIndex === idx)!).filter(Boolean);
            const selectedOriginalIndices = newSelected.map(i => i.originalIndex);
            
            const newPool = initialItems.filter(item => !selectedOriginalIndices.includes(item.originalIndex));
            
            setSelectedItems(newSelected);
            setPool(newPool);
        } else {
            // Mélanger le pool initialement
            for (let i = initialItems.length - 1; i > 0; i--) {
                const randomIndex = Math.floor(Math.random() * (i + 1));
                [initialItems[i], initialItems[randomIndex]] = [initialItems[randomIndex], initialItems[i]];
            }
            setPool(initialItems);
            setSelectedItems([]);
        }
    }, [exercise, userOrder]);

    const handlePoolSelection = (item: SortableItem) => {
        const newSelected = [...selectedItems, item];
        setSelectedItems(newSelected);
        setPool(prev => prev.filter(p => p.id !== item.id));
        
        onChange(newSelected.map(i => i.originalIndex));
    };

    const handleTargetDeselection = (item: SortableItem) => {
        const newSelected = selectedItems.filter(i => i.id !== item.id);
        setSelectedItems(newSelected);
        setPool(prev => [...prev, item]);
        
        onChange(newSelected.map(i => i.originalIndex));
    };

    return (
        <div className="w-full bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-10 mb-6 flex flex-col items-center">
            <div className="flex justify-center mb-8">
                <span className="px-4 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-bold tracking-wide uppercase">
                    {t('lessons.sorting.instruction', 'Remettez dans l\'ordre')}
                </span>
            </div>

            <div className="w-full space-y-8 max-w-lg mx-auto">
                <div className="min-h-[140px] w-full border-t-2 border-b-2 border-dashed border-gray-200 py-6 px-4 flex flex-wrap gap-2 items-center justify-center content-start transition-all bg-gray-50/50 rounded-xl">
                    {selectedItems.length === 0 && (
                        <span className="text-gray-400 font-medium select-none text-sm sm:text-base text-center">
                            {t('lessons.sorting.empty_target', 'Sélectionnez les éléments')}
                        </span>
                    )}
                    
                    {selectedItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => handleTargetDeselection(item)}
                            className="px-4 py-2.5 bg-white border-2 border-amber-200 shadow-sm rounded-xl text-amber-900 font-medium text-[15px] sm:text-lg hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all active:scale-95"
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
                            className="px-4 py-2.5 bg-white border-2 border-gray-200 shadow-sm rounded-xl text-gray-800 font-medium text-[15px] sm:text-lg hover:border-amber-400 hover:text-amber-800 hover:shadow-md transition-all active:scale-95"
                        >
                            {item.text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
