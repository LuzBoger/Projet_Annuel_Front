import { Check, Cross } from "@/assets/icons";
import React from "react";

interface PlayerFeedbackProps {
    isVisible: boolean;
    isCorrect: boolean;
    title?: string;
    description?: React.ReactNode;
    extra?: React.ReactNode;
}

export function PlayerFeedback({ isVisible, isCorrect, title, description, extra }: PlayerFeedbackProps) {
    if (!isVisible) return null;

    return (
        <div className={`w-full p-6 rounded-2xl mb-6 shadow-xl border border-gray-100 dark:border-gray-800 border-l-4 flex items-start gap-5 animate-[fade-in-up_0.3s_ease-out] bg-white dark:bg-gray-900 ${
            isCorrect ? 'border-l-emerald-500' : 'border-l-red-500'
        }`}>
            <div className={`mt-0.5 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'
            }`}>
                {isCorrect ? <Check className="w-6 h-6 flex-shrink-0" /> : <Cross className="w-6 h-6 flex-shrink-0" />}
            </div>
            <div className="flex-1">
                {title && (
                    <h4 className={`font-bold text-xl mb-1 ${
                        isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'
                    }`}>
                        {title}
                    </h4>
                )}
                {description && (
                    <div className="text-[15px] leading-relaxed select-none text-gray-600 dark:text-gray-300">
                        {description}
                    </div>
                )}
                {extra && <div className="mt-3">{extra}</div>}
            </div>
        </div>
    );
}
