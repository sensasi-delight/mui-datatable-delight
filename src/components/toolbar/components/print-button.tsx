'use client'

// vendors
import { tss } from 'tss-react/mui'
import { useReactToPrint, type UseReactToPrintOptions } from 'react-to-print'
// materials
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
// locals
import useDataTableContext from '../../../hooks/use-data-table-context'
import { ICON_BUTTON_DEFAULT_SX } from './statics/icon-button-default-sx'
import ComponentClassName from '@/enums/class-name'

export function ToolbarPrintButton({
    printContent
}: {
    printContent: UseReactToPrintOptions['contentRef']
}) {
    const { classes } = useStyles()
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
                    className={classes.root}
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

const useStyles = tss
    .withName(ComponentClassName.TOOLBAR__PRINT_BUTTON)
    .create({
        root: {}
    })
