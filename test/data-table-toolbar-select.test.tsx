import { TableToolbarSelect } from '../src/components/selected-rows-toolbar'
import { describe, expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'
import { DataTableOptions } from '../src'

/**
 * @todo FIX THIS -- custom `setSelectedRows` is error
 */
describe('<TableToolbarSelect />', function () {
    function setup(params?: {
        options?: DataTableOptions
        onRowsDelete?: ReturnType<typeof vi.fn>
        customToolbarSelect?:
            | ReturnType<typeof vi.fn>
            | DataTableOptions['customToolbarSelect']
        selectedRows?: {
            data: number[]
        }
        displayData?: number[]
        selectRowUpdate?: ReturnType<typeof vi.fn>
    }) {
        const {
            options,
            onRowsDelete,
            customToolbarSelect,
            selectedRows,
            displayData,
            selectRowUpdate
        } = params ?? {
            onRowsDelete: vi.fn(),
            customToolbarSelect: vi.fn(),
            selectedRows: { data: [1] },
            displayData: [0],
            selectRowUpdate: vi.fn()
        }

        return {
            onRowsDelete,
            customToolbarSelect,
            selectRowUpdate,
            selectedRows,
            displayData,
            result: render(
                <TableToolbarSelect
                    options={{
                        customToolbarSelect,
                        ...options
                    }}
                    // options={{ textLabels: DEFAULT_TEXT_LABELS }}
                    selectedRows={selectedRows}
                    onRowsDelete={onRowsDelete}
                    displayData={displayData}
                    selectRowUpdate={selectRowUpdate}
                />
            )
        }
    }

    test('should render table toolbar select', () => {
        const { result } = setup()

        expect(
            result.container.querySelectorAll(
                '[class*="datatable-delight--toolbar--select--root"]'
            ).length
        ).toBe(1)
    })

    test('should call customToolbarSelect with 3 arguments', () => {
        const { customToolbarSelect, displayData, selectedRows } = setup()

        expect(customToolbarSelect).toBeCalledWith(
            selectedRows,
            displayData,
            expect.any(Function)
        )
    })

    // test('should success calls `setSelectedRows`', () => {
    //     const customToolbarSelect: DataTableOptions['customToolbarSelect'] = (
    //         _,
    //         __,
    //         setSelectedRows
    //     ) => {
    //         setSelectedRows([1])

    //         return <></>
    //     }

    //     setup({
    //         options: {
    //             customToolbarSelect
    //         }
    //     })
    // })

    // test('should throw TypeError if selectedRows is not an array of numbers', () => {
    //     const customToolbarSelect: DataTableOptions['customToolbarSelect'] = (
    //         _,
    //         __,
    //         setSelectedRows
    //     ) => {
    //         const spySetSelectedRows = vi.fn(setSelectedRows)

    //         spySetSelectedRows('')
    //         spySetSelectedRows(['1'])

    //         return <></>
    //     }

    //     expect(
    //         setup({
    //             options: {
    //                 customToolbarSelect
    //             }
    //         })
    //     ).toThrowError()
    // })

    // test('should call selectRowUpdate when customToolbarSelect passed and setSelectedRows was called', () => {
    //     // const mountWrapper = mount(
    //     //     <TableToolbarSelect
    //     //         options={{ textLabels: getTextLabels(), customToolbarSelect }}
    //     //         selectedRows={selectedRows}
    //     //         onRowsDelete={onRowsDelete}
    //     //         displayData={displayData}
    //     //         selectRowUpdate={selectRowUpdate}
    //     //     />
    //     // )

    //     const customToolbarSelect: DataTableOptions['customToolbarSelect'] = (
    //         _,
    //         __,
    //         setSelectedRows
    //     ) => {
    //         setSelectedRows({ data: [1] })

    //         return <></>
    //     }

    //     const { selectRowUpdate } = setup({
    //         customToolbarSelect
    //     })

    //     expect(selectRowUpdate).toHaveBeenCalledOnce()
    // })

    // test('should throw an error when multiple rows are selected and selectableRows="single"', () => {
    //     const customToolbarSelect: DataTableOptions['customToolbarSelect'] = (
    //         _,
    //         __,
    //         setSelectedRows
    //     ) => {
    //         setSelectedRows([1, 2])

    //         return <></>
    //     }

    //     expect(
    //         setup({
    //             options: {
    //                 selectableRows: 'single'
    //             },
    //             customToolbarSelect
    //         })
    //     ).toThrowError()
    // })
})
