import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { hasRole } from "@/lib/utils/roles";
import { useTranslation } from "react-i18next";
import { User, ChevronDown } from "@/assets/icons";

export function Header() {
    const { user, isAuthenticated, logout } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isAdmin = hasRole(user?.role, "ADMIN");

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo / Brand */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                            GlotRush
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex flex-1 justify-center space-x-8">
                        {isAuthenticated && (
                            <>
                                {!isAdmin && (
                                    <>
                                        <Link to="/plans" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                                            {t("plans.page_title", "Forfaits")}
                                        </Link>
                                        <Link to="/subscription" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                                            {t("subscription.short_title", "Abonnement")}
                                        </Link>
                                    </>
                                )}
                                
                                {/* Section Admin */}
                                {isAdmin && (
                                    <div className="flex items-center space-x-8">
                                        <Link to="/admin" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                                            {t("admin.dashboard.title", "Tableau de bord")}
                                        </Link>
                                        <Link to="/admin/languages" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                                            {t("admin.languages.page_title", "Langues")}
                                        </Link>
                                        <Link to="/admin/plans" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                                            {t("admin.plans.short_title", "Plans")}
                                        </Link>
                                        <Link to="/admin/subscriptions" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                                            {t("admin.subscriptions.title", "Abonnements")}
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                    </nav>

                    {/* Right side Buttons */}
                    <div className="flex items-center space-x-4">
                        {!isAuthenticated ? (
                            <div className="flex items-center space-x-8">
                                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                                    {t("auth.login.title")}
                                </Link>
                                <Link to="/register" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                                    {t("auth.register.title")}
                                </Link>
                            </div>
                        ) : (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none"
                                >
                                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div className="hidden sm:block text-sm text-left">
                                        <p className="font-medium text-gray-700">{user?.username || 'User'}</p>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                                        <Link 
                                            to="/settings/two-factor" 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            {t("settings.title", "Paramètres")}
                                        </Link>
                                        <button 
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                handleLogout();
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                                        >
                                            {t("auth.logout")}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
