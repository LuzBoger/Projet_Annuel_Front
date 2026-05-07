import { useTranslation } from "react-i18next";
import { PaymentHistoryResponse } from "@/types/payment/payment";
import { getFormatForCurrency } from "@/lib/utils/currency";
import { formDateTime } from "@/lib/utils/date";
import { paymentStatusColors } from "@/constants/colors";
import { Check, Info, Ban } from "@/assets/icons";

interface PaymentHistoryListProps {
    payments: PaymentHistoryResponse[];
}

export function PaymentHistoryList({ payments }: PaymentHistoryListProps) {
    const { t, i18n } = useTranslation();
    const locale = i18n.language;

    if (payments.length === 0) {
        return (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                {t('subscription.paymentHistory.no_payments')}
            </div>
        );
    }

    const getStatusIcon = (status: string) => {
        switch (status.toUpperCase()) {
            case 'PAID':
            case 'COMPLETED':
                return <Check className="w-4 h-4 text-green-500" />;
            case 'PENDING':
                return <Info className="w-4 h-4 text-yellow-500" />;
            case 'FAILED':
            case 'CANCELED':
                return <Ban className="w-4 h-4 text-red-500" />;
            default:
                return <Info className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="space-y-4">
            {payments.map((payment) => (
                <div 
                    key={payment.id}
                    className="flex items-center justify-between group py-2"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-750 transition-colors shadow-sm">
                            {getStatusIcon(payment.status)}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {formDateTime(payment.paidAt, locale)}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                {payment.paymentMethod?.toLowerCase().replace('_', ' ')}
                            </p>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                            {getFormatForCurrency(locale, payment.currency, payment.amount)}
                        </p>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mt-1
                            ${paymentStatusColors[payment.status] || paymentStatusColors.PENDING}`}>
                            {t(`subscription.paymentHistory.status.${payment.status.toLowerCase()}`)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
