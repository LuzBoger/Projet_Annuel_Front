import { ReactNode } from "react";

interface AccordionTriggerProps {
    left: ReactNode;
}

export function AccordionTrigger({ left }: AccordionTriggerProps) {
    return <div className="flex items-center gap-3">{left}</div>;
}
