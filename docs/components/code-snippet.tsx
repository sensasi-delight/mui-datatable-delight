import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
// prisms
import prism from 'prismjs'
// internals
import { AlwaysDarkThemeProvider } from './code-snippet.always-dark-theme-provider'
import { CopyButton } from './code-snippet.copy-button'
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
            <Paper elevation={4} sx={{ my: 3, position: 'relative' }}>
                <Box
                    component="pre"
                    sx={{
                        fontSize: '0.95rem',
                        maxWidth: '100%',
                        mb: 5,
                        mt: 3,
                        overflow: 'auto',
                        p: 2.5,
                        pt: 2
                    }}
                >
                    <code
                        // biome-ignore lint/security/noDangerouslySetInnerHtml: intentionally setting innerHTML
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
