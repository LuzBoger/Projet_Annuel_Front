import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "@/assets/icons";

interface PaginationProps {
  currentPage: number;
  hasMore: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export function Pagination({ currentPage, hasMore, onNext, onPrev }: PaginationProps) {
  const { t } = useTranslation('common.actions');
  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className={`
          flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-600
          hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">{t("previous", "Précédent")}</span>
      </button>

      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-50 text-indigo-700 font-semibold text-sm border border-indigo-100">
        {currentPage}
      </div>

      <button
        onClick={onNext}
        disabled={!hasMore}
        className={`
          flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-600
          hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        <span className="hidden sm:inline">{t("next", "Suivant")}</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
