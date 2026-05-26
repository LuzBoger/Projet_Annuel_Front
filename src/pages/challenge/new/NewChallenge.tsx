import { CreateChallengeForm } from "@/components/challenge/CreateChallengeForm";
import { MetaData } from "@/components/seo/MetaData";
import { useTranslation } from "react-i18next";

export default function NewChallenge() {
    const { t } = useTranslation();

    return (
        <>
            <MetaData title={t('challenge.form.title') ?? ""} robots="noindex, nofollow" />
            <div className="max-w-2xl mx-auto p-6 space-y-6">
                <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t('challenge.form.title')}</h1>
                <CreateChallengeForm />
            </div>
        </>
    );
}