import { ReactNode } from "react";
import { AccordionProvider } from "@/contexts/AccordionProvider";

interface AccordionProps {
    children: ReactNode;
    className?: string;
}

export function Accordion({ children, className = "" }: AccordionProps) {
    return (
        <AccordionProvider>
            <div className={`flex flex-col gap-2 ${className}`}>{children}</div>
        </AccordionProvider>
    );
}



