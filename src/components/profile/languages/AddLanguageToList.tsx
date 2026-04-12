import { Button } from "@/components/ui/Button";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function AddLanguageToList() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center gap-2 py-6 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-center">
            <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Globe className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-500">
                {t("components.profileLanguages.empty")}
            </p>
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
                {t("components.profileLanguages.choose")} →
            </Button>
        </div>
    );
}