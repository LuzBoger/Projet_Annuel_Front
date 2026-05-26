export type Tab = "ALL" | "PUBLISHED" | "PENDING" | "REJECTED";
export interface ReviewTab { 
    key: Tab;
    label: string;
    count?: number;
}
