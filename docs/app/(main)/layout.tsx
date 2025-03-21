import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Grid2 from '@mui/material/Grid2'
import SideTopBar from './_components/side-top-bar'
import { Breadcrumbs } from './_components/breadcrumbs'
import ContentOutline from './_components/content-outline'
import EditPageButton from './_components/edit-page-button'
import FloatingBar from './_components/floating-bar'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <Box display="flex">
            <SideTopBar />

            <Grid2
                container
                sx={{
                    py: {
                        xs: 11,
                        sm: 12
                    },
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
                    sx={{
                        px: {
                            xs: 4,
                            sm: 7
                        }
                    }}
                >
                    <FloatingBar />
                    <Breadcrumbs />

                    <Box component="main">{children}</Box>
                </Grid2>

                <Grid2
                    size={3}
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'none',
                            md: 'none',
                            lg: 'block'
                        }
                    }}
                >
                    <Box
                        sx={{
                            position: 'sticky',
                            top: 12 * 8,
                            pr: 4
                        }}
                    >
                        <Box mb={4}>
                            <EditPageButton />
                        </Box>
                        <ContentOutline />
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    )
}
