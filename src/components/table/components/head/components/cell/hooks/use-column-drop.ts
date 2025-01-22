import { type DropTargetMonitor, useDrop } from 'react-dnd'
import useDataTableContext from '../../../../../../../hooks/use-data-table-context'
import { TableAction } from '../../../../../../../types/options'
import type Props from '../types/props'
import { type RefObject, useRef } from 'react'

/**
 * This hook handles the dragging and dropping effects that occur for columns.
 */
export function useColumnDrop(opts: OptsType) {
    const { onAction, options } = useDataTableContext()
    const timeoutRef = useRef<NodeJS.Timeout>(null)

    function handleColumnOrderUpdate(
        columnOrder: number[],
        columnIndex: number,
        newPosition: number
    ) {
        onAction?.(TableAction.COLUMN_ORDER_CHANGE, {
            columnOrder
        })

        options.onColumnOrderChange?.(columnOrder, columnIndex, newPosition)
    }

    return useDrop({
        accept: 'HEADER',
        hover: (_, mon) =>
            handleHover({ ...opts, mon, handleColumnOrderUpdate, timeoutRef }),
        collect: mon => ({
            isOver: !!mon.isOver(),
            canDrop: !!mon.canDrop()
        })
    })
}

interface OptsType {
    index: number
    headCellRefs: RefObject<HTMLTableCellElement[]>
    columnOrder: Props['columnOrder']
    columns: Props['columns']
    transitionTime: number
    tableRef: RefObject<HTMLTableElement | null>
    tableId: string
}

function getColModel(
    headCellRefs: OptsType['headCellRefs'],
    columnOrder: OptsType['columnOrder'],
    columns: OptsType['columns']
) {
    let colModel = []

    function getFakeCell() {
        let leftMostCell = { offsetLeft: Infinity }

        const headCells = Object.entries(headCellRefs.current)

        headCells.forEach(([_, item]) => {
            if (item && item.offsetLeft < leftMostCell.offsetLeft) {
                leftMostCell = item
            }
        })

        if (leftMostCell.offsetLeft === Infinity) {
            return {
                offsetParent: undefined,
                offsetWidth: 0,
                offsetLeft: 0
            }
        }

        return leftMostCell as HTMLTableCellElement
    }

    // left most cell is the select cell, if it exists
    const leftMostCell = headCellRefs.current[0]
        ? headCellRefs.current[0]
        : getFakeCell()

    let ii = 0,
        parentOffsetLeft = 0,
        offsetParent = leftMostCell.offsetParent

    while (offsetParent) {
        parentOffsetLeft =
            parentOffsetLeft +
            ('offsetLeft' in offsetParent
                ? (offsetParent.offsetLeft as number)
                : 0) -
            (offsetParent.scrollLeft ?? 0)

        offsetParent =
            'offsetParent' in offsetParent
                ? (offsetParent.offsetParent as Element)
                : undefined

        ii++

        if (ii > 1000) break
    }

    // if the select cell is present, make sure it is apart of the column model
    if (headCellRefs.current[0]) {
        colModel[0] = {
            left: parentOffsetLeft + leftMostCell.offsetLeft,
            width: leftMostCell.offsetWidth,
            columnIndex: -1,
            ref: leftMostCell
        }
    }

    columnOrder.forEach(colIdx => {
        let col = headCellRefs.current[colIdx + 1]
        let cmIndx = colModel.length - 1
        if (!(columns[colIdx] && columns[colIdx].display !== 'true')) {
            let prevLeft =
                cmIndx !== -1
                    ? colModel[cmIndx].left + colModel[cmIndx].width
                    : parentOffsetLeft + leftMostCell.offsetLeft
            colModel.push({
                left: prevLeft,
                width: col.offsetWidth,
                columnIndex: colIdx,
                ref: col
            })
        }
    })

    return colModel
}

const reorderColumns = (
    prevColumnOrder: number[],
    columnIndex: number,
    newPosition: number
) => {
    let columnOrder = prevColumnOrder.slice()
    let srcIndex = columnOrder.indexOf(columnIndex)
    let targetIndex = columnOrder.indexOf(newPosition)

    if (srcIndex !== -1 && targetIndex !== -1) {
        let newItem = columnOrder[srcIndex]
        columnOrder = [
            ...columnOrder.slice(0, srcIndex),
            ...columnOrder.slice(srcIndex + 1)
        ]
        columnOrder = [
            ...columnOrder.slice(0, targetIndex),
            newItem,
            ...columnOrder.slice(targetIndex)
        ]
    }
    return columnOrder
}

