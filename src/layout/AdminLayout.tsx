import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

export function AdminLayout() {
    const {t} = useTranslation();
    return (
    <div className="min-h-[calc(100vh-65px)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
    )
}