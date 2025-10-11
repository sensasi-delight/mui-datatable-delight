'use client'

import Paper from '@mui/material/Paper'
import mermaid from 'mermaid'
import { useEffect, useRef } from 'react'

export function Mermaid({ children }: { children: string }) {
    const mermaidRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (mermaidRef.current) {
            mermaid.run({
                nodes: [mermaidRef.current]
            })
        }
    }, [])

    return (
        <Paper
            ref={mermaidRef}
            sx={{
                maxHeight: 500,
                mb: 4,
                mt: 3,
                overflow: 'auto',
                p: 4
            }}
        >
            {children}
        </Paper>
    )
}
