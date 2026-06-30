import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui//Button";
import { StarIcon } from "@/assets/icons";
import { type RatingValue, RATING_LABELS, RATING_VALUES } from "@/constants/review";

interface StarRatingProps {
  rating: RatingValue ;
  onRatingChange: (rating: RatingValue) => void;
  disabled?: boolean;
}

export function StarRating({ rating, onRatingChange, disabled = false }: StarRatingProps) {

    const { t } = useTranslation();
    const labels = RATING_LABELS(t);

    const [hoveredRating, setHoveredRating] = useState(0);

    return (
        <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wider mb-2">
                {t('reviews.rating.label')}
            </p>
            <div className="flex gap-1 mb-1">
                {RATING_VALUES.map((star) => {
                    const active = star <= (hoveredRating || rating);
                    return (
                        <Button
                            key={star}
                            type="button"
                            variant="none"
                            onClick={() => onRatingChange(star as RatingValue)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className={`focus:outline-none transition-transform ${!disabled && "hover:scale-110 active:scale-95"}`}
                            disabled={disabled}
                        
                        >
                            <StarIcon
                                className={`w-10 h-10 transition-colors ${
                                    active ? "text-yellow-400" : "text-gray-200 dark:text-gray-700"
                                }`}
                            />
                        </Button>
                    );
                })}
            </div>
            <p className="text-sm font-bold text-amber-600 dark:text-amber-400 min-h-[20px]">
                {(hoveredRating || rating) > 0 ? labels[(hoveredRating || rating) as RatingValue] : ''}
            </p>
        </div>
    );
}