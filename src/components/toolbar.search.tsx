// vendors
import { tss } from 'tss-react/mui'
import { useEffect, useState } from 'react'
// materials
import Grow from '@mui/material/Grow'
import IconButton from '@mui/material/IconButton'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import Clear from '@mui/icons-material/Clear'
import Search from '@mui/icons-material/Search'
// locals
import { useDataTableContext } from '../hooks'
import { ClassName } from '../enums/class-name'

export function DataTableToolbarSearch({
    onSearch,
    onHide
}: {
    onSearch: (searchText: string) => void
    onHide: () => void
}) {
    const { options, textLabels } = useDataTableContext()
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

const useStyles = tss
    .withName(ClassName.TOOLBAR__SEARCH_BAR)
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
