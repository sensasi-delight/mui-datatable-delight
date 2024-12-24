export function warnInfo(warning: string, consoleWarnings = true) {
    if (consoleWarnings) {
        console.warn(`${warning}`)
    }
}
