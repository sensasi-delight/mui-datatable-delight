export function getCollatorComparator(): (a: string, b: string) => number {
    if (Intl) {
        const collator = new Intl.Collator(undefined, {
            numeric: true,
            sensitivity: 'base'
        })
        return collator.compare
    }

    /** Fallback Comparator */
    return (a: string, b: string) => a.localeCompare(b)
}
