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
        <Box alignItems="center" display="flex" sx={{ overflowX: 'auto' }}>
            <Tooltip arrow placement="top" title="Home">
                <IconButton color="primary" href="/">
                    <Home />
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
                            disabled={i === pathsWithoutDocs.length - 1}
                            href={href}
                            sx={{
                                minWidth: 'unset',
                                whiteSpace: 'nowrap'
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
