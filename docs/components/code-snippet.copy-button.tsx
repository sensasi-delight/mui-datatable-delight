'use client'

import Check from '@mui/icons-material/Check'
import CopyAll from '@mui/icons-material/CopyAll'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useEffect, useState } from 'react'

export function CopyButton({ text }: { text: string }) {
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
        if (isCopied) {
            setTimeout(() => {
                setIsCopied(false)
            }, 3000)
        }
    }, [isCopied])

    return (
        <Box
            sx={{
                position: 'absolute',
                right: 8,
                top: 8
            }}
        >
            <Fade in={!isCopied} {...STATIC_FADE_PROPS}>
                <Tooltip
                    title="Copy"
                    sx={{
                        color: 'GrayText',

                        ':hover': {
                            color: 'inherit'
                        }
                    }}
                >
                    <IconButton
                        onClick={() => {
                            navigator.clipboard.writeText(text)
                            setIsCopied(true)
                        }}
                    >
                        <CopyAll />
                    </IconButton>
                </Tooltip>
            </Fade>

            <Fade in={isCopied} {...STATIC_FADE_PROPS}>
                <Tooltip
                    title="Copied"
                    slotProps={{
                        tooltip: {
                            sx: {
                                bgcolor: 'success.dark'
                            }
                        }
                    }}
                >
                    <IconButton
                        color="success"
                        sx={{
                            bgcolor: 'var(--IconButton-hoverBg)'
                        }}
                    >
                        <Check />
                    </IconButton>
                </Tooltip>
            </Fade>
        </Box>
    )
}

const STATIC_FADE_PROPS = {
    unmountOnExit: true,
    exit: false,
    timeout: {
        enter: 600
    }
}
