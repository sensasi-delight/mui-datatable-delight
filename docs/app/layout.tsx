import CssBaseline from '@mui/material/CssBaseline'
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import { ThemeProvider } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Roboto } from 'next/font/google'
import type { ReactNode } from 'react'
import { THEME } from './_constants'

const roboto = Roboto({
    display: 'swap',
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: ['300', '400', '500', '700']
})

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <title>
                    MUI DataTable Delight — A responsive DataTable component
                    built with Material UI for React-based project
                </title>

                <meta
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                    name="viewport"
                />

                <meta
                    content="text/html; charset=utf-8"
                    httpEquiv="Content-Type"
                />

                <meta
                    content="A responsive DataTable component built with Material UI for React-based project"
                    name="description"
                />
                <meta
                    content={
                        'material-ui, data table, datatable, mui, mui data table, react table, react data table'
                    }
                    name="keywords"
                />

                <meta content="index,follow,noodp" name="robots" />

                <meta content="noarchive" name="googlebot" />

                {/* <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
                /> */}

                <meta
                    content="MUI DataTable Delight"
                    name="apple-mobile-web-app-title"
                />
            </head>

            <body className={roboto.variable}>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={THEME}>
                        <CssBaseline />
                        <InitColorSchemeScript attribute="class" />
                        {children}
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
