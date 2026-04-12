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
        <div className="absolute left-0 mt-1 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 py-1">
                {items.map(item => (
                    <Button
                        key={item.key}
                        variant="ghost"
                        size="sm"
                        fullWidth
                        className={`flex items-center gap-2 justify-start rounded-none border-0 ${item.isActive ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 font-medium" : "text-gray-700 dark:text-gray-300"}`} 
                        onClick={item.onClick}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>  
    )
}
