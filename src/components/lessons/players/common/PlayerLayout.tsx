import React from "react";

interface PlayerLayoutProps {
    children: React.ReactNode;
    maxWidth?: string;
}

export function PlayerLayout({ children, maxWidth = "max-w-2xl" }: PlayerLayoutProps) {
    return (
        <div className={`flex flex-col items-stretch ${maxWidth} mx-auto w-full flex-1 min-h-0 px-4 sm:px-0`}>
            {children}
        </div>
    );
}
