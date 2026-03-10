import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageResponse } from "@/types/language/language";
import { TableColumn } from "@/types/components/tableColumn";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Switch } from "@/components/ui/Switch";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { LanguageForm } from "@/components/languages/LanguageForm";
import { TableActions } from "@/components/ui/TableActions";

export default function LanguageList() {
    const { t } = useTranslation();
    const { 
        languages, 
        loading, 
        error, 
        fetchLanguages, 
        createLanguage, 
        updateLanguage, 
        deleteLanguage 
    } = useLanguage();

    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageResponse | null>(null);
    const [pendingStatus, setPendingStatus] = useState<boolean | null>(null);

    const columns: TableColumn[] = [
        { key: 'code', label: t('admin.languages.table.code') },
        { key: 'name', label: t('admin.languages.table.name') },
        { key: 'orderIndex', label: t('admin.languages.table.orderIndex') },
        { key: 'isActive', label: t('admin.languages.table.isActive') },
        { key: 'actions', label: t('admin.languages.table.actions') },
    ];

    useEffect(() => {
        fetchLanguages();
    }, [fetchLanguages]);

    const handleCreate = () => {
        setSelectedLanguage(null);
        setShowForm(true);
    };

    const handleEdit = (language: LanguageResponse) => {
        setSelectedLanguage(language);
        setShowForm(true);
    };

    const handleDelete = (language: LanguageResponse) => {
        setSelectedLanguage(language);
        setShowDeleteModal(true);
    };

    const handleStatusToggle = (language: LanguageResponse, newStatus: boolean) => {
        setSelectedLanguage(language);
        setPendingStatus(newStatus);
        setShowStatusModal(true);
    };

    const onSubmitForm = async (data: any) => {
        if (selectedLanguage) {
            await updateLanguage(selectedLanguage.id, data);
        } else {
            await createLanguage(data);
        }
        setShowForm(false);
        setSelectedLanguage(null);
        fetchLanguages();
    };

    const confirmDelete = async () => {
        if (selectedLanguage) {
            await deleteLanguage(selectedLanguage.id);
            setShowDeleteModal(false);
            setSelectedLanguage(null);
            fetchLanguages();
        }
    };

    const confirmStatusChange = async () => {
        if (selectedLanguage && pendingStatus !== null) {
            await updateLanguage(selectedLanguage.id, {
                code: selectedLanguage.code,
                name: selectedLanguage.name,
                orderIndex: selectedLanguage.orderIndex,
                isActive: pendingStatus
            });
            setShowStatusModal(false);
            setSelectedLanguage(null);
            setPendingStatus(null);
            fetchLanguages();
        }
    };

    const cancelStatusChange = () => {
        setShowStatusModal(false);
        setSelectedLanguage(null);
        setPendingStatus(null);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-indigo-900">
                    {t('admin.languages.page_title')}
                </h1>
                <Button variant="primary" onClick={handleCreate}>
                    {t('common.create')}
                </Button>
            </div>

            {error && (
                <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm">
                    <p>{error}</p>
                </div>
            )}

            <Table
                data={languages}
                columns={columns}
                keyExtractor={(lang) => lang.id}
                renderRow={(lang) => (
                    <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{lang.code.toUpperCase()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">{lang.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">{lang.orderIndex}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">
                            <Switch 
                                checked={lang.isActive} 
                                onChange={(checked) => handleStatusToggle(lang, checked)}
                            />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border-b border-gray-200">
                            <TableActions 
                                onEdit={() => handleEdit(lang)} 
                                onDelete={() => handleDelete(lang)} 
                            />
                        </td>
                    </>
                )}
            />

            <LanguageForm
                isOpen={showForm}
                isLoading={loading}
                language={selectedLanguage}
                onCancel={() => setShowForm(false)}
                onSubmit={onSubmitForm}
            />

            <ConfirmModal
                isOpen={showDeleteModal}
                title={t('admin.languages.delete_title')}
                description={t('admin.languages.delete_desc')}
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
