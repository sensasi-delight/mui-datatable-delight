'use client'

import { forwardRef } from 'react'
import { createTheme } from '@mui/material/styles'
import Link, { LinkProps } from 'next/link'

const LinkBehavior = forwardRef<HTMLAnchorElement, LinkProps>(
    function LinkBehavior(props, ref) {
        return <Link {...props} ref={ref} />
    }
)

export const THEME = createTheme({
    cssVariables: {
        colorSchemeSelector: 'class'
    },
    colorSchemes: {
        dark: true
    },
    typography: {
        fontFamily: 'var(--font-roboto)'
    },
    palette: {
        background: {
            default: '#F1FAFF',
            paper: '#F1FAFF'
        }
    },

    components: {
        MuiLink: {
            defaultProps: {
                component: LinkBehavior
            }
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehavior
            }
        }
    }
})
