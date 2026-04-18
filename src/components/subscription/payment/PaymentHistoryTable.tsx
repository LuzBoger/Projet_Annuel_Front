import { useTranslation } from "react-i18next";
import { PaymentHistoryResponse } from "@/types/payment/payment";
import { TableColumn } from "@/types/components/tableColumn";
import { Table } from "@/components/ui/Table";
import { getFormatForCurrency } from "@/lib/utils/currency";
import { formDateTime } from "@/lib/utils/date";
import { BadgeTag, BadgeColor } from "@/components/ui/BadgeTag";

interface PaymentHistoryTableProps {
    payments: PaymentHistoryResponse[];
}

export function PaymentHistoryTable({payments} : PaymentHistoryTableProps) {

    const {t, i18n} = useTranslation();
    const locale = i18n.language;

    const colums: TableColumn[] = [
        {key: 'method', label: t('subscription.paymentHistory.method')},
        {key: 'amount', label: t('subscription.paymentHistory.amount')},
        {key: 'date', label: t('subscription.paymentHistory.date')},
        {key: 'status', label: t('subscription.paymentHistory.status.label')},
    ]

    return (
        <Table
            data={payments}
            columns={colums}
            keyExtractor={(payment) => payment.id}
            emptyMessage={t('subscription.paymentHistory.no_payments')}
            itemLabel={t('subscription.paymentHistory.payments', {s: payments.length > 1 ? 's' : ''})}
            initialItemsPerPage={10}
            showControls={payments.length > 0}
            renderRow={(payment) => (
                <>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 capitalize">{payment.paymentMethod}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 font-medium">{getFormatForCurrency(locale, payment.currency, payment.amount)}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{formDateTime(payment.paidAt, locale)}</td>
                    <td className="px-4 py-3 text-center">
                        <BadgeTag color={
                            (payment.status === "SUCCEEDED" ? "green" : 
                             payment.status === "PENDING" ? "yellow" : 
                             payment.status === "FAILED" ? "red" : "blue") as BadgeColor
                        }>
                            {t(`subscription.paymentHistory.status.${payment.status.toLowerCase()}`)}
                        </BadgeTag>
                    </td>
                </>
            )}
        />
    )


}
