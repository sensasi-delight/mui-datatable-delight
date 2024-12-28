'use client'

import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'

export function InlineCode({
    text,
    bg = false
}: {
    text: string
    children?: never
    bg?: boolean
}) {
    return (
        <Box
            component="code"
            sx={[
                {
                    borderRadius: 1,
                    fontSize: '1.1em',
                    px: 0.5,
                    py: 0.5,
                    bgcolor: bg ? grey['200'] : undefined
                },
                theme =>
                    theme.applyStyles('dark', {
                        bgcolor: bg ? '#2f2f2f' : undefined
                    })
            ]}
            color="inherit"
        >
            {text}
        </Box>
    )
}
