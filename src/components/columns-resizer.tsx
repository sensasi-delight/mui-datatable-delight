'use client'

import React, {
    type RefObject,
    type ReactNode,
    useEffect,
    useState
} from 'react'
import { tss } from 'tss-react/mui'
// locals
import useDataTableContext from '@src/hooks/use-data-table-context'
import ComponentClassName from '@src/enums/class-name'

/**
 * Column resizer/slider component.
 *
 * @category  Component
 *
 * @see https://mui-datatable-delight.vercel.app/docs/features/resizable-columns
 */
export default function ColumnsResizer(): ReactNode {
    const tssHook = useStyles()
    // const classes = classesFromProp ?? tssHook.classes
    const classes = tssHook.classes
    const { options, tableRef, tableHeadCellElements } = useDataTableContext()

    /**
     * ##### STATES ########
     */
    const [resizeCoords, setResizeCoords] = useState<
        {
            left: number
        }[]
    >([])
    const [currentWindowWidth, setCurrentWindowWidth] = useState<number>()
    const [tableWidth, setTableWidth] = useState<number>()
    const [tableHeight, setTableHeight] = useState<number | string>('100%')
    const [isResizing, setIsResizing] = useState(false)
    const [resizingOnCellIndex, setResizingOnCellIndex] = useState<
        number | undefined
    >()
    const [minWidths, setMinWidths] = useState<number[]>([])

    useEffect(() => {
        if (tableRef.current) {
            const tableElementRect = tableRef.current.getBoundingClientRect()
            setTableWidth(tableElementRect.width)
            setTableHeight(tableElementRect.height)

            const parentOffsetLeft = getParentOffsetLeft(tableRef.current)
            const newResizeCoords = tableHeadCellElements.current
                .slice(0, -1)
                .map(cellElement => {
                    const elRect = cellElement.getBoundingClientRect()

                    return {
                        left:
                            elRect.left -
                            parentOffsetLeft +
                            cellElement.offsetWidth
                    }
                })

            setResizeCoords(newResizeCoords)
            updateCellWidths(
                newResizeCoords,
                tableHeadCellElements,
                tableElementRect.width
            )
        }
    }, [tableRef, currentWindowWidth, tableHeadCellElements])

    useEffect(() => {
        function updateCurrentWidth() {
            setCurrentWindowWidth(prev => {
                const newWindowWidth = window.innerWidth

                return newWindowWidth !== prev ? newWindowWidth : prev
            })
        }

        window.addEventListener('resize', updateCurrentWidth, false)

        return () => {
            window.removeEventListener('resize', updateCurrentWidth, false)
        }
    }, [])

    function onResizeStart(columnId: number) {
        if (!tableRef.current) {
            throw new Error('tableRef.current is undefined')
        }

        setIsResizing(true)
        setResizingOnCellIndex(columnId)

        const originalWidth = tableRef.current.style.width
        tableRef.current.style.width = '1px'

        setMinWidths(
            tableHeadCellElements.current.map(
                cellElement => cellElement.getBoundingClientRect().width
            )
        )

        /**
         * FOUND THIS 'REFRESH' WORKAROUND THAT TABLE WIDTH SHOULD BE SET TO `originalWidth` AFTER MIN WIDTH CHANGES
         *
         * 2025-01-04 - CAN NOT FOUND THE EXPLANATION
         * 2025-01-04 - [ORIGINAL GIT BLAME](https://github.com/gregnb/mui-datatables/blame/e09c39cb3c5713c7c157845b3d3e4b7d77c77649/src/components/TableResize.js#L130)
         */
        tableRef.current.style.width = originalWidth
    }

    function onResizeMove(
        columnId: number,
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) {
        /**
         * @todo IMPROVE THIS FUNCTION
         */
        function prevCol(columnId: number) {
            let nextId = columnId - 1

            while (typeof resizeCoords[nextId] === 'undefined' && nextId >= 0) {
                nextId--
            }

            return nextId
        }

        /**
         * @todo IMPROVE THIS FUNCTION
         */
        function nextCol(columnId: number) {
            let nextId = columnId + 1
            let tries = 0

            while (typeof resizeCoords[nextId] === 'undefined' && tries < 20) {
                nextId++
                tries++
            }

            return nextId
        }

        const lastColumnIndex = (tableHeadCellElements.current?.length ?? 0) - 1
        const fixedMinWidth1 = minWidths[columnId] ?? 0
        const fixedMinWidth2 =
            minWidths[nextCol(columnId)] ?? minWidths[columnId] ?? 0

        if (!tableRef.current) {
            throw new Error('tableRef.current is undefined')
        }

        const { width: tableWidth, height: tableHeight } =
            tableRef.current.getBoundingClientRect()

        setTableHeight(tableHeight)

        const selectableRows = options?.selectableRows ?? 'multiple'

        const parentOffsetLeft = getParentOffsetLeft(tableRef.current)

        const nextCoord = (columnId: number) => {
            let nextId = columnId + 1
            let tries = 0

            while (typeof resizeCoords[nextId] === 'undefined' && tries < 20) {
                nextId++
                tries++
            }
            return resizeCoords[nextId]
        }
        const prevCoord = (columnId: number) => {
            let nextId = columnId - 1

            while (typeof resizeCoords[nextId] === 'undefined' && nextId >= 0) {
                nextId--
            }
            return resizeCoords[nextId]
        }

        if (isResizing) {
            let leftPos = e.clientX - parentOffsetLeft

            const handleMoveRightmostBoundary = (
                leftPos: number,
                tableWidth: number,
                fixedMinWidth: number
            ) => {
                if (leftPos > tableWidth - fixedMinWidth) {
                    return tableWidth - fixedMinWidth
                }
                return leftPos
            }

            const handleMoveLeftmostBoundary = (
                leftPos: number,
                fixedMinWidth: number
            ) => {
                if (leftPos < fixedMinWidth) {
                    return fixedMinWidth
                }
                return leftPos
            }

            const handleMoveRight = (
                leftPos: number,
                columnId: number,
                fixedMinWidth: number
            ) => {
                if (typeof nextCoord(columnId) === 'undefined') return leftPos
                if (
                    leftPos >
                    (nextCoord(columnId)?.left ?? 0) - fixedMinWidth
                ) {
                    return (nextCoord(columnId)?.left ?? 0) - fixedMinWidth
                }
                return leftPos
            }

            const handleMoveLeft = (
                leftPos: number,
                columnId: number,
                fixedMinWidth: number
            ) => {
                if (typeof prevCoord(columnId) === 'undefined') return leftPos

                if (
                    leftPos <
                    (prevCoord(columnId)?.left ?? 0) + fixedMinWidth
                ) {
                    return (prevCoord(columnId)?.left ?? 0) + fixedMinWidth
                }

                return leftPos
            }

            const _isFirstColumn = (
                selectableRows: unknown,
                columnId: number
            ) => {
                let firstColumn = 1

                while (!resizeCoords[firstColumn] && firstColumn < 20) {
                    firstColumn++
                }

                return (
                    (selectableRows !== 'none' && columnId === 0) ||
                    (selectableRows === 'none' && columnId === firstColumn)
                )
            }

            const isFirstColumn = _isFirstColumn(selectableRows, columnId)
            const isLastColumn = columnId === prevCol(lastColumnIndex)

            if (isFirstColumn && isLastColumn) {
                leftPos = handleMoveLeftmostBoundary(leftPos, fixedMinWidth1)
                leftPos = handleMoveRightmostBoundary(
                    leftPos,
                    tableWidth,
                    fixedMinWidth2
                )
            } else if (!isFirstColumn && isLastColumn) {
                leftPos = handleMoveRightmostBoundary(
                    leftPos,
                    tableWidth,
                    fixedMinWidth2
                )
                leftPos = handleMoveLeft(leftPos, columnId, fixedMinWidth1)
            } else if (isFirstColumn && !isLastColumn) {
                leftPos = handleMoveLeftmostBoundary(leftPos, fixedMinWidth1)
                leftPos = handleMoveRight(leftPos, columnId, fixedMinWidth2)
            } else if (!isFirstColumn && !isLastColumn) {
                leftPos = handleMoveLeft(leftPos, columnId, fixedMinWidth1)
                leftPos = handleMoveRight(leftPos, columnId, fixedMinWidth2)
            }

            setResizeCoords(prev => {
                const newResizeCoords = [...prev]

                newResizeCoords[columnId] = {
                    left: leftPos
                }

                updateCellWidths(
                    newResizeCoords,
                    tableHeadCellElements,
                    tableWidth
                )

                return newResizeCoords
            })
        }
    }

    function onResizeEnd() {
        setIsResizing(false)
        setResizingOnCellIndex(undefined)
    }

    return (
        <div
            className={tssHook.cx('datatable-delight--resize', classes.root)}
            style={{ width: tableWidth }}
        >
            {resizeCoords.map((val, columnId) => {
                return (
                    <div
                        data-divider-index={columnId}
                        aria-hidden="true"
                        key={columnId}
                        onMouseMove={event => onResizeMove(columnId, event)}
                        onMouseUp={onResizeEnd}
                        style={{
                            width:
                                isResizing && resizingOnCellIndex == columnId
                                    ? tableWidth
                                    : 'auto',
                            position: 'absolute',
                            height: tableHeight,
                            cursor: 'ew-resize',
                            zIndex: 1
                        }}
                    >
                        <div
                            aria-hidden="true"
                            onMouseDown={() => onResizeStart(columnId)}
                            className={classes.resizer}
                            style={{ left: val.left }}
                        />
                    </div>
                )
            })}
        </div>
    )
}

