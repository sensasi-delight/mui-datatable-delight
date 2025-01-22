'use client'

import Home from '@mui/icons-material/Home'
import NavigateNext from '@mui/icons-material/NavigateNext'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { usePathname } from 'next/navigation'
import React from 'react'

export function Breadcrumbs() {
    const pathname = usePathname()

    const paths = pathname
        .split('/')
        .slice(2)
        .map(path => path.replace('-', ' '))

    return (
        <Box display="flex" alignItems="center" mb={1}>
            <Tooltip title="Home" arrow placement="top">
                <IconButton color="primary" href="/">
                    <Home fontSize="small" />
                </IconButton>
            </Tooltip>

            {paths.map((path, i) => {
                // const text = path.split('/')

                const href = '/' + paths.slice(0, i + 1).join('/')

                return (
                    <React.Fragment key={i}>
                        <NavigateNext
                            fontSize="small"
                            sx={{
                                color: 'GrayText'
                            }}
                        />

                        <Button
                            href={href}
                            disabled={i === paths.length - 1}
                            sx={{
                                minWidth: 'unset'
                            }}
                        >
                            {path}
                        </Button>
                    </React.Fragment>
                )
            })}
        </Box>
    )
}
