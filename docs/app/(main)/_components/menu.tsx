'use client'

// vendors
import { usePathname } from 'next/navigation'
// materials
import { useTheme } from '@mui/material/styles'
import TagIcon from '@mui/icons-material/Tag'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import useMediaQuery from '@mui/material/useMediaQuery'
// locals
import { DRAWER_WIDTH } from '../_constants'
import { useEffect, useState } from 'react'
import { Route as DocsRoute } from '../docs/_route--enum'
import { Route as ExamplesRoute } from '../examples/_route--enum'
import { snakeCaseToKebab, snakeCaseToTitle } from '@/utils'
import { Box } from '@mui/material'

export default function Menu({
    isOpen,
    toggle
}: {
    isOpen: boolean
    toggle: ToggleType
}) {
    const theme = useTheme()
    const [isClient, setIsClient] = useState(false)
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'))

    useEffect(() => {
        setIsClient(true)
    })

    return (
        <Drawer
            open={isOpen || (!isBelowMd && isClient)}
            anchor="left"
            onClose={toggle}
            variant={isClient && isBelowMd ? 'temporary' : 'permanent'}
            elevation={0}
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                zIndex: 0
            }}
            PaperProps={{
                sx: {
                    width: DRAWER_WIDTH,
                    // boxSizing: 'border-box',
                    pb: 10,
                    mt: 8,
                    height: 'calc(100% - 64px)'
                }
            }}
        >
            <List component="nav">
                {Object.values(Section).map((section, i) => (
                    <MenuSection sectionId={section} key={i} />
                ))}
            </List>
        </Drawer>
    )
}

type ToggleType = () => void

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
    const isExampleSection = sectionId === 'EXAMPLES'

    const routes = isExampleSection
        ? getExampleRoutes()
        : getDocRoutes(sectionId)

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
                href={
                    isExampleSection
                        ? '/examples'
                        : '/docs/' + snakeCaseToKebab(sectionId)
                }
                text="Overview"
            />

            {routes.slice(1).map((route, i) => (
                <CustomListItem
                    key={i}
                    href={
                        (isExampleSection ? '/examples/' : '/docs/') +
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
    EXAMPLES = 'EXAMPLES',
    API = 'API'
}

function getDocRoutes(sectionId: Section): Route[] {
    return Object.keys(DocsRoute)
        .filter(enumKey => enumKey.includes(sectionId))
        .map(enumKey => ({
            href: snakeCaseToKebab(enumKey).replaceAll('--', '/'),
            title: snakeCaseToTitle(enumKey).split('  ').pop() ?? ''
        }))
}

function getExampleRoutes(): Route[] {
    const SORTED_EXAMPLES = [
        '',
        ...Object.keys(ExamplesRoute)
            .filter(key => isNaN(parseInt(key)))
            .sort()
    ]

    return SORTED_EXAMPLES.map(enumKey => ({
        href: snakeCaseToKebab(enumKey),
        title: snakeCaseToTitle(enumKey)
    }))
}

interface Route {
    href: string
    title: string
}
