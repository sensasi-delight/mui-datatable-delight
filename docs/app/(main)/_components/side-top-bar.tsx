'use client'

import DarkMode from '@mui/icons-material/DarkMode'
import GitHub from '@mui/icons-material/GitHub'
import LightMode from '@mui/icons-material/LightMode'
import MenuIcon from '@mui/icons-material/Menu'
import OpenInNew from '@mui/icons-material/OpenInNew'
// materials
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import { useColorScheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
// vendors
import { useEffect, useState } from 'react'
import { InlineCode } from '@/docs/components'
import Menu from './menu'

export default function SideTopBar() {
    const { mode, setMode } = useColorScheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        setIsMenuOpen(false)
    }, [])

    return (
        <>
            <AppBar
                color="default"
                position="fixed"
                sx={theme => ({
                    backdropFilter: 'blur(5px)',
                    backgroundColor:
                        'rgba(var(--mui-palette-background-defaultChannel) / 0.8) !important',
                    borderLeft: 0,
                    borderRight: 0,
                    borderTop: 0,
                    transition: theme.transitions.create(['margin', 'width'], {
                        duration: theme.transitions.duration.enteringScreen,
                        easing: theme.transitions.easing.easeOut
                    })
                })}
                variant="outlined"
            >
                <Toolbar
                    sx={{
                        justifyContent: 'space-between',
                        pl: {
                            md: 3,
                            sm: 7,
                            xs: 4
                        },
                        pr: {
                            md: 3,
                            sm: 6,
                            xs: 3
                        }
                    }}
                >
                    <Box alignItems="center" display="flex" gap={2}>
                        <Link color="inherit" href="/" underline="hover">
                            <Typography fontWeight="bold">
                                <Box
                                    component="span"
                                    sx={{
                                        display: {
                                            md: 'none',
                                            sm: 'block',
                                            sx: 'block'
                                        }
                                    }}
                                >
                                    <InlineCode disableBg text="<DataTable/>" />
                                </Box>

                                <Box
                                    component="span"
                                    sx={{
                                        display: {
                                            md: 'block',
                                            sm: 'none',
                                            xs: 'none'
                                        }
                                    }}
                                >
                                    MUI{' '}
                                    <InlineCode disableBg text="<DataTable/>" />{' '}
                                    Delight
                                </Box>
                            </Typography>
                        </Link>
                    </Box>

                    <Box alignItems="center" display="flex" gap={0.5}>
                        <Tooltip
                            arrow
                            title={
                                <>
                                    GitHub{' '}
                                    <OpenInNew
                                        fontSize="inherit"
                                        sx={{
                                            verticalAlign: 'middle'
                                        }}
                                    />
                                </>
                            }
                        >
                            <IconButton
                                color="inherit"
                                component="a"
                                href="https://github.com/sensasi-delight/mui-datatable-delight"
                                target="_blank"
                            >
                                <GitHub />
                            </IconButton>
                        </Tooltip>

                        <Tooltip
                            arrow
                            title={
                                (mode === 'light' ? 'Dark' : 'Light') + ' Mode'
                            }
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

                        <Tooltip arrow title="Menu">
                            <IconButton
                                color={isMenuOpen ? 'primary' : 'inherit'}
                                onClick={() => setIsMenuOpen(prev => !prev)}
                                sx={{
                                    bgcolor: isMenuOpen
                                        ? 'var(--IconButton-hoverBg)'
                                        : undefined,
                                    display: {
                                        md: 'none',
                                        sm: undefined
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
