import React, { JSX } from 'react'
import { makeStyles } from 'tss-react/mui'
import { DataTableOptions, DataTableProps } from '..'

export default function TableResize({
    classes: classesFromProp,
    ...props
}: DataTableResizeProps): JSX.Element {
    const { classes } = classesFromProp
        ? {
              classes: classesFromProp
          }
        : useStyles()

    return <TableResizeClassComponent classes={classes} {...props} />
}

class TableResizeClassComponent extends React.Component<
    DataTableResizeProps,
    {
        resizeCoords: {
            left: number
        }[]
        tableHeight: number
        tableWidth: number
        isResize: boolean
        id?: number
        lastColumn?: number
        updateCoords?: boolean
    }
> {
    windowWidth: number | null = null
    minWidths: number[] = []
    tableHeadCellElements?: HTMLElement[]
    tableElement?: HTMLElement

    // state = {
    //     resizeCoords: [],
    //     priorPosition: {},
    //     tableWidth: '100%',
    //     tableHeight: '100%',
    //     isResize: false,
    //     id: null
    // }

    constructor(props: DataTableResizeProps) {
        super(props)

        this.state = {
            resizeCoords: [],
            // priorPosition: {},
            tableWidth: 0,
            tableHeight: 0,
            isResize: false
        }
    }

    handleResize = () => {
        if (window.innerWidth !== this.windowWidth) {
            this.windowWidth = window.innerWidth
            this.setDividers()
        }
    }

    componentDidMount() {
        // this.minWidths = []
        this.windowWidth = null
        this.props.setResizable((tableHeadCellElements, tableElement) => {
            this.tableHeadCellElements = tableHeadCellElements
            this.tableElement = tableElement

            this.setDividers()
        })
        this.props.updateDividers(() =>
            this.setState({ updateCoords: true }, () => this.updateWidths)
        )
        window.addEventListener('resize', this.handleResize, false)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize, false)
    }

    setDividers = () => {
        if (!this.tableElement) {
            throw new Error('`this.tableElement` is undefined')
        }

        const tableEl = this.tableElement

        const { width: tableWidth, height: tableHeight } =
            tableEl?.getBoundingClientRect()

        const { resizeCoords } = this.state

        for (let prop in resizeCoords) {
            delete resizeCoords[prop]
        }

        const parentOffsetLeft = getParentOffsetLeft(tableEl)

        if (!this.tableHeadCellElements) {
            throw new Error('`this.tableHeadCellElements` is undefined')
        }

        const finalCells = Object.entries(this.tableHeadCellElements)
        const cellMinusOne = finalCells.filter(
            (_item, ix) => ix + 1 < finalCells.length
        )

        cellMinusOne.forEach(([key, item]) => {
            if (!item) return

            const elRect = item.getBoundingClientRect()

            let left = elRect.left
            left = (left ?? 0) - parentOffsetLeft
            // const elStyle = window.getComputedStyle(item, null)
            resizeCoords[parseInt(key, 10)] = { left: left + item.offsetWidth }
        })
        this.setState(
            { tableWidth, tableHeight, resizeCoords },
            this.updateWidths
        )
    }

    updateWidths = () => {
        const { resizeCoords, tableWidth } = this.state

        let lastPosition = 0

        resizeCoords.forEach((item, key) => {
            const newWidthRaw = ((item.left - lastPosition) / tableWidth) * 100

            /**
             * Using .toFixed(2) causes the columns to jitter when resized. On all browsers I (Patrojk) have tested,
             * a width with a floating point decimal works fine. It's unclear to me why the numbers were being rounded.
             * However, I'm putting in an undocumented escape hatch to use toFixed in case the change introduces a bug.
             * The below code will be removed in a later release if no problems with non-rounded widths are reported.
             */
            const newWidth = Math.round(newWidthRaw * 100) / 100

            const thCell = this.tableHeadCellElements?.[key]

            if (thCell) thCell.style.width = newWidth + '%'

            lastPosition = item.left
        })
    }

    onResizeStart = (id: number) => {
        if (!this.tableElement) {
            throw new Error('tableElement is undefined')
        }

        if (!this.tableHeadCellElements) {
            throw new Error('tableHeadCellElements is undefined')
        }

        const tableEl = this.tableElement
        const originalWidth = tableEl.style.width
        tableEl.style.width = '1px'

        let lastColumn = 0

        this.tableHeadCellElements.forEach((item, key) => {
            const elRect = item
                ? item.getBoundingClientRect()
                : { width: 0, left: 0 }

            this.minWidths[key] = elRect.width

            lastColumn = Math.max(key, lastColumn)
        })

        tableEl.style.width = originalWidth

        this.setState({ isResize: true, id, lastColumn })
    }

    onResizeMove = (
        id: number,
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const { isResize, resizeCoords, lastColumn } = this.state

        const prevCol = (id: number) => {
            let nextId = id - 1
            while (typeof resizeCoords[nextId] === 'undefined' && nextId >= 0) {
                nextId--
            }
            return nextId
        }

        const nextCol = (id: number) => {
            let nextId = id + 1
            let tries = 0

            while (typeof resizeCoords[nextId] === 'undefined' && tries < 20) {
                nextId++
                tries++
            }
            return nextId
        }

        const fixedMinWidth1 = this.minWidths[id]
        const fixedMinWidth2 = this.minWidths[nextCol(id)] ?? this.minWidths[id]
        const idNumber = id
        // const finalCells = Object.entries(this.tableHeadCellElements)

        if (!this.tableElement) {
            throw new Error('tableElement is undefined')
        }

        const tableEl = this.tableElement
        const { width: tableWidth, height: tableHeight } =
            tableEl.getBoundingClientRect()

        const selectableRows = this.props.options?.selectableRows ?? 'multiple'

        let parentOffsetLeft = getParentOffsetLeft(tableEl)

        const nextCoord = (id: number) => {
            let nextId = id + 1
            let tries = 0
            while (typeof resizeCoords[nextId] === 'undefined' && tries < 20) {
                nextId++
                tries++
            }
            return resizeCoords[nextId]
        }
        const prevCoord = (id: number) => {
            let nextId = id - 1

            while (typeof resizeCoords[nextId] === 'undefined' && nextId >= 0) {
                nextId--
            }
            return resizeCoords[nextId]
        }

        if (isResize) {
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
                id: number,
                fixedMinWidth: number
            ) => {
                if (typeof nextCoord(id) === 'undefined') return leftPos
                if (leftPos > nextCoord(id).left - fixedMinWidth) {
                    return nextCoord(id).left - fixedMinWidth
                }
                return leftPos
            }

            const handleMoveLeft = (
                leftPos: number,
                id: number,
                fixedMinWidth: number
            ) => {
                if (typeof prevCoord(id) === 'undefined') return leftPos

                if (leftPos < prevCoord(id).left + fixedMinWidth) {
                    return prevCoord(id).left + fixedMinWidth
                }

                return leftPos
            }

            const isFirstColumn = (selectableRows: unknown, id: number) => {
                let firstColumn = 1
                while (!resizeCoords[firstColumn] && firstColumn < 20) {
                    firstColumn++
                }

                return (
                    (selectableRows !== 'none' && id === 0) ||
                    (selectableRows === 'none' && id === firstColumn)
                )
            }

            const isLastColumn = (id: number) => {
                return id === prevCol(lastColumn ?? 0)
            }

            if (
                isFirstColumn(selectableRows, idNumber) &&
                isLastColumn(idNumber)
            ) {
                leftPos = handleMoveLeftmostBoundary(leftPos, fixedMinWidth1)
                leftPos = handleMoveRightmostBoundary(
                    leftPos,
                    tableWidth,
                    fixedMinWidth2
                )
            } else if (
                !isFirstColumn(selectableRows, idNumber) &&
                isLastColumn(idNumber)
            ) {
                leftPos = handleMoveRightmostBoundary(
                    leftPos,
                    tableWidth,
                    fixedMinWidth2
                )
                leftPos = handleMoveLeft(leftPos, idNumber, fixedMinWidth1)
            } else if (
                isFirstColumn(selectableRows, idNumber) &&
                !isLastColumn(idNumber)
            ) {
                leftPos = handleMoveLeftmostBoundary(leftPos, fixedMinWidth1)
                leftPos = handleMoveRight(leftPos, idNumber, fixedMinWidth2)
            } else if (
                !isFirstColumn(selectableRows, idNumber) &&
                !isLastColumn(idNumber)
            ) {
                leftPos = handleMoveLeft(leftPos, idNumber, fixedMinWidth1)
                leftPos = handleMoveRight(leftPos, idNumber, fixedMinWidth2)
            }

            const newResizeCoords = [...resizeCoords]

            newResizeCoords[id] = {
                left: leftPos
            }
            this.setState(
                { resizeCoords: newResizeCoords, tableHeight },
                this.updateWidths
            )
        }
    }

    onResizeEnd = () => {
        this.setState({ isResize: false, id: undefined })
    }

    render() {
        const { classes, tableId } = this.props
        const { id, isResize, resizeCoords, tableWidth, tableHeight } =
            this.state

        return (
            <div className={classes.root} style={{ width: tableWidth }}>
                {resizeCoords.map((val, key) => {
                    return (
                        <div
                            data-divider-index={key}
                            data-tableid={tableId}
                            aria-hidden="true"
                            key={key}
                            onMouseMove={event => this.onResizeMove(key, event)}
                            onMouseUp={this.onResizeEnd}
                            style={{
                                width:
                                    isResize && id == key ? tableWidth : 'auto',
                                position: 'absolute',
                                height: tableHeight,
                                cursor: 'ew-resize',
                                zIndex: 1000
                            }}
                        >
                            <div
                                aria-hidden="true"
                                onMouseDown={() => {
                                    this.onResizeStart(key)
                                }}
                                className={classes.resizer}
                                style={{ left: val.left }}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }
}

interface DataTableResizeProps {
    setResizable: (
        callback: (
            tableHeadCellElements: HTMLTableCellElement[],
            tableElement: HTMLTableElement
        ) => void
    ) => void

    updateDividers: (callback: () => void) => void

    resizableColumns: DataTableOptions['resizableColumns']

    tableId: string

    /** Extend the style applied to components */
    classes: ReturnType<typeof useStyles>['classes']

    // selectableRows: unknown

    options: DataTableProps['options']
}

const useStyles = makeStyles({
    name: 'datatable-delight--resize'
})({
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

function getParentOffsetLeft(tableEl: HTMLElement): number {
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
