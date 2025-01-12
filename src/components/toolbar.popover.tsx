import { ReactNode, useEffect, useRef, useState } from 'react'
import MuiPopover, { PopoverProps } from '@mui/material/Popover'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Tooltip as VendorTooltip } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

export function ToolbarPopover({
    children,
    hide,
    iconButtonProps,
    onPopoverExited,
    slotProps,
    title
}: ToolbarPopoverProps) {
    const [isOpen, open] = useState(false)
    const anchorEl = useRef<EventTarget & HTMLSpanElement>(null)

    useEffect(() => {
        if (isOpen) {
            const shouldHide = typeof hide === 'boolean' ? hide : false
            if (shouldHide) {
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
                        aria-label={title}
                        {...iconButtonProps}
                        onClick={handleTriggerClick}
                        onKeyDown={handleTriggerClick}
                    />
                </span>
            </VendorTooltip>

            <MuiPopover
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
