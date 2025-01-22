'use client'

// materials
import { useTheme } from '@mui/material/styles'
import ArrowRight from '@mui/icons-material/ArrowRight'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import Button, { type ButtonProps } from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import grey from '@mui/material/colors/grey'
import useMediaQuery from '@mui/material/useMediaQuery'
// locals
import { DRAWER_WIDTH } from '../_constants'
import { useEffect, useState } from 'react'
import { Route as DocsRoute } from '../docs/_route--enum'
import { Route as ExamplesRoute } from '../examples/_route--enum'
import { snakeCaseToKebab, snakeCaseToTitle } from '@/utils'

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
                '& .MuiDrawer-paper': {
                    width: DRAWER_WIDTH,
                    boxSizing: 'border-box',
                    pb: 10
                }
            }}
        >
            <List component="nav">
                {Object.values(Section).map((section, i) => (
                    <MenuSection sectionId={section} toggle={toggle} key={i} />
                ))}
            </List>
        </Drawer>
    )
}

type ToggleType = () => void

function CustomListItem({ href, text }: { href: string; text: string }) {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        setIsActive(location.pathname.replace('/overview', '') === href)
    }, [])

    return (
        <ListItem disablePadding>
            <ListItemButton
                href={href}
                selected={isActive}
                sx={[
                    theme => ({
                        py: 0.5,
                        backgroundColor: isActive
                            ? 'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-selectedOpacity))'
                            : undefined,
                        color: isActive ? theme.palette.primary.main : undefined
                    }),
                    theme =>
                        theme.applyStyles('dark', {
                            color: isActive
                                ? theme.palette.primary.main
                                : grey[400]
                        })
                ]}
            >
                {isActive && (
                    <ListItemIcon
                        sx={{
                            minWidth: 'unset',
                            color: 'inherit'
                        }}
                    >
                        {<ArrowRight />}
                    </ListItemIcon>
                )}

                <ListItemText
                    primary={text}
                    sx={{
                        ml: isActive ? undefined : 3
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

function MenuSection({
    sectionId,
    toggle
}: {
    sectionId: Section
    toggle: ToggleType
}) {
    const [isOpen, setIsOpen] = useState(false)

    const isExampleSection = sectionId === 'EXAMPLES'

    const routes = isExampleSection
        ? getExampleRoutes()
        : getDocRoutes(sectionId)

    useEffect(() => {
        const isContainActiveMenu = routes.some(
            ({ href }) =>
                location.pathname ===
                (isExampleSection ? '/examples' : '/docs') +
                    (href ? '/' : '') +
                    href
        )

        setIsOpen(isContainActiveMenu)
    }, [])

    return (
        <>
            <CustomListSubheader
                isOpen={isOpen}
                title={snakeCaseToTitle(sectionId)}
                onClick={() => setIsOpen(prev => !prev)}
            />

            <Collapse in={isOpen} onClick={toggle}>
                <CustomListItem
                    href={
                        isExampleSection
                            ? '/examples'
                            : '/docs/' + snakeCaseToKebab(sectionId)
                    }
                    text={'Overview'}
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
            </Collapse>
        </>
    )
}

function CustomListSubheader({
    title,
    onClick,
    isOpen
}: {
    title: string
    onClick: ButtonProps['onClick']
    isOpen: Boolean
}) {
    return (
        <ListSubheader
            sx={{
                lineHeight: 'unset',
                p: 0
            }}
        >
            <Button
                onClick={onClick}
                startIcon={
                    isOpen ? <KeyboardArrowDown /> : <KeyboardArrowRight />
                }
                fullWidth
                // color="primary"
                sx={{
                    py: 1.2,
                    px: 2,
                    // color: 'primary.dark',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    justifyContent: 'flex-start',
                    borderRadius: 'unset'
                }}
            >
                {title}
            </Button>
        </ListSubheader>
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
        .map(enumKey => {
            const parsed = snakeCaseToTitle(enumKey).split('  ')

            return {
                href: snakeCaseToKebab(enumKey).replaceAll('--', '/'),
                title: parsed[parsed.length - 1]
            }
        })
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
