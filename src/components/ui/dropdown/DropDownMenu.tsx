import { Button } from "../Button";


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
        <div className="absolute left-0 mt-1 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1">
                {items.map(item => (
                    <Button
                        key={item.key}
                        variant="ghost"
                        size="sm"
                        fullWidth
                        className={`flex items-center gap-2 justify-start rounded-none border-0 ${item.isActive ? "bg-indigo-50 text-indigo-600 font-medium" : "text-gray-700"}`} 
                        onClick={item.onClick}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>  
    )
}