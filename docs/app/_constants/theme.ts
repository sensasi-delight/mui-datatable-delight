'use client'

import { createTheme } from '@mui/material/styles'

export const THEME = createTheme({
    cssVariables: {
        colorSchemeSelector: 'class'
    },
    colorSchemes: {
        dark: true
    },
    typography: {
        fontFamily: 'var(--font-roboto)'
    },
    palette: {
        background: {
            default: '#F1FAFF',
            paper: '#F1FAFF'
        }
    }
})
