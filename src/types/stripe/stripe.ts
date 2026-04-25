export interface CheckoutStripeResponse {
    checkoutUrl: string | null;
    sessionId: string | null;
    message: string | null;
}
