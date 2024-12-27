import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { CssBaseline } from '@mui/material'

const drawerWidth = 240

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <title>MUI DataTable Delight</title>

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
                    content="Datatable is a data tables component built for React Material-UI V1"
                />
                <meta
                    name="keywords"
                    content={
                        'material-ui, data tables, datatables, material-ui, material-ui-datables, react tables, react data tables'
                    }
                />
                <meta name="robots" content="index,follow,noodp" />
                <meta name="author" content="Gregory Nowakowski" />
                <meta name="googlebot" content="noarchive" />

                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
                />

                {/* <link rel="shortcut icon" href="/static/favicon.ico" /> */}
            </head>

            <AppRouterCacheProvider>
                <CssBaseline />
                <body>{children}</body>
            </AppRouterCacheProvider>
        </html>
    )
}
