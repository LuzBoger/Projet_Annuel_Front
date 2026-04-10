import SubscriptionsManage from "@/pages/admin/subscriptions/SubscriptionsManage";
import PlansManage from "@/pages/admin/plans/PlansManage";
import LanguageList from "@/pages/admin/languages/LanguageList";
import TopicList from "@/pages/admin/topics/TopicList";

export default function AdminDashboard() {
    return (
        <div className="flex flex-col space-y-8">
            <SubscriptionsManage />
            <PlansManage />
            <LanguageList />
            <TopicList />
        </div>
    );
}
