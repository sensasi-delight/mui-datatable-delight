'use client'

import Clear from '@mui/icons-material/Clear'
import Search from '@mui/icons-material/Search'
// materials
import Grow from '@mui/material/Grow'
import IconButton from '@mui/material/IconButton'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
// global enums
import ClassName from '@src/enums/class-name'
import TableAction from '@src/enums/table-action'
// globals
import getDisplayData from '@src/functions/get-new-state-on-data-change/get-display-data'
import useDataTableContext from '@src/hooks/use-data-table-context'
// vendors
import { useRef, useState } from 'react'

/**
 * A component to render a search bar in the DataTable toolbar.
 *
 * @category  Component
 */
export function DataTableToolbarSearch({
    onHide
}: {
    onHide: () => void
}): React.ReactElement {
    const { onAction, options, state, textLabels, updateCellValueRef } =
        useDataTableContext()

    const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)
    const searchDelay = options?.searchDelay ?? 0
    const clearIconVisibility = options?.searchAlwaysOpen ? 'hidden' : 'visible'

    const [searchText, setSearchText] = useState(state.searchText)

    function handleSearch(newSearchText: string) {
        const displayData = options.serverSide
            ? state.displayData
            : getDisplayData(
                  state.columns,
                  state.data,
                  state.filterList,
                  newSearchText,
                  state,
                  options,
                  updateCellValueRef
              )

        onAction?.(TableAction.SEARCH, {
            displayData,
            page: 0,
            searchText: newSearchText
        })

        options.onSearchChange?.(newSearchText)
    }

    const onSearch: TextFieldProps['onChange'] = event => {
        setSearchText(event.target.value)
        clearTimeout(timeout.current)

        timeout.current = setTimeout(() => {
            handleSearch(event.target.value)
        }, searchDelay)
    }

    const handleKeyDown: TextFieldProps['onKeyDown'] = event => {
        if (event.key === 'Escape') {
            onHide()
        }
    }

    return (
        <Grow appear in={true} timeout={300}>
            <div
                className={ClassName.TOOLBAR__SEARCH_TEXT_FIELD}
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    flex: '1 0 auto'
                }}
            >
                <Search
                    sx={{
                        color: 'var(--mui-palette-text-secondary)',
                        marginRight: '8px'
                    }}
                />

                <TextField
                    aria-label={textLabels.toolbar.search}
                    autoFocus={true}
                    fullWidth={true}
                    onChange={onSearch}
                    onKeyDown={handleKeyDown}
                    placeholder={options?.searchPlaceholder}
                    sx={{
                        flex: '0.8 0'
                    }}
                    value={searchText}
                    variant="standard"
                    {...(options?.searchProps ?? {})}
                />

                <IconButton
                    aria-label="Close search bar"
                    onClick={onHide}
                    size="small"
                    sx={{
                        '&:hover': {
                            color: 'var(--mui-palette-error-main)'
                        },
                        visibility: clearIconVisibility
                    }}
                >
                    <Clear />
                </IconButton>
            </div>
        </Grow>
    )
}
