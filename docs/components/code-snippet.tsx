'use client'

import { Box, createTheme, Paper, ThemeProvider } from '@mui/material'
import prism from 'prismjs'

import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-tsx'

// @ts-expect-error IDK
import 'prismjs/themes/prism-tomorrow.css'

export function CodeSnippet({
    language = 'jsx',
    text
}: {
    language?: 'jsx' | 'bash'
    text: string
}) {
    const highlightedCode = prism.highlight(
        text,
        prism.languages[language],
        language
    )

    return (
        <ThemeProvider theme={theme} noSsr>
            <Paper elevation={4}>
                <Box
                    component="pre"
                    sx={{
                        maxWidth: '100%',
                        overflow: 'auto',
                        px: 3,
                        py: 2.5,
                        m: 0
                    }}
                >
                    <code
                        dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    />
                </Box>
            </Paper>
        </ThemeProvider>
    )
}

const theme = createTheme({
    colorSchemes: {
        dark: true
    },
    palette: {
        mode: 'dark'
    }
})
