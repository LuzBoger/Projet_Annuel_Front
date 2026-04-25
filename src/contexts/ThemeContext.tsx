import { createContext } from "react";
import { Theme } from "@/types/theme";

export const ThemeContext = createContext<{theme: Theme; toggle: () => void} | null>(null);
