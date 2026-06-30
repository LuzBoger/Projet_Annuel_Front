import { useTranslation } from "react-i18next";
import { Check } from "@/assets/icons";
import { RatingValue } from "@/constants/review";
import { StarDisplay } from "@/components/ui/reviews/StarDisplay";

interface ReviewSuccessProps {
    topicName: string;
    rating: RatingValue;
    onClose?: () => void;
}

export function ReviewSuccess({ topicName, rating }: ReviewSuccessProps) {
    const { t } = useTranslation();

    return (
        <div className="flex items-center gap-6 py-4">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/40 flex items-center justify-center">
                <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div className="flex-grow text-left space-y-2.5">
                <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                        {t("reviews.success_title")}
                    </h4>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                        {t("reviews.success_subtitle")}{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {topicName}
                        </span>
                    </p>
                </div>

                <StarDisplay rating={rating} size="lg" />
            </div>
        </div>
    );
}