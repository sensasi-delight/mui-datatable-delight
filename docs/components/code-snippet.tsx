import { Box, Paper } from '@mui/material'
// internals
import { AlwaysDarkThemeProvider } from './code-snippet.always-dark-theme-provider'
import { CopyButton } from './code-snippet.copy-button'

// prisms
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
        <AlwaysDarkThemeProvider>
            <Paper elevation={4} sx={{ position: 'relative' }}>
                <Box
                    component="pre"
                    sx={{
                        maxWidth: '100%',
                        overflow: 'auto',
                        fontSize: '0.95rem',
                        p: 2.5,
                        pt: 2,
                        m: 0
                    }}
                >
                    <code
                        dangerouslySetInnerHTML={{
                            __html: highlightedCode
                        }}
                    />
                </Box>

                <CopyButton text={text} />
            </Paper>
        </AlwaysDarkThemeProvider>
    )
}
