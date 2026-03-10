import SubscriptionsManage from "@/pages/admin/subscriptions/SubscriptionsManage";
import PlansManage from "@/pages/admin/plans/PlansManage";
import LanguageList from "@/pages/admin/languages/LanguageList";

export default function AdminDashboard() {
    return (
        <div className="flex flex-col space-y-8">
            {/* On réutilise simplement les vues existantes pour former un dashboard complet */}
            <SubscriptionsManage />
            <PlansManage />
            <LanguageList />
        </div>
    );
}
