import prism from 'prismjs'
import { Box } from '@mui/material'
import Paper from '@mui/material/Paper'

import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-bash'

import 'prismjs/themes/prism-tomorrow.css'

export function CodeSnippet({
    language = 'jsx',
    text
}: {
    language?: 'jsx' | 'bash'
    text: string
}) {
    const hightlightedCode = prism.highlight(
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
                <code dangerouslySetInnerHTML={{ __html: hightlightedCode }} />
            </Box>
        </Paper>
    )
}
