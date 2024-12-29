import { Box, Paper } from '@mui/material'
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
        <Paper elevation={4}>
            <Box
                component="pre"
                className={`language-${language}`}
                borderRadius="4px"
            >
                <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            </Box>
        </Paper>
    )
}
