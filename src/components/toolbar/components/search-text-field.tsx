'use client'

// vendors
import { useRef, useState } from 'react'
import { tss } from 'tss-react/mui'
// materials
import Grow from '@mui/material/Grow'
import IconButton from '@mui/material/IconButton'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import Clear from '@mui/icons-material/Clear'
import Search from '@mui/icons-material/Search'
// globals
import getDisplayData from '@src/functions/get-new-state-on-data-change/get-display-data'
import useDataTableContext from '@src/hooks/use-data-table-context'
// global enums
import ClassName from '@src/enums/class-name'
import TableAction from '@src/enums/table-action'

export function DataTableToolbarSearch({ onHide }: { onHide: () => void }) {
    const {
        onAction,
        options,
        props: datatableRootProps,
        setState,
        state,
        textLabels
    } = useDataTableContext()
    const { classes } = useStyles()

    const timeout = useRef<NodeJS.Timeout>(undefined)
    const searchDelay = options?.searchDelay ?? 0
    const clearIconVisibility = options?.searchAlwaysOpen ? 'hidden' : 'visible'

    const [searchText, setSearchText] = useState(state.searchText)

    function handleSearch(newSearchText: string) {
        if (!setState) {
            throw new Error('setState is not defined')
        }

        const displayData = options.serverSide
            ? state.displayData
            : getDisplayData(
                  state.columns,
                  state.data,
                  state.filterList,
                  newSearchText,
                  undefined,
                  datatableRootProps,
                  state,
                  options,
                  setState
              )

        onAction?.(TableAction.SEARCH, {
            searchText: newSearchText,
            page: 0,
            displayData
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
            <div className={classes.root}>
                <Search className={classes.searchIcon} />

                <TextField
                    aria-label={textLabels.toolbar.search}
                    autoFocus={true}
                    className={classes.textField}
                    fullWidth={true}
                    onKeyDown={handleKeyDown}
                    onChange={onSearch}
                    placeholder={options?.searchPlaceholder}
                    value={searchText}
                    variant="standard"
                    {...(options?.searchProps ?? {})}
                />

                <IconButton
                    className={classes.clearButton}
                    aria-label="Close search bar"
                    onClick={onHide}
                    style={{ visibility: clearIconVisibility }}
                >
                    <Clear />
                </IconButton>
            </div>
        </Grow>
    )
}

const useStyles = tss
    .withName(ClassName.TOOLBAR__SEARCH_TEXT_FIELD)
    .create(({ theme }) => ({
        clearButton: {
            '&:hover': {
                color: theme.palette.error.main
            }
        },
        root: {
            display: 'flex',
            flex: '1 0 auto',
            alignItems: 'center'
        },
        searchIcon: {
            color: theme.palette.text.secondary,
            marginRight: '8px'
        },
        textField: {
            flex: '0.8 0'
        }
    }))
