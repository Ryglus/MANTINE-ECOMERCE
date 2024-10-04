export function slugify(str: string): string {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

export function buildProductUrl(category: string, id: number, title: string): string {
    return `/products/${slugify(category)}/${id}-${slugify(title)}`;
}

export function extractProductIdFromSlug(slug: string): number | null {
    const parts = slug.split('-');
    const idPart = parts[0];

    const id = parseInt(idPart, 10);

    return isNaN(id) ? null : id;
}
