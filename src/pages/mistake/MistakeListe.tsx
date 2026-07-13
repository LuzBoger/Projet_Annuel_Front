import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MetaData } from "@/components/seo/MetaData";
import { Button } from "@/components/ui/Button";
import { MistakeCard } from "@/components/ui/card/MistakeCard";
import { MistakeDetailModal } from "@/components/mistake/MistakeDetailModal";
import { useUserMistakes } from "@/hooks/useUserMistakes";
import type { MistakeFilterValue, UserMistakeRetryListResponse } from "@/types/mistakes/userMistakes";
import { MistakeTypeFilter } from "@/components/mistake/MistakeTypeFilter";
import { Check, ChevronLeft } from "@/assets/icons";
import { Pagination } from "@/components/ui/Pagination";
import { MISTAKE_ITEMS_PER_PAGE } from "@/constants/global";


export default function MistakeListe() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mistakeList, selectedMistake, loading, fetchPendingMistakes, setSelectedMistake } = useUserMistakes();
  const [filter, setFilter] = useState<MistakeFilterValue>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPendingMistakes();
  }, [fetchPendingMistakes]);

  const filtered = mistakeList?.mistakes.filter(
    (mistake) => filter === "ALL" || mistake.lessonType === filter
  ) ?? [];

  const totalPages = Math.ceil(filtered.length / MISTAKE_ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * MISTAKE_ITEMS_PER_PAGE, currentPage * MISTAKE_ITEMS_PER_PAGE);

  const handleFilterChange = (value: MistakeFilterValue) => {
    setFilter(value);
    setCurrentPage(1);
  };

  return (
    <>
      <MetaData title={t("mistake.liste.page_title")} robots="noindex, nofollow" />
      <div className="min-h-screen pb-16 pt-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 font-bold flex items-center text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          {t("common.back")}
        </Button>

        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {t("mistake.liste.title")}
          </h1>
          {mistakeList && mistakeList.totalPendingMistakes > 0 && (
            <Button size="sm" onClick={() => navigate("/training/daily-check")}>
              {t("mistake.liste.practice_cta")}
            </Button>
          )}
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
          {mistakeList ? t("mistake.liste.subtitle", { count: mistakeList.totalPendingMistakes }) : t("common.loading")}
        </p>

        <div className="mb-6">
          <MistakeTypeFilter value={filter} onChange={handleFilterChange} />
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white/80 dark:bg-gray-800/40 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-gray-700/50 shadow-xl max-w-lg mx-auto flex flex-col items-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-emerald-500/20 dark:bg-emerald-500/30 rounded-full blur-xl animate-pulse" />
              <div className="relative p-5 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 text-emerald-600 dark:text-emerald-400 rounded-full ring-8 ring-emerald-500/5 dark:ring-emerald-500/10 flex items-center justify-center">
                <Check className="w-12 h-12 stroke-[2.5]" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t("mistake.liste.empty_title")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
              {t("mistake.liste.empty_subtitle")}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paginated.map((mistake) => (
                <MistakeCard
                  key={mistake.userMistakeId}
                  mistake={mistake}
                  onClick={(mistake: UserMistakeRetryListResponse) => setSelectedMistake(mistake)}
                />
              ))}
            </div>
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                hasMore={currentPage < totalPages}
                onNext={() => setCurrentPage(p => p + 1)}
                onPrev={() => setCurrentPage(p => p - 1)}
              />
            </div>
          </>
        )}
      </div>

      {selectedMistake && (
        <MistakeDetailModal
          mistake={selectedMistake}
          onClose={() => setSelectedMistake(null)}
        />
      )}
    </>
  );
}
