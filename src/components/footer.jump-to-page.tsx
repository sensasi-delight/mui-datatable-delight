'use client'

// vendors
import InputBase from '@mui/material/InputBase'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { tss } from 'tss-react/mui'
// globals
import useDataTableContext from '../hooks/use-data-table-context'
import { ClassName } from '../enums/class-name'

export function DataTableFooterJumpToPage({
    count,
    rowsPerPage,
    page: pageProp,
    changePage
}: {
    count: number
    page: number
    rowsPerPage: number
    changePage: (pageNo: number) => void
}) {
    const { textLabels } = useDataTableContext()
    const { classes, cx } = useStyles()

    const pages = getPageOptions(count, rowsPerPage)
    const page = pages.length < pageProp ? pages.length - 1 : pageProp

    return (
        <div className={cx(ClassName.FOOTER__JUMP_TO_PAGE, classes.root)}>
            <Typography
                color="inherit"
                variant="body2"
                className={classes.caption}
            >
                {textLabels.pagination.jumpToPage}
            </Typography>

            <Select
                classes={{ select: classes.select, icon: classes.selectIcon }}
                input={
                    <InputBase
                        className={cx(classes.input, classes.selectRoot)}
                    />
                }
                onChange={({ target: { value } }) => {
                    changePage(parseInt(value.toString(), 10))
                }}
                style={{ marginRight: 0 }}
                value={page}
            >
                {pages.map(pageVal => (
                    <MenuItem
                        // className={classes.menuItem} // `menuItem` IS NOT FOUND
                        key={pageVal}
                        value={pageVal}
                    >
                        {pageVal + 1}
                    </MenuItem>
                ))}
            </Select>
        </div>
    )
}

const useStyles = tss
    .withName(ClassName.FOOTER__JUMP_TO_PAGE + '-')
    .create(({ theme }) => ({
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

function getPageOptions(count: number, rowsPerPage: number): number[] {
    const nPages = Math.max(Math.ceil(count / rowsPerPage), 1)

    return [...Array(nPages).keys()]
}
