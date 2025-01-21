'use client'

import Button from '@mui/material/Button'
import type { ReactNode } from 'react'

/**
 * @deprecated EXPERIMENTAL USE ONLY
 */
export function ExperimentalButton({ children }: { children: ReactNode }) {
    return (
        <>
            simple dong
            <Button>{children}</Button>
        </>
    )
}
