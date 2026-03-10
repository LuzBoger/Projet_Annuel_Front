import { useTranslation } from "react-i18next";
import { Edit, Trash } from "@/assets/icons";

interface TableActionsProps {
    onEdit?: () => void;
    onDelete?: () => void;
}

export function TableActions({ onEdit, onDelete }: TableActionsProps) {
    const { t } = useTranslation();

    return (
        <div className="flex items-center space-x-3 justify-end">
            {onEdit && (
                <button 
                    onClick={onEdit}
                    title={t('common.edit')}
                    className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                >
                    <Edit className="w-5 h-5" />
                </button>
            )}
            {onDelete && (
                <button 
                    onClick={onDelete}
                    title={t('common.delete')}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                    <Trash className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}
