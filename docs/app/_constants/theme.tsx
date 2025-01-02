'use client'

import { forwardRef } from 'react'
import { createTheme } from '@mui/material/styles'
import Link, { LinkProps } from 'next/link'
import { blue } from '@mui/material/colors'

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
        dark: {
            palette: {
                primary: {
                    main: blue[500]
                },
                AppBar: {
                    darkBg: blue[900]
                }
            }
        }
    },
    typography: {
        fontFamily: 'var(--font-roboto)'
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
