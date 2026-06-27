import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAdminUser } from '@/hooks/useAdminUser';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { UserStatsResponse } from '@/types/admin/stats/stats';
import { ConfirmAction, TargetStatus } from '@/types/components/manageUsers';
import { STATUS_CONFIG } from '@/constants/adminManage';

interface UserEditModalProps {
    user: UserStatsResponse | null;
    onClose: () => void;
    onSuccess: () => void;
}

export function UserEditModal({ user, onClose, onSuccess }: UserEditModalProps) {
    const { t } = useTranslation();
    const { actionLoading, updateUserStatus, unlockUser, deleteUser, resetUserPassword } = useAdminUser();

    const [pendingStatus, setPendingStatus] = useState<TargetStatus | null>(null);
    const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
    const [newPassword, setNewPassword] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);

    if (!user){
        return null;
    }

    const handleStatusClick = (status: TargetStatus) => {
        if (status === user.status){
            return;
        }
        setPendingStatus(status);
        setConfirmAction('status');
    };

    const handleConfirmStatus = async () => {
        if (!pendingStatus) return;
        let confirmUpdateStatus = false;
        if (pendingStatus === 'ACTIVE' && user.status === 'LOCKED') {
            confirmUpdateStatus = await unlockUser(user.accountId);
        } else {
            confirmUpdateStatus = await updateUserStatus(user.accountId, { status: pendingStatus });
        }
        if (confirmUpdateStatus) {
            setConfirmAction(null);
            setPendingStatus(null);
            onSuccess();
        }
    };

    const handleConfirmDelete = async () => {
        const confirmDelete = await deleteUser(user.accountId);
        if (confirmDelete) {
            setConfirmAction(null);
            onClose();
            onSuccess();
        }
    };

    const handlePasswordReset = async () => {
        if (newPassword.length < 12){
            return;
        }
        setPasswordLoading(true);
        const confirmPasswordReset = await resetUserPassword(user.accountId, newPassword);
        setPasswordLoading(false);
        if (confirmPasswordReset) setNewPassword('');
    };

    return (
        <>
            <Modal
                isOpen={!!user}
                onClose={onClose}
                title={t('admin.users.editTitle')}
                size="sm"
            >
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-bold shrink-0">
                            {user.username[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold text-gray-900 dark:text-white truncate">{user.username}</p>
                            <p className="text-sm text-gray-400 truncate">{user.email}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                            {t('admin.stats.table.status')}
                        </p>
                        <div className="flex gap-2">
                            {STATUS_CONFIG.map(({ value, labelKey, variant }) => (
                                <Button
                                    key={value}
                                    size="sm"
                                    variant={user.status === value ? variant : 'pill-gray'}
                                    disabled={user.status === value}
                                    onClick={() => handleStatusClick(value)}
                                >
                                    {t(`admin.users.status.${labelKey}`)}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                            {t('admin.users.newPassword')}
                        </p>
                        <div className="flex gap-2">
                            <Input
                                type="password"
                                placeholder={t('admin.users.passwordPlaceholder')}
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                className="flex-1"
                            />
                            <Button
                                size="sm"
                                variant="secondary"
                                disabled={newPassword.length < 12}
                                isLoading={passwordLoading}
                                onClick={handlePasswordReset}
                            >
                                {t('common.save')}
                            </Button>
                        </div>
                        {newPassword.length > 0 && newPassword.length < 12 && (
                            <p className="text-xs text-red-500 mt-1">{t('admin.users.passwordMinLength')}</p>
                        )}
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-2">
                            {t('admin.users.deleteArea')}
                        </p>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => setConfirmAction('delete')}
                        >
                            {t('admin.users.deleteTitle')}
                        </Button>
                    </div>
                </div>
            </Modal>

            <ConfirmModal
                isOpen={confirmAction === 'status'}
                title={pendingStatus === 'ACTIVE' ? t('admin.users.activateTitle') : pendingStatus === 'SUSPENDED' ? t('admin.users.suspendTitle') : t('admin.users.lockTitle')}
                description={pendingStatus === 'ACTIVE' ? t('admin.users.activateDesc', { username: user.username }) : pendingStatus === 'SUSPENDED' ? t('admin.users.suspendDesc', { username: user.username }) : t('admin.users.lockDesc', { username: user.username })}
                onConfirm={handleConfirmStatus}
                onCancel={() => { setConfirmAction(null); setPendingStatus(null); }}
                isConfirming={actionLoading}
            />

            <ConfirmModal
                isOpen={confirmAction === 'delete'}
                title={t('admin.users.deleteTitle')}
                description={t('admin.users.deleteDesc', { username: user.username })}
                onConfirm={handleConfirmDelete}
                onCancel={() => setConfirmAction(null)}
                isConfirming={actionLoading}
                confirmVariant="danger"
            />
        </>
    );
}
