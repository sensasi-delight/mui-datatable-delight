'use client'

import ClassName from '@src/enums/class-name'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
// vendors
import type { ReactNode } from 'react'

/**
 * Announce text
 *
 * @category  Component
 */
export default function AnnounceText(): ReactNode {
    const { state } = useDataTableContext()

    if (!state.announceText) return null

    return (
        <div
            aria-live="polite"
            className={ClassName.ANNOUNCE_TEXT}
            style={{
                border: '0',
                clip: 'rect(0 0 0 0)',
                height: '1px',
                margin: '-1px',
                overflow: 'hidden',
                padding: '0',
                position: 'absolute',
                width: '1px'
            }}
        >
            {state.announceText}
        </div>
    )
}
