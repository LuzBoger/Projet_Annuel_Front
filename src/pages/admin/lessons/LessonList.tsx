import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLesson } from "@/hooks/useLesson";
import { useTopic } from "@/hooks/useTopic";
import { Button } from "@/components/ui/Button";
import { SortableTable } from "@/components/ui/SortableTable";
import { Switch } from "@/components/ui/Switch";
import { TableActions } from "@/components/ui/TableActions";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { TableColumn } from "@/types/components/tableColumn";
import { LessonResponse } from "@/types/lesson/lesson";
import { ChevronLeft } from "@/assets/icons";
import { MetaData } from "@/components/seo/MetaData";
import { BadgeTag } from "@/components/ui/BadgeTag";
import { IconFlashcard, IconQcm, IconMatching, IconSorting } from "@/assets/icons";
import { LessonType } from "@/types/lesson/lesson";

const TYPE_ICONS: Record<LessonType, React.ElementType> = {
    [LessonType.FLASHCARD]: IconFlashcard,
    [LessonType.QCM]: IconQcm,
    [LessonType.MATCHING_PAIR]: IconMatching,
    [LessonType.SORTING_EXERCISE]: IconSorting,
    [LessonType.INTERACTIVE]: IconQcm,
};

export default function LessonList() {
    const { topicId } = useParams<{ topicId: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { lessons, loading, fetchAdminLessonsByTopic, deleteLesson, toggleLessonStatus, reorderLessons } = useLesson();
    const { topics, fetchAllTopics } = useTopic();
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<LessonResponse | null>(null);
    
    const currentTopic = topics.find(t => t.id === topicId);

    useEffect(() => {
        if (topicId) {
            fetchAdminLessonsByTopic(topicId);
        }
        if (topics.length === 0) {
            fetchAllTopics();
        }
    }, [topicId, fetchAdminLessonsByTopic, fetchAllTopics, topics.length]);

    const handleCreate = () => {
        navigate(`/admin/topics/${topicId}/lessons/new`);
    };

    const handleEdit = (lesson: LessonResponse) => {
        navigate(`/admin/topics/${topicId}/lessons/${lesson.id}/edit`);
    };

    const handleDeleteClick = (lesson: LessonResponse) => {
        setSelectedLesson(lesson);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (selectedLesson) {
            await deleteLesson(selectedLesson.id);
            setShowDeleteModal(false);
            setSelectedLesson(null);
        }
    };

    const handleStatusToggle = async (lesson: LessonResponse) => {
        try {
            await toggleLessonStatus(lesson.id);
        } catch (error) {
            console.error("Failed to update lesson status", error);
        }
    };

    const handleReorder = async (newData: LessonResponse[]) => {
        if (!topicId) return;
        
        const reorderRequests = newData.map((lesson, index) => ({
            id: lesson.id,
            orderIndex: index + 1 // We use 1-based index or sequential
        }));

        try {
            await reorderLessons(topicId, reorderRequests);
        } catch (error) {
            console.error("Failed to reorder lessons", error);
            if (topicId) fetchAdminLessonsByTopic(topicId); // Rollback on error
        }
    };

    const columns: TableColumn[] = [
        { label: t('admin.lessons.table.title'), key: 'title' },
        { label: t('admin.lessons.table.type'), key: 'lessonType' },
        { label: t('admin.lessons.table.active'), key: 'isActive' },
        { label: t('admin.lessons.table.actions'), key: 'actions', align: 'right' }
    ];

    return (
        <>
            <MetaData title={t('admin.lessons.page_title', { topicName: currentTopic?.name || '...' })} robots="noindex, nofollow"  />
            <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <Button 
                            variant="pill-gray" 
                            size="sm" 
                            onClick={() => navigate("/admin/topics")}
                            className="p-2"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {t('admin.lessons.page_title', { topicName: currentTopic?.name || '...' })}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {t('admin.lessons.list_title', { topicName: currentTopic?.name || '...' })}
                            </p>
                        </div>
                    </div>
                    <Button onClick={handleCreate} className="w-40">
                        {t('admin.lessons.create')}
                    </Button>
                </div>

                <SortableTable
                    data={lessons}
                    columns={columns}
                    keyExtractor={(lesson) => lesson.id}
                    onReorder={handleReorder}
                    emptyMessage={t('admin.lessons.no_lessons')}
                    isLoading={loading}
                    renderRow={(lesson) => (
                        <>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                {lesson.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                <BadgeTag color="blue" className="gap-2">
                                    {(() => {
                                        const Icon = TYPE_ICONS[lesson.lessonType];
                                        return Icon && <Icon className="w-4 h-4" />;
                                    })()}
                                    {t(`admin.lessons.form.types.${lesson.lessonType}`)}
                                </BadgeTag>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                <Switch
                                    checked={lesson.isActive}
                                    onChange={() => handleStatusToggle(lesson)}
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                <TableActions
                                    onEdit={() => handleEdit(lesson)}
                                    onDelete={() => handleDeleteClick(lesson)}
                                />
                            </td>
                        </>
                    )}
                />

                <ConfirmModal
                    isOpen={showDeleteModal}
                    title={t('admin.lessons.delete_title')}
                    description={t('admin.lessons.delete_desc')}
                    onConfirm={confirmDelete}
                    onCancel={() => setShowDeleteModal(false)}
                    isConfirming={loading}
                />
            </div>
        </>
    );
}
