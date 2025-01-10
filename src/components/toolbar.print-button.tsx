// vendors
import { IReactToPrintProps, useReactToPrint } from 'react-to-print'
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
    printContent: IReactToPrintProps['content']
}) {
    const {
        icons,
        textLabels: { toolbar: toolbarTextLabels }
    } = useMainContext()

    const handlePrint = useReactToPrint({
        content: printContent
    })

    return (
        <Tooltip title={toolbarTextLabels.print}>
            <span>
                <IconButton
                    data-testid={toolbarTextLabels.print + '-iconButton'}
                    aria-label={toolbarTextLabels.print}
                    disabled={options.print === 'disabled'}
                    onClick={handlePrint}
                    sx={ICON_BUTTON_DEFAULT_SX}
                >
                    <icons.PrintIcon />
                </IconButton>
            </span>
        </Tooltip>
    )
}
