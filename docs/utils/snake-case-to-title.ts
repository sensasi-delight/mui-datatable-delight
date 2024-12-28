export function snakeCaseToTitle(scString: string): string {
    const words = scString.split('_')

    return words
        .map(w => w.charAt(0).toUpperCase() + w.substring(1).toLowerCase())
        .join(' ')
}
