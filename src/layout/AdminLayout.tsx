import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { profileService } from "@/services/profileService";
import { getProfileImageUrl } from "@/lib/utils/image";
import { Sidebar } from "@/components/ui/Sidebar";
import { Button } from "@/components/ui/Button";
import { LogoSk } from "@/assets/icons";

export function AdminLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        profileService.getMyProfile().then((profile) => {
                if (profile.photoUrl){
                    setPhotoUrl(getProfileImageUrl(profile.photoUrl));
                }
            })
            .catch(() => {});
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">

            <aside className="hidden md:flex w-56 shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex-col">
                <Sidebar photoUrl={photoUrl} handleLogout={handleLogout} />
            </aside>

            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}/>
                    <aside className="relative w-64 h-full bg-white dark:bg-gray-900 flex flex-col shadow-2xl">
                        <Sidebar
                            onClose={() => setSidebarOpen(false)}
                            photoUrl={photoUrl}
                            handleLogout={handleLogout}
                        />
                    </aside>
                </div>
            )}

            <div className="flex-1 min-w-0 flex flex-col">
                <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
                    <Button
                        variant="none"
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Open menu"
                    >
                        <div className="flex flex-col gap-1.5 w-5">
                            <span className="block h-0.5 bg-current rounded" />
                            <span className="block h-0.5 bg-current rounded" />
                            <span className="block h-0.5 bg-current rounded" />
                        </div>
                    </Button>
                    <Link to="/admin" className="flex items-center gap-2 text-brand-600 dark:text-white">
                        <LogoSk className="h-8 w-8 shrink-0" />
                        <span className="text-xs font-normal text-gray-400">Admin</span>
                    </Link>
                </div>

                <div className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
