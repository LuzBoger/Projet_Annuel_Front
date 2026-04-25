import { ChevronDown } from "@/assets/icons";
import { Button } from "@/components/ui/Button";
import { ReactNode } from "react";

interface SelectedLanguagesButtonProps {
    isOpen: boolean;
    onClick: () => void;
    children?: ReactNode;
}

export function SelectedLanguagesButton({ isOpen, onClick, children }: SelectedLanguagesButtonProps) {
    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={onClick}
            className="flex items-center gap-1"
        >
            {children}
            <ChevronDown className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </Button>

    );
}
