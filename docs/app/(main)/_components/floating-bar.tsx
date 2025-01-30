import Paper from '@mui/material/Paper'
import EditPageButton from './edit-page-button'
import ContentOutlineIconButton from './content-outline-icon-button'
export default function FloatingBar() {
    return (
        <Paper
            sx={{
                zIndex: 1,
                borderRadius: 8,
                px: 0.5,
                bgcolor: 'background.paper',
                float: 'right',
                display: {
                    lg: 'none'
                },
                position: 'sticky',
                translate: '12px 0',
                top: {
                    xs: 10 * 8,
                    sm: 12 * 8
                }
            }}
        >
            <EditPageButton iconOnly />
            <ContentOutlineIconButton />
        </Paper>
    )
}
