'use client'

// materials
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ComponentClassName from '@src/enums/class-name'
import useDataTableContext from '@src/hooks/use-data-table-context'
import type { ReactElement } from 'react'
import { useReactToPrint } from 'react-to-print'
// vendors
import { tss } from 'tss-react/mui'
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
export function ToolbarPrintButton(): ReactElement {
    const { classes } = useStyles()
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
                    className={classes.root}
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

const useStyles = tss
    .withName(ComponentClassName.TOOLBAR__PRINT_BUTTON)
    .create({
        root: {}
    })
