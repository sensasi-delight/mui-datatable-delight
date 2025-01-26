'use client'

// vendors
import { usePathname } from 'next/navigation'
// materials
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import TagIcon from '@mui/icons-material/Tag'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
// locals
import { DRAWER_WIDTH } from '../_constants'
import { Route as DocsRoute } from '../docs/_route--enum'
import { snakeCaseToKebab, snakeCaseToTitle } from '@/utils'
import { Dialog } from '@mui/material'

export default function Menu({
    isOpen
}: {
    /** Applied only for mobile */
    isOpen: boolean
}) {
    return (
        <>
            <Drawer
                anchor="left"
                variant="permanent"
                elevation={0}
                sx={{
                    display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'block'
                    },
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    zIndex: 0
                }}
                PaperProps={{
                    sx: theme => ({
                        width: DRAWER_WIDTH,
                        // boxSizing: 'border-box',
                        pb: 10,
                        mt: {
                            xs: 7,
                            sm: 8
                        },
                        height: {
                            xs: `calc(100% - ${theme.spacing(7)})`,
                            sm: `calc(100% - ${theme.spacing(8)})`
                        }
                    })
                }}
            >
                <Nav />
            </Drawer>

            <Dialog
                disableRestoreFocus
                fullScreen
                open={isOpen}
                PaperProps={{
                    elevation: 0
                }}
                sx={{
                    display: {
                        xs: 'block',
                        sm: 'block',
                        md: 'none'
                    },
                    mt: 8,
                    zIndex: 1
                }}
            >
                <Nav />
            </Dialog>
        </>
    )
}

function Nav() {
    return (
        <List component="nav" disablePadding>
            {Object.values(Section).map((section, i) => (
                <MenuSection sectionId={section} key={i} />
            ))}
        </List>
    )
}

function CustomListItem({ href, text }: { href: string; text: string }) {
    const pathname = usePathname()
    const isActive = pathname.replace('/overview', '') === href

    return (
        <ListItem disablePadding>
            <ListItemButton
                href={href}
                selected={isActive}
                sx={{
                    py: 0,
                    lineHeight: 'unset',
                    backgroundColor: isActive
                        ? 'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-selectedOpacity))'
                        : undefined,
                    color: isActive ? undefined : 'text.secondary'
                }}
            >
                <ListItemText
                    primary={text}
                    sx={{
                        ml: 5
                    }}
                    slotProps={{
                        primary: {
                            sx: {
                                fontSize: '0.9em',
                                fontWeight: 500
                            }
                        }
                    }}
                />
            </ListItemButton>
        </ListItem>
    )
}

function MenuSection({ sectionId }: { sectionId: Section }) {
    const routes = getDocRoutes(sectionId)

    return (
        <>
            <ListSubheader
                sx={{
                    px: 3,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    justifyContent: 'flex-start',
                    borderRadius: 'unset',
                    pt: 2,
                    pb: 1,
                    lineHeight: 'unset'
                }}
            >
                <Box display="flex" gap={1} alignItems="center">
                    <TagIcon color="primary" /> {snakeCaseToTitle(sectionId)}
                </Box>
            </ListSubheader>

            <CustomListItem
                href={'/docs/' + snakeCaseToKebab(sectionId)}
                text="Overview"
            />

            {routes.slice(1).map((route, i) => (
                <CustomListItem
                    key={i}
                    href={
                        '/docs/' +
                        // (isExampleSection ? '/examples/' : '/docs/') +
                        route.href
                    }
                    text={route.title}
                />
            ))}
        </>
    )
}

enum Section {
    GETTING_STARTED = 'GETTING_STARTED',
    FEATURES = 'FEATURES',
    API = 'API'
}

function getDocRoutes(sectionId: Section): Route[] {
    return (Object.keys(DocsRoute) as (keyof typeof DocsRoute)[])
        .filter(enumKey => enumKey.includes(sectionId))
        .map(enumKey => ({
            href: snakeCaseToKebab(DocsRoute[enumKey]),
            title: snakeCaseToTitle(enumKey).split('  ').pop() ?? ''
        }))
}

// function getExampleRoutes(): Route[] {
//     const SORTED_EXAMPLES = [
//         '',
//         ...Object.keys(ExamplesRoute)
//             .filter(key => isNaN(parseInt(key)))
//             .sort()
//     ]

//     return SORTED_EXAMPLES.map(enumKey => ({
//         href: snakeCaseToKebab(enumKey),
//         title: snakeCaseToTitle(enumKey)
//     }))
// }

interface Route {
    href: string
    title: string
}
