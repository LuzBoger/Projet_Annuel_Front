import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { UserSearchCard } from '@/components/ui/card/UserSearchCard';
import { AccountSearchResponse } from '@/types/friends/friends';
import { Input } from '@/components/ui/Input';

interface SearchUsersProps {
    query: string;
    onChange: (query: string) => void;
    results: AccountSearchResponse[];
    loading: boolean;
    onSend: (accountId: string) => void;
    onAccept: (id: string) => void;
    onDecline: (id: string) => void;
    onRemove: (id: string) => void;
    onNavigate?: () => void;
}

export function SearchUsers({ query, onChange, results, loading, onSend, onAccept, onDecline, onRemove, onNavigate }: SearchUsersProps) {
    const { t } = useTranslation();

    return (
        <div>
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    type="text"
                    value={query}
                    onChange={e => onChange(e.target.value)}
                    placeholder={t('friends.searchPlaceholder')}
                    className="pl-10 py-2.5 rounded-xl text-sm search-input-no-focus"
                />
            </div>

            {loading && (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                    {t('common.loading')}
                </p>
            )}
            {!loading && query && results.length === 0 && (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-8">
                    {t('friends.noResults')}
                </p>
            )}

            <div className="space-y-3">
                {results.map(user => (
                    <UserSearchCard
                        key={user.accountId}
                        user={user}
                        loading={loading}
                        onSend={onSend}
                        onAccept={onAccept}
                        onDecline={onDecline}
                        onRemove={onRemove}
                        onNavigate={onNavigate}
                    />
                ))}
            </div>
        </div>
    );
}
