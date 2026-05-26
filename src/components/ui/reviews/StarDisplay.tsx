import { StarIcon } from "@/assets/icons";
import { RATING_VALUES } from "@/constants/review";

interface StarDisplayProps {
    rating: number;
    size?: "sm" | "md";
}

export function StarDisplay({ rating, size = "md" }: StarDisplayProps) {
    const sizeClass = size === "sm" ? "w-4 h-4" : "w-6 h-6";
    return (
        <div className="flex gap-0.5">
            {RATING_VALUES.map((star) => (
                <StarIcon
                    key={star}
                    className={`${sizeClass} ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                />
            ))}
        </div>
    );
}
