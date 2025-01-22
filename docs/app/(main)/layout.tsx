import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Grid2 from '@mui/material/Grid2'
import SideTopBar from './_components/side-top-bar'
import { Breadcrumbs } from './_components/breadcrumbs'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <Box display="flex">
            <SideTopBar />

            <Grid2
                container
                sx={{
                    py: 12,
                    flexGrow: 1
                }}
            >
                <Grid2
                    paddingX={7}
                    size={{
                        xs: 12,
                        sm: 12,
                        md: 12,
                        lg: 9,
                        xl: 9
                    }}
                >
                    <Breadcrumbs />

                    <Box component="main">{children}</Box>
                </Grid2>

                <Grid2
                    size={{
                        xs: 12,
                        sm: 12,
                        md: 12,
                        lg: 3,
                        xl: 3
                    }}
                    sx={{
                        display: {
                            md: 'none',
                            lg: 'block'
                        }
                    }}
                ></Grid2>
            </Grid2>
        </Box>
    )
}
