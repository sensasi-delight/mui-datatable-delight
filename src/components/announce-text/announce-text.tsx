import { useMainContext } from '../../hooks/use-main-context'
import { useStyles } from './hooks'

export function AnnounceText() {
    const { classes } = useStyles()
    const { state } = useMainContext()

    if (!state.announceText) return null

    return (
        <div className={classes.root} aria-live="polite">
            {state.announceText}
        </div>
    )
}
