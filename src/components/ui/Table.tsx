"use client";

import { ReactNode, useMemo, useState } from "react";
import { Inbox } from "@/assets/icons";
import { Select } from "@/components/ui/Select";
import { useTranslation } from "react-i18next";
import { Pagination } from "@/components/ui/Pagination";
import { TableColumn } from "@/types/components/tableColumn";
import { TableHeader } from "@/components/ui/TableHeader";

interface TableProps<T> {
  data: T[];
  columns: TableColumn[];
  renderRow: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
  initialItemsPerPage?: number;
  pageSizeOptions?: number[];
  showControls?: boolean;
  className?: string;
  itemLabel?: string;
}

export function Table<T>({data,columns,renderRow,keyExtractor,emptyMessage,initialItemsPerPage = 10,pageSizeOptions = [5, 10, 15, 20],showControls = true,className = "",itemLabel,}: TableProps<T>) {
  const { t } = useTranslation();

  const actualEmptyMessage = emptyMessage || t('empty');
  const actualItemLabel = itemLabel || t('items');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const startIndex = (safePage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, safePage, itemsPerPage]);

  const pageSizeSelectOptions = pageSizeOptions.map((size) => ({
    label: size.toString(),
    value: size.toString(),
  }));

  return (
    <div
      className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden ${className}`}
    >
      {/* Contenu principal */}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader columns={columns} />
          <tbody className="divide-y divide-gray-100">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center gap-3">
                    <Inbox className="w-12 h-12 text-gray-300" />
                    <p className="text-sm font-medium">{actualEmptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr key={keyExtractor(item)} className="hover:bg-gray-50 transition">
                  {renderRow(item, index)}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {(showControls || data.length > 0) && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50 gap-4">
          {/* Bloc Select (Nombre d'éléments affichés) */}
          {showControls ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">{t("show")}</span>
              <Select
                value={itemsPerPage.toString()}
                onChange={(val) => { setItemsPerPage(Number.parseInt(val, 10)); setCurrentPage(1); }}
                options={pageSizeSelectOptions}
                className="w-20"
              />
              <span className="text-sm text-gray-500">
                {paginatedData.length} {t("of")} {data.length} {actualItemLabel}
              </span>
            </div>
          ) : <div />}

          {/* Bloc Pagination */}
          {data.length > 0 && (
            <Pagination
              currentPage={safePage}
              hasMore={safePage * itemsPerPage < data.length}
              onNext={() => setCurrentPage((prev) => prev + 1)}
              onPrev={() => setCurrentPage((prev) => prev - 1)}
            />
          )}
        </div>
      )}
    </div>
  );
}
