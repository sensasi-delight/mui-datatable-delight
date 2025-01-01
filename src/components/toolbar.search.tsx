// vendors
import { makeStyles } from 'tss-react/mui'
// materials
import { Grow, IconButton, TextField, TextFieldProps } from '@mui/material'
import { Clear, Search } from '@mui/icons-material'
// locals
import type { DataTableProps } from '../data-table.props.type'
import { TEXT_LABELS } from '../statics'
import { useEffect, useState } from 'react'

export const DataTableToolbarSearch = ({
    options,
    onSearch,
    onHide
}: {
    options: DataTableProps['options']
    onSearch: (searchText: string) => void
    onHide: () => void
}) => {
    const { classes } = useStyles()
    const [searchText, setSearchText] = useState(options?.searchText ?? '')

    const searchDelay = options?.searchDelay ?? 0
    const clearIconVisibility = options?.searchAlwaysOpen ? 'hidden' : 'visible'

    const textLabels = options?.textLabels?.toolbar ?? TEXT_LABELS.toolbar

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

    return (
        <Grow appear in={true} timeout={300}>
            <div className={classes.main}>
                <Search className={classes.searchIcon} />

                <TextField
                    className={classes.searchText}
                    autoFocus={true}
                    variant="standard"
                    data-test-id={textLabels.search}
                    aria-label={textLabels.search}
                    value={searchText}
                    onKeyDown={event => {
                        if (event.key === 'Escape') {
                            onHide()
                        }
                    }}
                    onChange={handleSearch}
                    fullWidth={true}
                    placeholder={options?.searchPlaceholder}
                    {...(options?.searchProps ?? {})}
                />

                <IconButton
                    className={classes.clearIcon}
                    style={{ visibility: clearIconVisibility }}
                    onClick={onHide}
                >
                    <Clear />
                </IconButton>
            </div>
        </Grow>
    )
}

const useStyles = makeStyles({ name: 'datatable-delight--toolbar--search' })(
    theme => ({
        main: {
            display: 'flex',
            flex: '1 0 auto',
            alignItems: 'center'
        },
        searchIcon: {
            color: theme.palette.text.secondary,
            marginRight: '8px'
        },
        searchText: {
            flex: '0.8 0'
        },
        clearIcon: {
            '&:hover': {
                color: theme.palette.error.main
            }
        }
    })
)
