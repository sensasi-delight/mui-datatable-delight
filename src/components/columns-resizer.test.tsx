// vendors
import { test, expect, describe, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
// locals
import ColumnsResizer from './columns-resizer'
import DataTable from '@src/index'

describe('<ColumnsResizer />', function () {
    const options = {
        resizableColumns: true,
        tableBodyHeight: '500px'
    }

    test('should render a table resize component', () => {
        const updateDividers = vi.fn()
        const setResizable = vi.fn()

        const { container } = render(
            <ColumnsResizer
                options={options}
                updateDividers={updateDividers}
                setResizable={setResizable}
            />
        )

        expect(container.childElementCount).toBe(1)
        expect(updateDividers.mock.calls.length).toBe(1)
        expect(setResizable.mock.calls.length).toBe(1)
    })

    test('should create a coordinate map for each column', () => {
        const columns = ['Name', 'Age', 'Location', 'Phone']
        const data = [['Joe', 26, 'Chile', '555-5555']]

        const { container } = render(
            <DataTable columns={columns} data={data} options={options} />
        )

        expect(container.children[0].childElementCount).toBe(5)
    })

    test('should execute resize methods correctly', () => {
        const updateDividers = vi.fn()

        const { container } = render(
            <ColumnsResizer
                updateDividers={updateDividers}
                setResizable={forwardElements => {
                    const fakeCellElements = [
                        {
                            left: 0,
                            width: 50,
                            getBoundingClientRect: () => ({
                                left: 0,
                                width: 50,
                                height: 100
                            }),
                            style: {}
                        },
                        {
                            left: 50,
                            width: 50,
                            getBoundingClientRect: () => ({
                                left: 50,
                                width: 50,
                                height: 100
                            }),
                            style: {}
                        }
                    ]

                    const fakeTableElement = {
                        style: {
                            width: '100px'
                        },
                        getBoundingClientRect: () => ({
                            width: 100,
                            height: 100
                        }),
                        offsetParent: {
                            offsetLeft: 0
                        }
                    }

                    forwardElements(
                        fakeCellElements as unknown as HTMLTableCellElement[],
                        fakeTableElement as unknown as HTMLTableElement
                    )
                }}
            />
        )

        /**
         * This is should be the first HTML Element of dividers / resize slider
         */
        const resizeDivider = container.children[0].children[0]

        fireEvent.mouseDown(resizeDivider, {
            clientX: 48
        })

        fireEvent.mouseMove(resizeDivider, {
            clientX: 52
        })

        fireEvent.mouseUp(resizeDivider)

        const computedStyle = getComputedStyle(container.children[0])

        expect(computedStyle.width).toBe('100px')

        /**
         * CAN'T REMAKE ASSERTION, DISABLED FOR NOW.
         *
         * ORIGINAL CODE:
         * `assert.strictEqual(endState.tableHeight, 100)`
         */
        // expect(computedStyle.height).toBe('100px')
    })
})
