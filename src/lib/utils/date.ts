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