import { Outlet } from "react-router-dom";

export function AdminLayout() {
    return (
    <div className="min-h-[calc(100vh-65px)] bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
    )
}
