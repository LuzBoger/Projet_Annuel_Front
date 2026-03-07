// import { useTranslation } from "react-i18next"
import { Outlet } from "react-router-dom";

export function CheckoutLayout() {
    // const {t} = useTranslation();
    
    
    return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
    )
}