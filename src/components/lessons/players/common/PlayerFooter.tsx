import React from "react";

interface PlayerFooterProps {
    children: React.ReactNode;
}

export function PlayerFooter({ children }: PlayerFooterProps) {
    return (
        <div className="w-full border-t border-gray-100 dark:border-gray-800/50 bg-white/30 dark:bg-gray-900/10 backdrop-blur-md">
            <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-4">
                {children}
            </div>
        </div>
    );
}
