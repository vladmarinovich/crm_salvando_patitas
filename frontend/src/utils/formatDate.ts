export const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CO', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(date);
};