function handleHover(
    opts: OptsType & {
        mon: DropTargetMonitor<
            {
                colIndex: number
                headCellRefs: RefObject<HTMLTableCellElement[]>
            },
            unknown
        >
        timeoutRef: RefObject<NodeJS.Timeout | null>
        handleColumnOrderUpdate: (
            columnOrder: number[],
            columnIndex: number,
            newPosition: number
        ) => void
    }
) {
    const {
        mon,
        index,
        headCellRefs,
        columnOrder,
        transitionTime = 300,
        tableRef,
        tableId,
        timeoutRef,
        columns,
        handleColumnOrderUpdate
    } = opts

    const item = mon.getItem()

    const hoverIdx = item.colIndex

    if (headCellRefs.current !== item.headCellRefs.current) return

    if (hoverIdx !== index) {
        let reorderedCols = reorderColumns(columnOrder, item.colIndex, index)
        let newColModel = getColModel(headCellRefs, reorderedCols, columns)

        let newX = mon.getClientOffset()?.x ?? 0

        let modelIdx = -1

        for (let ii = 0; ii < newColModel.length; ii++) {
            if (
                newX > newColModel[ii].left &&
                newX < newColModel[ii].left + newColModel[ii].width
            ) {
                modelIdx = newColModel[ii].columnIndex

                break
            }
        }

        if (modelIdx === item.colIndex) {
            clearTimeout(timeoutRef.current ?? undefined)

            let curColModel = getColModel(headCellRefs, columnOrder, columns)

            let transitions: number[] = []

            newColModel.forEach(item => {
                transitions[item.columnIndex] = item.left
            })
            curColModel.forEach(item => {
                transitions[item.columnIndex] =
                    transitions[item.columnIndex] - item.left
            })

            for (let idx = 1; idx < columnOrder.length; idx++) {
                let colIndex = columnOrder[idx]
                if (columns[colIndex] && columns[colIndex].display !== 'true') {
                    // skip
                } else {
                    if (headCellRefs.current[idx])
                        headCellRefs.current[idx].style.transition = '280ms'
                    if (headCellRefs.current[idx])
                        headCellRefs.current[idx].style.transform =
                            'translateX(' + transitions[idx - 1] + 'px)'
                }
            }

            const allElms: HTMLTableCellElement[] = []
            const dividers: HTMLTableCellElement[] = []

            for (let ii = 0; ii < columnOrder.length; ii++) {
                const elms =
                    tableRef.current?.querySelectorAll<HTMLTableCellElement>(
                        '[data-colindex="' +
                            ii +
                            '"][data-tableid="' +
                            tableId +
                            '"]'
                    ) ?? []

                for (let jj = 0; jj < elms.length; jj++) {
                    elms[jj].style.transition = transitionTime + 'ms'
                    elms[jj].style.transform =
                        'translateX(' + transitions[ii] + 'px)'
                    allElms.push(elms[jj])
                }

                const divider =
                    tableRef.current?.querySelectorAll<HTMLTableCellElement>(
                        '[data-divider-index="' +
                            (ii + 1) +
                            '"][data-tableid="' +
                            tableId +
                            '"]'
                    ) ?? []

                for (let jj = 0; jj < divider.length; jj++) {
                    divider[jj].style.transition = transitionTime + 'ms'
                    divider[jj].style.transform =
                        'translateX(' + transitions[columnOrder[ii]] + 'px)'
                    dividers.push(divider[jj])
                }
            }

            const newColIndex = item.colIndex

            timeoutRef.current = setTimeout(() => {
                allElms.forEach(item => {
                    item.style.transition = '0s'
                    item.style.transform = 'translateX(0)'
                })
                dividers.forEach(item => {
                    item.style.transition = '0s'
                    item.style.transform = 'translateX(0)'
                })
                handleColumnOrderUpdate(reorderedCols, newColIndex, index)
            }, transitionTime)
        }
    }
}
