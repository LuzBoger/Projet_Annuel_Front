import { useTranslation } from "react-i18next";
import { FlashcardExamResponse } from "@/types/topic/topic";
import { useEffect, useRef } from "react";
import { PlayerCard } from "@/components/lessons/players/common/PlayerCard";

interface ExamFlashcardQuestionProps {
    flashcard: FlashcardExamResponse;
    value: string;
    onChange: (val: string) => void;
}

export function ExamFlashcardQuestion({ flashcard, value, onChange }: ExamFlashcardQuestionProps) {
    const { t } = useTranslation();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [flashcard.id]);

    return (
        <PlayerCard 
            instruction={
                <div className="flex justify-center mb-4">
                    <span className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-bold tracking-wide uppercase">
                        {t('topics.translate_or_answer')}
                    </span>
                </div>
            }
        >
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-10 text-center leading-tight">
                {flashcard.front}
            </h3>
            
            <div className="w-full max-w-lg mx-auto">
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={t('topics.type_answer_here')}
                    className="w-full p-5 sm:p-6 text-lg sm:text-xl text-center border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-800 placeholder:text-gray-300 dark:text-gray-200"
                />
            </div>
        </PlayerCard>
    );
}
