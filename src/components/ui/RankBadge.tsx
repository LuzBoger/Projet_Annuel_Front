import { MEDALS_COLORS } from "@/constants/colors";
import { Medal } from "lucide-react";

interface RankBadgeProps {
    rank: number;
}


export function RankBadge({ rank }: RankBadgeProps) {
    if (rank <= 3) {
        return <Medal className={`w-5 h-5 ${MEDALS_COLORS[rank]}`} />;
    }
    return <span className="w-7 text-center text-sm font-semibold text-gray-500">{rank}</span>;
}
