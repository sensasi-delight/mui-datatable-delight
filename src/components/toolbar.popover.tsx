import { ReactNode, useEffect, useRef, useState } from 'react'
import MuiPopover, { PopoverProps } from '@mui/material/Popover'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

export function ToolbarPopover({
    children,
    trigger,
    refExit,
    hide,
    slotProps
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

    const handleOnExit = () => {
        if (refExit) {
            refExit()
        }
    }

    function handleTriggerClick(
        event:
            | React.KeyboardEvent<HTMLSpanElement>
            | React.MouseEvent<HTMLSpanElement>
    ) {
        anchorEl.current = event.currentTarget

        open(true)
    }

    return (
        <>
            <span
                key="content"
                onClick={handleTriggerClick}
                onKeyDown={handleTriggerClick}
                role="button"
                tabIndex={0}
            >
                {trigger}
            </span>

            <MuiPopover
                elevation={2}
                open={isOpen}
                TransitionProps={{ onExited: handleOnExit }}
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
    refExit: () => void
    trigger: ReactNode
    hide: boolean
    slotProps?: PopoverProps['slotProps']
}
