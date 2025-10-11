'use client'

import { blue } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import Link, { type LinkProps } from 'next/link'
import { forwardRef } from 'react'

const LinkBehavior = forwardRef<HTMLAnchorElement, LinkProps>(
    function LinkBehavior(props, ref) {
        return <Link {...props} ref={ref} />
    }
)

export const THEME = createTheme({
    colorSchemes: {
        dark: {
            palette: {
                AppBar: {
                    darkBg: blue[900]
                },
                primary: {
                    main: blue[500]
                }
            }
        }
    },

    components: {
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehavior
            }
        },
        MuiLink: {
            defaultProps: {
                component: LinkBehavior
            }
        }
    },
    cssVariables: {
        colorSchemeSelector: 'class'
    },
    palette: {
        background: {
            default: '#F1FAFF',
            paper: '#F1FAFF'
        },
        primary: {
            main: blue[800]
        }
    },
    typography: {
        fontFamily: 'var(--font-roboto)'
    }
})
