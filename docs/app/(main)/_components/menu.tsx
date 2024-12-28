'use client'

import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    useMediaQuery,
    useTheme
} from '@mui/material'
import { grey } from '@mui/material/colors'
import Link from 'next/link'
// locals
import { Route as ExamplesRoute } from '../examples/_route--enum'
import { snakeCaseToKebab, snakeCaseToTitle } from '../../../utils'
import { ReactNode, useEffect, useState } from 'react'
import { DRAWER_WIDTH } from '../_constants'
import { ArrowRight } from '@mui/icons-material'

export default function Menu({
    isOpen,
    toggle
}: {
    isOpen: boolean
    toggle: () => void
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
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: DRAWER_WIDTH,
                    boxSizing: 'border-box'
                }
            }}
        >
            <List component="nav">
                <CustomListSubheader>Getting Started</CustomListSubheader>

                <CustomListItem
                    href="/docs/getting-started/overview"
                    text="Overview"
                />

                <CustomListSubheader>Examples</CustomListSubheader>

                <CustomListItem href="/examples" text="Overview" />

                {SORTED_EXAMPLES.map((enumKey, i) => (
                    <CustomListItem
                        key={i}
                        href={'/examples/' + snakeCaseToKebab(enumKey)}
                        text={snakeCaseToTitle(enumKey)}
                    />
                ))}
            </List>
        </Drawer>
    )
}

const SORTED_EXAMPLES = Object.keys(ExamplesRoute)
    .filter(key => isNaN(parseInt(key)))
    .sort()

function CustomListItem({ href, text }: { href: string; text: string }) {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        setIsActive(location.pathname.includes(href))
    }, [])

    return (
        <ListItem disablePadding>
            <ListItemButton
                href={href}
                LinkComponent={Link}
                // disabled={isActive}
                selected={isActive}
                color="Highlight"
                sx={[{
                    py: 0.5,
                    backgroundColor: isActive
                        ? 'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-selectedOpacity)) !important'
                        : undefined,
                    color: isActive ? 'primary.main' : grey[700],
                    opacity: 'unset !important'
                }, style => style.applyStyles('dark', {
                    color: isActive ? 'primary.main' : grey[500],
                })]}
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

function CustomListSubheader({ children }: { children: ReactNode }) {
    return (
        <ListSubheader
            sx={{
                lineHeight: 'unset',
                pt: 2,
                pb: 0.5,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: 'Highlight'
            }}
        >
            {children}
        </ListSubheader>
    )
}
