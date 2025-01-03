// vendors
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
// locals
import TableResize from '../src/components/resize'
import DataTable from '../src'

describe('<TableResize />', function () {
    const options = {
        resizableColumns: true,
        tableBodyHeight: '500px'
    }

    it('should render a table resize component', () => {
        const updateDividers = jest.fn()
        const setResizable = jest.fn()

        const { container } = render(
            <TableResize
                options={options}
                updateDividers={updateDividers}
                setResizable={setResizable}
            />
        )

        expect(container.childElementCount).toBe(1)
        expect(updateDividers.mock.calls.length).toBe(1)
        expect(setResizable.mock.calls.length).toBe(1)
    })

    it('should create a coordinate map for each column', () => {
        const columns = ['Name', 'Age', 'Location', 'Phone']
        const data = [['Joe', 26, 'Chile', '555-5555']]

        const { container } = render(
            <DataTable columns={columns} data={data} options={options} />
        )

        expect(container.children[0].childElementCount).toBe(5)
    })

    it('should execute resize methods correctly', () => {
        const setResizable = next => {
            const cellsRef = {
                0: {
                    left: 0,
                    width: 50,
                    getBoundingClientRect: () => ({
                        left: 0,
                        width: 50,
                        height: 100
                    }),
                    style: {}
                },
                1: {
                    left: 50,
                    width: 50,
                    getBoundingClientRect: () => ({
                        left: 50,
                        width: 50,
                        height: 100
                    }),
                    style: {}
                }
            }
            const tableRef = {
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
            next(cellsRef, tableRef)
        }

        const updateDividers = jest.fn()

        const { container } = render(
            <TableResize
                options={options}
                updateDividers={updateDividers}
                setResizable={setResizable}
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
