export function warnDeprecated(warning: string, consoleWarnings = true): void {
    if (consoleWarnings) {
        console.warn(`Deprecation Notice:  ${warning}`)
    }
}
