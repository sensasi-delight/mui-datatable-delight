import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import type { ReactNode } from 'react'
import { Breadcrumbs } from './_components/breadcrumbs'
import ContentOutline from './_components/content-outline'
import EditPageButton from './_components/edit-page-button'
import FloatingBar from './_components/floating-bar'
import SideTopBar from './_components/side-top-bar'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <Box display="flex">
            <SideTopBar />

            <Grid container sx={{ flexGrow: 1, py: { sm: 12, xs: 11 } }}>
                <Grid
                    size={{ lg: 9, md: 12, sm: 12, xl: 9, xs: 12 }}
                    sx={{ px: { sm: 7, xs: 4 } }}
                >
                    <FloatingBar />
                    <Breadcrumbs />

                    <Box component="main">{children}</Box>
                </Grid>

                <Grid
                    size={3}
                    sx={{
                        display: {
                            lg: 'block',
                            md: 'none',
                            sm: 'none',
                            xs: 'none'
                        }
                    }}
                >
                    <Box sx={{ position: 'sticky', pr: 4, top: 12 * 8 }}>
                        <Box mb={4}>
                            <EditPageButton />
                        </Box>
                        <ContentOutline />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
