export type PaymentInterval = 'MONTHLY' | 'YEARLY';
export type PaymentStatus = 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED';

export interface PaymentHistoryResponse {
    id: string;
    transactionId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    paymentMethod: string;
    paidAt: string;
    createdAt: string;
}