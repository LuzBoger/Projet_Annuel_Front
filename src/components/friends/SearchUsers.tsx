import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { UserSearchCard } from '@/components/ui/card/UserSearchCard';
import { AccountSearchResponse } from '@/types/friends/friends';

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
                <input
                    type="text"
                    value={query}
                    onChange={e => onChange(e.target.value)}
                    placeholder={t('friends.searchPlaceholder')}
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
