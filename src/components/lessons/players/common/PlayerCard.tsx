import React from "react";

interface PlayerCardProps {
    children: React.ReactNode;
    instruction?: React.ReactNode;
}

export function PlayerCard({ children, instruction }: PlayerCardProps) {
    return (
        <div className="w-full bg-white dark:bg-gray-800 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-700 p-6 sm:p-10 mb-6 transition-all">
            {instruction && (
                <div className="mb-8 text-center">
                    {typeof instruction === "string" ? (
                        <h3 className="text-2xl sm:text-3xl font-medium text-gray-800 dark:text-gray-200 leading-tight">
                            {instruction}
                        </h3>
                    ) : (
                        instruction
                    )}
                </div>
            )}
            {children}
        </div>
    );
}
