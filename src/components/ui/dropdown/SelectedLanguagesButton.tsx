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
            variant="none"
            onClick={onClick}
            className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-150/40 dark:hover:bg-gray-800/60 rounded-xl transition-all cursor-pointer"
        >
            <span className="flex items-center gap-2">
                {children}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </Button>
    );
}
