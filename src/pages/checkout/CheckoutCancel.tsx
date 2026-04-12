import { Cross } from "@/assets/icons";
import { MetaData } from "@/components/seo/MetaData";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function CheckoutCancel() {
    const {t} = useTranslation();
    const navigate = useNavigate();
        return (
        <>
            <MetaData title={t('checkout.cancel.title')} robots="noindex, nofollow"  />
            <div className="max-w-md mx-auto mt-20 text-center p-8">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Cross className="w-8 h-8 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('checkout.cancel.title')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {t('checkout.cancel.description')}
                </p>
                <Button
                    variant="none"
                    onClick={() => navigate('/plans')}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
                >
                    {t('common.back')}
                </Button>
            </div>
        </>
    );
}
