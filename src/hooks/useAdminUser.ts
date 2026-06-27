import { useCallback, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { useTranslation } from "react-i18next";
import { adminUserService } from "@/services/adminUserService";
import { AdminUserListResponse, UpdateUserStatusRequest } from "@/types/admin/users/users";

export function useAdminUser() {
    const { addToast } = useToast();
    const { t } = useTranslation();

    const [userList, setUserList] = useState<AdminUserListResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchUsers = useCallback(async (search = '', page = 0, size = 10) => {
        setLoading(true);
        try {
            const data = await adminUserService.getUsers(search, page, size);
            setUserList(data);
        } catch {
            addToast({ type: 'error', message: t('admin.users.fetchError') });
        } finally {
            setLoading(false);
        }
    }, [addToast, t]);

    const updateUserStatus = useCallback(async (userId: string, request: UpdateUserStatusRequest) => {
        setActionLoading(true);
        try {
            await adminUserService.updateUserStatus(userId, request);
            addToast({ type: 'success', message: t('admin.users.statusUpdated') });
            return true;
        } catch {
            addToast({ type: 'error', message: t('admin.users.actionError') });
            return false;
        } finally {
            setActionLoading(false);
        }
    }, [addToast, t]);

    const unlockUser = useCallback(async (userId: string) => {
        setActionLoading(true);
        try {
            await adminUserService.unlockUser(userId);
            addToast({ type: 'success', message: t('admin.users.unlocked') });
            return true;
        } catch {
            addToast({ type: 'error', message: t('admin.users.actionError') });
            return false;
        } finally {
            setActionLoading(false);
        }
    }, [addToast, t]);

    const resetUserPassword = useCallback(async (userId: string, newPassword: string) => {
        setActionLoading(true);
        try {
            await adminUserService.resetUserPassword(userId, newPassword);
            addToast({ type: 'success', message: t('admin.users.passwordReset') });
            return true;
        } catch {
            addToast({ type: 'error', message: t('admin.users.actionError') });
            return false;
        } finally {
            setActionLoading(false);
        }
    }, [addToast, t]);

    const deleteUser = useCallback(async (userId: string) => {
        setActionLoading(true);
        try {
            await adminUserService.deleteUser(userId);
            addToast({ type: 'success', message: t('admin.users.deleted') });
            return true;
        } catch {
            addToast({ type: 'error', message: t('admin.users.actionError') });
            return false;
        } finally {
            setActionLoading(false);
        }
    }, [addToast, t]);

    return {
        userList,
        loading,
        actionLoading,
        fetchUsers,
        updateUserStatus,
        unlockUser,
        deleteUser,
        resetUserPassword,
    };
}
