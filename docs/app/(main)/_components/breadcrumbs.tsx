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

    const temp = pathname.split('/').slice(0, -1)

    const prevPaths = temp
        .map((path, i) => temp.slice(0, i).join('/') + '/' + path)
        .slice(1)

    return (
        <Box display="flex" alignItems="center" mb={3}>
            <Tooltip title="Home" arrow placement="top">
                <IconButton color="primary" href="/">
                    <Home fontSize="small" />
                </IconButton>
            </Tooltip>

            <NavigateNext
                fontSize="small"
                sx={{
                    color: 'GrayText'
                }}
            />

            {prevPaths.map((path, i) => {
                const text = path.split('/').pop()

                return (
                    <React.Fragment key={i}>
                        <Button href={path}>{text}</Button>

                        <NavigateNext
                            fontSize="small"
                            sx={{
                                color: 'GrayText'
                            }}
                        />
                    </React.Fragment>
                )
            })}
        </Box>
    )
}
