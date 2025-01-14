// vendors
import { makeStyles } from 'tss-react/mui'
import { useEffect, useState } from 'react'
// materials
import { Grow, IconButton, TextField, TextFieldProps } from '@mui/material'
import { Clear, Search } from '@mui/icons-material'
// locals
import type { DataTableProps } from '../data-table.props.type'
import { useMainContext } from '../hooks/use-main-context'
import { ClassName } from '../enums/class-name'

export function DataTableToolbarSearch({
    options,
    onSearch,
    onHide
}: {
    options: DataTableProps['options']
    onSearch: (searchText: string) => void
    onHide: () => void
}) {
    const { textLabels } = useMainContext()
    const { classes } = useStyles()
    const [searchText, setSearchText] = useState(options?.searchText ?? '')

    const searchDelay = options?.searchDelay ?? 0
    const clearIconVisibility = options?.searchAlwaysOpen ? 'hidden' : 'visible'

    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(searchText)
        }, searchDelay)

        return () => clearTimeout(timeout)
    }, [searchText, searchDelay])

    const handleSearch: TextFieldProps['onChange'] = ({
        target: { value }
    }) => {
        setSearchText(value)
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
                    onChange={handleSearch}
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

const useStyles = makeStyles({
    name: ClassName.TOOLBAR__SEARCH_BAR + '-'
})(theme => ({
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