const useStyles = tss.withName(ComponentClassName.COLUMN_RESIZER).create({
    root: {
        position: 'absolute'
    },
    resizer: {
        position: 'absolute',
        width: '1px',
        height: '100%',
        left: '100px',
        cursor: 'ew-resize',
        border: '0.1px solid rgba(224, 224, 224, 1)'
    }
})

function getParentOffsetLeft(tableEl: HTMLTableElement): number {
    let ii = 0,
        parentOffsetLeft = 0,
        offsetParent = tableEl.offsetParent

    while (offsetParent) {
        parentOffsetLeft =
            parentOffsetLeft +
            ('offsetLeft' in offsetParent
                ? (offsetParent.offsetLeft as number)
                : 0) -
            (offsetParent.scrollLeft ?? 0)

        offsetParent = (offsetParent as HTMLElement).offsetParent

        ii++

        if (ii > 1000) break
    }

    return parentOffsetLeft
}

function updateCellWidths(
    resizeCoords: {
        left: number
    }[],
    tableHeadCellElements: RefObject<HTMLTableCellElement[]>,
    tableWidth: number
) {
    let lastLeft = 0

    resizeCoords.forEach((item, columnId) => {
        const newWidthRaw = ((item.left - lastLeft) / tableWidth) * 100

        /**
         * Using .toFixed(2) causes the columns to jitter when resized. On all browsers I (Patrojk) have tested,
         * a width with a floating point decimal works fine. It's unclear to me why the numbers were being rounded.
         * However, I'm putting in an undocumented escape hatch to use toFixed in case the change introduces a bug.
         * The below code will be removed in a later release if no problems with non-rounded widths are reported.
         */
        const newWidth = Math.round(newWidthRaw * 100) / 100

        const thCell = tableHeadCellElements.current?.[columnId]

        if (thCell) thCell.style.width = newWidth + '%'

        lastLeft = item.left
    })
}
