// materials
import { IconButton, Tooltip } from '@mui/material'
// locals
import { useMainContext } from '../hooks/use-main-context'
import type { DataTableOptions } from '../data-table.props.type/options'
import { ICON_BUTTON_DEFAULT_SX } from './toolbar.icon-button-default-sx'

export function ToolbarDownloadButton({
    options,
    onDownload
}: {
    options: DataTableOptions
    onDownload: () => void
}) {
    const {
        icons,
        textLabels: { toolbar: toolbarTextLabels }
    } = useMainContext()

    return (
        <Tooltip title={toolbarTextLabels.downloadCsv}>
            <span>
                <IconButton
                    aria-label={toolbarTextLabels.downloadCsv}
                    disabled={options.download === 'disabled'}
                    onClick={onDownload}
                    sx={ICON_BUTTON_DEFAULT_SX}
                >
                    <icons.DownloadIcon />
                </IconButton>
            </span>
        </Tooltip>
    )
}
