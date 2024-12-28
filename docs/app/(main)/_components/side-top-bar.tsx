'use client'

import {
    AppBar as MuiAppBar,
    IconButton,
    Link,
    styled,
    Toolbar,
    Tooltip,
    Typography,
    AppBarProps
} from '@mui/material'
import { GitHub } from '@mui/icons-material'
import Menu from './menu'

const drawerWidth = 240

export default function SideTopBar() {
    const isDrawerOpen = true

    return (
        <>
            <AppBar position="fixed" open={isDrawerOpen}>
                <Toolbar>
                    {/* <IconButton
                        onClick={() => setIsDrawerOpen(prev => !prev)}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton> */}

                    {/* <a href="/">
                        <img
                            className={classes.logo}
                            src="/header.png"
                            alt="Home"
                            // border="0"
                        />
                    </a> */}

                    <Link href="/" color="inherit" underline="hover">
                        <Typography variant="h6">DataTable Delight</Typography>
                    </Link>

                    <Tooltip
                        id="appbar-github"
                        title="Material-UI Datatables repo"
                        enterDelay={300}
                    >
                        <IconButton
                            component="a"
                            color="inherit"
                            href="https://github.com/gregnb/mui-datatables"
                            aria-labelledby="appbar-github"
                        >
                            <GitHub />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            <Menu
                isOpen={isDrawerOpen}
                toggle={() => {
                    // setIsDrawerOpen(prev => !prev)
                }}
            />
        </>
    )
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open'
})<
    AppBarProps & {
        open: boolean
    }
>(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen
                })
            }
        }
    ]
}))
