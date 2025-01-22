// vendors
import { test, expect, describe } from 'vitest'
import OriginalPaginationFromMui from '@mui/material/TablePagination'
import { render } from '@testing-library/react'
// locals
import type { DataTableOptions, DataTableProps } from '../src'
import TableFooter from '../src'
import { DataTableContextProvider } from '../src'
import { ClassName } from '../src/enums/class-name'

describe('<DataTableFooter />', function () {
    function setup(props?: Partial<DataTableProps>) {
        const {
            columns = [],
            data = [],
            options = {}
        } = {
            ...props
        }

        return {
            result: render(
                <DataTableContextProvider
                    datatableProps={{
                        columns,
                        data,
                        options
                    }}
                >
                    <TableFooter />
                </DataTableContextProvider>
            )
        }
    }

    test('should render a table footer', () => {
        const { result } = setup({
            options: {
                rowsPerPageOptions: [5, 10, 15]
            }
        })

        expect(
            result.container.getElementsByClassName(ClassName.FOOTER).length
        ).toBe(1)

        /**
         * prev and next button
         */
        expect(result.getAllByRole('button').length).toBe(2)

        /**
         * Row per page select/dropdown
         */
        expect(result.getAllByRole('combobox').length).toBe(1)

        /**
         * Row per page options ([5, 10, 15])
         *
         * NOTE: options are show on popper, so it can selected from container. SKIP for now
         *
         * @todo  FIX THIS
         */
        // expect(result.getAllByRole('option').length).toBe(3)
    })

    test('should render a table footer with customFooter', () => {
        const customFooter: DataTableOptions['customFooter'] = (
            rowCount,
            page,
            rowsPerPage,
            changeRowsPerPage,
            changePage,
            textLabels
        ) => (
            <OriginalPaginationFromMui
                count={rowCount}
                component="div"
                labelRowsPerPage={textLabels.rowsPerPage}
                onPageChange={(_, page) => changePage(page)}
                onRowsPerPageChange={event =>
                    changeRowsPerPage(parseInt(event.target.value))
                }
                page={page}
                rowsPerPage={rowsPerPage}
            />
        )

        const { result } = setup({
            options: {
                customFooter
            }
        })

        /**
         * The `<OriginalPaginationFromMui />` className
         */
        expect(
            result.container.getElementsByClassName('MuiTablePagination-root')
                .length
        ).toBe(1)
    })

    test('should not render a table footer', () => {
        const { result } = setup({
            options: {
                pagination: false
            }
        })

        expect(
            result.container.getElementsByClassName(ClassName.FOOTER).length
        ).toBe(0)
    })

    test('should render a JumpToPage component', () => {
        const { result } = setup({
            options: {
                jumpToPage: true
            }
        })

        expect(
            result.container.getElementsByClassName(
                'datatable-delight--footer--jump-to-page'
            ).length
        ).toBe(1)
    })
})
