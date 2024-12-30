'use client'

import {
    AppBar,
    Box,
    IconButton,
    Link,
    Toolbar,
    Tooltip,
    Typography,
    useColorScheme,
    useMediaQuery,
    useTheme
} from '@mui/material'
import {
    DarkMode,
    GitHub,
    LightMode,
    Menu as MenuIcon
} from '@mui/icons-material'
import Menu from './menu'
import { DRAWER_WIDTH } from '../_constants'
import { useState } from 'react'
import { InlineCode } from '@/components/inline-code'

export default function SideTopBar() {
    const { mode, setMode } = useColorScheme()
    const theme = useTheme()
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'))
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    return (
        <>
            <AppBar
                position="fixed"
                sx={theme => ({
                    width: {
                        sm: '100%',
                        md: `calc(100% - ${DRAWER_WIDTH}px)`
                    },
                    marginLeft: {
                        sm: undefined,
                        md: `${DRAWER_WIDTH}px`
                    },
                    bgcolor: '#01579b !important',
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen
                    })
                })}
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
                                MUI <InlineCode text="&lt;DataTable/>" />
                                Delight
                            </Typography>
                        </Link>
                    </Box>

                    <Box display="flex" alignItems="center" gap={0.5}>
                        <IconButton
                            component="a"
                            target="_blank"
                            color="inherit"
                            href="https://github.com/sensasi-delight/mui-datatable-delight"
                        >
                            <GitHub />
                        </IconButton>

                        <Tooltip
                            title={
                                (mode === 'light' ? 'Dark' : 'Light') + ' Mode'
                            }
                            arrow
                        >
                            <IconButton
                                color="inherit"
                                onClick={() =>
                                    setMode(mode === 'light' ? 'dark' : 'light')
                                }
                            >
                                {mode === 'light' ? (
                                    <DarkMode />
                                ) : (
                                    <LightMode />
                                )}
                            </IconButton>
                        </Tooltip>
                    </Box>
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
