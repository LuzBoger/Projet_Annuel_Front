import { useTranslation } from "react-i18next";
import { useSubscription } from "../../../hooks/useSubscription";
import { SubscriptionDetailResponse } from "../../../types/subscription/subscription";
import { useEffect, useState } from "react";
import { TableColumn } from "../../../types/components/tableColumn";
import { Table } from "../../../components/ui/Table";
import { Button } from "../../../components/ui/Button";
import { SubscriptionModal } from "../../../components/subscription/SubscriptionModal";
import { CancelSubscriptionModal } from "../../../components/subscription/CancelSubscriptionModal";

export default function SubscriptionsManage() {
    const {t, i18n } = useTranslation();
    const locale = i18n.language;
    const { subscriptions, loading, error, fetchAllSubscriptions, cancelSubscriptionByAdmin } = useSubscription();
    const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionDetailResponse | null>(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

    useEffect(() => {
        fetchAllSubscriptions();
    }, [fetchAllSubscriptions]);

    const handleViewDetails = (subscription: SubscriptionDetailResponse, accountId: string) => {
        setSelectedSubscription(subscription);
        setSelectedAccountId(accountId);
        setShowDetailsModal(true);
    }

    const handleCancelSubscription = (subscription: SubscriptionDetailResponse, accountId: string) => {
        setSelectedSubscription(subscription);
        setSelectedAccountId(accountId);
        setShowCancelModal(true);
    }

    const onConfirmCancel = async (isCancelAtPeriodEnd: boolean, reason: string) => {
        if (selectedAccountId) {
            await cancelSubscriptionByAdmin(selectedAccountId, {
                isCancelAtPeriodEnd,
                cancellationReason: reason
            });
            setShowCancelModal(false);
            setSelectedSubscription(null);
            setSelectedAccountId(null);
            fetchAllSubscriptions();
        }
    }

    const colums :TableColumn[] = [
        {key: 'account', label: t('subscriptions.table.account')},
        {key: 'plan', label: t('subscriptions.table.plan')},
        {key: 'status', label: t('subscriptions.table.status')},
        {key: 'startDate', label: t('subscriptions.table.startDate')},
        {key: 'endDate', label: t('subscriptions.table.endDate')},
        {key: 'actions', label: t('subscriptions.table.actions')},
    ];

    return (
               <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-indigo-900 mb-6">
                {t('admin.subscriptions.title')}
            </h1>

            {error && (
                <div className="mb-4 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm">
                    <p>{error}</p>
                </div>
            )}
            <Table<SubscriptionDetailResponse>
                columns={colums}
                data={subscriptions}
                keyExtractor={(subscription) => subscription.id}
                renderRow={(subscription) => (
                    <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscription.firstName}  {subscription.lastName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subscription.plan?.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t(`subscription.status.${subscription.status.toLowerCase()}`)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subscription.startDate ? new Date(subscription.startDate).toLocaleDateString(locale) : '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subscription.endDate ? new Date(subscription.endDate).toLocaleDateString(locale) : '-'}</td>
                        <td className="px-6 py-3 text-right">
                            <div className="flex gap-2 justify-end">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewDetails(subscription, subscription.accountId)}
                                >
                                    {t('common.view')}
                                </Button>
                                {subscription.status === 'ACTIVE' && (
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleCancelSubscription(subscription, subscription.accountId)}
                                    >
                                        {t('common.cancel')}
                                    </Button>
                                )}
                            </div>
                        </td>
                    </>
                )}
            />

            <SubscriptionModal
                isOpen={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
                subscription={selectedSubscription}
                accountId={selectedAccountId!}
            />

            <CancelSubscriptionModal
                isOpen={showCancelModal}
                isLoading={loading}
                onCancel={() => setShowCancelModal(false)}
                onConfirm={onConfirmCancel}
            />
        </div>
    );
}