export const hasRole = (userRole: string | undefined | null, requiredRole: string): boolean => {
    if (!userRole) {
        return false;
    }
    return userRole === requiredRole;
};

export const hasRoles = (userRole: string | undefined | null, requiredRoles: string[]): boolean => {
    if (!userRole) {
        return false;
    }
    return requiredRoles.includes(userRole);
};
