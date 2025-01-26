// vendors
import { test, expect, describe } from 'vitest'
import OriginalPaginationFromMui from '@mui/material/TablePagination'
import { render } from '@testing-library/react'
// locals
import {
    DataTableContextProvider,
    type DataTableOptions,
    type DataTableProps
} from '@src/index'
import BottomBar from './'
import ComponentClassName from '@src/enums/class-name'

describe('<BottomBar />', function () {
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
                    <BottomBar />
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
            result.container.children[0]?.className.includes(
                ComponentClassName.BOTTOM_BAR + '-root'
            )
        ).toBe(true)

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

    test('should not render the <BottomBar />', () => {
        const { result } = setup({
            options: {
                pagination: false
            }
        })

        expect(
            result.container.querySelectorAll(
                `[class*="${ComponentClassName.BOTTOM_BAR}-root"]`
            ).length
        ).toBe(0)
    })

    test('should render a JumpToPage component', () => {
        const { result } = setup({
            options: {
                jumpToPage: true
            }
        })

        expect(
            result.container.querySelectorAll(
                `[class*="${ComponentClassName.BOTTOM_BAR__JUMP_TO_PAGE}-root"]`
            ).length
        ).toBe(1)
    })
})
