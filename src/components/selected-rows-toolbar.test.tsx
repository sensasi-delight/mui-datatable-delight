import ComponentClassName from '@src/enums/class-name'
import { DataTableContextProvider, type DataTableProps } from '@src/index'
import { render } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import SelectedRowsToolbar from './selected-rows-toolbar'

describe('<SelectedRowsToolbar />', () => {
    function setup(props?: Partial<DataTableProps>) {
        const selectRowUpdate = vi.fn()

        return {
            result: render(
                <DataTableContextProvider
                    datatableProps={{
                        columns: ['c1', 'c2', 'c3'],
                        data: [
                            [1, 2, 3],
                            [4, 5, 6]
                        ],
                        ...props
                    }}
                >
                    <SelectedRowsToolbar selectRowUpdate={selectRowUpdate} />
                </DataTableContextProvider>
            ),
            selectRowUpdate
        }
    }

    test('should render `<SelectedRowsToolbar />`', () => {
        const { result } = setup()

        expect(
            result.container.querySelectorAll(
                `[class*="${ComponentClassName.SELECTED_ROWS_TOOLBAR}-root"]`
            ).length
        ).toBe(1)
    })

    test('should call customSelectedRowsToolbar with 3 arguments', () => {
        const customSelectedRowsToolbar = vi.fn()

        setup({
            options: {
                customSelectedRowsToolbar
            }
        })

        expect(customSelectedRowsToolbar).toBeCalledWith(
            {
                data: [],
                lookup: {}
            },
            [
                {
                    data: [1, 2, 3],
                    dataIndex: 0
                },
                {
                    data: [4, 5, 6],
                    dataIndex: 1
                }
            ],
            expect.any(Function)
        )
    })

    test('should success calls `setSelectedRows`', () => {
        const { selectRowUpdate } = setup({
            options: {
                customSelectedRowsToolbar(_, __, setSelectedRows) {
                    setSelectedRows([0])

                    return null
                }
            }
        })

        expect(selectRowUpdate).toBeCalledWith('custom', [
            {
                dataIndex: 0,
                index: 0
            }
        ])
    })

    test('should throw TypeError if selectedRows is not an array of numbers', () => {
        expect(() =>
            setup({
                options: {
                    customSelectedRowsToolbar(_, __, setSelectedRows) {
                        // @ts-expect-error   INTENTIONALLY PASSING INVALID TYPE
                        setSelectedRows('')

                        return null
                    }
                }
            })
        ).toThrowError()

        expect(() =>
            setup({
                options: {
                    customSelectedRowsToolbar(_, __, setSelectedRows) {
                        // @ts-expect-error   INTENTIONALLY PASSING INVALID TYPE
                        setSelectedRows(['1'])

                        return null
                    }
                }
            })
        ).toThrowError()
    })

    test('should throw an error when multiple rows are selected and selectableRows="single"', () => {
        expect(() =>
            setup({
                options: {
                    customSelectedRowsToolbar: (_, __, setSelectedRows) => {
                        setSelectedRows([1, 2])

                        return null
                    },
                    selectableRows: 'single'
                }
            })
        ).toThrowError()
    })
})
