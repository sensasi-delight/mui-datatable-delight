import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import CssBaseline from '@mui/material/CssBaseline'
import type { ReactNode } from 'react'
import { Roboto } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles'
import { THEME } from './_constants'

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto'
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
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />

                <meta
                    httpEquiv="Content-Type"
                    content="text/html; charset=utf-8"
                />

                <meta
                    name="description"
                    content="A responsive DataTable component built with Material UI for React-based project"
                />
                <meta
                    name="keywords"
                    content={
                        'material-ui, data table, datatable, mui, mui data table, react table, react data table'
                    }
                />

                <meta name="robots" content="index,follow,noodp" />

                <meta name="googlebot" content="noarchive" />

                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
                />

                <meta
                    name="apple-mobile-web-app-title"
                    content="MUI DataTable Delight"
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
