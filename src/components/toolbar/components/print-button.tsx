'use client'

// vendors
import { useReactToPrint, type UseReactToPrintOptions } from 'react-to-print'
// materials
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
// locals
import useDataTableContext from '../../../hooks/use-data-table-context'
import { ICON_BUTTON_DEFAULT_SX } from './statics/icon-button-default-sx'

export function ToolbarPrintButton({
    printContent
}: {
    printContent: UseReactToPrintOptions['contentRef']
}) {
    const {
        icons,
        options,
        textLabels: { toolbar: toolbarTextLabels }
    } = useDataTableContext()

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
