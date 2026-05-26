import { ReviewStatus } from "@/types/review/review";
import { useTranslation } from "react-i18next";
import { IconButton } from "../ui/IconButton";
import { Ban, Check } from "@/assets/icons";
import { TableActions } from "../ui/TableActions";

interface ReviewActionsProps {
    status: ReviewStatus;
    onApprove: () => void;
    onReject: () => void;
    onDelete: () => void;
}

export function ReviewActions({ status, onApprove, onReject, onDelete }: ReviewActionsProps) {
    const {t} = useTranslation();
    return (
        <div className="flex items-center justify-end gap-1">
            {status === "PENDING" && (
                <>
                    <IconButton variant="success" title={t("reviews.approve")}
                        icon={<Check className="w-4 h-4" />} onClick={onApprove} />
                    <IconButton variant="warning" title={t("reviews.reject")}
                        icon={<Ban className="w-4 h-4" />} onClick={onReject} />
                </>
            )}
            <TableActions onDelete={onDelete} />
        </div>
    );
}