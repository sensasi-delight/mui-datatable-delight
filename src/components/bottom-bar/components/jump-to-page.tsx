'use client'

// vendors
import type { ReactElement } from 'react'
import { tss } from 'tss-react/mui'
// materials
import InputBase from '@mui/material/InputBase'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
// global enums
import ClassName from '@src/enums/class-name'

/**
 * Component handling the jump to page feature.
 *
 * @category  Component
 */
export default function JumpToPage({
    changePage
}: {
    changePage: (pageNo: number) => void
}): ReactElement {
    const { state, textLabels } = useDataTableContext()
    const { classes, cx } = useStyles()

    const pages = getPageOptions(state.count, state.rowsPerPage)
    const page = pages.length < state.page ? pages.length - 1 : state.page

    return (
        <div className={classes.root}>
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

const useStyles = tss.withName(ClassName.BOTTOM_BAR__JUMP_TO_PAGE).create({
    root: {
        alignItems: 'center',
        display: 'flex'
    },

    caption: {
        flexShrink: 0
    },

    /* Styles applied to the Select component root element */
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
        textAlignLast: 'right'
    },

    /* Styles applied to Select component icon class */
    selectIcon: {},

    /* Styles applied to InputBase component */
    input: {
        color: 'inherit',
        fontSize: 'inherit',
        flexShrink: 0
    }
})

function getPageOptions(count: number, rowsPerPage: number): number[] {
    const nPages = Math.max(Math.ceil(count / rowsPerPage), 1)

    return [...Array(nPages).keys()]
}
