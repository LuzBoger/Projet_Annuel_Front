import { Check } from "@/assets/icons";
import { Button } from "@/components/ui/Button";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function CheckoutSuccess() {
    const {t} = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/checkout');
        }, 5000);   
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="max-w-md mx-auto mt-20 text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {t('checkout.success.title')}
            </h1>
            <p className="text-gray-600 mb-6">
                {t('checkout.success.description')}
            </p>
            <Button
                variant="none"
                onClick={() => navigate('/subscription')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
            >
                {t('checkout.view_subscription')}
            </Button>
        </div>
    );
}