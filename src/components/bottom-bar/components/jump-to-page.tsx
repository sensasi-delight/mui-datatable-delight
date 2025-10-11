'use client'

// materials
import InputAdornment from '@mui/material/InputAdornment'
import InputBase from '@mui/material/InputBase'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
// global enums
import ClassName from '@src/enums/class-name'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
// vendors
import { type ReactElement, useState } from 'react'
import { tss } from 'tss-react/mui'

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
            classes={{ icon: classes.selectIcon, select: classes.select }}
            className={classes.root}
            input={
                <InputBase className={cx(classes.input, classes.selectRoot)} />
            }
            onChange={({ target: { value } }) => {
                changePage(parseInt(value.toString(), 10))
            }}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            startAdornment={
                <InputAdornment
                    onClick={handleOpen}
                    position="start"
                    sx={{
                        '& > *': { fontSize: '0.8rem !important' },
                        cursor: 'pointer'
                    }}
                >
                    {textLabels.pagination.jumpToPage}
                </InputAdornment>
            }
            style={{ marginRight: 0 }}
            value={page}
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
    /* Styles applied to InputBase component */
    input: {
        flexShrink: 0,
        fontSize: '0.8em !important',
        minWidth: '4em'
    },
    root: {},

    select: {
        paddingBottom: 7,
        paddingLeft: 8,
        paddingRight: 24,
        paddingTop: 6,
        textAlign: 'right',
        textAlignLast: 'right'
    },

    /* Styles applied to Select component icon class */
    selectIcon: {},

    /* Styles applied to the Select component root element */
    selectRoot: {
        marginLeft: 8,
        marginRight: 32
    }
})

function getPageOptions(count: number, rowsPerPage: number): number[] {
    const nPages = Math.max(Math.ceil(count / rowsPerPage), 1)

    return [...Array(nPages).keys()]
}
