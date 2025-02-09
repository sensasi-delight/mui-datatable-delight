'use client'

// vendors
import type { ReactNode } from 'react'
import { tss } from 'tss-react/mui'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
import ClassName from '@src/enums/class-name'

/**
 * Announce text
 *
 * @category  Component
 */
export default function AnnounceText(): ReactNode {
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
