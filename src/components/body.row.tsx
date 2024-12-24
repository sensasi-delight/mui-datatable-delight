import { TableRow, type TableRowProps, type Theme } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { DataTableOptions } from '../data-table.props.type/options'
import clsx from 'clsx'

export function TableBodyRow({
    options,
    rowSelected,
    onClick,
    isRowSelectable,
    children,
    className
}: TableBodyRowProps) {
    const { classes } = useStyles()

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
interface TableBodyRowProps extends TableRowProps {
    isRowSelectable: boolean

    /** Options used to describe table */
    options: DataTableOptions

    /** Callback to execute when row is clicked */
    onClick?: TableRowProps['onClick']

    /** Current row selected or not */
    rowSelected?: boolean

    /** Extend the style applied to components */
    // classes: PropTypes.object
}

const useStyles = makeStyles({
    name: 'DataTableBodyRow'
})((theme: Theme) => ({
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
