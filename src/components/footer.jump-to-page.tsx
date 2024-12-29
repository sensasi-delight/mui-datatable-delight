// vendors
import { InputBase, MenuItem, Select, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import clsx from 'clsx'
// locals
import { getPageValue } from '../functions.shared/get-page-value'

export function DataTableFooterJumpToPage({
    count,
    textLabel,
    rowsPerPage,
    page,
    changePage
}: {
    count: number
    page: number
    rowsPerPage: number

    /**
     * @default options.textLabels.pagination.jumpToPage
     */
    textLabel: string

    changePage: (pageNo: number) => void
}) {
    const { classes } = useStyles()

    const lastPage = Math.min(1000, getPageValue(count, rowsPerPage, 1000000))

    const pages = [...Array(lastPage).keys()]

    return (
        <div className={classes.root}>
            <Typography
                color="inherit"
                variant="body2"
                className={classes.caption}
            >
                {textLabel}
            </Typography>

            <Select
                classes={{ select: classes.select, icon: classes.selectIcon }}
                input={
                    <InputBase
                        className={clsx(classes.input, classes.selectRoot)}
                    />
                }
                onChange={({ target: { value } }) => {
                    changePage(parseInt(value.toString(), 10))
                }}
                style={{ marginRight: 0 }}
                value={getPageValue(count, rowsPerPage, page) ?? ''}
            >
                {pages.length ? (
                    pages.map(pageVal => (
                        <MenuItem
                            // className={classes.menuItem} // `menuItem` IS NOT FOUND
                            key={pageVal}
                            value={pageVal}
                        >
                            {pageVal + 1}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem value="" disabled />
                )}
            </Select>
        </div>
    )
}

const useStyles = makeStyles({
    name: 'delight-datatable-footer--jump-to-page'
})(theme => ({
    root: {
        alignItems: 'center',
        display: 'flex'
    },

    caption: {
        flexShrink: 0
    },

    /*  Styles applied to the Select component root element */
    selectRoot: {
        marginRight: 32,
        marginLeft: 8
    },

    select: {
        paddingTop: 6,
        paddingBottom: 7,
        paddingLeft: 8,
        paddingRight: 24,
        textAlign: 'right',
        textAlignLast: 'right',
        fontSize: theme.typography.pxToRem(14)
    },

    /* Styles applied to Select component icon class */
    selectIcon: {},

    /* Styles applied to InputBase component */
    input: {
        color: 'inhert',
        fontSize: 'inhert',
        flexShrink: 0
    }
}))
