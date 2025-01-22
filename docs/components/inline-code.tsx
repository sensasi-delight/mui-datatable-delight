'use client'

import Box from '@mui/material/Box'
import grey from '@mui/material/colors/grey'

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
            component="code"
            sx={[
                {
                    borderRadius: 1,
                    px: 0.4,
                    py: 0,
                    bgcolor: !disableBg ? grey['200'] : undefined
                },
                theme =>
                    theme.applyStyles('dark', {
                        bgcolor: !disableBg ? '#2f2f2f' : undefined
                    })
            ]}
            color="inherit"
        >
            {text}
        </Box>
    )
}
