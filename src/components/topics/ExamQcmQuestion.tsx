import { QcmQuestionExamResponse } from "@/types/topic/topic";
import { PlayerCard } from "@/components/lessons/players/common/PlayerCard";
import { Button } from "@/components/ui/Button";

interface ExamQcmQuestionProps {
    question: QcmQuestionExamResponse;
    selectedValue: number | null;
    onSelect: (index: number) => void;
}

export function ExamQcmQuestion({ question, selectedValue, onSelect }: ExamQcmQuestionProps) {
    return (
        <PlayerCard instruction={question.question}>
            <div className="space-y-4">
                {question.options.map((option, idx) => {
                    const isSelected = selectedValue === idx;
        
                    return (
                        <Button 
                            key={idx} 
                            onClick={() => onSelect(idx)}
                            variant="none"
                            className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 font-medium text-[15px] sm:text-lg flex items-center group ${
                                isSelected
                                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200 shadow-sm"
                                    : "border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
                            }`}
                        >
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 text-center mr-4 text-sm font-medium flex-shrink-0 transition-all ${
                                isSelected
                                    ? "bg-indigo-500 border-indigo-500 text-white"
                                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 group-hover:border-indigo-200 dark:group-hover:border-indigo-700 group-hover:text-indigo-400 dark:group-hover:text-indigo-300 group-hover:bg-indigo-50/30 dark:group-hover:bg-indigo-900/20"
                            }`}>
                                {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="flex-1">{option}</span>
                        </Button>
                    );
                })}
            </div>
        </PlayerCard>
    );
}
