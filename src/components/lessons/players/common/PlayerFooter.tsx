import React from "react";

interface PlayerFooterProps {
    children: React.ReactNode;
}

export function PlayerFooter({ children }: PlayerFooterProps) {
    return (
        <div className="w-full">
            {children}
        </div>
    );
}
