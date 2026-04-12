import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { ViewType } from "@/types/subscription/stats";



export interface SubscriptionsBarChartHeaderProps {
    view: ViewType;
    onChange: (view: ViewType) => void;
}


export function SubscriptionsBarChartHeader({ view, onChange }: SubscriptionsBarChartHeaderProps) {
    const {t} = useTranslation();

    return(
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                {t('dashboard.subscriptionsOverTime')}
            </h3>
            <div className="flex gap-2">
                {(['monthly', 'yearly'] as ViewType[]).map((v) => (
                    <Button
                        key={v}
                        onClick={() => onChange(v)}
                        variant={view === v ? 'primary' : 'outline'}
                        size="sm"
                    >
                        {t(`dashboard.${v}`)}
                    </Button>
                ))}
            </div>
        </div>
    )
}