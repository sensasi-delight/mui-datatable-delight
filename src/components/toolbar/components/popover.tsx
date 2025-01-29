'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'
// materials
import IconButton, { type IconButtonProps } from '@mui/material/IconButton'
import MuiPopover, { type PopoverProps } from '@mui/material/Popover'
import VendorTooltip from '@mui/material/Tooltip'
import CloseIcon from '@mui/icons-material/Close'
import type { TransitionProps } from '@mui/material/transitions'
import { tss } from 'tss-react/mui'
import ComponentClassName from '@src/enums/class-name'

export function ToolbarPopover({
    children,
    hide,
    iconButtonProps,
    onPopoverExited,
    slotProps,
    title
}: ToolbarPopoverProps) {
    const { classes } = useStyles()
    const [isOpen, open] = useState(false)
    const anchorEl = useRef<EventTarget & HTMLSpanElement>(null)

    useEffect(() => {
        if (isOpen) {
            if (hide) {
                open(false)
            }
        }
    }, [hide, isOpen, open])

    const handleRequestClose = () => {
        open(false)
    }

    function handleTriggerClick(
        event:
            | React.KeyboardEvent<HTMLButtonElement>
            | React.MouseEvent<HTMLButtonElement>
    ) {
        anchorEl.current = event.currentTarget

        iconButtonProps.onClick?.(event as React.MouseEvent<HTMLButtonElement>)

        open(true)
    }

    return (
        <>
            <VendorTooltip title={title} disableFocusListener>
                <span>
                    <IconButton
                        {...iconButtonProps}
                        onClick={handleTriggerClick}
                        onKeyDown={handleTriggerClick}
                    />
                </span>
            </VendorTooltip>

            <MuiPopover
                className={classes.root}
                elevation={2}
                open={isOpen}
                TransitionProps={{ onExited: onPopoverExited }}
                onClose={handleRequestClose}
                anchorEl={anchorEl.current}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                slotProps={slotProps}
            >
                <IconButton
                    aria-label="Close"
                    onClick={handleRequestClose}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        zIndex: 100
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {children}
            </MuiPopover>
        </>
    )
}

interface ToolbarPopoverProps {
    children: ReactNode
    hide: boolean
    iconButtonProps: IconButtonProps
    onPopoverExited: TransitionProps['onExited']
    slotProps?: PopoverProps['slotProps']
    title: string
}

const useStyles = tss.withName(ComponentClassName.TOOLBAR__POPOVER).create({
    root: {}
})
