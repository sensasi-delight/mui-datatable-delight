export function snakeCaseToKebab(scString: string): string {
    return scString.replace(/_/g, '-').toLowerCase()
}
