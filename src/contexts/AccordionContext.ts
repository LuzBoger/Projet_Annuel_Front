import { createContext } from "react";

export const AccordionContext = createContext<{
    openId: string | null;
    setOpen: (id: string | null) => void;
}>({
    openId: null,
    setOpen: () => {},
});