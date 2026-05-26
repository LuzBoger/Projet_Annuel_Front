import { STYLES_REVIEW } from "@/constants/review";
import { ReviewStatus } from "@/types/review/review";
import { useTranslation } from "react-i18next";

interface ReviewStatusBadgeProps {
    status: ReviewStatus;
}

export function ReviewStatusBadge({ status }: ReviewStatusBadgeProps) {
    const {t} = useTranslation();

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${STYLES_REVIEW[status]}`}>
            {t(`reviews.status_${status.toLowerCase()}`)}
        </span>
    );
}