'use client'

// vendors
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
// materials
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme, useColorScheme } from '@mui/material/styles'
import DarkMode from '@mui/icons-material/DarkMode'
import GitHub from '@mui/icons-material/GitHub'
import LightMode from '@mui/icons-material/LightMode'
import MenuIcon from '@mui/icons-material/Menu'
import Menu from './menu'
import { useState } from 'react'
import { InlineCode } from '@/components'

export default function SideTopBar() {
    const pathname = usePathname()
    const { mode, setMode } = useColorScheme()
    const theme = useTheme()
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'))
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    useEffect(() => {
        setIsDrawerOpen(false)
    }, [pathname])

    return (
        <>
            <AppBar
                position="fixed"
                color="default"
                variant="outlined"
                sx={theme => ({
                    backdropFilter: 'blur(5px)',
                    backgroundColor:
                        'rgba(var(--mui-palette-background-defaultChannel) / 0.8) !important',
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
                                {isBelowMd ? (
                                    <InlineCode text="<DataTable/>" disableBg />
                                ) : (
                                    <>
                                        MUI{' '}
                                        <InlineCode
                                            text="<DataTable/>"
                                            disableBg
                                        />{' '}
                                        Delight
                                    </>
                                )}
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
