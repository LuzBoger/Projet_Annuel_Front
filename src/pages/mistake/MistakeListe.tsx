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
import { Brain } from "lucide-react";

export default function MistakeListe() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mistakeList, selectedMistake, loading, fetchPendingMistakes, setSelectedMistake } = useUserMistakes();
  const [filter, setFilter] = useState<MistakeFilterValue>("ALL");

  useEffect(() => {
    fetchPendingMistakes();
  }, [fetchPendingMistakes]);

  const filtered = mistakeList?.mistakes.filter(
    (mistake) => filter === "ALL" || mistake.lessonType === filter
  ) ?? [];

  return (
    <>
      <MetaData title={t("mistake.liste.page_title")} robots="noindex, nofollow" />
      <div className="min-h-screen pb-16 pt-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 font-bold flex items-center text-gray-500 hover:text-gray-900"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          {t("common.back")}
        </Button>

        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-900 to-brand-600">
            <Brain /> {t("mistake.liste.title")}
          </h1>
          {mistakeList && mistakeList.totalPendingMistakes > 0 && (
            <Button size="sm" onClick={() => navigate("/training/daily-check")}>
              {t("mistake.liste.practice_cta")}
            </Button>
          )}
        </div>
        <p className="text-gray-500 text-sm mb-8">
          {mistakeList ? t("mistake.liste.subtitle", { count: mistakeList.totalPendingMistakes }) : t("common.loading")}
        </p>

        <div className="mb-6">
          <MistakeTypeFilter value={filter} onChange={setFilter} />
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700">
            <div className="text-6xl mb-4"><Check /></div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t("mistake.liste.empty_title")}
            </h3>
            <p className="text-gray-500">{t("mistake.liste.empty_subtitle")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((mistake) => (
              <MistakeCard
                key={mistake.userMistakeId}
                mistake={mistake}
                onClick={(mistake: UserMistakeRetryListResponse) => setSelectedMistake(mistake)}
              />
            ))}
          </div>
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
