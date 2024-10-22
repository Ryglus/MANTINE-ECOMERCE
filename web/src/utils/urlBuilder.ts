export function slugify(str: string): string {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

export function buildProductUrl(category: string, id: number, title: string): string {
    return `/products/${slugify(category)}/${id}/${slugify(title)}`;
}
