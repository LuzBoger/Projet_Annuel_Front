export type TabCookies = "consent" | "details" | "about";
export interface CookieTab {
    key: TabCookies;
    label: string;
}