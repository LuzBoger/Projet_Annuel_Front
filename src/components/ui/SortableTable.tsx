"use client";

import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Menu } from "lucide-react";
import { Inbox } from "@/assets/icons";
import { TableColumn } from "@/types/components/tableColumn";
import { TableHeader } from "@/components/ui/TableHeader";

interface SortableTableProps<T> {
  data: T[];
  columns: TableColumn[];
  renderRow: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T) => string;
  onReorder: (newData: T[]) => void;
  emptyMessage?: string;
  className?: string;
  isLoading?: boolean;
}

export function SortableTable<T>({
  data,
  columns,
  renderRow,
  keyExtractor,
  onReorder,
  emptyMessage,
  className = "",
  isLoading = false,
}: SortableTableProps<T>) {
  const { t } = useTranslation();
  const actualEmptyMessage = emptyMessage || t('empty');
  const [prevData, setPrevData] = useState<T[]>(data);
  const [localData, setLocalData] = useState<T[]>(data);

  if (data !== prevData) {
    setPrevData(data);
    setLocalData(data);
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(localData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setLocalData(items);
    onReorder(items);
  };

  const extendedColumns = [
    { key: "drag-handle", label: "", className: "w-10" },
    ...columns,
  ];

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <TableHeader columns={extendedColumns} />
            <Droppable droppableId="table-body">
              {(provided) => (
                <tbody
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="divide-y divide-gray-100 dark:divide-gray-800"
                >
                  {localData.length === 0 && !isLoading ? (
                    <tr>
                      <td colSpan={extendedColumns.length} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                        <div className="flex flex-col items-center gap-3">
                          <Inbox className="w-12 h-12 text-gray-300" />
                          <p className="text-sm font-medium">{actualEmptyMessage}</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    localData.map((item, index) => (
                      <Draggable key={keyExtractor(item)} draggableId={keyExtractor(item)} index={index}>
                        {(provided, snapshot) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`${snapshot.isDragging ? "bg-gray-50 dark:bg-gray-800/50 shadow-lg z-50" : ""} transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/30`}
                          >
                            <td className="px-4 py-4 text-gray-400 dark:text-gray-500">
                              <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                                <Menu className="w-4 h-4 opacity-50" />
                              </div>
                            </td>
                            {renderRow(item, index)}
                          </tr>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </table>
        </DragDropContext>
      </div>
    </div>
  );
}
