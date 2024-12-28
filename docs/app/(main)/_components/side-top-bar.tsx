'use client'

import {
    AppBar,
    IconButton,
    Link,
    Toolbar,
    Typography,
    useTheme,
    useMediaQuery,
    Box
} from '@mui/material'
import { GitHub, Menu as MenuIcon } from '@mui/icons-material'
import Menu from './menu'
import { DRAWER_WIDTH } from '../_constants'
import { useState } from 'react'

export default function SideTopBar() {
    const theme = useTheme()
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'))
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    width: {
                        sm: '100%',
                        md: `calc(100% - ${DRAWER_WIDTH}px)`
                    },
                    marginLeft: {
                        sm: undefined,
                        md: `${DRAWER_WIDTH}px`
                    },
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen
                    })
                }}
            >
                <Toolbar
                    sx={{
                        justifyContent: 'space-between'
                    }}
                >
                    <Box display="flex" alignItems="center" gap={2}>
                        {isBelowMd && (
                            <IconButton
                                onClick={() => setIsDrawerOpen(prev => !prev)}
                                color="inherit"
                                aria-label="open drawer"
                            >
                                <MenuIcon />
                            </IconButton>
                        )}

                        <Link href="/" color="inherit" underline="hover">
                            <Typography fontWeight="bold">
                                DataTable Delight
                            </Typography>
                        </Link>
                    </Box>

                    <IconButton
                        component="a"
                        target="_blank"
                        color="inherit"
                        href="https://github.com/sensasi-delight/mui-datatable-delight"
                    >
                        <GitHub />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Menu
                isOpen={isDrawerOpen}
                toggle={() => {
                    setIsDrawerOpen(prev => !prev)
                }}
            />
        </>
    )
}
