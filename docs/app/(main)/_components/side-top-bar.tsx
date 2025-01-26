'use client'

// vendors
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
// materials
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'
import DarkMode from '@mui/icons-material/DarkMode'
import GitHub from '@mui/icons-material/GitHub'
import LightMode from '@mui/icons-material/LightMode'
import MenuIcon from '@mui/icons-material/Menu'

import Menu from './menu'
import { InlineCode } from '@/components'

export default function SideTopBar() {
    const pathname = usePathname()
    const { mode, setMode } = useColorScheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    return (
        <>
            <AppBar
                position="fixed"
                color="default"
                variant="outlined"
                sx={theme => ({
                    borderLeft: 0,
                    borderRight: 0,
                    borderTop: 0,
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
                        pl: {
                            xs: 4,
                            sm: 7,
                            md: 3
                        },
                        pr: {
                            xs: 3,
                            sm: 6,
                            md: 3
                        },
                        justifyContent: 'space-between'
                    }}
                >
                    <Box display="flex" alignItems="center" gap={2}>
                        <Link href="/" color="inherit" underline="hover">
                            <Typography fontWeight="bold">
                                <Box
                                    sx={{
                                        display: {
                                            sx: 'block',
                                            sm: 'block',
                                            md: 'none'
                                        }
                                    }}
                                    component="span"
                                >
                                    <InlineCode text="<DataTable/>" disableBg />
                                </Box>

                                <Box
                                    sx={{
                                        display: {
                                            xs: 'none',
                                            sm: 'none',
                                            md: 'block'
                                        }
                                    }}
                                    component="span"
                                >
                                    MUI{' '}
                                    <InlineCode text="<DataTable/>" disableBg />{' '}
                                    Delight
                                </Box>
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

                        <Tooltip title="Menu" arrow>
                            <IconButton
                                onClick={() => setIsMenuOpen(prev => !prev)}
                                color={isMenuOpen ? 'primary' : 'inherit'}
                                sx={{
                                    bgcolor: isMenuOpen
                                        ? 'var(--IconButton-hoverBg)'
                                        : undefined,
                                    display: {
                                        sm: undefined,
                                        md: 'none'
                                    }
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>

            <Menu isOpen={isMenuOpen} />
        </>
    )
}
