import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTopic } from "@/hooks/useTopic";
import { TopicResponse, PROFICIENCY_LEVELS, ProficiencyLevel } from "@/types/topic/topic";
import { LanguageResponse } from "@/types/language/language";
import { TableColumn } from "@/types/components/tableColumn";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Switch } from "@/components/ui/Switch";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { TopicForm } from "@/components/topics/TopicForm";
import { TableActions } from "@/components/ui/TableActions";
import { languageService } from "@/services/languageService";
import { LanguageFlag } from "@/components/languages/LanguageFlag";

export default function TopicList() {
    const { t } = useTranslation();
    const {
        topics,
        loading,
        error,
        fetchAllTopics,
        searchTopics,
        createTopic,
        updateTopic,
        deleteTopic
    } = useTopic();

    const [activeLanguages, setActiveLanguages] = useState<LanguageResponse[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<TopicResponse | null>(null);
    const [pendingStatus, setPendingStatus] = useState<boolean | null>(null);

    // Filters state
    const [filterName, setFilterName] = useState("");
    const [debouncedName, setDebouncedName] = useState("");
    const [filterDifficulty, setFilterDifficulty] = useState<string>("");
    const [filterIsActive, setFilterIsActive] = useState<string>(""); // "true", "false", or "" for all

    // Debounce effect for text search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedName(filterName);
        }, 500);
        return () => clearTimeout(timer);
    }, [filterName]);

    const columns: TableColumn[] = [
        { key: 'name', label: t('admin.topics.table.name') },
        { key: 'language', label: t('admin.topics.table.language') },
        { key: 'difficulty', label: t('admin.topics.table.difficulty') },
        { key: 'orderIndex', label: t('admin.topics.table.order') },
        { key: 'isActive', label: t('admin.topics.table.active') },
        { key: 'actions', label: t('admin.topics.table.actions') },
    ];

    useEffect(() => {
        languageService.getAllActiveLanguages().then(setActiveLanguages).catch(console.error);
    }, []);

    // Perform search whenever debouncedName, difficulty, or isActive changes
    useEffect(() => {
        let isActiveBool: boolean | undefined = undefined;
        if (filterIsActive === "true") isActiveBool = true;
        if (filterIsActive === "false") isActiveBool = false;

        if (!debouncedName && !filterDifficulty && isActiveBool === undefined) {
            fetchAllTopics();
        } else {
            searchTopics(debouncedName || undefined, filterDifficulty || undefined, isActiveBool);
        }
    }, [debouncedName, filterDifficulty, filterIsActive, fetchAllTopics, searchTopics]);

    const handleCreate = () => {
        setSelectedTopic(null);
        setShowForm(true);
    };

    const handleEdit = (topic: TopicResponse) => {
        setSelectedTopic(topic);
        setShowForm(true);
    };

    const handleDelete = (topic: TopicResponse) => {
        setSelectedTopic(topic);
        setShowDeleteModal(true);
    };

    const handleStatusToggle = (topic: TopicResponse, newStatus: boolean) => {
        setSelectedTopic(topic);
        setPendingStatus(newStatus);
        setShowStatusModal(true);
    };

    const onSubmitForm = async (data: any) => {
        if (selectedTopic) {
            await updateTopic(selectedTopic.id, data);
        } else {
            await createTopic(data);
        }
        setShowForm(false);
        setSelectedTopic(null);
        fetchAllTopics();
    };

    const confirmDelete = async () => {
        if (selectedTopic) {
            await deleteTopic(selectedTopic.id);
            setShowDeleteModal(false);
            setSelectedTopic(null);
            fetchAllTopics();
        }
    };

    const confirmStatusChange = async () => {
        if (selectedTopic && pendingStatus !== null) {
            await updateTopic(selectedTopic.id, {
                languageId: selectedTopic.languageId,
                name: selectedTopic.name,
                description: selectedTopic.description,
                difficulty: selectedTopic.difficulty,
                orderIndex: selectedTopic.orderIndex,
                isActive: pendingStatus
            });
            setShowStatusModal(false);
            setSelectedTopic(null);
            setPendingStatus(null);
            fetchAllTopics();
        }
    };

    const cancelStatusChange = () => {
        setShowStatusModal(false);
        setSelectedTopic(null);
        setPendingStatus(null);
    };

    const getLanguageInfo = (languageId: string) => {
        return activeLanguages.find(l => l.id === languageId);
    };

    const difficultyOptions = [
        { label: t('admin.topics.filters.all_difficulties'), value: "" },
        ...PROFICIENCY_LEVELS.map(l => ({ label: l, value: l }))
    ];

    const statusOptions = [
        { label: t('admin.topics.filters.status_all'), value: "" },
        { label: t('admin.topics.filters.status_active'), value: "true" },
        { label: t('admin.topics.filters.status_inactive'), value: "false" }
    ];

    return (
        <div className="w-full space-y-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-indigo-900">
                    {t('admin.topics.page_title')}
                </h1>
                <Button variant="primary" onClick={handleCreate}>
                    {t('common.create')}
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                    <FormField
                        type="text"
                        label=""
                        placeholder={t('admin.topics.filters.search_name')}
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-48 pt-1">
                    <Select
                        options={difficultyOptions}
                        value={filterDifficulty}
                        onChange={setFilterDifficulty}
                    />
                </div>
                <div className="w-full sm:w-48 pt-1">
                    <Select
                        options={statusOptions}
                        value={filterIsActive}
                        onChange={setFilterIsActive}
                    />
                </div>
            </div>

            {error && (
                <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm">
                    <p>{error}</p>
                </div>
            )}

            <Table
                data={topics}
                columns={columns}
                keyExtractor={(topic) => topic.id}
                renderRow={(topic) => {
                    const lang = getLanguageInfo(topic.languageId);
                    return (
                        <>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 border-b border-gray-200">
                                <div>{topic.name}</div>
                                {topic.description && <div className="text-xs text-gray-500 font-normal mt-1 max-w-xs truncate" title={topic.description}>{topic.description}</div>}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                {lang ? (
                                    <div className="flex items-center space-x-2">
                                        <LanguageFlag languageCode={lang.code} className="w-5 h-5 rounded-sm shadow-sm" />
                                        <span className="text-sm font-medium text-gray-900">{lang.code.toUpperCase()}</span>
                                    </div>
                                ) : (
                                    <span className="text-sm text-gray-400">?</span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">
                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {topic.difficulty}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">{topic.orderIndex}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">
                                <Switch
                                    checked={topic.isActive}
                                    onChange={(checked) => handleStatusToggle(topic, checked)}
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border-b border-gray-200">
                                <TableActions
                                    onEdit={() => handleEdit(topic)}
                                    onDelete={() => handleDelete(topic)}
                                />
                            </td>
                        </>
                    );
                }}
            />

            <TopicForm
                isOpen={showForm}
                isLoading={loading}
                topic={selectedTopic}
                activeLanguages={activeLanguages}
                onCancel={() => setShowForm(false)}
                onSubmit={onSubmitForm}
            />

            <ConfirmModal
                isOpen={showDeleteModal}
                title={t('admin.topics.delete_title')}
                description={t('admin.topics.delete_desc')}
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
                isConfirming={loading}
                confirmVariant="danger"
            />

            <ConfirmModal
                isOpen={showStatusModal}
                title={t('admin.languages.status_title')}
                description={t('admin.languages.status_desc')}
                onConfirm={confirmStatusChange}
                onCancel={cancelStatusChange}
                isConfirming={loading}
            />
        </div>
    );
}
