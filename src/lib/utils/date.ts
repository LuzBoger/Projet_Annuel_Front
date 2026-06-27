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

export function formatMinutes(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) {
        return `${mins}m`;
    }
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function formatSeconds(seconds: number): string {
    if (seconds === 0){
        return '0m';
    }
    if (seconds < 60){
        return '< 1m';
    }
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours === 0){
        return `${mins}m`;
    }
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}
