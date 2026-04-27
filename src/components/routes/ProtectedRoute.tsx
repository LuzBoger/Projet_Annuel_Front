import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { RoleEnum } from "@/types/enum/roles";

export function ProtectedRoute({ children, isAdmin, userOnly }: Readonly<{ children: React.ReactNode, isAdmin?: boolean, userOnly?: boolean }>) {
    const { isAuthenticated, isLoading, user } = useAuth();

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if (isAdmin && user?.role !== RoleEnum.ADMIN) {
        return <Navigate to="/" replace />;
    }
    if (userOnly && user?.role === RoleEnum.ADMIN) {
        return <Navigate to="/admin" replace />;
    }

    return <>{children}</>;
}
