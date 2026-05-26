export const formDate = (date: string | null, locale: string) => {
    if(!date) {
        return '-';
    }

    return new Date(date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export const formDateTime = (date: string | null, locale: string) => {
    if(!date) {
        return '-';
    }

    return new Date(date).toLocaleString(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export function formatTotalTime(time: number) : string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return minutes > 0 ? `${minutes}m ${seconds}s` : `  ${seconds}s`;
}

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

