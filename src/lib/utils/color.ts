import { COLORS, FLAG_BADGE_COLORS } from "@/constants/colors";
import { LANG_META } from "@/constants/languages";

export const getColor = (index: number) => FLAG_BADGE_COLORS[index % Object.keys(FLAG_BADGE_COLORS).length];

export const getLanguageColor = (code: string): string => {
    let hash = 5381;
    for (let i = 0; i < code.length; i++) hash = ((hash << 5) + hash) ^ (code.codePointAt(i) ?? 0);
    return COLORS[Math.abs(hash) % COLORS.length];
}

export const lang = (code: string) => LANG_META[code] || { code: code.toUpperCase(), color: '#E0E0E0' };
