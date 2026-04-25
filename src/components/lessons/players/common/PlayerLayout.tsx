import React from "react";

interface PlayerLayoutProps {
    children: React.ReactNode;
    maxWidth?: string;
}

export function PlayerLayout({ children }: PlayerLayoutProps) {
    return (
        <div className="flex flex-col items-stretch w-full flex-1 min-h-0">
            {children}
        </div>
    );
}
