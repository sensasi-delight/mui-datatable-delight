// vendors

// icons-materials
import OpenInNew from '@mui/icons-material/OpenInNew'
import TagIcon from '@mui/icons-material/Tag'
// materials
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import { usePathname } from 'next/navigation'
import { snakeCaseToKebab, snakeCaseToTitle } from '@/docs/utils'
// locals
import { DRAWER_WIDTH } from '../_constants'
import { Route as DocsRoute } from '../docs/_route--enum'

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
                elevation={0}
                PaperProps={{
                    sx: theme => ({
                        height: {
                            sm: `calc(100% - ${theme.spacing(8)})`,
                            xs: `calc(100% - ${theme.spacing(7)})`
                        },
                        mt: {
                            sm: 8,
                            xs: 7
                        },
                        // boxSizing: 'border-box',
                        pb: 10,
                        width: DRAWER_WIDTH
                    })
                }}
                sx={{
                    display: {
                        md: 'block',
                        sm: 'none',
                        xs: 'none'
                    },
                    flexShrink: 0,
                    width: DRAWER_WIDTH,
                    zIndex: 0
                }}
                variant="permanent"
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
                        md: 'none',
                        sm: 'block',
                        xs: 'block'
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
            {Object.values(Section).map(section => (
                <MenuSection key={section} sectionId={section} />
            ))}
        </List>
    )
}

function CustomListItem({
    href,
    text,
    newTab: isNewTab
}: {
    href: string
    text: string
    newTab?: boolean
}) {
    const pathname = usePathname()
    const isActive = pathname.replace('/overview', '') === href

    return (
        <ListItem disablePadding>
            <ListItemButton
                href={href}
                selected={isActive}
                sx={{
                    backgroundColor: isActive
                        ? 'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-selectedOpacity))'
                        : undefined,
                    color: isActive ? undefined : 'text.secondary',
                    lineHeight: 'unset',
                    py: 0
                }}
                target={isNewTab ? '_blank' : undefined}
            >
                <ListItemText
                    primary={text}
                    slotProps={{
                        primary: {
                            sx: {
                                fontSize: '0.9em',
                                fontWeight: 500
                            }
                        }
                    }}
                    sx={{
                        ml: 5
                    }}
                />

                {isNewTab && <OpenInNew fontSize="inherit" />}
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
                    borderRadius: 'unset',
                    fontWeight: 'bold',
                    justifyContent: 'flex-start',
                    lineHeight: 'unset',
                    pb: 1,
                    pt: 2,
                    px: 3,
                    textTransform: 'uppercase'
                }}
            >
                <Box alignItems="center" display="flex" gap={1}>
                    <TagIcon color="primary" /> {snakeCaseToTitle(sectionId)}
                </Box>
            </ListSubheader>

            <CustomListItem
                href={`/docs/${snakeCaseToKebab(sectionId)}`}
                text="Overview"
            />

            {routes.slice(1).map(route => (
                <CustomListItem
                    href={`/docs/${route.href}`}
                    key={`/docs/${route.href}`}
                    text={route.title}
                />
            ))}

            {sectionId === 'GETTING_STARTED' && (
                <>
                    <CustomListItem href="/examples" text="Examples" />
                    <CustomListItem
                        href="/api-docs/index.html"
                        newTab
                        text="API Docs"
                    />
                </>
            )}
        </>
    )
}

enum Section {
    GETTING_STARTED = 'GETTING_STARTED',
    FEATURES = 'FEATURES'
}

function getDocRoutes(sectionId: Section): Route[] {
    return (Object.keys(DocsRoute) as (keyof typeof DocsRoute)[])
        .filter(enumKey => enumKey.includes(sectionId))
        .map(enumKey => ({
            href: snakeCaseToKebab(DocsRoute[enumKey]),
            title: snakeCaseToTitle(enumKey).split('  ').pop() ?? ''
        }))
}

interface Route {
    href: string
    title: string
}
