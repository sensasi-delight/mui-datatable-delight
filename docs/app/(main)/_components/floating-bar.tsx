import Paper from '@mui/material/Paper'
import ContentOutlineIconButton from './content-outline-icon-button'
import EditPageButton from './edit-page-button'
export default function FloatingBar() {
    return (
        <Paper
            sx={{
                bgcolor: 'background.paper',
                borderRadius: 8,
                display: {
                    lg: 'none'
                },
                float: 'right',
                position: 'sticky',
                px: 0.5,
                top: {
                    sm: 12 * 8,
                    xs: 10 * 8
                },
                translate: '12px 0',
                zIndex: 1
            }}
        >
            <EditPageButton iconOnly />
            <ContentOutlineIconButton />
        </Paper>
    )
}
