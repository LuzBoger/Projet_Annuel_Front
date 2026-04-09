import { SortableItem } from "@/types/components/sorting";
import { SortingExerciseRequest } from "@/types/lesson/lesson";

export const initPool = (exercises: SortingExerciseRequest[], currentIndex: number): SortableItem[] => {
    if (!exercises || exercises.length === 0 || !exercises[currentIndex]) return [];
    
    const currentExercise = exercises[currentIndex];
    const items: SortableItem[] = currentExercise.items.map((text, index) => ({
        id: `item-${currentIndex}-${index}`,
        text,
        originalIndex: index
    }));

    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
};