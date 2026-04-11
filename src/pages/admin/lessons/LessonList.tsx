import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLesson } from "@/hooks/useLesson";
import { useTopic } from "@/hooks/useTopic";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Switch } from "@/components/ui/Switch";
import { TableActions } from "@/components/ui/TableActions";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { LessonResponse } from "@/types/lesson/lesson";
import { ChevronLeft } from "@/assets/icons";
import { MetaData } from "@/components/seo/MetaData";

export default function LessonList() {
    const { topicId } = useParams<{ topicId: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { lessons, loading, fetchLessonsByTopic, deleteLesson, updateLesson } = useLesson();
    const { topics, fetchAllTopics } = useTopic();
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<LessonResponse | null>(null);

    const currentTopic = topics.find(t => t.id === topicId);

    useEffect(() => {
        if (topicId) {
            fetchLessonsByTopic(topicId);
        }
        if (topics.length === 0) {
            fetchAllTopics();
        }
    }, [topicId, fetchLessonsByTopic, fetchAllTopics, topics.length]);

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

    const handleStatusToggle = async (lesson: LessonResponse, isActive: boolean) => {
        try {
            await updateLesson(lesson.id, {
                ...lesson,
                isActive
            });
        } catch (error) {
            console.error("Failed to update lesson status", error);
        }
    };

    return (
        <>
            <MetaData title={t('admin.lessons.page_title', { topicName: currentTopic?.name || '...' })} robots="noindex, nofollow"  />
            <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={() => navigate("/admin/topics")}
                            className="p-2"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {t('admin.lessons.page_title', { topicName: currentTopic?.name || '...' })}
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                {t('admin.lessons.list_title', { topicName: currentTopic?.name || '...' })}
                            </p>
                        </div>
                    </div>
                    <Button onClick={handleCreate}>
                        {t('admin.lessons.create')}
                    </Button>
                </div>

                <Table
                    data={lessons}
                    keyExtractor={(lesson) => lesson.id}
                    emptyMessage={t('admin.lessons.no_lessons')}
                    renderRow={(lesson) => (
                        <>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 border-b border-gray-200">
                                {lesson.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">
                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                    {lesson.lessonType}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">
                                {lesson.orderIndex}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">
                                <Switch 
                                    checked={lesson.isActive} 
                                    onChange={(checked) => handleStatusToggle(lesson, checked)} 
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border-b border-gray-200 text-right">
                                <TableActions
                                    onEdit={() => handleEdit(lesson)}
                                    onDelete={() => handleDeleteClick(lesson)}
                                />
                            </td>
                        </>
                    )}
                    columns={[
                        { label: t('admin.lessons.table.title'), key: 'title' },
                        { label: t('admin.lessons.table.type'), key: 'lessonType' },
                        { label: t('admin.lessons.table.order'), key: 'orderIndex' },
                        { label: t('admin.lessons.table.active'), key: 'isActive' },
                        { label: t('admin.lessons.table.actions'), key: 'actions', className: 'text-right' }
                    ]}
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
