import type { ReactNode } from 'react'
import { Box, Container, Grid2 } from '@mui/material'
import SideTopBar from './_components/side-top-bar'

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
                    size={{
                        xs: 12,
                        sm: 12,
                        md: 12,
                        lg: 9,
                        xl: 9
                    }}
                >
                    <Container component="main">{children}</Container>
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
                            sm: 'none',
                            md: 'block'
                        }
                    }}
                >
                    <Container></Container>
                </Grid2>
            </Grid2>
        </Box>
    )
}
