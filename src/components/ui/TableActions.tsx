import { useTranslation } from "react-i18next";
import { Edit, Trash, Eye, Ban } from "@/assets/icons";
import { IconButton } from "@/components/ui/IconButton";

interface TableActionsProps {
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onCancelAction?: () => void;
}

export function TableActions({ onView, onEdit, onDelete, onCancelAction }: TableActionsProps) {
    const { t } = useTranslation();

    return (
        <div className="flex items-center space-x-3 justify-end">
            {onView && (
                <IconButton 
                    onClick={onView}
                    title={t('common.view')}
                    icon={<Eye className="w-5 h-5 scale-110" />}
                />
            )}
            {onEdit && (
                <IconButton 
                    onClick={onEdit}
                    title={t('common.edit')}
                    icon={<Edit className="w-5 h-5" />}
                />
            )}
            {onDelete && (
                <IconButton 
                    variant="danger"
                    onClick={onDelete}
                    title={t('common.delete')}
                    icon={<Trash className="w-5 h-5" />}
                />
            )}
            {onCancelAction && (
                <IconButton 
                    variant="warning"
                    onClick={onCancelAction}
                    title={t('common.cancel')}
                    icon={<Ban className="w-5 h-5" />}
                />
            )}
        </div>
    );
}
