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

    const isExamplePages = pathname.startsWith('/examples')

    const pathsWithoutDocs = (
        isExamplePages ? '/docs/getting-started' + pathname : pathname
    )
        .substring(1) // remove leading slash
        .split('/')
        .slice(1) // remove 'docs'

    return (
        <Box
            display="flex"
            alignItems="center"
            mb={1}
            sx={{ overflowX: 'auto' }}
        >
            <Tooltip title="Home" arrow placement="top">
                <IconButton color="primary" href="/">
                    <Home fontSize="small" />
                </IconButton>
            </Tooltip>

            {pathsWithoutDocs.map((path, i) => {
                const href =
                    path === 'examples'
                        ? '/examples'
                        : `/docs/${pathsWithoutDocs.slice(0, i + 1).join('/')}`

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
                            disabled={i === pathsWithoutDocs.length - 1}
                            sx={{
                                whiteSpace: 'nowrap',
                                minWidth: 'unset'
                            }}
                        >
                            {path.replace('-', ' ')}
                        </Button>
                    </React.Fragment>
                )
            })}
        </Box>
    )
}
