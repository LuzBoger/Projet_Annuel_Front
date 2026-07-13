import { useMemo } from "react";
import { QcmQuestionExamResponse } from "@/types/topic/topic";
import { PlayerCard } from "@/components/lessons/players/common/PlayerCard";
import { Button } from "@/components/ui/Button";
import { shuffleArray } from "@/lib/utils/topic";

interface ExamQcmQuestionProps {
    question: QcmQuestionExamResponse;
    selectedValue: number | null;
    onSelect: (originalOptionIndex: number) => void;
}

interface ShuffledOption {
    optionText: string;
    originalOptionIndex: number;
}

export function ExamQcmQuestion({ question, selectedValue, onSelect }: ExamQcmQuestionProps) {
    // Les options sont melangees au chargement de chaque question pour conserver un affichage stable.
    const shuffledOptions = useMemo<ShuffledOption[]>(() => {
        const mappedOptions = question.options.map((optionText, originalOptionIndex) => ({
            optionText,
            originalOptionIndex,
        }));

        return shuffleArray(mappedOptions);
    }, [question]);

    return (
        <PlayerCard instruction={question.question}>
            <div className="space-y-4">
                {shuffledOptions.map((item, displayIndex) => {
                    const isSelected = selectedValue === item.originalOptionIndex;
        
                    return (
                        <Button 
                            key={item.originalOptionIndex} 
                            onClick={() => onSelect(item.originalOptionIndex)}
                            variant="none"
                            className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 font-medium text-[15px] sm:text-lg flex items-center group ${
                                isSelected
                                    ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-800 dark:text-brand-200 shadow-sm"
                                    : "border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
                            }`}
                        >
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 text-center mr-4 text-sm font-medium flex-shrink-0 transition-all ${
                                isSelected
                                    ? "bg-brand-500 border-brand-500 text-white"
                                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 group-hover:border-brand-200 dark:group-hover:border-brand-700 group-hover:text-brand-400 dark:group-hover:text-brand-300 group-hover:bg-brand-50/30 dark:group-hover:bg-brand-900/20"
                            }`}>
                                {String.fromCharCode(65 + displayIndex)}
                            </span>
                            <span className="flex-1">{item.optionText}</span>
                        </Button>
                    );
                })}
            </div>
        </PlayerCard>
    );
}

