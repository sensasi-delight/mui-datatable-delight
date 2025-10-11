'use client'

import ClassName from '@src/enums/class-name'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
// vendors
import type { ReactNode } from 'react'
import { tss } from 'tss-react/mui'

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
        <div aria-live="polite" className={classes.root}>
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
