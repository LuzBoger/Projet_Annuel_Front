import React from "react";
import { Check, Cross } from "@/assets/icons";

interface PlayerFooterProps {
    children: React.ReactNode;
    feedback?: React.ReactNode;
    isCorrect?: boolean;
    isVisible?: boolean;
    centerActions?: boolean;
}

export function PlayerFooter({ children, feedback, isCorrect, isVisible, centerActions }: PlayerFooterProps) {
    return (
        <div className={`w-full border-t transition-all duration-300 ${
            isVisible 
                ? (isCorrect 
                    ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50" 
                    : "bg-red-50/90 dark:bg-red-950/40 border-red-200 dark:border-red-800/50")
                : "bg-white/30 dark:bg-gray-900/10 border-gray-100 dark:border-gray-800/50 backdrop-blur-md"
        }`}>
            <div className={`max-w-5xl mx-auto w-full px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center ${
                !isVisible && centerActions ? 'justify-center' : 'justify-between'
            } gap-4`}>
                <div className={`${isVisible ? 'flex-1' : (centerActions ? 'hidden' : 'hidden sm:block')} w-full sm:w-auto`}>
                    {isVisible && (
                        <div className="flex items-start gap-3 animate-in fade-in slide-in-from-left-4 duration-300">
                            <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                                isCorrect ? "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400" : "bg-red-100 dark:bg-red-900/60 text-red-600 dark:text-red-400"
                            }`}>
                                {isCorrect ? <Check className="w-5 h-5" /> : <Cross className="w-5 h-5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                {feedback}
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-full sm:w-auto flex-shrink-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
