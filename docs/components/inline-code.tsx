'use client'

import Box from '@mui/material/Box'
import { grey } from '@mui/material/colors'

export function InlineCode({
    text,
    disableBg = false
}: {
    text: string
    children?: never
    disableBg?: boolean
}) {
    return (
        <Box
            color="inherit"
            component="code"
            sx={[
                {
                    bgcolor: !disableBg ? grey['200'] : undefined,
                    borderRadius: 1,
                    px: 0.4,
                    py: 0
                },
                theme =>
                    theme.applyStyles('dark', {
                        bgcolor: !disableBg ? '#2f2f2f' : undefined
                    })
            ]}
        >
            {text}
        </Box>
    )
}
