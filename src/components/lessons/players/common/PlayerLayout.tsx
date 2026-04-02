import React from "react";

interface PlayerLayoutProps {
    children: React.ReactNode;
    maxWidth?: string;
}

export function PlayerLayout({ children, maxWidth = "max-w-2xl" }: PlayerLayoutProps) {
    return (
        <div className={`flex flex-col items-center ${maxWidth} mx-auto w-full pb-8 px-4 sm:px-0`}>
            {children}
        </div>
    );
}
