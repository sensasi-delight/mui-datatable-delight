'use client'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import type { ReactNode } from 'react'

export function AlwaysDarkThemeProvider({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const theme = createTheme({
    colorSchemes: {
        dark: true
    },
    palette: {
        mode: 'dark'
    }
})
