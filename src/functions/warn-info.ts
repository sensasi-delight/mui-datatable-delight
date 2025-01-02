export function warnInfo(warning: string, consoleWarnings = true): void {
    if (consoleWarnings) {
        console.warn(`${warning}`)
    }
}
