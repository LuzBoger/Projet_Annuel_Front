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
        <div className={`w-full p-5 rounded-2xl mb-6 border-2 flex items-start gap-4 animate-[fade-in-up_0.3s_ease-out] ${
            isCorrect 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-900' 
                : 'bg-red-50 border-red-100 text-red-900'
        }`}>
            <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                isCorrect ? 'bg-emerald-200 text-emerald-800' : 'bg-red-200 text-red-800'
            }`}>
                {isCorrect ? <Check className="w-5 h-5 flex-shrink-0" /> : <Cross className="w-5 h-5 flex-shrink-0" />}
            </div>
            <div>
                {title && <h4 className="font-semibold text-lg mb-1 text-gray-900">{title}</h4>}
                {description && (
                    <p className="opacity-90 font-medium text-sm leading-relaxed mt-1 text-gray-700">
                        {description}
                    </p>
                )}
                {extra && <div className="mt-2">{extra}</div>}
            </div>
        </div>
    );
}
