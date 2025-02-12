'use client'

// vendors
import { useEffect, type ChangeEvent } from 'react'
import { tss } from 'tss-react/mui'
// materials
import Grow from '@mui/material/Grow'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
// icons-materials
import ClearIcon from '@mui/icons-material/Clear'
//
import { useDataTableContext } from '@src'

export default function CustomSearchRender(props: {
    onHide: () => void
    searchText?: string
    onSearch: (text: string) => void
}) {
    const { textLabels } = useDataTableContext()
    const { onHide, searchText } = props
    const { classes } = useStyles()

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onSearch(event.target.value)
    }

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                onHide()
            }
        }

        document.addEventListener('keydown', onKeyDown, false)

        return () => {
            document.removeEventListener('keydown', onKeyDown, false)
        }
    }, [onHide])

    return (
        <Grow appear in={true} timeout={300}>
            <div
                className={classes.main}
                // ref={el => (rootRef = el)} // CAN'T FOUND THE `rootRef` VAR
            >
                <TextField
                    placeholder={'Custom TableSearch without search icon'}
                    className={classes.searchText}
                    InputProps={{
                        'aria-label': textLabels.toolbar.search
                    }}
                    value={searchText ?? ''}
                    onChange={handleTextChange}
                    fullWidth={true}
                    // inputRef={el => (searchField = el)} // CAN'T FOUND THE `searchField` VAR
                />
                <IconButton className={classes.clearIcon} onClick={onHide}>
                    <ClearIcon />
                </IconButton>
            </div>
        </Grow>
    )
}

const useStyles = tss.create(({ theme }) => ({
    main: {
        display: 'flex',
        flex: '1 0 auto'
    },
    searchText: {
        flex: '0.8 0'
    },
    clearIcon: {
        '&:hover': {
            color: theme.palette.error.main
        }
    }
}))
