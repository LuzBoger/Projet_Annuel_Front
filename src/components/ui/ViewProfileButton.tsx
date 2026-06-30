import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ViewProfileButtonProps {
    accountId: string;
    onClick?: () => void;
    iconOnly?: boolean;
}

export function ViewProfileButton({ accountId, onClick, iconOnly = false }: ViewProfileButtonProps) {
    const { t } = useTranslation();

    if (iconOnly) {
        return (
            <Link
                to={`/profile/${accountId}`}
                onClick={onClick}
                title={t("common.viewProfile")}
                className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-gray-400 dark:text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
            >
                <Eye className="w-4 h-4" />
            </Link>
        );
    }

    return (
        <Link
            to={`/profile/${accountId}`}
            onClick={onClick}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/60 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
            <Eye className="w-3.5 h-3.5" />
            {t("common.viewProfile")}
        </Link>
    );
}
