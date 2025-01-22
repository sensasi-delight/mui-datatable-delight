'use client'

import React, { useEffect } from 'react'
import Grow from '@mui/material/Grow'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import { tss } from 'tss-react/mui'

export default function CustomSearchRender(props: unknown) {
    const { options, onHide, searchText } = props
    const { classes } = useStyles()

    const handleTextChange = event => {
        props.onSearch(event.target.value)
    }

    const onKeyDown = event => {
        if (event.keyCode === 27) {
            props.onHide()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, false)

        return () => {
            document.removeEventListener('keydown', onKeyDown, false)
        }
    }, [])

    return (
        <Grow appear in={true} timeout={300}>
            <div className={classes.main} ref={el => (rootRef = el)}>
                <TextField
                    placeholder={'Custom TableSearch without search icon'}
                    className={classes.searchText}
                    InputProps={{
                        'aria-label': options.textLabels.toolbar.search
                    }}
                    value={searchText || ''}
                    onChange={handleTextChange}
                    fullWidth={true}
                    inputRef={el => (searchField = el)}
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
