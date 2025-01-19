import { TableRow, type TableRowProps } from '@mui/material'
import { tss } from 'tss-react/mui'
import clsx from 'clsx'
import { useMainContext } from '../hooks/use-main-context'

export function DataTableBodyRow({
    rowSelected,
    onClick,
    isRowSelectable,
    children,
    className
}: DataTableBodyRowProps) {
    const { classes } = useStyles()
    const { options } = useMainContext()

    return (
        <TableRow
            hover={options.rowHover}
            onClick={onClick}
            className={clsx(
                {
                    [classes.root]: true,

                    /**
                     * @todo CHECK THIS `.hover` class ON OLDER CODE
                     */
                    // [classes.hover]: options.rowHover,

                    [classes.hoverCursor]:
                        (options.selectableRowsOnClick && isRowSelectable) ||
                        options.expandableRowsOnClick,
                    [classes.responsiveSimple]: options.responsive === 'simple',
                    [classes.responsiveStacked]:
                        options.responsive === 'vertical' ||
                        options.responsive === 'stacked' ||
                        options.responsive === 'stackedFullWidth',
                    'mui-row-selected': rowSelected
                },
                className
            )}
            selected={rowSelected}
        >
            {children}
        </TableRow>
    )
}
export interface DataTableBodyRowProps extends TableRowProps {
    isRowSelectable: boolean

    /** Callback to execute when row is clicked */
    onClick?: TableRowProps['onClick']

    /** Current row selected or not */
    rowSelected?: boolean

    /** Extend the style applied to components */
    // classes: PropTypes.object
}

const useStyles = tss
    .withName('datatable-delight--body--row')
    .create(({ theme }) => ({
        root: {
            // material v4
            '&.Mui-selected': {
                backgroundColor: theme.palette.action.selected
            },

            // material v3 workaround
            '&.mui-row-selected': {
                backgroundColor: theme.palette.action.selected
            }
        },
        hoverCursor: { cursor: 'pointer' },
        responsiveStacked: {
            [theme.breakpoints.down('md')]: {
                borderTop: 'solid 2px rgba(0, 0, 0, 0.15)',
                borderBottom: 'solid 2px rgba(0, 0, 0, 0.15)',
                padding: 0,
                margin: 0
            }
        },
        responsiveSimple: {
            [theme.breakpoints.down('sm')]: {
                borderTop: 'solid 2px rgba(0, 0, 0, 0.15)',
                borderBottom: 'solid 2px rgba(0, 0, 0, 0.15)',
                padding: 0,
                margin: 0
            }
        }
    }))
