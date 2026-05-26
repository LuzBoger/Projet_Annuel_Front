import { useTranslation } from "react-i18next";
import { Button } from "@/components//ui/Button";
import { Check } from "@/assets/icons";
import { RatingValue } from "@/constants/review";
import { StarDisplay } from "@/components/ui/reviews/StarDisplay";

interface ReviewSuccessProps {
    topicName: string;
    rating: RatingValue;
    onClose: () => void;
}

export function ReviewSuccess({ topicName, rating, onClose }: ReviewSuccessProps) {
    const {t} = useTranslation();

   return (
        <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-12 h-12 rounded-full bg-teal-900 flex items-center justify-center">
                <Check className="w-5 h-5 text-teal-400" />
            </div>

            <div className="text-center">
                <p className="text-base font-medium text-white mb-1">{t("reviews.success_title")}</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                    {t("reviews.success_subtitle")}<br />{topicName}
                </p>
            </div>

            <StarDisplay rating={rating} />

            <Button variant="outline" onClick={onClose} className="w-full">
                {t("common.close")}
            </Button>
        </div>
    );
} 