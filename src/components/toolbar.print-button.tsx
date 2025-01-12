// vendors
import { useReactToPrint, UseReactToPrintOptions } from 'react-to-print'
// materials
import { IconButton, Tooltip } from '@mui/material'
// locals
import { useMainContext } from '../hooks/use-main-context'
import type { DataTableOptions } from '../data-table.props.type/options'
import { ICON_BUTTON_DEFAULT_SX } from './toolbar.icon-button-default-sx'

export function ToolbarPrintButton({
    options,
    printContent
}: {
    options: DataTableOptions
    printContent: UseReactToPrintOptions['contentRef']
}) {
    const {
        icons,
        textLabels: { toolbar: toolbarTextLabels }
    } = useMainContext()

    const handlePrint = useReactToPrint({
        contentRef: printContent
    })

    return (
        <Tooltip title={toolbarTextLabels.print} disableFocusListener>
            <span>
                <IconButton
                    data-testid={toolbarTextLabels.print + '-iconButton'}
                    aria-label={toolbarTextLabels.print}
                    disabled={options.print === 'disabled'}
                    onClick={() => handlePrint()}
                    sx={ICON_BUTTON_DEFAULT_SX}
                >
                    <icons.PrintIcon />
                </IconButton>
            </span>
        </Tooltip>
    )
}
