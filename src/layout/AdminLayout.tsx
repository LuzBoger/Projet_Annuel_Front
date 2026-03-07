import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

export function AdminLayout() {
    const {t} = useTranslation();
    return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('admin.dashboard.title')}</h1>
        <Outlet />
      </div>
    </div>
    )
}