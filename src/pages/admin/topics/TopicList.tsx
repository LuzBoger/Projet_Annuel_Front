import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTopic } from "@/hooks/useTopic";
import { TopicResponse, PROFICIENCY_LEVELS, CreateTopicRequest, UpdateTopicRequest } from "@/types/topic/topic";
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
import { MetaData } from "@/components/seo/MetaData";
import { BadgeTag } from "@/components/ui/BadgeTag";

export default function TopicList() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {topics, loading, error, fetchAllTopics, searchTopics, createTopic, updateTopic} = useTopic();

    const [activeLanguages, setActiveLanguages] = useState<LanguageResponse[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<TopicResponse | null>(null);
    const [pendingStatus, setPendingStatus] = useState<boolean | null>(null);

    const [filterName, setFilterName] = useState("");
    const [debouncedName, setDebouncedName] = useState("");
    const [filterDifficulty, setFilterDifficulty] = useState<string>("");
    const [filterIsActive, setFilterIsActive] = useState<string>(""); 

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
        { key: 'isActive', label: t('admin.topics.table.active') },
        { key: 'actions', label: t('admin.topics.table.actions') },
    ];

    useEffect(() => {
        languageService.getAllActiveLanguages().then(setActiveLanguages).catch(console.error);
    }, [showForm]);

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

    const handleStatusToggle = (topic: TopicResponse, newStatus: boolean) => {
        setSelectedTopic(topic);
        setPendingStatus(newStatus);
        setShowStatusModal(true);
    };

    const onSubmitForm = async (data: CreateTopicRequest | UpdateTopicRequest) => {
        if (selectedTopic) {
            await updateTopic(selectedTopic.id, data);
        } else {
            await createTopic(data);
        }
        setShowForm(false);
        setSelectedTopic(null);
        fetchAllTopics();
    };

    const confirmStatusChange = async () => {
        if (selectedTopic && pendingStatus !== null) {
            await updateTopic(selectedTopic.id, {
                targetLanguageId: selectedTopic.targetLanguageId,
                sourceLanguageId: selectedTopic.sourceLanguageId,
                name: selectedTopic.name,
                description: selectedTopic.description,
                difficulty: selectedTopic.difficulty,
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
        <>
            <MetaData title={t('admin.topics.page_title')} robots="noindex, nofollow"  />
            <div className="w-full space-y-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-brand-900 dark:text-white">
                        {t('admin.topics.page_title')}
                    </h1>
                    <Button variant="primary" onClick={handleCreate} className="w-40">
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
                    <div className="mb-4 p-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-400 text-sm">
                        <p>{error}</p>
                    </div>
                )}

                <Table
                    data={topics}
                    columns={columns}
                    keyExtractor={(topic) => topic.id}
                    renderRow={(topic) => {
                        const targetLang = getLanguageInfo(topic.targetLanguageId);
                        const sourceLang = getLanguageInfo(topic.sourceLanguageId);
                        return (
                            <>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                                    <div>{topic.name}</div>
                                    {topic.description && <div className="text-xs text-gray-500 dark:text-gray-400 font-normal mt-1 max-w-xs truncate" title={topic.description}>{topic.description}</div>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center space-x-3">
                                        {targetLang ? (
                                            <div className="flex items-center space-x-1.5" title={t('admin.topics.form.target_language')}>
                                                <LanguageFlag languageCode={targetLang.code} className="w-5 h-5 rounded-sm shadow-sm" />
                                                <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">{targetLang.code.toUpperCase()}</span>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-gray-400">?</span>
                                        )}
                                        
                                        <span className="text-gray-300 dark:text-gray-600">|</span>
                                        
                                        {sourceLang ? (
                                            <div className="flex items-center space-x-1.5" title={t('admin.topics.form.source_language')}>
                                                <LanguageFlag languageCode={sourceLang.code} className="w-5 h-5 rounded-sm shadow-sm" />
                                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{sourceLang.code.toUpperCase()}</span>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-gray-400">?</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                                    <BadgeTag color="blue">
                                        {topic.difficulty}
                                    </BadgeTag>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                                    <Switch
                                        checked={topic.isActive}
                                        onChange={(checked) => handleStatusToggle(topic, checked)}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right border-b border-gray-200 dark:border-gray-700">
                                    <TableActions
                                        onEdit={() => handleEdit(topic)}
                                        onLessons={() => navigate(`/admin/topics/${topic.id}/lessons`)}
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
                    isOpen={showStatusModal}
                    title={t('admin.languages.status_title')}
                    description={t('admin.languages.status_desc')}
                    onConfirm={confirmStatusChange}
                    onCancel={cancelStatusChange}
                    isConfirming={loading}
                />
            </div>
        </>
    );
}
