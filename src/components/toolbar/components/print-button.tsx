'use client'

// materials
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ComponentClassName from '@src/enums/class-name'
import useDataTableContext from '@src/hooks/use-data-table-context'
import { useReactToPrint } from 'react-to-print'
// globals
import { ICON_BUTTON_DEFAULT_SX } from './statics/icon-button-default-sx'

/**
 * Renders a print button in the toolbar that triggers the print functionality.
 * The button is disabled if the print option is set to 'disabled'.
 * Utilizes the `useReactToPrint` hook to handle the print action.
 * Displays a tooltip with the print label from the context's text labels.
 *
 * @category  Component
 */
export function ToolbarPrintButton(): React.ReactElement {
    const {
        icons,
        options,
        tableRef,
        textLabels: { toolbar: toolbarTextLabels }
    } = useDataTableContext()

    const handlePrint = useReactToPrint({
        contentRef: tableRef
    })

    return (
        <Tooltip disableFocusListener title={toolbarTextLabels.print}>
            <span>
                <IconButton
                    aria-label={toolbarTextLabels.print}
                    className={ComponentClassName.TOOLBAR__PRINT_BUTTON}
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
