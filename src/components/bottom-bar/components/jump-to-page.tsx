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
            className={ClassName.BOTTOM_BAR__JUMP_TO_PAGE}
            input={
                <InputBase
                    sx={{
                        flexShrink: 0,
                        fontSize: '0.8em !important',
                        marginLeft: 8,
                        marginRight: 32,
                        minWidth: '4em'
                    }}
                />
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
            sx={{
                textAlign: 'right',
                textAlignLast: 'right'
            }}
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

function getPageOptions(count: number, rowsPerPage: number): number[] {
    const nPages = Math.max(Math.ceil(count / rowsPerPage), 1)

    return [...Array(nPages).keys()]
}
