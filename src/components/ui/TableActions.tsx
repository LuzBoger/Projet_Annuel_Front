import { useTranslation } from "react-i18next";
import { Edit, Trash, Eye, Ban, BookOpen } from "@/assets/icons";
import { IconButton } from "@/components/ui/IconButton";

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
                <IconButton 
                    onClick={onView}
                    title={t('common.view')}
                    icon={<Eye className="w-6 h-6" />}
                />
            )}
            {onLessons && (
                <IconButton 
                    variant="success"
                    onClick={onLessons}
                    title={t('admin.topics.manage_lessons')}
                    icon={<BookOpen className="w-6 h-6" />}
                />
            )}
            {onEdit && (
                <IconButton 
                    onClick={onEdit}
                    title={t('common.edit')}
                    icon={<Edit className="w-6 h-6" />}
                />
            )}
            {onDelete && (
                <IconButton 
                    variant="danger"
                    onClick={onDelete}
                    title={t('common.delete')}
                    icon={<Trash className="w-6 h-6" />}
                />
            )}
            {onCancelAction && (
                <IconButton 
                    variant="warning"
                    onClick={onCancelAction}
                    title={t('common.cancel')}
                    icon={<Ban className="w-6 h-6" />}
                />
            )}
        </div>
    );
}
