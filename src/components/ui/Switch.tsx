import { clsx } from "clsx";

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}

export function Switch({ checked, onChange, disabled = false, className }: SwitchProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => {
                if (!disabled) {
                    onChange(!checked);
                }
            }}
            className={clsx(
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                checked ? "bg-brand-600 dark:bg-indigo-600 border-indigo-400/30" : "bg-gray-200 dark:bg-gray-800",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            <span
                aria-hidden="true"
                className={clsx(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    checked ? "translate-x-5" : "translate-x-0"
                )}
            />
        </button>
    );
}
