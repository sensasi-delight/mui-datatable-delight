// @ts-nocheck

// vendors
import '@testing-library/jest-dom'
import MuiTableFooter from '@mui/material/TableFooter'
import { render } from '@testing-library/react'
// locals
import type { DataTableProps } from '../src'
import { TEXT_LABELS } from '../src/statics'
import TableFooter from '../src/components/footer'

/**
 * @todo FIX TYPE ERROR TO REMOVE `@ts-nocheck`
 */
describe('<DataTableFooter />', function () {
    const options: DataTableProps['options'] = {
        rowsPerPageOptions: [5, 10, 15],
        textLabels: TEXT_LABELS
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
    })

    it('should render a table footer with customFooter', () => {
        const customOptions = {
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
                    <MuiTableFooter
                        changePage={changePage}
                        changeRowsPerPage={changeRowsPerPage}
                        page={page}
                        rowCount={rowCount}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage={textLabels.rowsPerPage}
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

        expect(container.getElementsByTagName('tfoot').length).toBe(1)
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
