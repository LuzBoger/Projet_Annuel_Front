import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { RoleEnum } from "@/types/enum/roles";

export function ProtectedRoute({ children, isAdmin }: Readonly<{ children: React.ReactNode, isAdmin?: boolean }>) {
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

    return <>{children}</>;
}
