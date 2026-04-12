import { clsx } from "clsx";
import { Button } from "../Button";
import { lang } from "@/lib/utils/color";

interface LanguageOptionCardProps {
    id: string;
    name: string;
    code: string;
    isSelected: boolean;
    isDisabled?: boolean;
    onSelect: () => void;
}

export function LanguageOptionCard({name, code, isSelected, isDisabled = false, onSelect }: LanguageOptionCardProps) {

    return (
        <button
            onClick={onSelect}
            disabled={isDisabled}
            className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-left transition-all",
                isDisabled && "opacity-40 grayscale cursor-not-allowed pointer-events-none bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-700",
                !isDisabled && isSelected && "border-brand-600 bg-brand-50 dark:bg-brand-900/20",
                !isDisabled && !isSelected && "border-transparent bg-[#F5F0EB] hover:bg-[#EDE8E2] dark:bg-gray-700 dark:hover:bg-gray-600"
            )}
        >
            <span
                className="flex items-center justify-center w-9 h-9 rounded-full shrink-0 text-xs font-bold text-gray-600 dark:text-gray-400"
                style={{ backgroundColor: lang(code).color }}
            >
                {lang(code).code}
            </span>

            <span className="font-semibold text-[#1A1A1A] dark:text-white text-sm flex-1 min-w-0">{name}</span>

            <span
                className={clsx(
                "w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors",
                isSelected ? "border-brand-600" : "border-gray-300 dark:border-gray-600"
                )}
            >
                {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-brand-600" />}
            </span>
        </button>
    );
}
