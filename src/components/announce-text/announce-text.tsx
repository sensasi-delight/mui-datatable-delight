import { useDataTableContext } from '../../hooks'
import { useStyles } from './hooks'

export function AnnounceText() {
    const { classes } = useStyles()
    const { state } = useDataTableContext()

    if (!state.announceText) return null

    return (
        <div className={classes.root} aria-live="polite">
            {state.announceText}
        </div>
    )
}
