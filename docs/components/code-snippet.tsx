import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
// internals
import { AlwaysDarkThemeProvider } from './code-snippet.always-dark-theme-provider'
import { CopyButton } from './code-snippet.copy-button'

// prisms
import prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-tsx'
import 'prismjs/themes/prism-tomorrow.css'

export function CodeSnippet({
    language = 'jsx',
    text
}: {
    language?: 'jsx' | 'bash'
    text: string
}) {
    const prismLang = prism.languages[language]

    if (!prismLang) {
        throw new Error(`Unknown language: ${language}`)
    }

    const highlightedCode = prism.highlight(text, prismLang, language)

    return (
        <AlwaysDarkThemeProvider>
            <Paper elevation={4} sx={{ position: 'relative', my: 3 }}>
                <Box
                    component="pre"
                    sx={{
                        maxWidth: '100%',
                        overflow: 'auto',
                        fontSize: '0.95rem',
                        p: 2.5,
                        pt: 2,
                        mt: 3,
                        mb: 5
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
