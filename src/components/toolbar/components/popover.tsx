'use client'

import CloseIcon from '@mui/icons-material/Close'
// materials
import IconButton, { type IconButtonProps } from '@mui/material/IconButton'
import MuiPopover, { type PopoverProps } from '@mui/material/Popover'
import VendorTooltip from '@mui/material/Tooltip'
import type { TransitionProps } from '@mui/material/transitions'
import ComponentClassName from '@src/enums/class-name'
import {
    type MouseEvent,
    type ReactElement,
    type ReactNode,
    useEffect,
    useRef,
    useState
} from 'react'

/**
 * A `Popover` component that is triggered by an `IconButton` with a tooltip.
 *
 * @category  Component
 */
export function ToolbarPopover({
    children,
    hide,
    iconButtonProps,
    onPopoverExited,
    slotProps,
    title
}: ToolbarPopoverProps): ReactElement {
    const [isOpen, setIsOpen] = useState(false)
    const anchorEl = useRef<EventTarget & HTMLSpanElement>(null)

    useEffect(() => {
        if (isOpen && hide) {
            setIsOpen(false)
        }
    }, [hide, isOpen])

    const handleRequestClose = () => {
        setIsOpen(false)
    }

    function handleTriggerClick(event: MouseEvent<HTMLButtonElement>) {
        anchorEl.current = event.currentTarget

        iconButtonProps.onClick?.(event as MouseEvent<HTMLButtonElement>)

        setIsOpen(true)
    }

    return (
        <>
            <VendorTooltip disableFocusListener title={title}>
                <span>
                    <IconButton
                        {...iconButtonProps}
                        onClick={handleTriggerClick}
                    />
                </span>
            </VendorTooltip>

            <MuiPopover
                anchorEl={anchorEl.current}
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom'
                }}
                className={ComponentClassName.TOOLBAR__POPOVER}
                elevation={2}
                onClose={handleRequestClose}
                open={isOpen}
                slotProps={slotProps}
                TransitionProps={{ onExited: onPopoverExited }}
                transformOrigin={{
                    horizontal: 'center',
                    vertical: 'top'
                }}
            >
                <IconButton
                    aria-label="Close"
                    onClick={handleRequestClose}
                    size="small"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        zIndex: 1
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
