import { useState } from "react";
import { AccordionContext } from "@/contexts/AccordionContext";

export function AccordionProvider({children}: {children: React.ReactNode}) {
    const [openId, setOpenId] = useState<string | null>(null);
    return (
        <AccordionContext.Provider value={{ openId, setOpen: setOpenId }}>
            {children}
        </AccordionContext.Provider>
    );
}   


    
