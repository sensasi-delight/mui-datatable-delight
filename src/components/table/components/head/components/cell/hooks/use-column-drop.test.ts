import { describe, expect, it, vi } from 'vitest'

import type { DataTableState } from '@src/types/state'
import type { DropTargetMonitor } from 'react-dnd'
import { getColModel, handleHover, reorderColumns } from './use-column-drop'

describe('useColumnDrop', function () {
    it('should reorder columns when reorderColumns is called', () => {
        const prevColumnOrder = [1, 2, 3, 4]
        const newOrder = reorderColumns(prevColumnOrder, 1, 4)

        expect(newOrder).to.eql([2, 3, 4, 1])
    })

    it('should build a column model object when getColModel is called', () => {
        const offsetParent = {
            offsetLeft: 10,
            offsetParent: null
        }

        const headCellRefs = {
            current: [
                {
                    offsetLeft: 0,
                    offsetWidth: 0,
                    offsetParent: offsetParent
                },
                {
                    offsetLeft: 0,
                    offsetParent: 0,
                    offsetWidth: 0
                },
                {
                    offsetLeft: 0,
                    offsetParent: 0,
                    offsetWidth: 0
                }
            ] as unknown[] as HTMLTableCellElement[]
        }

        const columnOrder = [0, 1]
        const columns = [
            {
                display: 'true'
            },
            {
                display: 'true'
            }
        ] as DataTableState['columns']

        const newModel = getColModel(headCellRefs, columnOrder, columns)

        expect(newModel.length).to.equal(3)
        expect(newModel[0]?.left).to.equal(10)
        expect(newModel[0]?.ref.offsetParent).to.equal(offsetParent)
        expect(newModel[1]?.columnIndex).to.equal(0)
    })

    it('should build a column model object when getColModel is called and no select cell exists', () => {
        const headCellRefs = {
            current: [
                null,
                {
                    offsetLeft: 0,
                    offsetParent: 0,
                    offsetWidth: 0
                },
                {
                    offsetLeft: 0,
                    offsetParent: 0,
                    offsetWidth: 0
                }
            ] as unknown[] as HTMLTableCellElement[]
        }
        const columnOrder = [0, 1]
        const columns = [
            {
                display: 'true'
            },
            {
                display: 'true'
            }
        ] as DataTableState['columns']

        const newModel = getColModel(headCellRefs, columnOrder, columns)

        expect(newModel.length).to.equal(2)
        expect(newModel[0]?.left).to.equal(0)
        expect(newModel[1]?.columnIndex).to.equal(1)
    })

    it('should set columnShift on timers when handleHover is called', () => {
        const offsetParent = {
            offsetLeft: 10,
            offsetParent: null
        }

        const headCellRefs = {
            current: [
                {
                    offsetLeft: 0,
                    offsetWidth: 0,
                    offsetParent: offsetParent,
                    style: {}
                },
                {
                    offsetLeft: 0,
                    offsetParent: 0,
                    offsetWidth: 10,
                    style: {}
                },
                {
                    offsetLeft: 0,
                    offsetParent: 0,
                    offsetWidth: 10,
                    style: {}
                }
            ] as unknown[] as HTMLTableCellElement[]
        }

        const columns = [
            {
                display: 'true'
            },
            {
                display: 'true'
            }
        ] as DataTableState['columns']

        const columnOrder = [0, 1]

        const timeoutRef = {
            current: null
        }

        handleHover(
            {
                mon: {
                    getItem: () => ({
                        colIndex: 1,
                        headCellRefs
                    }),
                    getClientOffset: () => ({
                        x: 15
                    })
                } as DropTargetMonitor,
                index: 0,
                handleColumnOrderUpdate: vi.fn(),
                transitionTime: 0,
                timeoutRef
            },
            columnOrder,
            columns,
            {
                current: {
                    querySelectorAll: () => [
                        {
                            style: {}
                        }
                    ]
                } as unknown as HTMLTableElement
            },
            headCellRefs
        )

        expect(timeoutRef.current).to.not.equal(null)
    })
})
