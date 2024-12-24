export function getCollatorComparator() {
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
