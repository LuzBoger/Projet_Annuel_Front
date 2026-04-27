import SubscriptionsManage from "@/pages/admin/subscriptions/SubscriptionsManage";
import PlansManage from "@/pages/admin/plans/PlansManage";
import LanguageList from "@/pages/admin/languages/LanguageList";
import TopicList from "@/pages/admin/topics/TopicList";
import { MetaData } from "@/components/seo/MetaData";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
    const {t} = useTranslation();
    return (
        <>
            <MetaData title={t('admin.dashboard.title')} robots="noindex, nofollow"  />
            <div className="flex flex-col space-y-8">
                <SubscriptionsManage />
                <PlansManage />
                <LanguageList />
                <TopicList />
            </div>
        </>
    );
}
