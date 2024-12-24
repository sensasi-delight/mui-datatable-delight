export function warnDeprecated(warning: string, consoleWarnings = true) {
    if (consoleWarnings) {
        console.warn(`Deprecation Notice:  ${warning}`)
    }
}
