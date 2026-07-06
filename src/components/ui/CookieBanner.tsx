import { COOKIE_CONSENT_KEY } from "@/constants/global";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";
import { CookieTab, TabCookies } from "@/types/cookies/cookie";

export function CookieBanner() {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(() => !localStorage.getItem(COOKIE_CONSENT_KEY));
    const [hiding, setHiding] = useState(false);
    const [activeTab, setActiveTab] = useState<TabCookies>("consent");
    const [necessaryExpanded, setNecessaryExpanded] = useState(false);

    if (!visible){
        return null;
    }

    const saveResponse = (consent: boolean) => {
        setHiding(true);
        setTimeout(() => {
            localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ consent, date: new Date().toISOString() }));
            setVisible(false);
        }, 300);
    };

    const tabs: CookieTab[] = [
        { key: "consent", label: t("cookie_banner.tabs.consent") },
        { key: "details", label: t("cookie_banner.tabs.details") },
        { key: "about", label: t("cookie_banner.tabs.about") },
    ];

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-4 transition-all duration-300 ease-in-out ${hiding ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
            style={{ animation: hiding ? undefined : "slideUp 0.35s ease-out" }}
        >
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(1.5rem); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div className="w-full max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 overflow-hidden">

                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    {tabs.map((tab) => (
                        <Button
                            variant="none"
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex-1 py-3 text-sm font-medium transition-colors focus:outline-none ${
                                activeTab === tab.key ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            }`}
                        >
                            {tab.label}
                        </Button>
                    ))}
                </div>

                <div className="p-5 min-h-[110px]">
                    {activeTab === "consent" && (
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                {t("cookie_banner.title")}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                {t("cookie_banner.text")}{" "}
                                <Link
                                    to="/legal/politique-de-cookies"
                                    className="text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-2 transition-colors"
                                >
                                    {t("common.learn_more")}
                                </Link>
                                .
                            </p>
                        </div>
                    )}

                    {activeTab === "details" && (
                        <div>
                            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                <div className="flex items-center justify-between px-4 py-3">
                                    <button
                                        className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white focus:outline-none"
                                        onClick={() => setNecessaryExpanded((v) => !v)}
                                    >
                                        <ChevronRight
                                            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${necessaryExpanded ? "rotate-90" : ""}`}
                                        />
                                        {t("cookie_banner.details.necessary_title")}
                                    </button>
                                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-full px-2.5 py-0.5">
                                        {t("cookie_banner.details.always_active")}
                                    </span>
                                </div>

                                {necessaryExpanded && (
                                    <div className="px-4 pb-3 border-t border-gray-100 dark:border-gray-800">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-2">
                                            {t("cookie_banner.details.necessary_desc")}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "about" && (
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                {t("cookie_banner.about.title")}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                {t("cookie_banner.about.text")}{" "}
                                <Link
                                    to="/legal/politique-de-cookies"
                                    className="text-indigo-600 dark:text-indigo-400 hover:underline underline-offset-2 transition-colors"
                                >
                                    {t("common.learn_more")}
                                </Link>
                                .
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex gap-2 px-5 pb-5">
                    <Button
                        variant="outline"
                        onClick={() => saveResponse(false)}
                        className="flex-1 py-2 cursor-pointer"
                    >
                        {t("cookie_banner.deny")}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => saveResponse(true)}
                        className="flex-1 py-2 cursor-pointer"
                    >
                        {t("cookie_banner.allow_all")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
