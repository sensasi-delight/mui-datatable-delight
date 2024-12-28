export function snakeCaseToKebab(scString: string): string {
    return scString.replaceAll('_', '-').toLowerCase()
}
