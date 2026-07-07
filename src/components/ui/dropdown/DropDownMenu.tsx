import { Button } from "@/components/ui/Button";

interface DropDownMenuItemProps {
    key: string;
    label: React.ReactNode;
    isActive?: boolean;
    onClick: () => void;
}

interface DropDownMenuProps {
    items: DropDownMenuItemProps[];
}

export function DropDownMenu({ items }: DropDownMenuProps) {
    return (
        <div className="absolute left-0 mt-2 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-50 py-1.5 px-1">
            {items.map(item => (
                <Button
                    key={item.key}
                    variant="none"
                    fullWidth
                    className={`flex items-center gap-2.5 justify-start px-3 py-2 text-sm rounded-lg font-semibold transition-all duration-150 cursor-pointer
                        ${item.isActive 
                            ? "bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-650 dark:text-indigo-400" 
                            : "text-gray-750 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-950 dark:hover:text-white"}`}
                    onClick={item.onClick}
                >
                    {item.label}
                </Button>
            ))}
        </div>
    );
}
