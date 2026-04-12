import { Outlet } from "react-router-dom";

export function CheckoutLayout() {   
    return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
    )
}