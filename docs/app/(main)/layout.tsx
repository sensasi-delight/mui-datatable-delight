import { Box, Container, Grid2 } from '@mui/material'
import SideTopBar from './_components/side-top-bar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Box display="flex">
            <SideTopBar />

            <Grid2
                container
                sx={{
                    py: 15
                }}
            >
                <Grid2 size={9}>
                    <Container component="main">{children}</Container>
                </Grid2>

                <Grid2 size={3}>
                    <Container>asd</Container>
                </Grid2>
            </Grid2>
        </Box>
    )
}
