'use client'

// vendors
import { useState, type ReactElement } from 'react'
import { tss } from 'tss-react/mui'
// materials
import InputAdornment from '@mui/material/InputAdornment'
import InputBase from '@mui/material/InputBase'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
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

    const [open, setOpen] = useState(false)

    function handleOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <Select
            className={classes.root}
            classes={{ select: classes.select, icon: classes.selectIcon }}
            input={
                <InputBase className={cx(classes.input, classes.selectRoot)} />
            }
            startAdornment={
                <InputAdornment
                    position="start"
                    onClick={handleOpen}
                    sx={{
                        cursor: 'pointer',
                        '& > *': { fontSize: '0.8rem !important' }
                    }}
                >
                    {textLabels.pagination.jumpToPage}
                </InputAdornment>
            }
            onChange={({ target: { value } }) => {
                changePage(parseInt(value.toString(), 10))
            }}
            style={{ marginRight: 0 }}
            value={page}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
        >
            {pages.map(pageVal => (
                <MenuItem key={pageVal} value={pageVal}>
                    {pageVal + 1}
                </MenuItem>
            ))}
        </Select>
    )
}

const useStyles = tss.withName(ClassName.BOTTOM_BAR__JUMP_TO_PAGE).create({
    root: {},

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
        minWidth: '4em',
        flexShrink: 0,
        fontSize: '0.8em !important'
    }
})

function getPageOptions(count: number, rowsPerPage: number): number[] {
    const nPages = Math.max(Math.ceil(count / rowsPerPage), 1)

    return [...Array(nPages).keys()]
}
