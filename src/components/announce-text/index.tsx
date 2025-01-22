'use client'

import { tss } from 'tss-react/mui'
import useDataTableContext from '../../hooks/use-data-table-context'
// global enums
import ClassName from '../../enums/class-name'

export default function AnnounceText() {
    const { classes } = useStyles()
    const { state } = useDataTableContext()

    if (!state.announceText) return null

    return (
        <div className={classes.root} aria-live="polite">
            {state.announceText}
        </div>
    )
}

const useStyles = tss.withName(ClassName.ANNOUNCE_TEXT).create({
    root: {
        border: '0',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: '0',
        position: 'absolute',
        width: '1px'
    }
})
