/**
 * ⚠️ This JSDoc is generated by AI ⚠️
 * -
 *
 * Determine if a string contains a substring.
 *
 * @param toSearch The string to search
 * @param toFind The string to find
 * @param caseSensitive Whether the search should be case sensitive
 * @returns true if the string was found, false if not
 */
export default function hasSearchText(
    toSearch: string,
    toFind: string,
    caseSensitive = false
) {
    let stack = toSearch.toString()
    let needle = toFind.toString()

    if (!caseSensitive) {
        needle = needle.toLowerCase()
        stack = stack.toLowerCase()
    }

    return stack.includes(needle)
}
