import { type DropTargetMonitor, useDrop } from 'react-dnd'
import { type RefObject, useRef } from 'react'
import type { DataTableState } from '@src/index'
// globals
import useDataTableContext from '@src/hooks/use-data-table-context'
import TableAction from '@src/enums/table-action'

/**
 * This hook handles the dragging and dropping effects that occur for columns.
 */
export default function useColumnDrop(opts: OptsType) {
    const { draggableHeadCellRefs, onAction, options, state, tableRef } =
        useDataTableContext()
    const timeoutRef = useRef<NodeJS.Timeout>(null)

    function handleColumnOrderUpdate(
        newColumnOrder: number[],
        columnIndex: number,
        newPosition: number
    ) {
        onAction?.(TableAction.COLUMN_ORDER_CHANGE, {
            columnOrder: newColumnOrder
        })

        options.onColumnOrderChange?.(newColumnOrder, columnIndex, newPosition)
    }

    return useDrop({
        accept: 'HEADER',
        hover: (_, mon) =>
            handleHover(
                { ...opts, mon, handleColumnOrderUpdate, timeoutRef },
                state.columnOrder,
                state.columns,
                tableRef,
                draggableHeadCellRefs
            ),
        collect: mon => ({
            isOver: !!mon.isOver(),
            canDrop: !!mon.canDrop()
        })
    })
}

interface OptsType {
    index: number
    transitionTime: number
}

/**
 * Given the head cell refs, column order, and columns, this function builds an array of column models.
 * A column model is an object with the following properties:
 *      - left: the distance from the left edge of the table container to the left edge of the column
 *      - width: the width of the column
 *      - columnIndex: the index of the column in the columns array
 *      - ref: a reference to the column's html element
 * The column model is used to calculate the position of the drag preview.
 *
 * NOTE: EXPORTED ONLY FOR TESTING
 */
export function getColModel<T>(
    headCellRefs: RefObject<HTMLTableCellElement[]>,
    columnOrder: DataTableState<T>['columnOrder'],
    columns: DataTableState<T>['columns']
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

    columnOrder.forEach(colId => {
        const col = headCellRefs.current[colId + 1]
        const cmIndx = colModel.length - 1

        if (!(columns[colId] && columns[colId]?.display !== 'true')) {
            const prevLeft =
                cmIndx !== -1
                    ? colModel[cmIndx].left + colModel[cmIndx].width
                    : parentOffsetLeft + leftMostCell.offsetLeft

            colModel.push({
                left: prevLeft,
                width: col.offsetWidth,
                columnIndex: colId,
                ref: col
            })
        }
    })

    return colModel
}

/**
 * Reorders the columns given the previous column order, the column index, and the new position.
 *
 * NOTE: EXPORTED ONLY FOR TESTING
 */
export function reorderColumns(
    prevColumnOrder: number[],
    columnIndex: number,
    newPosition: number
): number[] {
    const srcIndex = prevColumnOrder.indexOf(columnIndex)
    const targetIndex = prevColumnOrder.indexOf(newPosition)

    if (srcIndex === -1 || targetIndex === -1) {
        return prevColumnOrder
    }

    const srcColId = prevColumnOrder[srcIndex]

    if (!srcColId) {
        throw new Error('srcColId is undefined')
    }

    const tempColumnOrder = [
        ...prevColumnOrder.slice(0, srcIndex),
        ...prevColumnOrder.slice(srcIndex + 1)
    ]

    return [
        ...tempColumnOrder.slice(0, targetIndex),
        srcColId,
        ...tempColumnOrder.slice(targetIndex)
    ]
}

/**
 * Handles the hover event on a column drop target.
 *
 * NOTE: EXPORTED ONLY FOR TESTING
 */
export function handleHover<T>(
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
    },
    columnOrder: DataTableState<T>['columnOrder'],
    columns: DataTableState<T>['columns'],
    tableRef: RefObject<HTMLTableElement | null>,
    headCellRefs: RefObject<HTMLTableCellElement[]>
) {
    const {
        mon,
        index,
        transitionTime = 300,
        timeoutRef,
        handleColumnOrderUpdate
    } = opts

    const item = mon.getItem()

    if (item.colIndex === index) return

    if (headCellRefs.current !== item.headCellRefs.current) return

    const reorderedCols = reorderColumns(columnOrder, item.colIndex, index)
    const newColModel = getColModel(headCellRefs, reorderedCols, columns)

    const newX = mon.getClientOffset()?.x ?? 0

    const modelIdx =
        newColModel.find(
            item => newX > item.left && newX < item.left + item.width
        )?.columnIndex ?? -1

    if (modelIdx !== item.colIndex) {
        return
    }

    clearTimeout(timeoutRef.current ?? undefined)

    const transitions: number[] = []

    newColModel.forEach(item => {
        transitions[item.columnIndex] = item.left
    })

    const curColModel = getColModel(headCellRefs, columnOrder, columns)

    curColModel.forEach(item => {
        transitions[item.columnIndex] =
            transitions[item.columnIndex] - item.left
    })

    const transitionedElements: HTMLElement[] = columnOrder.flatMap(
        (columnIndex, i) => {
            const colCellEls =
                tableRef.current?.querySelectorAll<HTMLTableCellElement>(
                    `[data-column-index="${i}"]`
                ) ?? []

            colCellEls.forEach(el => {
                el.style.transition = transitionTime + 'ms'
                el.style.transform = 'translateX(' + transitions[i] + 'px)'
            })

            /** resizable sliders */
            const colDividerEls =
                tableRef.current?.querySelectorAll<HTMLElement>(
                    `[data-divider-index="${i + 1}"]`
                ) ?? []

            colDividerEls.forEach(el => {
                el.style.transition = transitionTime + 'ms'
                el.style.transform = `translateX(${transitions[columnIndex]}px)`
            })

            return [...Array.from(colCellEls), ...Array.from(colDividerEls)]
        }
    )

    timeoutRef.current = setTimeout(() => {
        resetElementTransitions(transitionedElements)
        handleColumnOrderUpdate(reorderedCols, item.colIndex, index)
    }, transitionTime)
}

/**
 * Resets the CSS transitions and transforms for the given elements.
 */
function resetElementTransitions(elements: HTMLElement[]) {
    elements.forEach(item => {
        item.style.transition = '0s'
        item.style.transform = 'translateX(0)'
    })
}
