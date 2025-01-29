import { describe, expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'
import { DataTableContextProvider, type DataTableProps } from '@src/index'
import SelectedRowsToolbar from './selected-rows-toolbar'
import ComponentClassName from '@src/enums/class-name'

describe('<SelectedRowsToolbar />', function () {
    function setup(props?: Partial<DataTableProps>) {
        return {
            result: render(
                <DataTableContextProvider
                    datatableProps={{
                        data: [
                            [1, 2, 3],
                            [4, 5, 6]
                        ],
                        columns: ['c1', 'c2', 'c3'],
                        ...props
                    }}
                >
                    <SelectedRowsToolbar />
                </DataTableContextProvider>
            )
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

    test('should call customToolbarSelect with 3 arguments', () => {
        const customToolbarSelect = vi.fn()

        setup({
            options: {
                customToolbarSelect
            }
        })

        expect(customToolbarSelect).toBeCalledWith(
            {
                data: [],
                lookup: {}
            },
            [],
            () => {}
        )
    })

    test('should success calls `setSelectedRows`', () => {
        console.warn('⚠️ UNFINISHED TEST CASE ⚠️')

        setup({
            options: {
                customToolbarSelect(_, __, setSelectedRows) {
                    setSelectedRows([0])

                    return <></>
                }
            }
        })

        // expect(spy).toBeCalledWith([0])
    })

    test('should throw TypeError if selectedRows is not an array of numbers', () => {
        expect(() =>
            setup({
                options: {
                    customToolbarSelect(_, __, setSelectedRows) {
                        // @ts-expect-error   INTENTIONALLY PASSING INVALID TYPE
                        setSelectedRows('')

                        return <></>
                    }
                }
            })
        ).toThrowError()

        expect(() =>
            setup({
                options: {
                    customToolbarSelect(_, __, setSelectedRows) {
                        // @ts-expect-error   INTENTIONALLY PASSING INVALID TYPE
                        setSelectedRows(['1'])

                        return <></>
                    }
                }
            })
        ).toThrowError()
    })

    test('should call selectRowUpdate when customToolbarSelect passed and setSelectedRows was called', () => {
        console.warn('⚠️ UNFINISHED TEST CASE ⚠️')

        setup({
            options: {
                customToolbarSelect(_, __, setSelectedRows) {
                    setSelectedRows([1])

                    return <></>
                }
            }
        })

        // expect(onTableChange).toHaveBeenCalledOnce()
    })

    test('should throw an error when multiple rows are selected and selectableRows="single"', () => {
        expect(() =>
            setup({
                options: {
                    selectableRows: 'single',
                    customToolbarSelect: (_, __, setSelectedRows) => {
                        setSelectedRows([1, 2])

                        return <></>
                    }
                }
            })
        ).toThrowError()
    })
})
