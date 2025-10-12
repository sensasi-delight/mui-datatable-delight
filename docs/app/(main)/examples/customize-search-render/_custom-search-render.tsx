'use client'

// icons-materials
import ClearIcon from '@mui/icons-material/Clear'
// materials
import Grow from '@mui/material/Grow'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
//
import { useDataTableContext } from '@src'
// vendors
import { type ChangeEvent, useEffect } from 'react'

export default function CustomSearchRender(props: {
    onHide: () => void
    searchText?: string
    onSearch: (text: string) => void
}) {
    const { textLabels } = useDataTableContext()
    const { onHide, searchText } = props

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
                style={{
                    display: 'flex',
                    flex: '1 0 auto'
                }}
                // ref={el => (rootRef = el)} // CAN'T FOUND THE `rootRef` VAR
            >
                <TextField
                    fullWidth={true}
                    InputProps={{
                        'aria-label': textLabels.toolbar.search
                    }}
                    onChange={handleTextChange}
                    placeholder={'Custom TableSearch without search icon'}
                    sx={{
                        flex: '0.8 0'
                    }}
                    value={searchText ?? ''}
                    // inputRef={el => (searchField = el)} // CAN'T FOUND THE `searchField` VAR
                />
                <IconButton
                    onClick={onHide}
                    sx={{
                        '&:hover': {
                            color: 'var(--mui-palette-error-main)'
                        }
                    }}
                >
                    <ClearIcon />
                </IconButton>
            </div>
        </Grow>
    )
}
