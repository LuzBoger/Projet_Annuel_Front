import { Check } from "@/assets/icons";
import { MetaData } from "@/components/seo/MetaData";
import { Button } from "@/components/ui/Button";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { subscriptionService } from "@/services/subscriptionService";

export default function CheckoutSuccess() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const sessionId = searchParams.get('session_id');
        if (sessionId) {
            subscriptionService.verifyCheckoutSession(sessionId).catch(() => {});
        }
    }, [searchParams]);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/checkout');
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
            <MetaData title={t('checkout.success.title')} robots="noindex, nofollow"  />
            <div className="max-w-md mx-auto mt-20 text-center p-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('checkout.success.title')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {t('checkout.success.description')}
                </p>
                <Button
                    variant="primary"
                    onClick={() => navigate('/subscription')}
                    className="px-6 py-3"
                >
                    {t('checkout.view_subscription')}
                </Button>
            </div>
        </>
    );
}
