'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'
import Paper from '@mui/material/Paper'

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
                p: 4,
                mt: 3,
                mb: 4,
                maxHeight: 500,
                overflow: 'auto'
            }}
        >
            {children}
        </Paper>
    )
}
