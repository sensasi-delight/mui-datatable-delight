import type { IconButtonProps } from '@mui/material'

export const ICON_BUTTON_DEFAULT_SX: IconButtonProps['sx'] = theme => ({
    '&:hover': {
        color: theme.palette.primary.main
    }
})
