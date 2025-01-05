// vendors
import '@testing-library/jest-dom'
import { TablePagination as OriginalPaginationFromMui } from '@mui/material'
import { render, screen } from '@testing-library/react'
// locals
import type { DataTableOptions, DataTableProps } from '../src'
import TableFooter from '../src/components/footer'

/**
 * @todo CONSOLIDATE TYPES
 */
describe('<DataTableFooter />', function () {
    const options: DataTableProps['options'] = {
        rowsPerPageOptions: [5, 10, 15]
    }

    const changeRowsPerPage = jest.fn()
    const changePage = jest.fn()

    it('should render a table footer', () => {
        const { container } = render(
            <TableFooter
                options={options}
                rowCount={100}
                page={1}
                rowsPerPage={10}
                changeRowsPerPage={changeRowsPerPage}
                changePage={changePage}
            />
        )

        expect(
            container.getElementsByClassName('datatable-delight--footer').length
        ).toBe(1)

        /**
         * prev and next button
         */
        expect(screen.getAllByRole('button').length).toBe(2)

        /**
         * Row per page select/dropdown
         */
        expect(screen.getAllByRole('combobox').length).toBe(1)

        /**
         * Row per page options ([5, 10, 15])
         */
        // expect(screen.getAllByRole('option').length).toBe(3)
    })

    it('should render a table footer with customFooter', () => {
        const customOptions: DataTableOptions = {
            ...options,
            customFooter: (
                rowCount,
                page,
                rowsPerPage,
                changeRowsPerPage,
                changePage,
                textLabels
            ) => {
                return (
                    <OriginalPaginationFromMui
                        count={rowCount}
                        component="div"
                        labelRowsPerPage={textLabels.pagination?.rowsPerPage}
                        onPageChange={(_, page) => changePage(page)}
                        onRowsPerPageChange={event =>
                            changeRowsPerPage(event.target.value)
                        }
                        page={page}
                        rowsPerPage={rowsPerPage}
                    />
                )
            }
        }

        const { container } = render(
            <TableFooter
                options={customOptions}
                rowCount={100}
                page={1}
                rowsPerPage={10}
                changeRowsPerPage={changeRowsPerPage}
                changePage={changePage}
            />
        )

        /**
         * The `<OriginalPaginationFromMui />` className
         */
        expect(
            container.getElementsByClassName('MuiTablePagination-root').length
        ).toBe(1)
    })

    it('should not render a table footer', () => {
        const nonPageOption = {
            ...options,
            pagination: false
        }

        const { container } = render(
            <TableFooter
                options={nonPageOption}
                rowCount={100}
                page={1}
                rowsPerPage={10}
                changeRowsPerPage={changeRowsPerPage}
                changePage={changePage}
            />
        )

        expect(
            container.getElementsByClassName('datatable-delight--footer')[0]
                .children.length
        ).toBe(0)
    })

    it('should render a JumpToPage component', () => {
        const jumpToPageOptions = {
            ...options,
            jumpToPage: true
        }

        const { container } = render(
            <TableFooter
                options={jumpToPageOptions}
                rowCount={100}
                page={1}
                rowsPerPage={10}
                changeRowsPerPage={changeRowsPerPage}
                changePage={changePage}
            />
        )

        expect(
            container.getElementsByClassName(
                'datatable-delight--footer--jump-to-page'
            ).length
        ).toBe(1)
    })
})
