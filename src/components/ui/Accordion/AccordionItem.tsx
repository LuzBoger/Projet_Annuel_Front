import { AccordionContext } from "@/contexts/AccordionContext";
import { ChevronRight } from "lucide-react";
import { ReactNode, useContext } from "react";
import { Button } from "../Button";

interface AccordionItemProps {
    id: string;
    trigger: ReactNode;
    children: ReactNode;
}

export function AccordionItem({ id, trigger, children }: AccordionItemProps) {
    const { openId, setOpen } = useContext(AccordionContext);
    const isOpen = openId === id;
    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <Button
                variant="none"
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(isOpen ? null : id)}
            >
                {trigger}
                <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                />
            </Button>
            {isOpen && (
                <div className="border-t border-gray-100 divide-y divide-gray-100">
                    {children}
                </div>
            )}
        </div>
    );
}