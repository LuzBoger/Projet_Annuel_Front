import { useTranslation } from "react-i18next";
import { Edit, Trash, Eye, Ban, BookOpen } from "@/assets/icons";

interface TableActionsProps {
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onCancelAction?: () => void;
    onLessons?: () => void;
}

export function TableActions({ onView, onEdit, onDelete, onCancelAction, onLessons }: TableActionsProps) {
    const { t } = useTranslation();

    return (
        <div className="flex items-center space-x-3 justify-end">
            {onView && (
                <button 
                    onClick={onView}
                    title={t('common.view')}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                    <Eye className="w-5 h-5 scale-110" />
                </button>
            )}
            {onLessons && (
                <button 
                    onClick={onLessons}
                    title={t('admin.topics.manage_lessons')}
                    className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                >
                    <BookOpen className="w-5 h-5" />
                </button>
            )}
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
            {onCancelAction && (
                <button 
                    onClick={onCancelAction}
                    title={t('common.cancel')}
                    className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                >
                    <Ban className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}
